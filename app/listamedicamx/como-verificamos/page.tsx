import type { Metadata } from 'next';
import Link from 'next/link';
import Sello from '@/components/listamedica/Sello';
import { MARCA, TEXTO_SELLO, URL_SEP } from '@/lib/listamedica/marca';
import { rutas, urlAbsoluta } from '@/lib/listamedica/rutas';

export const metadata: Metadata = {
  title: 'Cómo verificamos cada cédula',
  description:
    'El proceso completo con el que Lista Médica comprueba la cédula profesional de cada persona publicada en el Registro Nacional de Profesionistas de la SEP, y hasta dónde llega esa verificación.',
  alternates: { canonical: urlAbsoluta('/como-verificamos') },
};

const PASOS: [string, string][] = [
  [
    'El profesional nos manda su número de cédula',
    'Junto con su nombre completo tal como aparece en su título. Nos lo manda por WhatsApp; no hay formulario ni registro.',
  ],
  [
    'Consultamos el Registro Nacional de Profesionistas',
    'Es el buscador público de la Secretaría de Educación Pública. Ahí se comprueba que el número exista y que corresponda al nombre que nos dio.',
  ],
  [
    'Guardamos la evidencia con fecha',
    'Se archiva la captura de esa consulta. La fecha que aparece en el sello del perfil es la de ese día, no una fecha genérica.',
  ],
  [
    'Si algo no coincide, el perfil no se publica',
    'No hay versión intermedia ni sello parcial. Si el número no existe o el nombre no corresponde, el perfil se queda sin publicar y se lo decimos al profesional.',
  ],
  [
    'El sello queda visible en el perfil',
    'Con la fecha de la verificación y el texto que explica exactamente qué se comprobó y qué no.',
  ],
];

export default function ComoVerificamosPage() {
  return (
    <>
      <section className="lm-hero">
        <div className="lm-marco">
          <div
            className="lm-sello-franja"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto minmax(0, 1fr)',
              gap: 36,
              alignItems: 'center',
            }}
          >
            <Sello fecha="2026-02-11" tamano="grande" dibuja />
            <div>
              <h1>Cómo verificamos cada cédula</h1>
              <p className="lm-hero__sub">
                Un número de cédula se puede escribir en cualquier lona. Lo que hacemos aquí es
                comprobarlo en la fuente oficial antes de publicar el perfil, y dejar constancia de
                cuándo se hizo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lm-seccion lm-seccion--linea">
        <div className="lm-marco lm-marco--angosto">
          <h2>El proceso</h2>
          <div className="lm-pasos">
            {PASOS.map(([titulo, detalle], i) => (
              <div className="lm-paso" key={titulo}>
                <div className="lm-paso__numero">{i + 1}</div>
                <div>
                  <h3>{titulo}</h3>
                  <p className="lm-gris">{detalle}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 20 }}>
            El registro que consultamos es público y usted puede hacer la misma comprobación:{' '}
            <a href={URL_SEP} target="_blank" rel="noopener noreferrer">
              Registro Nacional de Profesionistas de la SEP
            </a>
            .
          </p>
        </div>
      </section>

      <section className="lm-seccion lm-seccion--alt lm-seccion--linea">
        <div className="lm-marco lm-marco--angosto">
          <h2>Hasta dónde llega la verificación</h2>
          <p style={{ marginTop: 12, fontSize: 17 }}>{TEXTO_SELLO}</p>
          <p className="lm-nota" style={{ marginTop: 16 }}>
            Dicho de otro modo: el sello acredita que la persona tiene el título que dice tener. No
            es una opinión sobre cómo atiende, ni una recomendación nuestra, ni un respaldo de
            resultados. Esa parte la juzga usted.
          </p>
        </div>
      </section>

      <section className="lm-seccion">
        <div className="lm-marco lm-marco--angosto">
          <h2>Si detecta algo raro</h2>
          <p style={{ marginTop: 12 }}>
            Si encuentra un dato incorrecto en un perfil, o tiene motivos para pensar que algo no
            corresponde, escríbanos a <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a> o al
            WhatsApp {MARCA.whatsappLegible}. Revisamos y, si hace falta, despublicamos el perfil
            mientras se aclara.
          </p>
          <p style={{ marginTop: 14 }}>
            <Link href={rutas.registro()}>¿Es usted profesional de la salud y quiere aparecer?</Link>
          </p>
        </div>
      </section>
    </>
  );
}
