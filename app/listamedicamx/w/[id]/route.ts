import { NextRequest, NextResponse } from 'next/server';
import { obtenerPorId, registrarClic } from '@/lib/listamedica/datos';
import { eventoConversiones } from '@/lib/listamedica/meta';
import { rutas, urlAbsoluta } from '@/lib/listamedica/rutas';
import { nombreSinTitulo, telefonoParaWhatsApp } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

/**
 * Puente de contacto: registra el clic y manda a WhatsApp.
 *
 * El botón de cada perfil pasa por aquí en vez de ir directo a wa.me. Es lo
 * único que nos permite saber cuántos contactos generó la plataforma, y es
 * también donde se estampa el mensaje prellenado que le demuestra al
 * profesional, en su propio teléfono, de dónde vino el paciente.
 *
 * No se registra IP ni ningún identificador que apunte a una persona.
 */
export async function GET(peticion: NextRequest, { params }: { params: { id: string } }) {
  const profesional = await obtenerPorId(params.id);

  if (!profesional || profesional.estatus === 'borrador' || profesional.estatus === 'pausado') {
    return NextResponse.redirect(new URL(rutas.home(), peticion.url), 302);
  }

  const numero = telefonoParaWhatsApp(profesional.whatsapp || profesional.telefono);
  if (!numero) {
    return NextResponse.redirect(new URL(rutas.perfil(profesional.slug), peticion.url), 302);
  }

  const userAgent = peticion.headers.get('user-agent') ?? '';
  const esMovil = /android|iphone|ipad|ipod|mobile|windows phone/i.test(userAgent);
  const consulta = peticion.nextUrl.searchParams;

  await registrarClic({
    profesional_id: profesional.id,
    tipo: 'whatsapp',
    utm_source: consulta.get('utm_source') ?? '',
    utm_campaign: consulta.get('utm_campaign') ?? '',
    referrer: peticion.headers.get('referer') ?? '',
    dispositivo: esMovil ? 'movil' : 'escritorio',
  });

  void eventoConversiones({
    nombre: 'clic_whatsapp',
    urlOrigen: urlAbsoluta(`/dr/${profesional.slug}`),
    userAgent,
    parametros: { profesional_id: profesional.id, slug: profesional.slug },
  });

  const mensaje = `Hola, doctor(a) ${nombreSinTitulo(profesional)}. Lo encontré en Lista Médica y quisiera información sobre una consulta.`;
  const destino = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return NextResponse.redirect(destino, 302);
}
