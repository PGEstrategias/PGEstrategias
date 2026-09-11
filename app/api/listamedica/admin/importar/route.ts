import { NextRequest, NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';
import { guardarProfesional, obtenerEspecialidades, slugDisponible } from '@/lib/listamedica/datos';
import { interpretarCSV, plantillaCSV } from '@/lib/listamedica/csv';

export const dynamic = 'force-dynamic';

/** Descarga la plantilla con las columnas del modelo. */
export async function GET() {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }
  return new NextResponse(plantillaCSV(), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="plantilla-lista-medica.csv"',
    },
  });
}

/**
 * Importación en dos tiempos: primero se revisa (`revisar: true`) y se
 * devuelve qué entraría y con qué problemas; solo en la segunda llamada se
 * escribe. Subir 80 perfiles a ciegas no es una operación reversible.
 */
export async function POST(peticion: NextRequest) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  const { csv, revisar } = (await peticion.json().catch(() => ({}))) as {
    csv?: string;
    revisar?: boolean;
  };

  if (!csv?.trim()) {
    return NextResponse.json({ ok: false, error: 'El archivo llegó vacío.' }, { status: 400 });
  }

  const catalogo = await obtenerEspecialidades();
  const filas = interpretarCSV(csv, catalogo);

  if (!filas.length) {
    return NextResponse.json(
      { ok: false, error: 'No se encontró ninguna fila de datos bajo el encabezado.' },
      { status: 400 },
    );
  }

  const resumen = filas.map((f) => ({
    linea: f.linea,
    nombre: f.nombre,
    valida: f.entrada !== null,
    problemas: f.problemas,
  }));

  if (revisar) {
    return NextResponse.json({ ok: true, revisadas: resumen });
  }

  let guardados = 0;
  for (const fila of filas) {
    if (!fila.entrada) continue;
    fila.entrada.profesional.slug = await slugDisponible(fila.entrada.profesional.slug);
    await guardarProfesional(fila.entrada);
    guardados += 1;
  }

  return NextResponse.json({ ok: true, guardados, revisadas: resumen });
}
