import type { Metadata } from 'next';
import './listamedica.css';
import Cabecera from '@/components/listamedica/Cabecera';
import Pie from '@/components/listamedica/Pie';
import PixelMeta from '@/components/listamedica/PixelMeta';
import { urlAbsoluta } from '@/lib/listamedica/rutas';

export const metadata: Metadata = {
  metadataBase: new URL(urlAbsoluta('/')),
  title: {
    default: 'Lista Médica — Directorio de profesionales de la salud en Puebla',
    template: '%s · Lista Médica',
  },
  description:
    'Directorio de profesionales de la salud en Puebla, Cholula y Atlixco. Cada perfil tiene su cédula profesional verificada ante la SEP antes de publicarse.',
  openGraph: {
    siteName: 'Lista Médica',
    locale: 'es_MX',
    type: 'website',
  },
};

/**
 * Lista Médica vive dentro del sitio de PG Estrategias, que tiene tema oscuro.
 * Todo lo de esta sección cuelga de .lm para no heredar nada de allá.
 */
export default function ListaMedicaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lm">
      <PixelMeta />
      <Cabecera />
      <main id="contenido">{children}</main>
      <Pie />
    </div>
  );
}
