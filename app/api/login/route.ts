import { NextResponse } from 'next/server';
import { AUTH_COOKIE, credencialesValidas, sessionToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Valida usuario/contraseña y, si son correctos, crea la cookie de sesión. */
export async function POST(req: Request) {
  if (!process.env.PANEL_USER || !process.env.PANEL_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: 'El panel no está configurado (faltan PANEL_USER/PANEL_PASSWORD).' },
      { status: 500 },
    );
  }

  let user = '';
  let pass = '';
  try {
    ({ user, pass } = await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'Petición inválida.' }, { status: 400 });
  }

  if (!credencialesValidas(user, pass)) {
    return NextResponse.json(
      { ok: false, error: 'Usuario o contraseña incorrectos.' },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
  return res;
}
