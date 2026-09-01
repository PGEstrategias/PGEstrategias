/**
 * Sistema de diseño para los correos de PGE Estrategias.
 * Paleta de marca en versión "dark premium" (estilo Magnific / SaaS moderno).
 *
 * Cambiar a versión clara: intercambia `bg` <-> `text` y `panel` <-> `#ffffff`.
 * Todo el resto de plantillas y componentes lee de aquí, así que un solo
 * cambio aquí re-tematiza todos los correos.
 */
export const theme = {
  color: {
    // Fondos
    bg: '#141312', // fondo de la página (negro cálido)
    panel: '#1E1B1A', // tarjeta / contenedor principal
    surface: '#26221F', // cajas internas, badges
    surfaceAlt: '#302B27', // hover / bordes suaves

    // Marca PGE
    accent: '#D63A27', // rojo PGE
    accentSoft: '#F0A89C', // rojo claro para links sobre oscuro
    dark: '#3F3C39', // gris oscuro PGE

    // Texto
    text: '#F5F2EF', // texto principal (crema)
    textMuted: '#A9A5A0', // texto secundario
    textFaint: '#6E6A66', // legales / footer

    // Líneas
    border: '#35322E',

    // Botón claro (estilo Magnific: pastilla clara sobre fondo oscuro)
    btnBg: '#F5F2EF',
    btnText: '#1A1817',
  },

  font: {
    // Stack seguro para email. La cara "display" carga Space Grotesk vía
    // <Font> (Apple Mail / clientes modernos); en Outlook cae a Arial bold.
    body: "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    display:
      "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },

  layout: {
    maxWidth: 600,
    radius: 14,
    radiusSm: 10,
    radiusPill: 999,
  },
} as const;

export type Theme = typeof theme;
