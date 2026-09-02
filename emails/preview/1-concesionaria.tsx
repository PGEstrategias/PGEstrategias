import * as React from 'react';
import { PropuestaProspecto } from '../plantillas/PropuestaProspecto';

/**
 * Ejemplo GIRO: Concesionaria automotriz (Land Rover Puebla).
 * Este archivo solo sirve para previsualizar con `npm run email:dev`.
 */
export default function PreviewConcesionaria() {
  return (
    <PropuestaProspecto
      badge="Propuesta · Video demo sin costo"
      titulo="Un video cinematográfico para Land Rover Puebla"
      subtitulo="Nuestra producción. Tu showroom."
      saludo="Estimado Roberto,"
      parrafos={[
        'Espero que te encuentres muy bien. Te escribo tras conocer el trabajo de la agencia y la línea que están por lanzar.',
        'Este mes en pg estrategias seleccionamos 2 agencias automotrices premium en Puebla para producirles un Video Demo Comercial de alto nivel, 100% libre de costo.',
        'Conociendo la sofisticación visual que Land Rover exige, queremos demostrarte el alcance de nuestra producción con una pieza adaptada a tu showroom o nuevos lanzamientos.',
      ]}
      ctaTexto="Quiero mi video demo gratis"
      ctaEnlace="https://wa.me/5212221234567"
      heroImagen="https://res.cloudinary.com/djduba5fd/video/upload/so_2,w_1040,c_fill,h_600/v1787082349/LandRover_LegacyDrop2_lwq2q2.jpg"
      heroAlt="Muestra de video Land Rover — pg estrategias"
      seccionTitulo="Qué incluye la demo"
      features={[
        {
          title: 'Levantamiento en agencia',
          descripcion: 'Grabación en tu showroom con equipo de alta gama.',
        },
        {
          title: 'Edición y color cinematográfico',
          descripcion:
            'Corrección de color y formato optimizado para Reels, TikTok y Social Ads.',
        },
        {
          title: 'Pieza final lista para publicar',
          descripcion: 'Sin compromiso de contratación.',
        },
      ]}
      ejemplosTitulo="Ejemplos de nuestro trabajo"
      ejemplos={[
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
      ]}
      cierre="Si te interesa, respóndeme este correo o escríbeme por WhatsApp y agendamos la grabación esta misma semana."
      preheader="Este mes elegimos solo 2 concesionarias en Puebla para un video demo sin costo."
      footerNota="Recibiste este correo porque identificamos una oportunidad de colaboración para Land Rover Puebla."
    />
  );
}
