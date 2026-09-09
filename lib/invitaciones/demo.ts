/**
 * Datos de la boda ficticia que usan los demos de /invitacionesdebodas.
 *
 * Lucía y Mateo son la pareja de muestra de todo el vertical: el hero de la
 * landing, los dos demos y el ejemplo de dominio del paquete Bespoke hablan
 * de ellos. Si cambian los novios, se cambia aquí y el resto sigue.
 */

export const NOVIOS = {
  ella: "Lucía",
  el: "Mateo",
  ellaCompleto: "Lucía Morales",
  elCompleto: "Mateo Benítez",
  hashtags: ["#LuciaYMateo2026", "#DePueblaAlParaiso"],
  dominioEjemplo: "luciaymateo.com",
} as const;

/* Fecha de la ceremonia en hora del centro de México (UTC-6 en noviembre).
   Se guarda con offset explícito para que la cuenta regresiva marque lo
   mismo en el celular de un invitado en Puebla que en el de uno en Madrid. */
export const FECHA_ISO = "2026-11-14T16:30:00-06:00";
export const FECHA_LARGA = "Sábado 14 de noviembre de 2026";
export const FECHA_CORTA = "14 · 11 · 2026";

export type Sede = {
  id: string;
  etiqueta: string;
  nombre: string;
  hora: string;
  direccion: string;
  /* Coordenadas para los botones de Maps y Waze. */
  lat: number;
  lng: number;
};

export const SEDES: Sede[] = [
  {
    id: "ceremonia",
    etiqueta: "Ceremonia religiosa",
    nombre: "Templo Conventual de San Francisco",
    hora: "16:30 h",
    direccion:
      "Calle 14 Oriente 1009, Centro Histórico, 72000 Puebla, Pue.",
    lat: 19.045_9,
    lng: -98.190_6,
  },
  {
    id: "recepcion",
    etiqueta: "Recepción y fiesta",
    nombre: "Hacienda San José Actipan",
    hora: "18:30 h",
    direccion:
      "Km 2.1 Carretera Federal a Atlixco, 72810 San Andrés Cholula, Pue.",
    lat: 19.006_2,
    lng: -98.276_4,
  },
];

export const ITINERARIO = [
  { hora: "16:30", titulo: "Ceremonia religiosa", detalle: "Templo de San Francisco" },
  { hora: "18:00", titulo: "Traslado a la hacienda", detalle: "25 minutos en coche" },
  { hora: "18:30", titulo: "Cóctel de bienvenida", detalle: "Jardín principal" },
  { hora: "19:30", titulo: "Entrada de los novios y banquete", detalle: "Salón" },
  { hora: "21:00", titulo: "Primer baile y brindis", detalle: "" },
  { hora: "21:30", titulo: "Apertura de pista", detalle: "Que empiece la fiesta" },
  { hora: "02:00", titulo: "Tornaboda y despedida", detalle: "" },
];

/* Las fotos son generadas con IA para el demo. Van por Cloudinary con
   f_auto,q_auto para que la invitación cargue en menos de dos segundos
   en datos móviles, que es donde se abre. */
const CLOUD = "https://res.cloudinary.com/djduba5fd/image/upload";

export function foto(id: string, ancho: number) {
  return `${CLOUD}/f_auto,q_auto,w_${ancho},c_fill/${id}`;
}

export const FOTOS = {
  cafe: "v1788931097/Gemini_Generated_Image_836iw4836iw4836i_igukfm.jpg",
  barro: "v1788930945/Gemini_Generated_Image_pgutkdpgutkdpgut_os4p5j.jpg",
  esqui: "v1788930929/Gemini_Generated_Image_oqa55toqa55toqa5_mdh73r.jpg",
  paleta: "v1788931185/Gemini_Generated_Image_26kx2226kx2226kx_l4iytz.jpg",
} as const;

export const HISTORIA = [
  {
    anio: "2022",
    titulo: "Una silla de sobra",
    texto:
      "Llovía a cántaros en el Barrio del Artista y el café estaba a reventar. Mateo no encontró mesa, vio que a Lucía le sobraba una silla y se sentó. Los diez minutos que iban a esperar a que pasara el agua se volvieron cuatro horas.",
    imagen: FOTOS.cafe,
  },
  {
    anio: "2023",
    titulo: "Las manos en el barro",
    texto:
      "Descubrimos que se nos daba mejor ensuciarnos que quedarnos quietos. Talleres de barro, mercados de domingo y una colección creciente de tazas chuecas que seguimos usando todas las mañanas.",
    imagen: FOTOS.barro,
  },
  {
    anio: "2024",
    titulo: "La nieve y los raspones",
    texto:
      "Acampamos con frío, cruzamos carreteras largas y un día intentamos esquiar. Mateo pasó más tiempo en el suelo que de pie, y Lucía tiene el video para probarlo.",
    imagen: FOTOS.esqui,
  },
  {
    anio: "2026",
    titulo: "La pregunta",
    texto:
      "Volvimos al mismo café. Mateo salió con el pretexto de tomar una foto del recuerdo y terminó de rodillas a mitad de la calle. Lucía no lo dejó terminar de hablar.",
    imagen: null,
  },
] as const;

export const DRESS_CODE = {
  titulo: "Formal · Etiqueta rigurosa",
  descripcion:
    "Ellos de esmoquin o traje oscuro con corbata. Ellas, vestido largo. La hacienda es de piedra y pasto: tacón de bloque o plataforma te lo va a agradecer a las once de la noche.",
  paleta: [
    { nombre: "Terracota", hex: "#B5603F" },
    { nombre: "Verde olivo", hex: "#6B7248" },
    { nombre: "Marfil", hex: "#F0E7D8" },
    { nombre: "Oro viejo", hex: "#B08D45" },
  ],
  si: [
    "Vestido largo o esmoquin",
    "Los tonos de la paleta",
    "Un abrigo ligero: la hacienda enfría de noche",
  ],
  no: [
    "Blanco, marfil o beige claro (son de la novia)",
    "Tacón de aguja: hay pasto y empedrado",
    "Jeans o tenis, aunque sean de vestir",
  ],
} as const;

export const REGALOS = [
  {
    tienda: "Liverpool",
    detalle: "Evento No. 51234891",
    valor: "51234891",
    url: "https://mesaderegalos.liverpool.com.mx/",
  },
  {
    tienda: "Amazon",
    detalle: "Registro LuciaYMateo2026",
    valor: "LuciaYMateo2026",
    url: "https://www.amazon.com.mx/wedding/",
  },
  {
    tienda: "Fondo de luna de miel",
    detalle: "BBVA · CLABE 012650015489123456",
    valor: "012650015489123456",
    url: null,
  },
] as const;

/**
 * Música de fondo. Sube el fragmento (45-60 s, en loop) a Cloudinary y pega
 * aquí la URL del mp3. Mientras esté vacía, el control no se dibuja: vale más
 * no tener música que tener un botón que no suena.
 */
export const MUSICA = {
  url: "",
  titulo: "",
  artista: "",
};

/* Pases asignados al invitado de muestra. En el producto real sale de la
   lista de invitados; aquí es fijo para que el demo se explique solo. */
export const PASES_DEMO = 2;
