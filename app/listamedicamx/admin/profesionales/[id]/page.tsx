import Link from 'next/link';
import { notFound } from 'next/navigation';
import FormularioProfesional from '@/components/listamedica/admin/FormularioProfesional';
import { obtenerEspecialidades, obtenerPorId } from '@/lib/listamedica/datos';
import { desdeProfesional } from '@/lib/listamedica/formulario';
import { rutas } from '@/lib/listamedica/rutas';
import { nombreCompleto } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

export default async function EditarPage({ params }: { params: { id: string } }) {
  const [perfil, catalogo] = await Promise.all([obtenerPorId(params.id), obtenerEspecialidades()]);
  if (!perfil) notFound();

  return (
    <>
      <h1 style={{ marginBottom: 6 }}>{nombreCompleto(perfil)}</h1>
      <p className="lm-gris" style={{ marginBottom: 20 }}>
        <span className={`lm-estatus lm-estatus--${perfil.estatus}`}>{perfil.estatus}</span>{' '}
        · Completitud {perfil.completitud_pct}% ·{' '}
        <Link href={`${rutas.admin()}/vista-previa/${perfil.id}`} target="_blank">
          Vista previa
        </Link>
      </p>
      <FormularioProfesional inicial={desdeProfesional(perfil)} catalogo={catalogo} />
    </>
  );
}
