import { cookies } from 'next/headers';
import { AUTH_COOKIE, sessionToken } from '@/lib/auth';

/**
 * Segunda cerradura del panel.
 *
 * El middleware ya bloquea /listamedicamx/admin y /api/listamedica/admin, pero
 * las rutas que escriben en la base lo comprueban otra vez: si algún día se
 * mueve el matcher, no queremos que un endpoint de escritura quede abierto.
 */
export async function sesionValida(): Promise<boolean> {
  if (!process.env.PANEL_USER || !process.env.PANEL_PASSWORD) return false;
  const cookie = cookies().get(AUTH_COOKIE)?.value;
  if (!cookie) return false;
  return cookie === (await sessionToken());
}

/** Quién firmó la verificación. Se guarda en la tabla verificaciones. */
export function usuarioPanel(): string {
  return process.env.PANEL_USER ?? 'panel';
}
