import type { Metadata } from 'next';
import Link from 'next/link';
import { escrituraEnMemoria } from '@/lib/listamedica/almacen';
import { rutas } from '@/lib/listamedica/rutas';

export const metadata: Metadata = {
  title: 'Panel · Lista Médica',
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lm-admin">
      <div className="lm-marco">
        <nav className="lm-admin__nav" aria-label="Panel de Lista Médica">
          <Link href={rutas.admin()} className="lm-admin__marca">
            Panel · Lista Médica
          </Link>
          <span className="lm-admin__enlaces">
            <Link href={rutas.admin()}>Métricas</Link>
            <Link href={rutas.adminProfesionales()}>Profesionales</Link>
            <Link href={rutas.adminNuevo()}>Alta</Link>
            <Link href={rutas.adminImportar()}>Importar CSV</Link>
            <Link href={rutas.home()}>Ver sitio</Link>
          </span>
        </nav>

        {escrituraEnMemoria() && (
          <div className="lm-aviso lm-aviso--alerta" style={{ marginBottom: 18 }}>
            <strong>Los cambios no se están guardando en disco.</strong> El sistema de archivos de
            este entorno es de solo lectura, así que lo que captures vive únicamente en memoria y se
            pierde al reiniciar el proceso. Configura <code>LISTAMEDICA_DATA_DIR</code> apuntando a
            un volumen con permiso de escritura.
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
