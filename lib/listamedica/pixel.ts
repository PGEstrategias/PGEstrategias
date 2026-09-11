/** Dispara un evento personalizado del píxel de Meta si está cargado. */
export function eventoMeta(nombre: string, datos?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== 'function') return;
  try {
    fbq('trackCustom', nombre, datos ?? {});
  } catch {
    // Un bloqueador de anuncios no debe impedir que el usuario llegue a WhatsApp.
  }
}
