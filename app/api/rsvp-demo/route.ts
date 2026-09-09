import * as React from "react";
import { NextResponse } from "next/server";
import { enviarCorreo } from "@/lib/enviarCorreo";
import { PaseInvitado } from "@/emails/plantillas/PaseInvitado";
import { generarPasePdf, nombreArchivoPase } from "@/lib/invitaciones/pasePdf";
import { ipDe, permitirEnvio } from "@/lib/invitaciones/limite";
import { esPlan } from "@/lib/invitaciones/planes";
import {
  DRESS_CODE,
  FECHA_LARGA,
  NOVIOS,
  PASES_DEMO,
  SEDES,
} from "@/lib/invitaciones/demo";

/* nodemailer y pdf-lib necesitan Node, no el runtime edge. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_DEMO =
  "https://www.pgestrategias.com/invitacionesdebodas/demo/estandar";

/** Deja el texto en algo que se pueda imprimir en un PDF y leer en un correo. */
function limpiar(valor: unknown, maxLargo: number) {
  if (typeof valor !== "string") return "";
  return valor
    /* Fuera los caracteres de control: no se ven, pero rompen el PDF
       y permiten colar saltos de línea en el correo. */
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLargo);
}

/**
 * Manda la respuesta a n8n, que la escribe en la hoja de Google Sheets.
 *
 * Es opcional a propósito: si el webhook no está configurado o no responde,
 * el invitado igual recibe su pase. Perder un renglón de la bitácora del demo
 * no vale romperle la experiencia a un prospecto.
 */
async function registrarEnN8n(datos: Record<string, unknown>) {
  const webhook = process.env.N8N_RSVP_WEBHOOK_URL;
  if (!webhook) return;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    /* Silencio intencional: es bitácora, no parte del entregable. */
  }
}

export async function POST(req: Request) {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "No pudimos leer tu respuesta." },
      { status: 400 },
    );
  }

  const plan = typeof cuerpo.plan === "string" ? cuerpo.plan : "";
  if (!esPlan(plan)) {
    return NextResponse.json(
      { ok: false, error: "Plan no válido." },
      { status: 400 },
    );
  }

  const asiste = cuerpo.asiste === true;
  const nombre = limpiar(cuerpo.nombre, 70);
  const alergias = limpiar(cuerpo.alergias, 140);
  const recado = limpiar(cuerpo.recado, 240);
  const correo = limpiar(cuerpo.correo, 120).toLowerCase();

  if (nombre.length < 3) {
    return NextResponse.json(
      { ok: false, error: "Escribe tu nombre para saber quién confirma." },
      { status: 400 },
    );
  }

  /* Los pases vienen del cliente, así que se acotan aquí: nadie confirma
     cuarenta lugares en una boda de muestra. */
  const pasesCrudos = Number(cuerpo.pases);
  const pases = Number.isFinite(pasesCrudos)
    ? Math.min(Math.max(Math.trunc(pasesCrudos), 1), PASES_DEMO)
    : 1;

  /* Solo el Estándar manda correo, y solo a quien sí va. */
  const debeEnviarCorreo = plan === "estandar" && asiste;
  if (debeEnviarCorreo && !EMAIL_RE.test(correo)) {
    return NextResponse.json(
      { ok: false, error: "Revisa el correo: ahí es donde te llega el pase." },
      { status: 400 },
    );
  }

  await registrarEnN8n({
    plan,
    asiste,
    nombre,
    pases: asiste ? pases : 0,
    alergias,
    recado,
    correo: debeEnviarCorreo ? correo : "",
    fecha: new Date().toISOString(),
    origen: "demo-invitaciones",
  });

  if (!debeEnviarCorreo) {
    return NextResponse.json({ ok: true, correoEnviado: false });
  }

  if (!permitirEnvio(ipDe(req))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Ya mandamos varios pases desde aquí. Espera un momento o escríbenos por WhatsApp.",
      },
      { status: 429 },
    );
  }

  try {
    const pdf = await generarPasePdf({ nombre, pases });

    await enviarCorreo({
      para: correo,
      asunto: `Tu pase para la boda de ${NOVIOS.ella} y ${NOVIOS.el}`,
      nombreRemitente: `${NOVIOS.ella} y ${NOVIOS.el}`,
      componente: React.createElement(PaseInvitado, {
        nombre,
        pases,
        novios: `${NOVIOS.ella} & ${NOVIOS.el}`,
        fecha: FECHA_LARGA,
        sedes: SEDES.map((s) => ({
          etiqueta: s.etiqueta,
          nombre: s.nombre,
          hora: s.hora,
          direccion: s.direccion,
        })),
        dressCode: DRESS_CODE.titulo,
        hashtag: NOVIOS.hashtags[0],
        urlInvitacion: URL_DEMO,
      }),
      adjuntos: [
        {
          nombre: nombreArchivoPase(nombre),
          contenido: pdf,
          tipo: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true, correoEnviado: true });
  } catch (e) {
    console.error("[rsvp-demo] falló el envío del pase:", e);
    /* El invitado igual ve su pase en pantalla: la confirmación no se pierde
       porque el servidor de correo tenga un mal día. */
    return NextResponse.json({ ok: true, correoEnviado: false });
  }
}
