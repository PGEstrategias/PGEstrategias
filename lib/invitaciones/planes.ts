/**
 * Los dos planes que tienen demo: Básico y Estándar.
 *
 * Cada demo enseña exactamente lo que ese paquete entrega y nada más. Lo que
 * pertenece a Premium VIP o A la Medida se muestra bloqueado, para que el
 * prospecto vea qué se está perdiendo en vez de creer que ya lo tiene.
 */

export const PLANES = ["basico", "estandar"] as const;
export type Plan = (typeof PLANES)[number];

export function esPlan(valor: string): valor is Plan {
  return (PLANES as readonly string[]).includes(valor);
}

type FichaPlan = {
  slug: Plan;
  nombre: string;
  precio: string;
  /* Qué hace el demo al confirmar — la diferencia real entre los dos. */
  promesa: string;
  /** El Estándar pide correo y manda el pase en PDF; el Básico no. */
  pidecorreo: boolean;
  otro: Plan;
  otroNombre: string;
};

export const FICHAS: Record<Plan, FichaPlan> = {
  basico: {
    slug: "basico",
    nombre: "Básico",
    precio: "$2,999",
    promesa: "Tu pase aparece en pantalla, listo para capturar.",
    pidecorreo: false,
    otro: "estandar",
    otroNombre: "Estándar",
  },
  estandar: {
    slug: "estandar",
    nombre: "Estándar",
    precio: "$3,999",
    promesa: "Tu pase en PDF te llega al correo en el momento.",
    pidecorreo: true,
    otro: "basico",
    otroNombre: "Básico",
  },
};

/* Entregables de los paquetes de arriba. Se enseñan apagados al final del
   demo: son la razón para subir de nivel, no una promesa de este plan. */
export const BLOQUEADO = [
  {
    plan: "Premium VIP",
    items: [
      "Recordatorio automático 15 días antes con la mesa asignada y el croquis del salón",
      "Módulo de cambios: alergias y número de pases hasta la fecha límite",
      "Reporte de restricciones alimenticias listo para el banquetero",
    ],
  },
  {
    plan: "A la Medida",
    items: [
      "Dominio propio, luciaymateo.com en vez de un enlace prestado",
      "Confirmaciones por WhatsApp en lugar de correo",
      "Código QR validado en la puerta de la recepción",
      "Galería para que los invitados suban sus fotos durante la fiesta",
    ],
  },
] as const;
