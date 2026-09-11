import fs from 'node:fs/promises';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';
import { directorioDatos } from '@/lib/listamedica/almacen';

export const dynamic = 'force-dynamic';

const LIMITE_BYTES = 4 * 1024 * 1024;

/**
 * Recibe imágenes ya recortadas y comprimidas por el navegador.
 *
 * La foto va a /public porque se sirve en el perfil público. La evidencia de
 * la verificación NO: es respaldo interno del proceso y se guarda junto a la
 * base, detrás de la sesión del panel.
 */
export async function POST(peticion: NextRequest) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  const { tipo, id, dataUrl } = (await peticion.json().catch(() => ({}))) as {
    tipo?: string;
    id?: string;
    dataUrl?: string;
  };

  if (!id || !/^[a-z0-9-]+$/i.test(id)) {
    return NextResponse.json({ ok: false, error: 'Identificador inválido.' }, { status: 400 });
  }
  if (tipo !== 'foto' && tipo !== 'evidencia') {
    return NextResponse.json({ ok: false, error: 'Tipo de archivo inválido.' }, { status: 400 });
  }
  if (!dataUrl?.startsWith('data:image/jpeg;base64,')) {
    return NextResponse.json(
      { ok: false, error: 'La imagen debe llegar como JPEG desde el formulario.' },
      { status: 400 },
    );
  }

  const binario = Buffer.from(dataUrl.slice('data:image/jpeg;base64,'.length), 'base64');
  if (binario.length > LIMITE_BYTES) {
    return NextResponse.json({ ok: false, error: 'La imagen pesa demasiado.' }, { status: 413 });
  }

  try {
    if (tipo === 'foto') {
      const destino = path.join(process.cwd(), 'public', 'listamedica', 'fotos');
      await fs.mkdir(destino, { recursive: true });
      await fs.writeFile(path.join(destino, `${id}.jpg`), binario);
      return NextResponse.json({ ok: true, url: `/listamedica/fotos/${id}.jpg?v=${Date.now()}` });
    }

    const destino = path.join(directorioDatos(), 'evidencias');
    await fs.mkdir(destino, { recursive: true });
    await fs.writeFile(path.join(destino, `${id}.jpg`), binario);
    return NextResponse.json({ ok: true, url: `/api/listamedica/admin/evidencia/${id}` });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          'No se pudo escribir el archivo. El sistema de archivos es de solo lectura; revisa LISTAMEDICA_DATA_DIR.',
      },
      { status: 500 },
    );
  }
}
