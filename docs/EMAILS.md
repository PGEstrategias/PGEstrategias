# Correos de prospección con React Email

Sistema para enviar propuestas por email con diseño profesional (estilo dark
premium tipo Magnific, con la paleta de PGE Estrategias). Sirve para prospectos
de cualquier giro: solo cambias los textos.

## Estructura

```
emails/
  theme.ts                      → colores, fuentes, medidas (edita aquí para re-tematizar)
  components/ui.tsx             → piezas: Badge, CTA, Display, Feature, etc.
  plantillas/PropuestaProspecto.tsx  → la plantilla principal (con props)
  data/prospectos.ts            → AQUÍ defines cada prospecto que vas a enviar
  preview/                      → ejemplos para previsualizar (2 giros)
lib/enviarCorreo.ts             → envío por Gmail (Google Workspace)
scripts/enviar.ts               → script de envío
scripts/render-preview.ts       → genera HTML estático en preview-out/
```

## 1. Configurar el envío (una sola vez)

1. Activa la **verificación en 2 pasos** en tu cuenta de Google Workspace.
2. Genera un **App Password** en https://myaccount.google.com/apppasswords
   (elige "Correo" / "Otra"). Te da 16 caracteres.
3. Copia el archivo de ejemplo y llénalo:

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   GMAIL_USER=contacto@pgestrategias.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

   `.env.local` NO se sube al repo (está en `.gitignore`).

## 2. Previsualizar mientras diseñas

Servidor en vivo (recarga al guardar), abre http://localhost:3001 :

```bash
npm run email:dev
```

O genera archivos HTML estáticos para abrir en el navegador:

```bash
npm run email:render      # crea preview-out/<id>.html
```

## 3. Agregar un prospecto

Abre `emails/data/prospectos.ts` y copia un bloque del arreglo `prospectos`.
Cambia `id`, `para`, `asunto` y los textos dentro de `props`. Campos útiles:

| Campo | Para qué |
|---|---|
| `badge` | pastilla superior (ej. "Propuesta sin costo") |
| `titulo` / `subtitulo` | encabezado grande del hero |
| `saludo` | "Estimado Roberto," |
| `parrafos` | arreglo de párrafos de introducción |
| `ctaTexto` / `ctaEnlace` | botón principal (WhatsApp, agenda, etc.) |
| `heroImagen` | imagen grande (URL absoluta; usa Cloudinary) |
| `features` | lista de "qué incluye" (numeradas) |
| `ejemplos` | hasta 2 ejemplos de trabajo con thumbnail + enlace |
| `cierre` | frase final antes de la firma |
| `preheader` | texto de vista previa en la bandeja |

## 4. Enviar

```bash
npm run email:enviar                 # lista los prospectos disponibles
npm run email:enviar landrover-puebla
npm run email:enviar landrover-puebla -- --cco=contacto@pgestrategias.com
```

El `--cco` te manda copia oculta para llevar registro.

## Panel web /enviar (para enviar sin terminal)

Además del script, hay un panel visual en el sitio: **`/enviar`**.

- Está protegido con una pantalla de login (`/login`) y cookie de sesión.
  Define en las variables de entorno: `PANEL_USER` y `PANEL_PASSWORD`.
  Si el usuario o contraseña están mal, lo rechaza con un mensaje claro y
  puedes reintentar. Hay botón de **Cerrar sesión** dentro del panel.
- Llenas un formulario (destino, asunto, título, párrafos, botón, features…),
  ves la **vista previa** en vivo y presionas **Enviar correo**.
- El envío real ocurre en `POST /api/enviar` (también protegido por el mismo
  login). La vista previa usa `POST /api/preview`.

En Vercel agrega estas variables (entornos Production **y** Preview):

| Variable | Para qué |
|---|---|
| `GMAIL_USER` | correo remitente |
| `GMAIL_APP_PASSWORD` | App Password de Google |
| `PANEL_USER` / `PANEL_PASSWORD` | acceso al panel /enviar |
| `EMAIL_API_TOKEN` | (opcional) endpoint de prueba por URL |

## Endpoint de prueba por URL (opcional)

`GET /api/enviar-prueba?token=...&para=...` envía una muestra. Útil para probar
rápido desde el navegador. Si ya usas el panel `/enviar`, puedes borrar la ruta
`app/api/enviar-prueba` para reducir superficie de ataque.

## Notas importantes

- **Volumen:** el SMTP de Gmail es ideal para prospección de bajo volumen
  (unas decenas al día). Para envíos masivos, migrar a Resend/Mailgun con
  dominio verificado para no caer en spam.
- **Imágenes:** siempre usa URLs absolutas y públicas (Cloudinary funciona muy
  bien). El correo no puede llevar imágenes locales embebidas de forma confiable.
- **Fuentes:** el título usa Space Grotesk en clientes modernos (Apple Mail,
  etc.); en Outlook cae a Arial en negrita — es normal y se ve bien igual.
- **Cambiar a tema claro:** edita los colores en `emails/theme.ts`; todo lo
  demás se actualiza solo.
