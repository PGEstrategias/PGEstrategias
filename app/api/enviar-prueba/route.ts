import * as React from 'react';
import { NextResponse } from 'next/server';
import { enviarCorreo } from '@/lib/enviarCorreo';
import { PropuestaProspecto } from '@/emails/plantillas/PropuestaProspecto';
import { prospectos, buscarProspecto } from '@/emails/data/prospectos';

// Nodemailer necesita el runtime de Node.js (no Edge).
export const runtime = 'nodejs';
// Evita que Vercel cachee la respuesta.
export const dynamic = 'force-dynamic';

/**
 * Endpoint de PRUEBA para enviar un correo desde el sitio en Vercel.
 *
 * Uso (en el navegador):
 *   https://TU-DOMINIO.com/api/enviar-prueba?token=SECRETO&para=tucorreo@gmail.com
 *
 * Opcional: &id=landrover-puebla  para usar el contenido de un prospecto.
 * Sin id, usa el primer prospecto de la lista como muestra.
 *
 * Requiere en Vercel (además de GMAIL_USER y GMAIL_APP_PASSWORD):
 *   EMAIL_API_TOKEN = una clave secreta que tú inventes
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const para = searchParams.get('para');
  const id = searchParams.get('id');

  // 1) Seguridad: el token debe coincidir con la variable de entorno.
  const esperado = process.env.EMAIL_API_TOKEN;
  if (!esperado) {
    return NextResponse.json(
      { ok: false, error: 'Falta EMAIL_API_TOKEN en las variables de entorno.' },
      { status: 500 },
    );
  }
  if (token !== esperado) {
    return NextResponse.json(
      { ok: false, error: 'Token inválido.' },
      { status: 401 },
    );
  }

  // 2) Destinatario de la prueba.
  if (!para) {
    return NextResponse.json(
      { ok: false, error: 'Falta el parámetro ?para=correo@destino.com' },
      { status: 400 },
    );
  }

  // 3) Contenido: un prospecto por id, o el primero como muestra.
  const prospecto = id ? buscarProspecto(id) : prospectos[0];
  if (!prospecto) {
    return NextResponse.json(
      { ok: false, error: `No encontré el prospecto "${id}".` },
      { status: 404 },
    );
  }

  // 4) Enviar.
  try {
    const info = await enviarCorreo({
      para,
      asunto: `[PRUEBA] ${prospecto.asunto}`,
      componente: React.createElement(PropuestaProspecto, prospecto.props),
      responderA: process.env.GMAIL_USER,
    });
    return NextResponse.json({
      ok: true,
      mensaje: `Correo de prueba enviado a ${para}.`,
      messageId: info.messageId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
