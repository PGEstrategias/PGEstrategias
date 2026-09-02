import 'dotenv/config';
import * as React from 'react';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';

/**
 * Transporte SMTP para Google Workspace.
 *
 * Requiere en .env.local:
 *   GMAIL_USER=contacto@pgestrategias.com
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (App Password de 16 caracteres)
 *
 * El App Password se genera en https://myaccount.google.com/apppasswords
 * (necesitas verificación en 2 pasos activada en la cuenta).
 */
function crearTransporte() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      'Faltan GMAIL_USER y/o GMAIL_APP_PASSWORD en tu .env.local. ' +
        'Copia .env.local.example y llénalos.',
    );
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export interface EnviarOpciones {
  /** Destinatario. Ej: "roberto@landroverpuebla.com" */
  para: string;
  /** Asunto del correo. */
  asunto: string;
  /** El componente de email de React Email (JSX). */
  componente: React.ReactElement;
  /** Nombre visible del remitente. Default: "pg estrategias". */
  nombreRemitente?: string;
  /** Responder-a (útil si envías desde un alias). */
  responderA?: string;
  /** Copia oculta (ej. tu propio correo para llevar registro). */
  cco?: string;
}

/** Renderiza la plantilla React Email a HTML y la envía por Gmail. */
export async function enviarCorreo(opts: EnviarOpciones) {
  const transporte = crearTransporte();
  const { para, asunto, componente, responderA, cco } = opts;
  const nombreRemitente = opts.nombreRemitente ?? 'pg estrategias';
  const from = `"${nombreRemitente}" <${process.env.GMAIL_USER}>`;

  // render() es asíncrono en @react-email/components v0.0.22+
  const html = await render(componente);
  const text = await render(componente, { plainText: true });

  const info = await transporte.sendMail({
    from,
    to: para,
    subject: asunto,
    html,
    text,
    replyTo: responderA,
    bcc: cco,
  });

  return info;
}
