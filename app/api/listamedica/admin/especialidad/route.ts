import { NextRequest, NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';
import { agregarEspecialidad } from '@/lib/listamedica/datos';

export const dynamic = 'force-dynamic';

/** Agrega una especialidad al catálogo desde el formulario de alta. */
export async function POST(peticion: NextRequest) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  const { nombre, plural } = (await peticion.json().catch(() => ({}))) as {
    nombre?: string;
    plural?: string;
  };

  if (!nombre?.trim()) {
    return NextResponse.json({ ok: false, error: 'Falta el nombre.' }, { status: 400 });
  }

  const especialidad = await agregarEspecialidad(nombre, plural ?? nombre);
  return NextResponse.json({ ok: true, especialidad });
}
