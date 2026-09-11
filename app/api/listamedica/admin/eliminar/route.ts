import { NextRequest, NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';
import { eliminarProfesional } from '@/lib/listamedica/datos';

export const dynamic = 'force-dynamic';

export async function POST(peticion: NextRequest) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  const { id } = (await peticion.json().catch(() => ({}))) as { id?: string };
  if (!id) return NextResponse.json({ ok: false, error: 'Falta el id.' }, { status: 400 });

  await eliminarProfesional(id);
  return NextResponse.json({ ok: true });
}
