import type { Metadata } from 'next';
import Link from 'next/link';
import Sello from '@/components/listamedica/Sello';
import { lugaresFundadorRestantes, totalPublicados } from '@/lib/listamedica/datos';
import { MARCA, TEXTO_GRATUIDAD, whatsappPG } from '@/lib/listamedica/marca';
import { rutas, urlAbsoluta } from '@/lib/listamedica/rutas';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Aparezca en Lista Médica',
  description:
    'Su perfil en el directorio de profesionales de la salud de Puebla, con su cédula verificada ante la SEP. Usted manda sus datos por WhatsApp y nosotros lo armamos.',
  alternates: { canonical: urlAbsoluta('/registro') },
};

const MENSAJE =
  'Hola. Soy profesional de la salud y quiero aparecer en Lista Médica. ¿Qué necesitan de mi parte?';

const INCLUYE = [
  ['Perfil completo con su propia dirección web', 'Su nombre, su especialidad y su colonia en el título de la página, que es lo que Google lee primero.'],
  ['Verificación de su cédula ante la SEP', 'La consultamos en el Registro Nacional de Profesionistas y el sello queda con la fecha en que se hizo.'],
  ['Botón de WhatsApp directo a su teléfono', 'El paciente le escribe a usted. La conversación no pasa por nosotros ni la vemos.'],
  ['Sus servicios con precio desde', 'Usted decide cuáles publica y cuáles deja sobre valoración.'],
  ['Consultorio con mapa y referencias', 'Con cómo llegar escrito para quien nunca ha ido a esa torre.'],
  ['Sus preguntas frecuentes', 'Las que contesta todos los días por teléfono, ya respondidas antes de que le escriban.'],
  ['Su reputación de Google', 'Si tiene ficha en Google, mostramos su calificación y el enlace a sus reseñas.'],
  ['Actualizaciones sin costo', 'Cambió de horario o de consultorio: nos escribe y lo cambiamos.'],
];

const OBJECIONES: [string, string][] = [
  [
    '¿Cuál es el truco?',
    'No hay truco, hay una etapa. Estamos armando el directorio y nos conviene que tenga profesionales reales desde el principio. Por eso está gratis ahora y por eso los primeros mil perfiles conservan el precio de fundador cuando empecemos a cobrar. Si el directorio no le trae pacientes, usted se sale y no pasa nada.',
  ],
  [
    '¿Qué pasa si me quiero salir?',
    'Nos escribe por WhatsApp y damos de baja su perfil dentro de las siguientes 48 horas. Sin explicación, sin costo y sin plazo forzoso. No hay contrato de doce meses porque no hay contrato de doce meses.',
  ],
  [
    '¿Quién está detrás?',
    `Lista Médica es un producto de PG Estrategias, agencia de marketing digital y producción audiovisual en Puebla. El responsable es ${MARCA.responsable}. Nos puede escribir a ${MARCA.correo} o al WhatsApp ${MARCA.whatsappLegible}.`,
  ],
  [
    '¿Necesito algo de COFEPRIS?',
    'De nuestra parte, no. Lista Médica es un directorio de información: no presta servicios de salud, no vende tratamientos ni hace publicidad de productos. Lo que publicamos de usted es su formación, su ubicación, sus servicios y sus precios. Las obligaciones sanitarias de su consultorio siguen siendo suyas y no cambian por aparecer aquí.',
  ],
  [
    '¿Mis pacientes son míos?',
    'Sí. El paciente le escribe directamente a su WhatsApp, con su número. Nosotros no guardamos su nombre, ni su teléfono, ni nada de lo que se digan. Lo único que medimos es cuántas personas vieron su perfil y cuántas oprimieron el botón de contacto.',
  ],
  [
    '¿Tengo que aprender a usar una plataforma?',
    'No. Usted no entra a ningún sistema ni tiene contraseña. Nos manda sus datos por WhatsApp una vez y nosotros armamos el perfil. Su única interacción con Lista Médica es que empiezan a llegarle mensajes.',
  ],
];

export default async function RegistroPage() {
  const [lugares, publicados] = await Promise.all([
    lugaresFundadorRestantes(),
    totalPublicados(),
  ]);

  return (
    <>
      <section className="lm-hero">
        <div className="lm-marco">
          <div className="lm-columnas">
            <div>
              <h1>Su consultorio, encontrable.</h1>
              <p className="lm-hero__sub">
                Lista Médica es el directorio de profesionales de la salud de Puebla, Cholula y
                Atlixco. Usted manda sus datos por WhatsApp y nosotros armamos su perfil, con su
                cédula verificada ante la SEP.
              </p>

              <div className="lm-fila-flex" style={{ marginTop: 22 }}>
                <a
                  className="lm-btn lm-btn--wa"
                  href={whatsappPG(MENSAJE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escribirnos por WhatsApp
                </a>
                <Link href={rutas.precios()} className="lm-btn lm-btn--contorno">
                  Ver precios
                </Link>
              </div>

              <p className="lm-nota" style={{ marginTop: 12 }}>
                Ya hay {publicados} {publicados === 1 ? 'perfil publicado' : 'perfiles publicados'}{' '}
                en el directorio.
              </p>
            </div>

            <div className="lm-tarjeta">
              <p style={{ fontSize: 14, color: 'var(--gris)', margin: 0 }}>
                Lugares con precio de fundador
              </p>
              <p
                className="lm-num"
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 44,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  margin: '4px 0 0',
                  color: 'var(--pg-rojo)',
                }}
              >
                {lugares.toLocaleString('es-MX')}
              </p>
              <p className="lm-nota" style={{ marginTop: 6 }}>
                De {MARCA.cupoFundador.toLocaleString('es-MX')} en total. El contador baja con cada
                perfil que entra, no con el calendario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── El sello ───────────────────────────────────── */}
      <section className="lm-seccion lm-seccion--alt lm-seccion--linea">
        <div className="lm-marco">
          <div className="lm-sello-bloque lm-sello-franja" style={{ background: 'transparent' }}>
            <Sello fecha="2026-02-11" tamano="grande" />
            <div>
              <h2>Su cédula, verificada y a la vista</h2>
              <p style={{ marginTop: 10 }}>
                Antes de publicar su perfil consultamos su número de cédula en el Registro Nacional
                de Profesionistas de la Secretaría de Educación Pública y guardamos la evidencia con
                la fecha. El sello dice exactamente eso y nada más.
              </p>
              <p style={{ marginTop: 10 }}>
                <Link href={rutas.comoVerificamos()}>Ver el proceso completo</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Qué incluye ────────────────────────────────── */}
      <section className="lm-seccion">
        <div className="lm-marco">
          <h2>Qué incluye su perfil</h2>
          <dl className="lm-datos" style={{ marginTop: 18 }}>
            {INCLUYE.map(([titulo, detalle]) => (
              <div className="lm-datos__fila" key={titulo}>
                <dt style={{ color: 'var(--tinta)', fontWeight: 500 }}>{titulo}</dt>
                <dd className="lm-gris">{detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Precio ─────────────────────────────────────── */}
      <section className="lm-seccion lm-seccion--alt lm-seccion--linea">
        <div className="lm-marco lm-marco--angosto">
          <h2>Precio</h2>
          <p style={{ marginTop: 12, fontSize: 17 }}>{TEXTO_GRATUIDAD}</p>
          <p className="lm-nota" style={{ marginTop: 12 }}>
            La escasez aquí es de cupo, no de fecha: no hay cuenta regresiva ni oferta que vence el
            viernes. Cuando se acaben los mil lugares de fundador, se acabaron.
          </p>
        </div>
      </section>

      {/* ── Objeciones ─────────────────────────────────── */}
      <section className="lm-seccion">
        <div className="lm-marco lm-marco--angosto">
          <h2>Lo que suelen preguntarnos</h2>
          <div className="lm-acordeon" style={{ marginTop: 18 }}>
            {OBJECIONES.map(([pregunta, respuesta]) => (
              <details key={pregunta}>
                <summary>{pregunta}</summary>
                <div>{respuesta}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cierre ─────────────────────────────────────── */}
      <section className="lm-seccion lm-seccion--alt lm-seccion--linea">
        <div className="lm-marco lm-marco--angosto">
          <h2>Cómo empezamos</h2>
          <p style={{ marginTop: 12 }}>
            Nos escribe por WhatsApp, nos manda su número de cédula, sus datos de consultorio y una
            fotografía. Verificamos la cédula, armamos el perfil y se lo mandamos para que lo revise
            antes de publicarlo.
          </p>
          <div className="lm-fila-flex" style={{ marginTop: 18 }}>
            <a
              className="lm-btn lm-btn--wa"
              href={whatsappPG(MENSAJE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribirnos por WhatsApp
            </a>
            <a className="lm-btn lm-btn--contorno" href={`mailto:${MARCA.correo}`}>
              O escríbanos por correo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
