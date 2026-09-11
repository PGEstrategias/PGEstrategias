/**
 * API de Conversiones de Meta.
 *
 * Mandamos el evento `clic_whatsapp` desde el servidor para no depender de que
 * el navegador haya cargado el píxel. A propósito NO enviamos la dirección IP
 * ni ningún identificador del visitante: el sitio no los guarda, así que
 * tampoco los comparte. Solo viaja el user agent, que Meta admite como señal.
 *
 * Si faltan las variables de entorno, la función no hace nada y no falla.
 */
export async function eventoConversiones(datos: {
  nombre: string;
  urlOrigen: string;
  userAgent: string;
  parametros?: Record<string, string | number>;
}): Promise<void> {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return;

  const cuerpo = {
    data: [
      {
        event_name: datos.nombre,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: datos.urlOrigen,
        user_data: { client_user_agent: datos.userAgent },
        custom_data: datos.parametros ?? {},
      },
    ],
  };

  try {
    await fetch(`https://graph.facebook.com/v19.0/${pixel}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
      cache: 'no-store',
    });
  } catch {
    // Un fallo de medición nunca debe impedir que el visitante llegue a WhatsApp.
  }
}
