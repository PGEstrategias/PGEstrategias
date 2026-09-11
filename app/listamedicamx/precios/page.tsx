import type { Metadata } from 'next';
import Link from 'next/link';
import { lugaresFundadorRestantes } from '@/lib/listamedica/datos';
import { MARCA, TEXTO_GRATUIDAD, whatsappPG } from '@/lib/listamedica/marca';
import { rutas, urlAbsoluta } from '@/lib/listamedica/rutas';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Precios',
  description:
    'Lo que cuesta aparecer en Lista Médica: gratis durante la etapa de lanzamiento y precio de fundador de $500 MXN al semestre, con factura, para los primeros 1,000 perfiles.',
  alternates: { canonical: urlAbsoluta('/precios') },
};

const MENSAJE = 'Hola. Vi los precios de Lista Médica y quiero apartar un lugar de fundador.';

export default async function PreciosPage() {
  const lugares = await lugaresFundadorRestantes();

  return (
    <div className="lm-marco lm-marco--angosto lm-legal">
      <h1>Precios</h1>
      <p className="lm-legal__version">Para profesionales de la salud.</p>

      <p style={{ fontSize: 17 }}>{TEXTO_GRATUIDAD}</p>

      <div className="lm-tarjeta" style={{ marginTop: 22 }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--gris)' }}>
          Lugares de fundador disponibles
        </p>
        <p
          className="lm-num"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 42,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: '4px 0 0',
            color: 'var(--pg-rojo)',
          }}
        >
          {lugares.toLocaleString('es-MX')}
        </p>
        <p className="lm-nota" style={{ marginTop: 6 }}>
          De {MARCA.cupoFundador.toLocaleString('es-MX')}. El número sale de un conteo de los
          perfiles que ya entraron y baja solo cuando entra otro.
        </p>
      </div>

      <h2>Qué está incluido</h2>
      <ul>
        <li>Perfil completo con su propia dirección web, indexable en buscadores.</li>
        <li>Verificación de su cédula profesional ante la SEP, con fecha.</li>
        <li>Botón de WhatsApp directo a su teléfono, con el mensaje ya escrito.</li>
        <li>Aparición en las páginas de listado de su especialidad y su ciudad.</li>
        <li>Servicios con precio desde, horarios, mapa y preguntas frecuentes.</li>
        <li>Su calificación de Google, si tiene ficha.</li>
        <li>Actualizaciones de sus datos cuando las necesite, sin costo adicional.</li>
      </ul>

      <h2>Qué no está incluido</h2>
      <ul>
        <li>
          Agenda de citas. Lista Médica no agenda: el paciente le escribe a usted y ustedes se
          ponen de acuerdo.
        </li>
        <li>Posiciones compradas. No se vende el primer lugar del listado.</li>
        <li>
          Publicidad pagada dentro del directorio. Si en algún momento existe, se identificará como
          tal.
        </li>
      </ul>

      <h2>Facturación y bajas</h2>
      <p>
        El precio de fundador es de {MARCA.precioFundador}, IVA incluido y con factura. Cuando
        empiece el cobro, le avisaremos con 30 días de anticipación antes del primer cargo.
      </p>
      <p>
        Puede pedir la baja de su perfil en cualquier momento, sin explicación y sin costo. Se
        procesa dentro de las 48 horas siguientes.
      </p>

      <div className="lm-fila-flex" style={{ marginTop: 26 }}>
        <a
          className="lm-btn lm-btn--wa"
          href={whatsappPG(MENSAJE)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apartar un lugar por WhatsApp
        </a>
        <Link href={rutas.registro()} className="lm-btn lm-btn--contorno">
          Ver todo lo que incluye
        </Link>
      </div>
    </div>
  );
}
