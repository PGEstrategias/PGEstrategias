import {
  PDFDocument,
  StandardFonts,
  rgb,
  degrees,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import {
  DRESS_CODE,
  FECHA_LARGA,
  NOVIOS,
  SEDES,
} from "@/lib/invitaciones/demo";

/* Proporción 2:3, la de una tarjeta de papelería. Se ve bien en el visor del
   celular y se imprime sin recortes si alguien decide llevarlo en papel. */
const ANCHO = 360;
const ALTO = 560;

const TINTA = rgb(0.078, 0.071, 0.059); // #14120F
const MARFIL = rgb(0.969, 0.953, 0.933); // #F7F3EE
const ORO = rgb(0.769, 0.627, 0.322); // #C4A052
const ROSA = rgb(0.659, 0.369, 0.337); // #A85E56
const GRIS = rgb(0.29, 0.267, 0.239); // #4A443D

/* pdf-lib no tiene interletraje, así que las versalitas se espacian a mano.
   Es el mismo recurso de la papelería impresa: separar para dar aire. */
function espaciar(texto: string) {
  return texto.toUpperCase().split("").join(" ");
}

function centrar(
  pagina: PDFPage,
  texto: string,
  opciones: { y: number; font: PDFFont; size: number; color: ReturnType<typeof rgb> },
) {
  const { y, font, size, color } = opciones;
  const ancho = font.widthOfTextAtSize(texto, size);
  pagina.drawText(texto, { x: (ANCHO - ancho) / 2, y, size, font, color });
  return ancho;
}

/**
 * Corta el texto en varias líneas para que quepa en el ancho dado. El nombre
 * de un invitado puede ser "María Fernanda de la Torre Ruiz" y no cabe en una
 * sola línea a 22 puntos.
 */
function enLineas(texto: string, font: PDFFont, size: number, maxAncho: number) {
  const palabras = texto.split(/\s+/).filter(Boolean);
  const lineas: string[] = [];
  let actual = "";

  for (const palabra of palabras) {
    const tentativa = actual ? `${actual} ${palabra}` : palabra;
    if (font.widthOfTextAtSize(tentativa, size) <= maxAncho || !actual) {
      actual = tentativa;
    } else {
      lineas.push(actual);
      actual = palabra;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

/**
 * Elige el cuerpo más grande con el que el texto todavía cabe en una línea.
 * Un nombre largo se achica en vez de partirse: el pase se lee mejor y, sobre
 * todo, el bloque inferior no se recorre y choca con el pie.
 */
function ajustar(
  texto: string,
  font: PDFFont,
  tamanos: number[],
  maxAncho: number,
) {
  for (const size of tamanos) {
    if (font.widthOfTextAtSize(texto, size) <= maxAncho) return size;
  }
  return tamanos[tamanos.length - 1];
}

function filete(pagina: PDFPage, y: number, ancho = 200) {
  pagina.drawLine({
    start: { x: (ANCHO - ancho) / 2, y },
    end: { x: (ANCHO + ancho) / 2, y },
    thickness: 0.6,
    color: ORO,
    opacity: 0.45,
  });
}

export type DatosPase = {
  nombre: string;
  pases: number;
};

/** Arma el pase personalizado del invitado. Devuelve los bytes del PDF. */
export async function generarPasePdf({ nombre, pases }: DatosPase) {
  const pdf = await PDFDocument.create();

  pdf.setTitle(`Pase de ${nombre} — Boda de ${NOVIOS.ella} y ${NOVIOS.el}`);
  pdf.setAuthor(`${NOVIOS.ellaCompleto} y ${NOVIOS.elCompleto}`);
  pdf.setSubject("Pase de entrada");
  pdf.setProducer("PG Estrategias");

  const serif = await pdf.embedFont(StandardFonts.TimesRoman);
  const serifItalica = await pdf.embedFont(StandardFonts.TimesRomanItalic);
  const palo = await pdf.embedFont(StandardFonts.Helvetica);

  const pagina = pdf.addPage([ANCHO, ALTO]);

  pagina.drawRectangle({
    x: 0,
    y: 0,
    width: ANCHO,
    height: ALTO,
    color: MARFIL,
  });

  /* Marco de doble filete, el mismo guiño de papelería que usa la web. */
  pagina.drawRectangle({
    x: 22,
    y: 22,
    width: ANCHO - 44,
    height: ALTO - 44,
    borderColor: ORO,
    borderWidth: 0.8,
    borderOpacity: 0.55,
  });
  pagina.drawRectangle({
    x: 28,
    y: 28,
    width: ANCHO - 56,
    height: ALTO - 56,
    borderColor: ORO,
    borderWidth: 0.5,
    borderOpacity: 0.25,
  });

  let y = ALTO - 66;

  centrar(pagina, espaciar("Pase de entrada"), {
    y,
    font: palo,
    size: 6.5,
    color: ROSA,
  });

  y -= 42;
  centrar(pagina, NOVIOS.ella, { y, font: serif, size: 30, color: TINTA });

  y -= 26;
  centrar(pagina, "&", { y, font: serifItalica, size: 17, color: ORO });

  y -= 30;
  centrar(pagina, NOVIOS.el, { y, font: serif, size: 30, color: TINTA });

  /* Rombo entre filetes: el ornamento de la invitación, en vector. */
  y -= 26;
  filete(pagina, y, 190);
  pagina.drawRectangle({
    x: ANCHO / 2 - 3,
    y: y - 3,
    width: 5,
    height: 5,
    rotate: degrees(45),
    color: ORO,
  });

  y -= 32;
  centrar(pagina, espaciar("A nombre de"), {
    y,
    font: palo,
    size: 6.5,
    color: GRIS,
  });

  y -= 24;
  const cuerpoNombre = ajustar(nombre, serif, [21, 18, 15], ANCHO - 100);
  for (const linea of enLineas(nombre, serif, cuerpoNombre, ANCHO - 100)) {
    centrar(pagina, linea, { y, font: serif, size: cuerpoNombre, color: TINTA });
    y -= cuerpoNombre + 4;
  }

  y -= 4;
  centrar(pagina, `${pases} ${pases === 1 ? "pase" : "pases"}`, {
    y,
    font: serifItalica,
    size: 15,
    color: ORO,
  });

  y -= 22;
  filete(pagina, y, 190);

  y -= 26;
  centrar(pagina, FECHA_LARGA, { y, font: serif, size: 11.5, color: TINTA });

  const [ceremonia, recepcion] = SEDES;
  for (const sede of [ceremonia, recepcion]) {
    y -= 26;
    centrar(pagina, espaciar(`${sede.hora} · ${sede.etiqueta}`), {
      y,
      font: palo,
      size: 6,
      color: ROSA,
    });

    y -= 14;
    for (const linea of enLineas(sede.nombre, serif, 11, ANCHO - 90)) {
      centrar(pagina, linea, { y, font: serif, size: 11, color: TINTA });
      y -= 13;
    }

    y -= 1;
    for (const linea of enLineas(sede.direccion, palo, 7.5, ANCHO - 90)) {
      centrar(pagina, linea, { y, font: palo, size: 7.5, color: GRIS });
      y -= 10;
    }
  }

  /* El pie va anclado a la base y no al flujo: así queda a la misma altura
     sin importar cuántas líneas ocupó el nombre del invitado. */
  filete(pagina, 84, 190);

  centrar(pagina, espaciar(DRESS_CODE.titulo.replace(" · ", " - ")), {
    y: 64,
    font: palo,
    size: 6,
    color: GRIS,
  });

  centrar(pagina, NOVIOS.hashtags[0], {
    y: 44,
    font: serifItalica,
    size: 9.5,
    color: ORO,
  });

  return pdf.save();
}

export function nombreArchivoPase(nombre: string) {
  const limpio = nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `pase-${limpio || "invitado"}.pdf`;
}
