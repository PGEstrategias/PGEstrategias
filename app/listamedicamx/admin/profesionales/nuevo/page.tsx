import FormularioProfesional from '@/components/listamedica/admin/FormularioProfesional';
import { obtenerEspecialidades } from '@/lib/listamedica/datos';

export const dynamic = 'force-dynamic';

export default async function AltaPage() {
  const catalogo = await obtenerEspecialidades();

  return (
    <>
      <h1 style={{ marginBottom: 6 }}>Alta de profesional</h1>
      <p className="lm-gris" style={{ marginBottom: 20 }}>
        Lo obligatorio está arriba. El resto se puede completar después: el perfil se guarda como
        borrador y no se publica hasta que la cédula esté verificada.
      </p>
      <FormularioProfesional inicial={null} catalogo={catalogo} />
    </>
  );
}
