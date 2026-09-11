import { NextRequest, NextResponse } from 'next/server';
import { obtenerPorId, registrarClic } from '@/lib/listamedica/datos';

export const dynamic = 'force-dynamic';

const TIPOS = new Set(['telefono', 'mapa', 'vista_perfil']);

/**
 * Registra vistas de perfil y clics a teléfono o mapa.
 *
 * El de WhatsApp no pasa por aquí: ese va por /w/[id], que además redirige.
 * Aquí nunca se guarda IP ni nada que identifique al visitante.
 */
export async function POST(peticion: NextRequest) {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await peticion.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const profesional_id = typeof cuerpo.profesional_id === 'string' ? cuerpo.profesional_id : '';
  const tipo = typeof cuerpo.tipo === 'string' ? cuerpo.tipo : '';
  if (!profesional_id || !TIPOS.has(tipo)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const profesional = await obtenerPorId(profesional_id);
  if (!profesional) return NextResponse.json({ ok: false }, { status: 404 });

  const userAgent = peticion.headers.get('user-agent') ?? '';

  await registrarClic({
    profesional_id,
    tipo: tipo as 'telefono' | 'mapa' | 'vista_perfil',
    utm_source: typeof cuerpo.utm_source === 'string' ? cuerpo.utm_source.slice(0, 120) : '',
    utm_campaign: typeof cuerpo.utm_campaign === 'string' ? cuerpo.utm_campaign.slice(0, 120) : '',
    referrer: typeof cuerpo.referrer === 'string' ? cuerpo.referrer.slice(0, 300) : '',
    dispositivo: /android|iphone|ipad|ipod|mobile|windows phone/i.test(userAgent)
      ? 'movil'
      : 'escritorio',
  });

  return NextResponse.json({ ok: true });
}
