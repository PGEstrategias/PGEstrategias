import { NextResponse } from "next/server";

/* Confirmaciones de la invitación de XV de Sack → Google Sheets.
   El servidor reenvía al Apps Script de la hoja; la URL y la clave viven en
   variables de entorno (el repositorio es público). */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const URL_HOJA = process.env.XV_SACK_SHEET_URL ?? "";
const TOKEN = process.env.XV_SACK_SHEET_TOKEN ?? "";

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
  if (!URL_HOJA || !TOKEN) {
    return NextResponse.json({ ok: false, error: "sin-configurar" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  /* Campo trampa: los bots lo llenan, las personas no lo ven. */
  if (limpiar(body.sitio, 50)) return NextResponse.json({ ok: true });

  const nombre = limpiar(body.nombre, 120);
  const personas = Math.max(1, Math.min(20, Number(body.personas) || 1));
  const mensaje = limpiar(body.mensaje, 140);
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
      body: JSON.stringify({ token: TOKEN, nombre, personas, mensaje }),
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
