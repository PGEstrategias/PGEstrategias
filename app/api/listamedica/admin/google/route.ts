import { NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';
import { sincronizarGoogle } from '@/lib/listamedica/google';

export const dynamic = 'force-dynamic';

/** Refresca la calificación de Google de todos los perfiles con ficha. */
export async function POST() {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  const resultados = await sincronizarGoogle();
  const actualizados = resultados.filter((r) => r.estado === 'actualizado').length;
  const errores = resultados.filter((r) => r.estado === 'error');

  return NextResponse.json({ ok: true, actualizados, errores, total: resultados.length });
}
