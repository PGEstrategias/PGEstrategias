import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PerfilPublico from '@/components/listamedica/PerfilPublico';
import { esVisible, obtenerPorSlug, todosCompletos } from '@/lib/listamedica/datos';
import { urlAbsoluta } from '@/lib/listamedica/rutas';
import { nombreCiudad, nombreCompleto } from '@/lib/listamedica/texto';

export const revalidate = 300;

export async function generateStaticParams() {
  const perfiles = (await todosCompletos()).filter(esVisible);
  return perfiles.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await obtenerPorSlug(params.slug);
  if (!p) return { title: 'Perfil no encontrado' };

  const especialidad = p.especialidad_principal?.nombre ?? 'Profesional de la salud';
  const consultorio = p.consultorios[0];
  const zona = consultorio
    ? `${consultorio.colonia}, ${nombreCiudad(consultorio.ciudad)}`
    : 'Puebla';

  return {
    title: `${nombreCompleto(p)} — ${especialidad} en ${zona}`,
    description: `${especialidad} en ${zona}. Cédula profesional verificada ante la SEP. Consulta horarios, servicios y escribe por WhatsApp desde Lista Médica.`,
    alternates: { canonical: urlAbsoluta(`/dr/${p.slug}`) },
    openGraph: {
      title: `${nombreCompleto(p)} — ${especialidad} en ${zona}`,
      description: `${especialidad} en ${zona}. Cédula verificada ante la SEP.`,
      url: urlAbsoluta(`/dr/${p.slug}`),
      images: p.foto_url ? [p.foto_url] : undefined,
    },
  };
}

export default async function PerfilPage({ params }: { params: { slug: string } }) {
  const p = await obtenerPorSlug(params.slug);
  if (!p || !esVisible(p)) notFound();

  return <PerfilPublico p={p} />;
}
