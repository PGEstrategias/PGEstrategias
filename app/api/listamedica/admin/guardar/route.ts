import { NextRequest, NextResponse } from 'next/server';
import { sesionValida, usuarioPanel } from '@/lib/listamedica/admin';
import { escrituraEnMemoria } from '@/lib/listamedica/almacen';
import {
  guardarProfesional,
  obtenerPorId,
  registrarVerificacion,
  slugDisponible,
} from '@/lib/listamedica/datos';
import type { EntradaProfesional } from '@/lib/listamedica/datos';
import { conservarGoogle } from '@/lib/listamedica/formulario';

export const dynamic = 'force-dynamic';

/**
 * Alta y edición de profesional.
 *
 * La casilla de cédula verificada no es decorativa: sin evidencia cargada, el
 * servidor la rechaza aunque el formulario la haya dejado pasar.
 */
export async function POST(peticion: NextRequest) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  let entrada: EntradaProfesional;
  try {
    entrada = (await peticion.json()) as EntradaProfesional;
  } catch {
    return NextResponse.json({ ok: false, error: 'Datos ilegibles.' }, { status: 400 });
  }

  const p = entrada.profesional;

  if (!p?.nombre?.trim() || !p?.apellidos?.trim()) {
    return NextResponse.json({ ok: false, error: 'Falta el nombre o los apellidos.' }, { status: 400 });
  }

  if (p.verificado_en && !p.evidencia_verificacion_url) {
    return NextResponse.json(
      { ok: false, error: 'No se puede marcar la cédula como verificada sin la evidencia.' },
      { status: 400 },
    );
  }

  if (p.estatus === 'publicado' && !p.verificado_en) {
    return NextResponse.json(
      { ok: false, error: 'Un perfil no se publica sin la cédula verificada.' },
      { status: 400 },
    );
  }

  // El slug se pasa siempre por slugDisponible, no solo cuando viene vacío:
  // si el administrador escribe a mano uno que ya existe, dos perfiles
  // acabarían peleándose la misma URL y solo aparecería el primero.
  p.slug = await slugDisponible(p.slug?.trim() || `${p.nombre} ${p.apellidos}`, p.id);

  const previo = p.id ? await obtenerPorId(p.id) : null;

  // El formulario no captura la reputación de Google: la trae el
  // sincronizador. Al guardar se conserva lo que el perfil ya tenía.
  const guardado = await guardarProfesional(conservarGoogle(entrada, previo));

  // Deja rastro de la verificación la primera vez que se estampa la fecha.
  if (guardado.verificado_en && previo?.verificado_en !== guardado.verificado_en) {
    await registrarVerificacion({
      profesional_id: guardado.id,
      numero_consultado: guardado.cedula,
      resultado: 'encontrado',
      evidencia_url: guardado.evidencia_verificacion_url,
      verificado_por: usuarioPanel(),
    });
  }

  return NextResponse.json({
    ok: true,
    profesional: guardado,
    soloMemoria: escrituraEnMemoria(),
  });
}
