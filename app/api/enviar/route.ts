import * as React from 'react';
import { NextResponse } from 'next/server';
import { enviarCorreo } from '@/lib/enviarCorreo';
import {
  PropuestaProspecto,
  type PropuestaProspectoProps,
} from '@/emails/plantillas/PropuestaProspecto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Endpoint REAL de envío. Protegido por el middleware (Basic Auth),
 * así que solo el panel autenticado puede llamarlo.
 *
 * Body JSON: { para, asunto, props, cco? }
 */
export async function POST(req: Request) {
  let body: {
    para?: string;
    asunto?: string;
    props?: PropuestaProspectoProps;
    cco?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'El cuerpo no es JSON válido.' },
      { status: 400 },
    );
  }

  const { para, asunto, props, cco } = body;

  // Validación de campos obligatorios.
  const faltantes: string[] = [];
  if (!para) faltantes.push('para');
  if (!asunto) faltantes.push('asunto');
  if (!props?.titulo) faltantes.push('titulo');
  if (!props?.parrafos?.length) faltantes.push('parrafos');
  if (!props?.ctaTexto) faltantes.push('ctaTexto');
  if (!props?.ctaEnlace) faltantes.push('ctaEnlace');
  if (faltantes.length) {
    return NextResponse.json(
      { ok: false, error: `Faltan campos: ${faltantes.join(', ')}.` },
      { status: 400 },
    );
  }

  // Validación básica del correo destino.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(para!)) {
    return NextResponse.json(
      { ok: false, error: 'El correo destino no es válido.' },
      { status: 400 },
    );
  }

  try {
    const info = await enviarCorreo({
      para: para!,
      asunto: asunto!,
      componente: React.createElement(PropuestaProspecto, props!),
      responderA: process.env.GMAIL_USER,
      cco: cco || undefined,
    });
    return NextResponse.json({
      ok: true,
      mensaje: `Correo enviado a ${para}.`,
      messageId: info.messageId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
