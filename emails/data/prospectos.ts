import type { PropuestaProspectoProps } from '../plantillas/PropuestaProspecto';

export interface Prospecto {
  /** Identificador para enviar desde la terminal. Ej: "landrover-puebla". */
  id: string;
  /** Correo del destinatario. */
  para: string;
  /** Asunto del email. */
  asunto: string;
  /** Contenido de la propuesta (todo lo que cambia por prospecto). */
  props: PropuestaProspectoProps;
}

/**
 * AQUÍ agregas cada prospecto. Copia un bloque, cambia los datos y listo.
 * Para enviar:  npm run email:enviar landrover-puebla
 */
export const prospectos: Prospecto[] = [
  {
    id: 'landrover-puebla',
    para: 'roberto.carpinteyro96@gmail.com',
    asunto: 'Land Rover Puebla · Propuesta de video demo sin costo',
    props: {
      badge: 'Propuesta · Video demo sin costo',
      titulo: 'Un video cinematográfico para Land Rover Puebla',
      subtitulo: 'Nuestra producción. Tu showroom.',
      saludo: 'Estimado Roberto,',
      parrafos: [
        'Espero que te encuentres muy bien. Te escribo tras conocer el trabajo de la agencia y la línea que están por lanzar.',
        'Este mes en PGE Estrategias seleccionamos 2 agencias automotrices premium en Puebla para producirles un Video Demo Comercial de alto nivel, 100% libre de costo.',
        'Conociendo la sofisticación visual que Land Rover exige, queremos demostrarte el alcance de nuestra producción con una pieza adaptada a tu showroom.',
      ],
      ctaTexto: 'Quiero mi video demo gratis',
      ctaEnlace: 'https://wa.me/5212221234567',
      heroImagen:
        'https://res.cloudinary.com/djduba5fd/video/upload/so_2,w_1040,c_fill,h_600/v1787082349/LandRover_LegacyDrop2_lwq2q2.jpg',
      heroAlt: 'Muestra de video Land Rover — PGE Estrategias',
      seccionTitulo: 'Qué incluye la demo',
      features: [
        {
          title: 'Levantamiento en agencia',
          descripcion: 'Grabación en tu showroom con equipo de alta gama.',
        },
        {
          title: 'Edición y color cinematográfico',
          descripcion:
            'Formato optimizado para Reels, TikTok y Social Ads.',
        },
        {
          title: 'Pieza final lista para publicar',
          descripcion: 'Sin compromiso de contratación.',
        },
      ],
      ejemplos: [
        {
          titulo: '🚗 Video Tesla',
          imagen:
            'https://res.cloudinary.com/djduba5fd/video/upload/so_2,w_520,c_fill,h_300/v1779377563/Tesla2_qgocjj.jpg',
          enlace:
            'https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.mp4',
        },
        {
          titulo: '🎬 Video Land Rover',
          imagen:
            'https://res.cloudinary.com/djduba5fd/video/upload/so_2,w_520,c_fill,h_300/v1787082349/LandRover_LegacyDrop2_lwq2q2.jpg',
          enlace:
            'https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4',
        },
      ],
      cierre:
        'Si te interesa, respóndeme este correo o escríbeme por WhatsApp y agendamos la grabación esta misma semana.',
      preheader:
        'Este mes elegimos solo 2 concesionarias en Puebla para un video demo sin costo.',
      footerNota:
        'Recibiste este correo porque identificamos una oportunidad de colaboración para Land Rover Puebla.',
    },
  },
];

export function buscarProspecto(id: string): Prospecto | undefined {
  return prospectos.find((p) => p.id === id);
}
