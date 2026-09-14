# Archivos de marca de Lista Médica

Deja aquí los archivos con estos nombres exactos y el sitio los toma solo, sin
tocar código. Mientras alguno falte, esa pieza cae en el nombre tipográfico y
no se rompe nada.

| Archivo | Dónde sale | Cómo debe venir |
|---|---|---|
| `logo.svg` (o `.png`) | Cabecera de todas las páginas | Fondo transparente y recortado al ras, sin márgenes blancos. Se dibuja a 30 px de alto. |
| `logo-claro.svg` (o `.png`) | Pie de página | La versión en blanco o de una sola tinta clara. El pie es casi negro y el azul marino del logotipo a color desaparece ahí. |

Acepta `.svg`, `.png` y `.webp`, en ese orden de preferencia. El SVG es el
mejor: pesa menos y se ve nítido en cualquier pantalla.

## Fotografías de los profesionales

`fotos/` la llena el panel solo: cada alta guarda ahí la foto ya recortada en
cuadrado y comprimida. No hay que poner nada a mano.

## Favicon y vista previa al compartir

Estos dos van en otra carpeta, porque Next.js los toma por convención de ruta:

| Archivo | Para qué |
|---|---|
| `app/listamedicamx/icon.png` | El favicon de Lista Médica. Cuadrado, 512×512. Conviene solo la cruz, sin el texto: a 16 px no se lee nada más. |
| `app/listamedicamx/opengraph-image.png` | La imagen que aparece al compartir un enlace en WhatsApp o redes. 1200×630. |
