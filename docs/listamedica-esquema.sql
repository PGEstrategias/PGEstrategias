-- ─────────────────────────────────────────────────────────────────────────
-- Lista Médica — esquema equivalente en PostgreSQL
--
-- El sitio corre hoy sobre archivos JSON (data/listamedica/*.json) detrás de
-- lib/listamedica/almacen.ts. Este archivo es el mismo modelo en SQL, para el
-- día en que el directorio crezca lo suficiente para pedir una base real: se
-- reescriben leerTabla/escribirTabla y nada más del código cambia.
--
-- Regla dura: aquí NO hay ninguna tabla ni columna que guarde datos de
-- pacientes ni información clínica. Es una decisión legal deliberada.
-- ─────────────────────────────────────────────────────────────────────────

CREATE TYPE estatus_profesional AS ENUM ('borrador', 'publicado', 'pausado', 'demo');
CREATE TYPE ciudad_directorio   AS ENUM ('puebla', 'cholula', 'atlixco');
CREATE TYPE genero_profesional  AS ENUM ('femenino', 'masculino', 'no_especificado');
CREATE TYPE tipo_clic           AS ENUM ('whatsapp', 'telefono', 'mapa', 'vista_perfil');
CREATE TYPE resultado_verificacion AS ENUM ('encontrado', 'no_encontrado', 'pendiente');
CREATE TYPE dispositivo_clic    AS ENUM ('movil', 'escritorio');

CREATE TABLE especialidades (
  id            TEXT PRIMARY KEY,
  nombre        TEXT NOT NULL,
  -- Cómo se le llama a quien la ejerce, en plural: "Dermatólogos".
  -- Encabeza cada página de listado; no se deriva del slug porque el slug
  -- ya perdió los acentos.
  nombre_plural TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  descripcion   TEXT NOT NULL DEFAULT '',
  sinonimos     TEXT[] NOT NULL DEFAULT '{}'
);

CREATE TABLE profesionales (
  id                         TEXT PRIMARY KEY,
  nombre                     TEXT NOT NULL,
  apellidos                  TEXT NOT NULL,
  titulo                     TEXT NOT NULL DEFAULT '',
  cedula                     TEXT NOT NULL DEFAULT '',
  cedula_especialidad        TEXT NOT NULL DEFAULT '',
  slug                       TEXT NOT NULL UNIQUE,
  bio                        TEXT NOT NULL DEFAULT '',
  foto_url                   TEXT NOT NULL DEFAULT '',
  telefono                   TEXT NOT NULL DEFAULT '',
  whatsapp                   TEXT NOT NULL DEFAULT '',
  genero                     genero_profesional NOT NULL DEFAULT 'no_especificado',
  idiomas                    TEXT[] NOT NULL DEFAULT '{}',
  anios_experiencia          INTEGER,
  universidad                TEXT NOT NULL DEFAULT '',
  universidad_especialidad   TEXT NOT NULL DEFAULT '',
  certificacion_consejo      TEXT NOT NULL DEFAULT '',
  vigencia_certificacion     TEXT NOT NULL DEFAULT '',
  aseguradoras               TEXT[] NOT NULL DEFAULT '{}',
  google_place_id            TEXT NOT NULL DEFAULT '',
  google_rating              NUMERIC(2,1),
  google_reviews_count       INTEGER,
  google_sync_at             TIMESTAMPTZ,
  verificado_en              DATE,
  evidencia_verificacion_url TEXT NOT NULL DEFAULT '',
  estatus                    estatus_profesional NOT NULL DEFAULT 'borrador',
  completitud_pct            SMALLINT NOT NULL DEFAULT 0,
  es_fundador                BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_alta                 TIMESTAMPTZ NOT NULL DEFAULT now(),
  orden                      INTEGER NOT NULL DEFAULT 0,

  -- Un perfil publicado siempre trae su cédula verificada. Es la promesa
  -- del producto y por eso vive en la base, no solo en el formulario.
  CONSTRAINT publicado_exige_verificacion
    CHECK (estatus <> 'publicado' OR verificado_en IS NOT NULL),

  -- Y una verificación siempre trae su evidencia archivada.
  CONSTRAINT verificacion_exige_evidencia
    CHECK (verificado_en IS NULL OR evidencia_verificacion_url <> '')
);

CREATE INDEX profesionales_estatus_idx      ON profesionales (estatus);
CREATE INDEX profesionales_completitud_idx  ON profesionales (completitud_pct);

CREATE TABLE prof_especialidad (
  profesional_id  TEXT NOT NULL REFERENCES profesionales (id) ON DELETE CASCADE,
  especialidad_id TEXT NOT NULL REFERENCES especialidades (id) ON DELETE RESTRICT,
  es_principal    BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (profesional_id, especialidad_id)
);

-- Una sola especialidad principal por profesional.
CREATE UNIQUE INDEX prof_especialidad_principal_idx
  ON prof_especialidad (profesional_id) WHERE es_principal;

CREATE TABLE consultorios (
  id                 TEXT PRIMARY KEY,
  profesional_id     TEXT NOT NULL REFERENCES profesionales (id) ON DELETE CASCADE,
  calle              TEXT NOT NULL DEFAULT '',
  numero             TEXT NOT NULL DEFAULT '',
  torre              TEXT NOT NULL DEFAULT '',
  piso               TEXT NOT NULL DEFAULT '',
  consultorio        TEXT NOT NULL DEFAULT '',
  colonia            TEXT NOT NULL DEFAULT '',
  cp                 TEXT NOT NULL DEFAULT '',
  ciudad             ciudad_directorio NOT NULL DEFAULT 'puebla',
  lat                DOUBLE PRECISION,
  lng                DOUBLE PRECISION,
  referencias        TEXT NOT NULL DEFAULT '',
  estacionamiento    TEXT NOT NULL DEFAULT '',
  horario_texto      TEXT NOT NULL DEFAULT '',
  atiende_fin_semana BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX consultorios_ciudad_idx  ON consultorios (ciudad);
CREATE INDEX consultorios_colonia_idx ON consultorios (colonia);

CREATE TABLE servicios (
  id              TEXT PRIMARY KEY,
  profesional_id  TEXT NOT NULL REFERENCES profesionales (id) ON DELETE CASCADE,
  nombre          TEXT NOT NULL,
  precio_desde    NUMERIC(10,2),
  publicar_precio BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE faqs (
  id             TEXT PRIMARY KEY,
  profesional_id TEXT NOT NULL REFERENCES profesionales (id) ON DELETE CASCADE,
  pregunta       TEXT NOT NULL,
  respuesta      TEXT NOT NULL,
  orden          SMALLINT NOT NULL DEFAULT 1
);

-- Analítica. Ninguna de estas dos tablas guarda IP ni nada que apunte a una
-- persona: eso es requisito del Aviso de Privacidad, no una omisión.
CREATE TABLE clics (
  id             BIGSERIAL PRIMARY KEY,
  profesional_id TEXT NOT NULL REFERENCES profesionales (id) ON DELETE CASCADE,
  tipo           tipo_clic NOT NULL,
  "timestamp"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  utm_source     TEXT NOT NULL DEFAULT '',
  utm_campaign   TEXT NOT NULL DEFAULT '',
  referrer       TEXT NOT NULL DEFAULT '',
  dispositivo    dispositivo_clic NOT NULL
);

CREATE INDEX clics_profesional_idx ON clics (profesional_id, tipo);
CREATE INDEX clics_fecha_idx       ON clics ("timestamp");

CREATE TABLE busquedas (
  id               BIGSERIAL PRIMARY KEY,
  termino          TEXT NOT NULL,
  ciudad           TEXT NOT NULL DEFAULT '',
  resultados_count INTEGER NOT NULL DEFAULT 0,
  "timestamp"      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Las búsquedas sin resultados son la lista de reclutamiento de la semana.
CREATE INDEX busquedas_vacias_idx ON busquedas (termino) WHERE resultados_count = 0;

CREATE TABLE verificaciones (
  id                TEXT PRIMARY KEY,
  profesional_id    TEXT NOT NULL REFERENCES profesionales (id) ON DELETE CASCADE,
  fuente            TEXT NOT NULL DEFAULT 'Registro Nacional de Profesionistas (SEP)',
  numero_consultado TEXT NOT NULL,
  resultado         resultado_verificacion NOT NULL,
  evidencia_url     TEXT NOT NULL DEFAULT '',
  verificado_por    TEXT NOT NULL DEFAULT '',
  "timestamp"       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fase 2. Se crea vacía y sin interfaz para no migrar después.
CREATE TABLE resenas (
  id             TEXT PRIMARY KEY,
  profesional_id TEXT NOT NULL REFERENCES profesionales (id) ON DELETE CASCADE,
  autor          TEXT NOT NULL DEFAULT '',
  calificacion   SMALLINT CHECK (calificacion BETWEEN 1 AND 5),
  texto          TEXT NOT NULL DEFAULT '',
  publicada      BOOLEAN NOT NULL DEFAULT FALSE,
  "timestamp"    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Borrar los perfiles de demostración cuando entren los reales:
--   DELETE FROM profesionales WHERE estatus = 'demo';
