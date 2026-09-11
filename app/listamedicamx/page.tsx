import type { Metadata } from 'next';
import Link from 'next/link';
import Buscador from '@/components/listamedica/Buscador';
import FilaProfesional from '@/components/listamedica/FilaProfesional';
import Sello from '@/components/listamedica/Sello';
import {
  conteoPorEspecialidad,
  destacados,
  lugaresFundadorRestantes,
  obtenerEspecialidades,
  totalPublicados,
} from '@/lib/listamedica/datos';
import { TEXTO_SELLO } from '@/lib/listamedica/marca';
import { rutas, urlAbsoluta } from '@/lib/listamedica/rutas';
import { ciudadesDisponibles } from '@/lib/listamedica/texto';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Lista Médica — Profesionales de la salud verificados en Puebla',
  description:
    'Directorio de profesionales de la salud en Puebla, Cholula y Atlixco. Cada cédula profesional se verifica ante el Registro Nacional de Profesionistas de la SEP antes de publicar el perfil.',
  alternates: { canonical: urlAbsoluta('/') },
};

/** Las que el visitante busca primero. El resto vive en el índice completo. */
const CHIPS_DESTACADAS = [
  'dentistas',
  'dermatologos',
  'psicologos',
  'pediatras',
  'ginecologos',
  'nutriologos',
  'ortopedistas',
  'oftalmologos',
];

export default async function HomePage() {
  const [especialidades, conteos, perfiles, publicados, lugares] = await Promise.all([
    obtenerEspecialidades(),
    conteoPorEspecialidad(),
    destacados(6),
    totalPublicados(),
    lugaresFundadorRestantes(),
  ]);

  const ciudades = ciudadesDisponibles();
  const chips = CHIPS_DESTACADAS.map((slug) =>
    conteos.find((c) => c.especialidad.slug === slug),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="lm-hero">
        <div className="lm-marco">
          <h1>Encuentra un profesional de la salud verificado.</h1>
          <p className="lm-hero__sub">
            Antes de publicar un perfil comprobamos su cédula profesional en el Registro Nacional de
            Profesionistas de la Secretaría de Educación Pública.
          </p>

          <div className="lm-hero__buscador">
            <Buscador
              especialidades={especialidades.map((e) => ({
                slug: e.slug,
                nombre: e.nombre,
                nombre_plural: e.nombre_plural,
                sinonimos: e.sinonimos,
              }))}
              ciudades={ciudades}
            />
          </div>

          {chips.length > 0 && (
            <div className="lm-chips" style={{ marginTop: 18 }}>
              {chips.map(({ especialidad, total }) => (
                <Link
                  key={especialidad.id}
                  href={rutas.listado(especialidad.slug, 'puebla')}
                  className="lm-chip"
                >
                  {especialidad.nombre_plural}
                  <span className="lm-gris lm-num">{total}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Qué significa el sello ─────────────────────── */}
      <section className="lm-seccion lm-seccion--alt lm-seccion--linea">
        <div className="lm-marco">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto minmax(0, 1fr)',
              gap: 32,
              alignItems: 'center',
            }}
            className="lm-sello-franja"
          >
            <Sello fecha="2026-02-11" tamano="grande" dibuja />
            <div>
              <h2>Qué significa el sello</h2>
              <p style={{ marginTop: 10 }}>{TEXTO_SELLO}</p>
              <p style={{ marginTop: 12 }}>
                <Link href={rutas.comoVerificamos()}>Ver el proceso completo de verificación</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Índice completo ────────────────────────────── */}
      <section className="lm-seccion">
        <div className="lm-marco">
          <div className="lm-encabezado-seccion">
            <div>
              <h2>Índice de especialidades</h2>
              <p>
                {publicados} {publicados === 1 ? 'perfil publicado' : 'perfiles publicados'} en
                Puebla, Cholula y Atlixco.
              </p>
            </div>
          </div>

          <div className="lm-indice">
            {conteos.map(({ especialidad, total }) => (
              <Link
                key={especialidad.id}
                href={rutas.listado(especialidad.slug, 'puebla')}
                className="lm-indice__fila"
              >
                <span>{especialidad.nombre_plural}</span>
                <span className="lm-indice__guia" aria-hidden="true" />
                <span className="lm-indice__conteo">{total}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perfiles destacados ────────────────────────── */}
      {perfiles.length > 0 && (
        <section className="lm-seccion lm-seccion--linea">
          <div className="lm-marco">
            <div className="lm-encabezado-seccion">
              <div>
                <h2>Perfiles del directorio</h2>
                <p>Escribe por WhatsApp desde aquí, sin entrar al perfil.</p>
              </div>
            </div>
            <div className="lm-lista">
              {perfiles.map((p) => (
                <FilaProfesional key={p.id} profesional={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Captación de profesionales ─────────────────── */}
      <section className="lm-seccion lm-seccion--alt lm-seccion--linea">
        <div className="lm-marco">
          <div
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1 1 380px' }}>
              <h2>¿Es usted profesional de la salud?</h2>
              <p style={{ marginTop: 10 }}>
                Usted manda sus datos por WhatsApp y nosotros armamos su perfil. No necesita
                aprender a usar nada ni firmar por doce meses.
              </p>
              <p className="lm-nota" style={{ marginTop: 8 }}>
                Quedan <strong className="lm-num">{lugares.toLocaleString('es-MX')}</strong> lugares
                con precio de fundador.
              </p>
            </div>
            <Link href={rutas.registro()} className="lm-btn lm-btn--primario">
              Ver cómo aparecer en el directorio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
