import * as React from 'react';
import { render } from '@react-email/components';
import {
  PropuestaProspecto,
  type PropuestaProspectoProps,
} from '@/emails/plantillas/PropuestaProspecto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Renderiza la plantilla a HTML para la vista previa dentro del panel.
 * Protegido por el middleware (Basic Auth). Body JSON: { props }.
 */
export async function POST(req: Request) {
  let props: PropuestaProspectoProps;
  try {
    ({ props } = await req.json());
  } catch {
    return new Response('JSON inválido', { status: 400 });
  }

  if (!props?.titulo) {
    return new Response('Faltan datos para la vista previa.', { status: 400 });
  }

  const html = await render(React.createElement(PropuestaProspecto, props));
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
