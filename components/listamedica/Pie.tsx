import Link from 'next/link';
import { MARCA } from '@/lib/listamedica/marca';
import { rutas } from '@/lib/listamedica/rutas';

export default function Pie() {
  return (
    <footer className="lm-pie">
      <div className="lm-marco">
        <div className="lm-pie__marca">Lista Médica</div>
        <p>
          <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a>
          {'  ·  '}
          <a
            href={`https://wa.me/${MARCA.whatsappNumero}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {MARCA.whatsappLegible}
          </a>
        </p>

        <nav className="lm-pie__enlaces" aria-label="Enlaces legales">
          <Link href={rutas.privacidad()}>Aviso de Privacidad</Link>
          <Link href={rutas.terminos()}>Términos y Condiciones</Link>
          <Link href={rutas.comoVerificamos()}>Cómo verificamos</Link>
          <Link href={rutas.precios()}>Precios</Link>
        </nav>

        <div className="lm-pie__legal">
          <p>
            Lista Médica es un directorio de información. No presta servicios de salud, no agenda
            citas y no interviene en la relación entre paciente y profesional.
          </p>
          <p className="lm-pie__pg">
            Lista Médica es un producto de <strong>PG Estrategias</strong> · {MARCA.ciudad}
          </p>
        </div>
      </div>
    </footer>
  );
}
