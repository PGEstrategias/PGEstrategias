import fs from 'node:fs/promises';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';
import { directorioDatos } from '@/lib/listamedica/almacen';

export const dynamic = 'force-dynamic';

/** Sirve la captura de la verificación. Solo con sesión del panel. */
export async function GET(_peticion: NextRequest, { params }: { params: { id: string } }) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }
  if (!/^[a-z0-9-]+$/i.test(params.id)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const binario = await fs.readFile(
      path.join(directorioDatos(), 'evidencias', `${params.id}.jpg`),
    );
    return new NextResponse(new Uint8Array(binario), {
      headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'private, no-store' },
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Sin evidencia.' }, { status: 404 });
  }
}
