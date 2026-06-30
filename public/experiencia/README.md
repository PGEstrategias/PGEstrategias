# Assets para /experiencia

Estos archivos los entrega Pablo al desarrollador. Cuando estén listos, súbelos a la carpeta correspondiente y edita `app/experiencia/assets.ts`.

## Estructura esperada

```
public/experiencia/
├─ videos/
│  ├─ video1.mp4           # Acto 3 — primera pieza de producción
│  ├─ video2.mp4           # Acto 4 — segunda pieza de producción
│  └─ testimonio-1.mp4     # Acto 6 Momento 3 — testimonio del cliente
├─ audio/
│  └─ cliente.mp3          # Acto 6 Momento 1 — audio de WhatsApp del cliente
├─ whatsapp/
│  └─ avatar.jpg           # Acto 6 Momento 1 — foto del contacto en WhatsApp
└─ equipo/
   ├─ pablo.jpg
   ├─ markus.jpg
   ├─ carpi.jpg
   ├─ daniel.jpg
   ├─ mariana.jpg
   ├─ sofia.jpg
   └─ andres.jpg
```

## Si los videos vienen por enlace externo (Vimeo / Bunny / CDN)

No es necesario subirlos a `public/`. En `assets.ts`, basta con poner la URL directa al `.mp4` (o m3u8). El `<video>` los reproduce igual.

## Wiring rápido

Edita `app/experiencia/assets.ts`:

```ts
export const ASSETS = {
  video1: "/experiencia/videos/video1.mp4", // o "https://cdn.bunny.net/..."
  video2: "/experiencia/videos/video2.mp4",
  testimonios: [
    { src: "/experiencia/videos/testimonio-1.mp4", nombre: "San Bartolo" },
  ],
  whatsapp: {
    contacto: { nombre: "San Bartolo", foto: "/experiencia/whatsapp/avatar.jpg" },
    audioCliente: { src: "/experiencia/audio/cliente.mp3", duracion: "0:24" },
  },
  equipo: [
    { nombre: "Pablo", foto: "/experiencia/equipo/pablo.jpg", tagline: "Pablo. La cabeza y el ojo del equipo.", destacado: true },
    { nombre: "Markus", foto: "/experiencia/equipo/markus.jpg", tagline: "Markus. Campañas que no malgastan." },
    // ... etc
  ],
};
```
