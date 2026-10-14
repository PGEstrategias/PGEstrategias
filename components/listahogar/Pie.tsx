import Link from 'next/link';
import { Marca } from './Cabecera';
import { MARCA, rutas } from '@/lib/listahogar/datos';

export default function Pie() {
  return (
    <footer className="lh-pie">
      <div className="lh-marco">
        <Marca claro />
        <p style={{ marginTop: 12 }}>
          <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a>
          {'  ·  '}
          <a href={`https://wa.me/${MARCA.whatsappNumero}`} target="_blank" rel="noopener noreferrer">
            WhatsApp {MARCA.whatsappLegible}
          </a>
        </p>
        <nav className="lh-pie__enlaces" aria-label="Enlaces">
          <Link href={rutas.home()}>Inicio</Link>
          <Link href={`${rutas.home()}#oficios`}>Oficios</Link>
          <Link href={rutas.profesionales()}>Soy profesional</Link>
        </nav>
        <div className="lh-pie__legal">
          <p>
            Lista Hogar es un directorio de información. No presta los servicios, no cobra por
            ellos y no interviene en el acuerdo entre cliente y profesional.
          </p>
          <p>
            Lista Hogar es un producto de <strong>PG Estrategias</strong> · {MARCA.ciudad}
          </p>
        </div>
      </div>
    </footer>
  );
}
