import * as React from 'react';
import { PropuestaProspecto } from '../plantillas/PropuestaProspecto';

/**
 * Ejemplo GIRO: Restaurante / hospitalidad.
 * Muestra cómo la misma plantilla sirve para otro giro solo cambiando props.
 */
export default function PreviewRestaurante() {
  return (
    <PropuestaProspecto
      badge="Propuesta · Contenido para redes"
      titulo="Llenemos tus mesas con contenido que provoca"
      subtitulo="Estrategia + producción para tu restaurante."
      saludo="Hola Chef Andrea,"
      parrafos={[
        'Seguimos de cerca lo que hacen en el restaurante y creemos que su propuesta merece verse tan bien como sabe.',
        'En PGE Estrategias diseñamos y producimos contenido audiovisual que convierte antojo en reservaciones: platillos, ambiente y experiencia, listos para Instagram y TikTok.',
      ]}
      ctaTexto="Agendar una llamada"
      ctaEnlace="https://wa.me/5212221234567"
      seccionTitulo="Lo que armamos para ti"
      features={[
        {
          title: 'Sesión gastronómica',
          descripcion: 'Fotografía y video de tus platillos estrella.',
        },
        {
          title: 'Reels de ambiente',
          descripcion: 'Piezas cortas que transmiten la experiencia de tu lugar.',
        },
        {
          title: 'Calendario de publicación',
          descripcion: 'Plan mensual para mantener tus redes activas y creciendo.',
        },
      ]}
      cierre="¿Te late que platiquemos 15 minutos esta semana? Respóndeme y coordinamos."
      preheader="Contenido audiovisual que convierte antojo en reservaciones."
      footerNota="Recibiste este correo porque identificamos una oportunidad de colaboración para tu restaurante."
    />
  );
}
