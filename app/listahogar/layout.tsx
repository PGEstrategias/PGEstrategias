import type { Metadata } from 'next';
import './listahogar.css';
import Cabecera from '@/components/listahogar/Cabecera';
import Pie from '@/components/listahogar/Pie';

export const metadata: Metadata = {
  title: {
    default: 'Lista Hogar — Plomeros, electricistas y oficios verificados en Puebla',
    template: '%s · Lista Hogar',
  },
  description:
    'Directorio de plomeros, electricistas, cerrajeros y oficios del hogar en Puebla, Cholula y Atlixco. Cada profesional pasa por verificación de identidad, domicilio y referencias.',
  // Es un demo con perfiles ficticios: no debe aparecer en buscadores.
  robots: { index: false, follow: false },
};

export default function ListaHogarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lh">
      <Cabecera />
      <main id="contenido">{children}</main>
      <Pie />
    </div>
  );
}
