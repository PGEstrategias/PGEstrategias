import { FECHA_ISO, NOVIOS, SEDES } from "@/lib/invitaciones/demo";

/* Formato de fecha que pide el estándar iCalendar: 20261114T223000Z */
function aFormatoICS(fecha: Date) {
  return fecha.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Genera el archivo .ics de la boda. Se arma en el navegador y se descarga
 * como blob: no hace falta endpoint y funciona igual en iOS y Android.
 */
export function archivoICS() {
  const inicio = new Date(FECHA_ISO);
  /* La tornaboda es a las 2 a.m., o sea 9.5 horas después de la ceremonia. */
  const fin = new Date(inicio.getTime() + 9.5 * 60 * 60 * 1000);
  const [ceremonia, recepcion] = SEDES;

  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PG Estrategias//Invitaciones digitales//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:boda-${NOVIOS.ella}-${NOVIOS.el}-2026@pgestrategias.com`.toLowerCase(),
    `DTSTAMP:${aFormatoICS(new Date())}`,
    `DTSTART:${aFormatoICS(inicio)}`,
    `DTEND:${aFormatoICS(fin)}`,
    `SUMMARY:Boda de ${NOVIOS.ella} y ${NOVIOS.el}`,
    `LOCATION:${ceremonia.nombre}\\, ${ceremonia.direccion}`,
    `DESCRIPTION:Ceremonia ${ceremonia.hora} en ${ceremonia.nombre}.\\nRecepción ${recepcion.hora} en ${recepcion.nombre}.`,
    /* Aviso un día antes: es cuando el invitado decide a qué hora sale. */
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Mañana es la boda",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lineas.join("\r\n");
}

export function descargarICS() {
  const blob = new Blob([archivoICS()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `boda-${NOVIOS.ella}-y-${NOVIOS.el}.ics`.toLowerCase();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* Waze es lo que la gente realmente abre en México; Maps es el respaldo. */
export function urlMaps(lat: number, lng: number, nombre: string) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(
    nombre,
  )}`;
}

export function urlWaze(lat: number, lng: number) {
  return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
}
