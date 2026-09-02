import { NextRequest, NextResponse } from 'next/server';

/**
 * Protege el panel de envío (/enviar) y sus endpoints con HTTP Basic Auth.
 * Solo quien tenga usuario y contraseña puede entrar o enviar correos.
 *
 * Requiere en las variables de entorno (Vercel + .env.local):
 *   PANEL_USER      = usuario para entrar al panel
 *   PANEL_PASSWORD  = contraseña para entrar al panel
 */
export const config = {
  matcher: ['/enviar', '/enviar/:path*', '/api/enviar', '/api/preview'],
};

export function middleware(req: NextRequest) {
  const user = process.env.PANEL_USER;
  const pass = process.env.PANEL_PASSWORD;

  if (!user || !pass) {
    return new NextResponse(
      'Panel no configurado: faltan PANEL_USER y PANEL_PASSWORD.',
      { status: 500 },
    );
  }

  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Basic ')) {
    const decoded = atob(auth.slice(6));
    const sep = decoded.indexOf(':');
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    if (u === user && p === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Autenticación requerida.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="PGE Panel de envío"' },
  });
}
