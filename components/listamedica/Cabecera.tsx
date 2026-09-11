import Link from 'next/link';
import { rutas } from '@/lib/listamedica/rutas';

export default function Cabecera() {
  return (
    <header className="lm-cabecera">
      <div className="lm-marco">
        <div className="lm-cabecera__fila">
          <Link href={rutas.home()} className="lm-marca">
            Lista <em>Médica</em>
          </Link>
          <nav className="lm-nav" aria-label="Navegación principal">
            <Link href={rutas.comoVerificamos()} className="lm-nav__secundario">
              Cómo verificamos
            </Link>
            <Link href={rutas.precios()} className="lm-nav__secundario">
              Precios
            </Link>
            <Link href={rutas.registro()} className="lm-btn lm-btn--contorno lm-btn--chico">
              Soy profesional
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
