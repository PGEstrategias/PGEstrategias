# Archivos de marca de Lista Médica

Deja aquí los archivos con estos nombres exactos y el sitio los toma solo, sin
tocar código. Mientras alguno falte, esa pieza cae en el nombre tipográfico y
no se rompe nada.

| Archivo | Dónde sale | Cómo debe venir |
|---|---|---|
| `logo.svg` (o `.png`) | Cabecera de todas las páginas | Fondo transparente y recortado al ras, sin márgenes blancos. Se dibuja a 30 px de alto. |
| `logo-claro.svg` (o `.png`) | Pie de página | La versión en blanco o de una sola tinta clara. El pie es casi negro y el azul marino del logotipo a color desaparece ahí. |
| `compartir.png` (o `.jpg`) | Vista previa al compartir un enlace en WhatsApp y redes | 1200×630. Se usa en todas las páginas, salvo en los perfiles que ya tienen fotografía: ahí se comparte el retrato del profesional. |

Acepta `.svg`, `.png` y `.webp`, en ese orden de preferencia. El SVG es el
mejor: pesa menos y se ve nítido en cualquier pantalla.

## Fotografías de los profesionales

`fotos/` la llena el panel solo: cada alta guarda ahí la foto ya recortada en
cuadrado y comprimida. No hay que poner nada a mano.

## Favicon

El favicon es el único que no va aquí: Next.js lo toma por convención de ruta,
así que va en **`app/listamedicamx/icon.png`**, cuadrado, 512×512. Conviene
usar solo la cruz, sin el texto: a 16 px no se alcanza a leer nada más.

Puesto ahí queda acotado a Lista Médica. Las páginas de PG Estrategias siguen
con el suyo —o sin ninguno, como hoy— y el día que PG tenga el propio en
`app/icon.png`, cada sección conserva el que le toca. Está comprobado.
