/**
 * Autenticación del panel de envío mediante cookie de sesión.
 *
 * El token de sesión es un hash de PANEL_USER + PANEL_PASSWORD, así que:
 *  - No guardamos la contraseña en la cookie.
 *  - Se puede verificar sin base de datos, tanto en el middleware (edge)
 *    como en las rutas (node), usando Web Crypto.
 *  - Si cambias usuario o contraseña, las sesiones viejas dejan de valer.
 */
export const AUTH_COOKIE = 'pge_panel';

export async function sessionToken(): Promise<string> {
  const user = process.env.PANEL_USER ?? '';
  const pass = process.env.PANEL_PASSWORD ?? '';
  const data = new TextEncoder().encode(`${user}:${pass}:pge-panel-v1`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Compara usuario y contraseña con las variables de entorno. */
export function credencialesValidas(user: string, pass: string): boolean {
  return (
    !!process.env.PANEL_USER &&
    !!process.env.PANEL_PASSWORD &&
    user === process.env.PANEL_USER &&
    pass === process.env.PANEL_PASSWORD
  );
}
