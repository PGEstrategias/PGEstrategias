import type { Metadata } from 'next';
import Link from 'next/link';
import Sello from '@/components/listahogar/Sello';
import { MARCA, PROFESIONALES, rutas, whatsapp } from '@/lib/listahogar/datos';

export const metadata: Metadata = {
  title: 'Aparece en Lista Hogar',
  description:
    'Tu perfil en el directorio de oficios del hogar de Puebla. Mándanos tus datos por WhatsApp y nosotros lo armamos. Sin comisiones por trabajo.',
};

const MENSAJE = 'Hola. Tengo un oficio y quiero aparecer en Lista Hogar. ¿Qué necesitan de mi parte?';

const INCLUYE: [string, string][] = [
  ['Perfil con tu propia dirección web', 'Tu nombre, tu oficio y tu zona, listos para compartir en tus redes y en tus tarjetas.'],
  ['Sello de verificado', 'Revisamos tu INE, tu domicilio y llamamos a tres de tus clientes. Es lo que hace que te abran la puerta.'],
  ['WhatsApp directo a tu celular', 'El cliente te escribe a ti. No cobramos comisión por trabajo ni nos metemos en el precio.'],
  ['Tus servicios con precio desde', 'Tú decides cuáles publicas y cuáles dejas sobre cotización.'],
  ['Filtros que te hacen aparecer', 'Urgencias 24 h, factura, pago con tarjeta: si lo ofreces, te encuentran por eso.'],
  ['Cambios sin costo', '¿Cambiaste de horario o de zona? Nos escribes y lo actualizamos.'],
];

const PREGUNTAS: [string, string][] = [
  ['¿Cobran comisión por cada trabajo?', 'No. El cliente te contacta directo y lo que cobres es tuyo. Nosotros cobramos solo la suscripción del perfil, y por ahora es gratis.'],
  ['¿Qué necesito para que me verifiquen?', 'Tu INE, un comprobante de domicilio y el teléfono de tres clientes a quienes ya les hayas trabajado y que acepten recibir una llamada corta.'],
  ['¿Y si un cliente se queja?', 'Le pedimos su versión y la tuya. Si hay un patrón de quejas, pausamos el perfil. Si es un caso aislado, queda entre ustedes.'],
  ['¿Tengo que usar una aplicación?', 'No. No hay contraseña ni plataforma. Nos mandas tus datos por WhatsApp una vez y empiezan a llegarte mensajes.'],
];

export default function SoyProfesionalPage() {
  return (
    <>
      <section className="lh-hero">
        <div className="lh-marco">
          <div className="lh-columnas">
            <div>
              <h1>
                Que te encuentren <span>por tu buen trabajo</span>.
              </h1>
              <p className="lh-hero__sub">
                Lista Hogar es el directorio de oficios de Puebla, Cholula y Atlixco. Nos mandas tus
                datos por WhatsApp, te verificamos y armamos tu perfil. Los clientes te escriben
                directo, sin comisiones.
              </p>
              <div className="lh-fila-flex" style={{ marginTop: 22 }}>
                <a className="lh-btn lh-btn--wa" href={whatsapp(MENSAJE)} target="_blank" rel="noopener noreferrer">
                  Escribirnos por WhatsApp
                </a>
                <Link href={rutas.listado('plomeros', 'puebla')} className="lh-btn lh-btn--contorno">
                  Ver un listado de ejemplo
                </Link>
              </div>
              <p className="lh-nota" style={{ marginTop: 12 }}>
                Ya hay {PROFESIONALES.length} profesionales en el directorio.
              </p>
            </div>

            <div className="lh-tarjeta">
              <p className="lh-gris" style={{ fontSize: 14 }}>
                Hoy
              </p>
              <p className="lh-precio-grande" style={{ margin: '4px 0 6px' }}>
                Gratis
              </p>
              <p style={{ fontSize: 14.5 }}>
                Durante el lanzamiento. Los primeros {MARCA.cupoFundador} perfiles conservan el
                precio de fundador: <strong>{MARCA.precioFundador}</strong>, sin aumentos.
              </p>
              <div style={{ marginTop: 14 }}>
                <Sello fecha="2026-10-01" tamano="chico" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lh-seccion lh-seccion--alt lh-seccion--linea">
        <div className="lh-marco lh-marco--angosto">
          <h2>Qué incluye tu perfil</h2>
          <ul className="lh-lista-check" style={{ marginTop: 16 }}>
            {INCLUYE.map(([titulo, texto]) => (
              <li key={titulo}>
                <div>
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lh-seccion lh-seccion--linea">
        <div className="lh-marco lh-marco--angosto">
          <h2>Lo que nos preguntan</h2>
          <div className="lh-acordeon" style={{ marginTop: 16 }}>
            {PREGUNTAS.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <div>{a}</div>
              </details>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a className="lh-btn lh-btn--wa" href={whatsapp(MENSAJE)} target="_blank" rel="noopener noreferrer">
              Quiero mi perfil
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
