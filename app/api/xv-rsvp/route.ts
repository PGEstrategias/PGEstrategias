import { NextResponse } from "next/server";

/* Confirmaciones de las invitaciones de XV → Google Sheets.
   El servidor reenvía al Apps Script de la hoja de cada familia; la URL y la
   clave viven en variables de entorno (el repositorio es público). Cada
   invitación manda su `evento` para saber a qué hoja va. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOJAS: Record<string, { url: string; token: string }> = {
  sack: { url: process.env.XV_SACK_SHEET_URL ?? "", token: process.env.XV_SACK_SHEET_TOKEN ?? "" },
  fatima: { url: process.env.XV_FATIMA_SHEET_URL ?? "", token: process.env.XV_FATIMA_SHEET_TOKEN ?? "" },
};

/* Freno sencillo contra envíos automáticos: por IP y global, por hora. */
const VENTANA = 60 * 60 * 1000;
const porIp = new Map<string, { n: number; hasta: number }>();
let global = { n: 0, hasta: Date.now() + VENTANA };
function permitir(ip: string) {
  const ahora = Date.now();
  if (ahora > global.hasta) global = { n: 0, hasta: ahora + VENTANA };
  if (global.n >= 400) return false;
  const r = porIp.get(ip);
  if (!r || ahora > r.hasta) porIp.set(ip, { n: 1, hasta: ahora + VENTANA });
  else if (r.n >= 8) return false;
  else r.n += 1;
  global.n += 1;
  if (porIp.size > 2000) porIp.clear();
  return true;
}

const limpiar = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  /* Sin `evento` es la invitación de Sack (la primera, antes de que hubiera más). */
  const evento = typeof body.evento === "string" && Object.hasOwn(HOJAS, body.evento) ? body.evento : "sack";
  const { url: URL_HOJA, token: TOKEN } = HOJAS[evento];
  if (!URL_HOJA || !TOKEN) {
    return NextResponse.json({ ok: false, error: "sin-configurar" }, { status: 503 });
  }

  /* Campo trampa: los bots lo llenan, las personas no lo ven. */
  if (limpiar(body.sitio, 50)) return NextResponse.json({ ok: true });

  const nombre = limpiar(body.nombre, 120);
  const personas = Math.max(1, Math.min(20, Number(body.personas) || 1));
  const mensaje = limpiar(body.mensaje, 140);
  const acompanantes = (Array.isArray(body.acompanantes) ? body.acompanantes : [])
    .slice(0, 19)
    .map((n) => limpiar(n, 80))
    .filter((n) => n.length >= 2)
    .join(", ");
  if (nombre.length < 2) {
    return NextResponse.json({ ok: false, error: "nombre" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "desconocida";
  if (!permitir(ip)) {
    return NextResponse.json({ ok: false, error: "limite" }, { status: 429 });
  }

  try {
    const r = await fetch(URL_HOJA, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: TOKEN, nombre, personas, acompanantes, mensaje }),
      redirect: "follow",
      cache: "no-store",
    });
    const datos = (await r.json().catch(() => null)) as { ok?: boolean } | null;
    if (!r.ok || !datos?.ok) throw new Error("hoja");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "hoja" }, { status: 502 });
  }
}

/* Diagnóstico sin escribir en la hoja: /api/xv-rsvp?evento=fatima
   Dice si la invitación tiene sus variables y si el Apps Script contesta.
   Manda una clave equivocada a propósito: un script bien publicado responde
   {"ok":false,"error":"token"} sin tocar la hoja. No expone URL ni clave. */
export async function GET(req: Request) {
  const evento = new URL(req.url).searchParams.get("evento") ?? "";
  if (!Object.hasOwn(HOJAS, evento)) {
    return NextResponse.json({ evento, error: "evento desconocido", eventos: Object.keys(HOJAS) }, { status: 400 });
  }
  const { url, token } = HOJAS[evento];
  const diag: Record<string, unknown> = {
    evento,
    variable_url: url ? "cargada" : "FALTA",
    variable_token: token ? "cargada" : "FALTA",
    url_termina_en_exec: url ? /\/exec\/?$/.test(url) : null,
  };
  if (!url) return NextResponse.json(diag);
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: "diagnostico-clave-incorrecta" }),
      redirect: "follow",
      cache: "no-store",
    });
    const texto = await r.text();
    diag.script_http = r.status;
    let json: { ok?: boolean; error?: string } | null = null;
    try {
      json = JSON.parse(texto);
    } catch {}
    if (json?.error === "token") diag.script = "responde bien (rechazó la clave de prueba, como debe)";
    else if (json) diag.script = `respondió algo inesperado: ${JSON.stringify(json).slice(0, 120)}`;
    else if (/accounts\.google\.com|ServiceLogin|signin/i.test(texto))
      diag.script = "pide iniciar sesión: la implementación no está como 'Cualquier usuario'";
    else diag.script = `no respondió JSON (¿script sin publicar o con error?): ${texto.replace(/\s+/g, " ").slice(0, 160)}`;
  } catch (e) {
    diag.script = `no se pudo contactar: ${(e as Error).message}`;
  }
  return NextResponse.json(diag);
}
