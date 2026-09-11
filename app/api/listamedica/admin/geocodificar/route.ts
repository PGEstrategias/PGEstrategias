import { NextRequest, NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';

export const dynamic = 'force-dynamic';

interface Sugerencia {
  etiqueta: string;
  lat: number;
  lng: number;
  colonia: string;
  cp: string;
}

/**
 * Autocompletado de dirección para el panel.
 *
 * Usa Google Geocoding si hay GOOGLE_MAPS_API_KEY, y si no, Nominatim de
 * OpenStreetMap, que no pide llave. Así el formulario sirve desde el primer
 * día y mejora solo cuando se contrata la llave.
 */
export async function GET(peticion: NextRequest) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  const consulta = peticion.nextUrl.searchParams.get('q')?.trim();
  if (!consulta || consulta.length < 5) {
    return NextResponse.json({ ok: true, sugerencias: [] });
  }

  const llave = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const sugerencias = llave
      ? await conGoogle(consulta, llave)
      : await conOpenStreetMap(consulta);
    return NextResponse.json({ ok: true, sugerencias, fuente: llave ? 'google' : 'osm' });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No se pudo consultar el servicio de mapas.' },
      { status: 502 },
    );
  }
}

async function conGoogle(consulta: string, llave: string): Promise<Sugerencia[]> {
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', `${consulta}, Puebla, México`);
  url.searchParams.set('region', 'mx');
  url.searchParams.set('language', 'es');
  url.searchParams.set('key', llave);

  const respuesta = await fetch(url, { cache: 'no-store' });
  const datos = (await respuesta.json()) as {
    results?: {
      formatted_address: string;
      geometry: { location: { lat: number; lng: number } };
      address_components: { long_name: string; types: string[] }[];
    }[];
  };

  return (datos.results ?? []).slice(0, 6).map((r) => ({
    etiqueta: r.formatted_address,
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
    colonia:
      r.address_components.find((c) => c.types.includes('sublocality'))?.long_name ??
      r.address_components.find((c) => c.types.includes('neighborhood'))?.long_name ??
      '',
    cp: r.address_components.find((c) => c.types.includes('postal_code'))?.long_name ?? '',
  }));
}

async function conOpenStreetMap(consulta: string): Promise<Sugerencia[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', `${consulta}, Puebla, México`);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('limit', '6');
  url.searchParams.set('countrycodes', 'mx');

  const respuesta = await fetch(url, {
    cache: 'no-store',
    headers: {
      'User-Agent': 'ListaMedica/1.0 (contacto@pgestrategias.com)',
      'Accept-Language': 'es',
    },
  });

  const datos = (await respuesta.json()) as {
    display_name: string;
    lat: string;
    lon: string;
    address?: { neighbourhood?: string; suburb?: string; postcode?: string };
  }[];

  return datos.map((r) => ({
    etiqueta: r.display_name,
    lat: Number(r.lat),
    lng: Number(r.lon),
    colonia: r.address?.neighbourhood ?? r.address?.suburb ?? '',
    cp: r.address?.postcode ?? '',
  }));
}
