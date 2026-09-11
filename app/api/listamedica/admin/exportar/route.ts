import { NextRequest, NextResponse } from 'next/server';
import { sesionValida } from '@/lib/listamedica/admin';
import { leerTabla } from '@/lib/listamedica/almacen';
import { precioDesde, todosCompletos } from '@/lib/listamedica/datos';
import { aCSV } from '@/lib/listamedica/csv';
import { resumen } from '@/lib/listamedica/metricas';
import { nombreCompleto } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

/**
 * Exportación a CSV de todo lo que el panel muestra.
 *
 * ?tabla=profesionales | clics | busquedas | desempeno | incompletos
 */
export async function GET(peticion: NextRequest) {
  if (!(await sesionValida())) {
    return NextResponse.json({ ok: false, error: 'Sesión expirada.' }, { status: 401 });
  }

  const tabla = peticion.nextUrl.searchParams.get('tabla') ?? 'profesionales';
  let filas: (string | number | null)[][] = [];

  if (tabla === 'profesionales') {
    const perfiles = await todosCompletos();
    filas = [
      [
        'id',
        'nombre',
        'especialidades',
        'ciudad',
        'colonia',
        'whatsapp',
        'estatus',
        'completitud_pct',
        'verificado_en',
        'precio_desde',
        'google_rating',
        'google_reviews_count',
        'fecha_alta',
      ],
      ...perfiles.map((p) => [
        p.id,
        nombreCompleto(p),
        p.especialidades.map((e) => e.nombre).join(' | '),
        p.consultorios[0]?.ciudad ?? '',
        p.consultorios[0]?.colonia ?? '',
        p.whatsapp,
        p.estatus,
        p.completitud_pct,
        p.verificado_en ?? '',
        precioDesde(p),
        p.google_rating,
        p.google_reviews_count,
        p.fecha_alta,
      ]),
    ];
  } else if (tabla === 'clics') {
    const clics = await leerTabla('clics');
    filas = [
      ['id', 'profesional_id', 'tipo', 'timestamp', 'utm_source', 'utm_campaign', 'referrer', 'dispositivo'],
      ...clics.map((c) => [
        c.id,
        c.profesional_id,
        c.tipo,
        c.timestamp,
        c.utm_source,
        c.utm_campaign,
        c.referrer,
        c.dispositivo,
      ]),
    ];
  } else if (tabla === 'busquedas') {
    const busquedas = await leerTabla('busquedas');
    filas = [
      ['id', 'termino', 'ciudad', 'resultados_count', 'timestamp'],
      ...busquedas.map((b) => [b.id, b.termino, b.ciudad, b.resultados_count, b.timestamp]),
    ];
  } else if (tabla === 'desempeno') {
    const datos = await resumen();
    filas = [
      ['profesional', 'estatus', 'vistas', 'clics_whatsapp', 'conversion_pct'],
      ...datos.porProfesional.map((x) => [
        nombreCompleto(x.perfil),
        x.perfil.estatus,
        x.vistas,
        x.whatsapp,
        x.conversion,
      ]),
    ];
  } else if (tabla === 'incompletos') {
    const datos = await resumen();
    filas = [
      ['profesional', 'whatsapp', 'completitud_pct', 'le_falta'],
      ...datos.incompletos.map((x) => [
        nombreCompleto(x.perfil),
        x.perfil.whatsapp,
        x.perfil.completitud_pct,
        x.pendientes.join(' | '),
      ]),
    ];
  } else {
    return NextResponse.json({ ok: false, error: 'Tabla desconocida.' }, { status: 400 });
  }

  return new NextResponse(aCSV(filas), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="lista-medica-${tabla}.csv"`,
    },
  });
}
