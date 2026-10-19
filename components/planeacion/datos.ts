/**
 * Contenido de los dos paquetes de wedding planner.
 *
 * Un solo lugar para el texto: las secciones solo lo acomodan. Si cambia un
 * precio o una inclusión, se cambia aquí y se refleja en toda la página.
 *
 * Nota de voz: el material de origen mezclaba primera persona del singular
 * ("mi manera de caminar contigo") con plural, y venía de una presentación de
 * XV años —quedaban menciones a "los XV que siempre imaginaron"—. Aquí todo
 * está normalizado a plural y a boda, que es lo que vende esta página.
 */

export interface Bloque {
  titulo: string;
  puntos: string[];
}

export interface Pilar {
  titulo: string;
  texto: string;
}

export const COORDINACION = {
  id: 'coordinacion',
  nombre: 'Coordinación del día del evento',
  lema: 'Ustedes disfrutan, nosotros coordinamos.',
  entrada:
    'Un servicio diseñado para que los novios disfruten cada momento de su gran día, con la tranquilidad de contar con una coordinadora encargada de supervisar los detalles y dar seguimiento a la logística del evento.',
  paraQuien: 'Para quienes ya tienen su boda armada y quieren vivirla sin estar pendientes del reloj.',
  precio: null,
  precioNota: 'Cotización a medida según sede y número de invitados.',
  bloques: [
    {
      titulo: 'Coordinación del protocolo religioso',
      puntos: [
        'Organización del cortejo y orden de entrada.',
        'Verificación de la llegada de padrinos, damas, pajesitos y proveedores de la ceremonia.',
        'Revisión de flores y elementos previamente contratados.',
        'Coordinación de horarios para el inicio de la ceremonia.',
      ],
    },
    {
      titulo: 'Coordinación general en el salón',
      puntos: [
        'Supervisión del montaje, decoración y proveedores.',
        'Verificación de los detalles previamente acordados.',
        'Seguimiento al cronograma del evento.',
        'Coordinación de los momentos especiales de la celebración.',
      ],
    },
    {
      titulo: 'Invitación digital personalizada',
      puntos: [
        'Diseño de invitación digital con la información del evento, lista para compartir con sus invitados.',
      ],
    },
    {
      titulo: 'Confirmación de invitados (RSVP)',
      puntos: [
        'Seguimiento previo a la boda para confirmar asistencia y llevar un control de las respuestas recibidas.',
      ],
    },
    {
      titulo: 'Logística y traslado de artículos personales',
      puntos: [
        'Recolección en un domicilio previamente acordado y traslado al salón de recuerdos, botellas, detalles personalizados y elementos decorativos proporcionados por los novios, conforme a la capacidad y condiciones establecidas.',
      ],
    },
  ] as Bloque[],
  compromiso: {
    titulo: 'Nuestro compromiso',
    texto:
      'Brindar tranquilidad, organización y atención a los detalles para que los novios y sus familias puedan disfrutar de su celebración sin preocuparse por la coordinación del día.',
    cierre: 'Nosotros nos ocupamos de los detalles; ustedes, de crear recuerdos inolvidables.',
  },
};

export const PLANEACION_360 = {
  id: 'planeacion-360',
  nombre: 'Planeación 360',
  lema: 'Porque su celebración merece ser tan extraordinaria como la historia que la inspira.',
  entrada:
    'Planeación 360 es caminar con ustedes en cada paso: abrazar sus ideas, escuchar lo que imaginaron y convertir cada emoción en detalles que cuenten su historia. Su boda no será una más: será su momento, con la entrega que merece un día que van a recordar siempre.',
  paraQuien: 'Para quienes quieren entregar la boda completa y dedicarse únicamente a vivirla.',
  precio: '$29,500',
  precioNota: 'Hasta 150 personas. Puebla y Cholula.',
  promesa:
    'El día más importante de sus vidas merecen vivirlo con emoción, no con preocupaciones. Nos encargamos de cada detalle para que disfruten cada abrazo, cada fotografía y cada sonrisa.',
  cierre: 'Todo en un solo servicio, para que ustedes solo se dediquen a disfrutar.',
  pilares: [
    {
      titulo: 'Diseño del evento',
      texto: 'Un concepto único que refleja su esencia, no una plantilla repetida.',
    },
    {
      titulo: 'Coordinación completa',
      texto: 'Organización y gestión de principio a fin, desde la primera reunión hasta el último invitado.',
    },
    {
      titulo: 'Proveedores confiables',
      texto: 'Selección y negociación con los mejores, con el respaldo de haber trabajado antes con ellos.',
    },
    {
      titulo: 'Agenda minuto a minuto',
      texto: 'Un timeline detallado para que todo fluya sin que nadie tenga que preguntar qué sigue.',
    },
    {
      titulo: 'Supervisión total',
      texto: 'Nuestro equipo presente en cada momento clave del día.',
    },
    {
      titulo: 'Acompañamiento integral',
      texto: 'Antes, durante y después de su gran día.',
    },
  ] as Pilar[],
};

/** Capacitación del equipo. Sale de la presentación de Planeación 360. */
export const SEGURIDAD = {
  titulo: 'Seguridad, protocolos y experiencia',
  entrada:
    'Todo nuestro equipo está capacitado en las áreas clave para garantizar la seguridad y la correcta ejecución de su evento.',
  areas: [
    'Primeros auxilios',
    'Manejo de contingencias',
    'Protocolos ante incendios y temblores',
    'Coordinación de eventos',
    'Resolución de imprevistos',
  ],
  cierre:
    'Antes del evento realizamos una reunión con todo el equipo de trabajo y los proveedores para revisar la logística, establecer protocolos de seguridad y definir un plan de contingencia que nos permita actuar de forma rápida y organizada ante cualquier eventualidad.',
};

export const TRANSPARENCIA = {
  titulo: 'Control, organización y transparencia',
  entrada:
    'Trabajamos con archivos de seguimiento en tiempo real, a los que ustedes tienen acceso en todo momento.',
  cierre:
    'En ellos llevamos el control de los distintos aspectos del evento, incluido el inventario de bebidas, del cual hacemos un conteo detallado para que todo se les entregue correctamente al finalizar.',
};

export const OFICINA = {
  titulo: 'Conózcanos',
  entrada:
    'Nos encantará reunirnos con ustedes para presentarles nuestro método de planeación y ayudarles a convertir la boda que imaginaron en una experiencia inolvidable.',
  cierre: 'Agenden su cita y descubran por qué una buena planeación hace toda la diferencia.',
  cita: 'Escríbannos por WhatsApp, elegimos juntos el día y les compartimos todos los detalles para su cita.',
};
