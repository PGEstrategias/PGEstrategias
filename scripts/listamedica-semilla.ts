/**
 * Escribe las tablas de Lista Médica en data/listamedica/.
 *
 *   npm run listamedica:semilla            -> siembra solo lo que falte
 *   npm run listamedica:semilla -- --forzar -> reescribe todo desde cero
 *
 * Los doce perfiles ficticios quedan con estatus 'demo' para poder borrarlos
 * de un tirón cuando entren los reales.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { construirSemilla } from '../lib/listamedica/semilla';
import { calcularCompletitud } from '../lib/listamedica/completitud';

async function main() {
  const forzar = process.argv.includes('--forzar');
  const dir = process.env.LISTAMEDICA_DATA_DIR ?? path.join(process.cwd(), 'data', 'listamedica');
  await fs.mkdir(dir, { recursive: true });

  const base = construirSemilla();

  // La completitud se calcula, no se escribe a mano.
  base.profesionales = base.profesionales.map((p) => ({
    ...p,
    completitud_pct: calcularCompletitud({
      profesional: p,
      consultorios: base.consultorios.filter((c) => c.profesional_id === p.id),
      servicios: base.servicios.filter((s) => s.profesional_id === p.id),
      faqs: base.faqs.filter((f) => f.profesional_id === p.id),
      especialidades: base.prof_especialidad.filter((r) => r.profesional_id === p.id).length,
    }),
  }));

  for (const [tabla, filas] of Object.entries(base)) {
    const archivo = path.join(dir, `${tabla}.json`);
    const existe = await fs
      .access(archivo)
      .then(() => true)
      .catch(() => false);

    if (existe && !forzar) {
      console.log(`· ${tabla}.json ya existe, se deja como está`);
      continue;
    }
    await fs.writeFile(archivo, `${JSON.stringify(filas, null, 2)}\n`, 'utf8');
    console.log(`✓ ${tabla}.json — ${(filas as unknown[]).length} filas`);
  }

  console.log(`\nListo. Datos en ${dir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
