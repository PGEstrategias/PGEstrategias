import Link from 'next/link';
import { rutas } from '@/lib/listahogar/datos';

export function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`lh-marca${claro ? ' lh-marca--claro' : ''}`}>
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path d="M4 15 16 5l12 10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13.5V27h16V13.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="m12.5 20 2.6 2.6 4.6-5" fill="none" stroke="var(--lh-cinta)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>
        Lista <em>Hogar</em>
      </span>
    </span>
  );
}

export default function Cabecera() {
  return (
    <>
      <div className="lh-demo" role="note">
        Demo de presentación · Los perfiles son ficticios y los botones de WhatsApp llegan a PG
        Estrategias
      </div>
      <header className="lh-cabecera">
        <div className="lh-marco lh-cabecera__fila">
          <Link href={rutas.home()} aria-label="Lista Hogar, ir al inicio" className="lh-marca-enlace">
            <Marca />
          </Link>
          <nav className="lh-nav" aria-label="Navegación principal">
            <Link href={`${rutas.home()}#como-verificamos`} className="lh-nav__secundario">
              Cómo verificamos
            </Link>
            <Link href={`${rutas.home()}#oficios`} className="lh-nav__secundario">
              Oficios
            </Link>
            <Link href={rutas.profesionales()} className="lh-btn lh-btn--contorno lh-btn--chico">
              Soy profesional
            </Link>
          </nav>
        </div>
      </header>
      <div className="lh-cinta" aria-hidden="true" />
    </>
  );
}
