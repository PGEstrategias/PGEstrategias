import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE, sessionToken } from '@/lib/auth';

/**
 * Protege el panel de envío y sus endpoints con una cookie de sesión.
 * Si no hay sesión válida:
 *   - páginas  -> redirige a /login
 *   - endpoints -> responde 401 JSON
 *
 * Requiere PANEL_USER y PANEL_PASSWORD en las variables de entorno.
 */
export const config = {
  matcher: ['/enviar', '/enviar/:path*', '/api/enviar', '/api/preview'],
};

export async function middleware(req: NextRequest) {
  if (!process.env.PANEL_USER || !process.env.PANEL_PASSWORD) {
    return new NextResponse(
      'Panel no configurado: faltan PANEL_USER y PANEL_PASSWORD.',
      { status: 500 },
    );
  }

  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  const valido = cookie && cookie === (await sessionToken());

  if (valido) return NextResponse.next();

  // Endpoints: 401 en JSON (el panel lo muestra como error).
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json(
      { ok: false, error: 'Sesión expirada. Vuelve a iniciar sesión en /login.' },
      { status: 401 },
    );
  }

  // Páginas: redirige a /login guardando a dónde quería ir.
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', req.nextUrl.pathname);
  return NextResponse.redirect(url);
}
