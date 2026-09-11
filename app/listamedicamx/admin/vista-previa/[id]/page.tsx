import Link from 'next/link';
import { notFound } from 'next/navigation';
import PerfilPublico from '@/components/listamedica/PerfilPublico';
import { obtenerPorId } from '@/lib/listamedica/datos';
import { rutas } from '@/lib/listamedica/rutas';

export const dynamic = 'force-dynamic';

/**
 * El perfil tal como quedará publicado, incluso si todavía es borrador.
 * Es la misma página que ve el paciente, no una maqueta parecida.
 */
export default async function VistaPreviaPage({ params }: { params: { id: string } }) {
  const perfil = await obtenerPorId(params.id);
  if (!perfil) notFound();

  return (
    <>
      <div
        style={{
          background: 'var(--tinta)',
          color: 'var(--papel)',
          padding: '10px 16px',
          fontSize: 14,
        }}
      >
        Vista previa · estado <strong>{perfil.estatus}</strong>. Así se verá el perfil publicado.{' '}
        <Link href={rutas.adminEditar(perfil.id)} style={{ color: '#fff' }}>
          Volver a editar
        </Link>
      </div>
      <PerfilPublico p={perfil} registrarVista={false} />
    </>
  );
}
