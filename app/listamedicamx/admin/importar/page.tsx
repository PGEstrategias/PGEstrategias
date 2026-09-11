import ImportadorCSV from '@/components/listamedica/admin/ImportadorCSV';

export const dynamic = 'force-dynamic';

export default function ImportarPage() {
  return (
    <>
      <h1 style={{ marginBottom: 6 }}>Carga masiva</h1>
      <p className="lm-gris" style={{ marginBottom: 20 }}>
        Para subir varios profesionales de golpe, por ejemplo los de una torre médica completa.
      </p>
      <ImportadorCSV />
    </>
  );
}
