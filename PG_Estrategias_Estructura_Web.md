# PG Estrategias — Estructura completa del sitio web
### Documento para Claude Code · Mayo 2026
> Diseñar con inspiración en exoape.com: tipografía dominante, espacios generosos, movimiento sutil, paleta oscura con acentos limpios. Cada sección debe sentirse como una pieza editorial, no como un formulario de agencia.

---

## Kit de marca
> Basado en el brand kit oficial de PG Estrategias.

- **Colores:**
  - `#0D0D0D` — Negro principal (fondos oscuros, texto sobre claro)
  - `#A6E22E` — Verde lima (único acento, usar con criterio — CTAs, highlights, ícono de barras)
  - `#F5F5F5` — Gris casi blanco (fondos claros, texto sobre oscuro)
  - Blanco puro `#FFFFFF` para texto sobre negro cuando máximo contraste
- **Tipografía:**
  - **Syne Bold** — todos los títulos, eyebrows, nombres de planes, estadísticas grandes
    - Importar: `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap')`
  - **Inter Regular / Inter Medium** — cuerpo de texto, descripciones, bullets, notas
    - Importar: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap')`
  - Nunca mezclar un tercer tipo de letra
- **Logo:** Usar el isologo completo (ícono de barras + "PG ESTRATEGIAS" + "GROWTH PARTNERS") en versión blanca sobre fondos oscuros. Solo el monograma circular en espacios pequeños.
- **Ícono de barras (gráfica):** Elemento gráfico de la marca — puede usarse como fondo decorativo en secciones oscuras a baja opacidad (5–8%)

## Stack sugerido
- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS con variables CSS para la paleta de marca
- **Animaciones:** GSAP ScrollTrigger + Framer Motion para micro-interacciones
- **Video:** `<video autoplay muted loop playsinline>` con `object-fit: cover` full viewport
- **Hosting:** Vercel

### Variables CSS de la marca (definir en `:root`)
```css
:root {
  --pg-black: #0D0D0D;
  --pg-lime: #A6E22E;
  --pg-light: #F5F5F5;
  --pg-white: #FFFFFF;
  --pg-lime-dim: rgba(166, 226, 46, 0.12); /* para hovers y fondos sutiles */
  --font-title: 'Syne', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### Tailwind — extender config (`tailwind.config.js`)
```js
theme: {
  extend: {
    colors: {
      'pg-black': '#0D0D0D',
      'pg-lime': '#A6E22E',
      'pg-light': '#F5F5F5',
    },
    fontFamily: {
      title: ['Syne', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
  }
}
```

---

## Sección 01 · NAVBAR

### Comportamiento
- Posición: `fixed top-0`, `z-index: 50`
- Estado inicial: transparente, texto blanco (sobre el hero oscuro)
- Al hacer scroll > 80px: fondo `rgba(10,10,10,0.85)` con `backdrop-filter: blur(12px)`, transición suave `300ms ease`
- En mobile: hamburger menu que despliega fullscreen overlay oscuro

### Contenido
- **Izquierda:** Logotipo PG Estrategias (SVG). Si no hay logo, tipografía: `PG` en bold + `Estrategias` en light
- **Centro (desktop):** Links de navegación: Servicios · Metodología · Paquetes · Contacto
  - Font size: 13px, letter-spacing: 0.08em, color blanco/60% en reposo, blanco/100% en hover
  - Hover: underline animado desde centro (transform scaleX)
- **Derecha:** Botón CTA — "Agenda una llamada"
  - Estilo: borde blanco 1px, fondo transparente, hover: fondo blanco, texto negro
  - Padding: 10px 20px, border-radius: 2px (cuadrado moderno, no pill)

### UX Notes
- Links anclan a secciones (`#servicios`, `#metodologia`, `#paquetes`, `#contacto`)
- Smooth scroll behavior en `html`
- Active state en el link de la sección visible (IntersectionObserver)

---

## Sección 02 · HERO

### Layout
- Altura: `100vh`, overflow hidden
- Fondo: video loop en `position: absolute; inset: 0; object-fit: cover; z-index: 0`
- Overlay: `background: rgba(13,13,13,0.60)` sobre el video
- Todo el texto: `position: relative; z-index: 1; color: #F5F5F5`

### Video
- Archivo: proveer en `/public/videos/hero.mp4` y `/public/videos/hero.webm`
- Atributos obligatorios: `autoPlay muted loop playsInline`
- Fallback: imagen estática oscura si el video no carga
- Poster: frame del video como imagen `.jpg`

### Contenido (centrado vertical y horizontal, o alineado izquierda con padding left 8-12%)
```
EYEBROW (pequeño, espaciado):
"Growth Partners · Ciudad de México"
→ font-family: Inter, font-size: 11px, letter-spacing: 0.2em, text-transform: uppercase, color: #A6E22E

HEADLINE PRINCIPAL:
"Convertimos tu inversión
publicitaria en clientes."
→ font-family: Syne Bold, font-size: clamp(48px, 7vw, 96px), font-weight: 800, line-height: 1.05, color: #F5F5F5
→ Máximo 2 líneas. Sin puntos intermedios. Impacto total.

SUBHEADLINE:
"Paid Media · Producción Audiovisual · Mensajería · Ecosistema Digital"
→ font-family: Inter, font-size: 13px, letter-spacing: 0.14em, color: rgba(245,245,245,0.55), margin-top: 24px

CTAs (margin-top: 40px, display: flex, gap: 16px):
→ CTA Primario: "Quiero crecer" — fondo #A6E22E, texto #0D0D0D, font-family: Syne, font-weight: 700, padding: 14px 32px, border-radius: 2px
→ CTA Secundario: "Ver paquetes" — borde #F5F5F5 1px, fondo transparente, texto #F5F5F5, mismo padding
→ Hover CTA primario: fondo #BDF03F (lima más brillante)
→ Hover CTA secundario: fondo rgba(245,245,245,0.08)
```

### Stat Strip (bottom del hero)
- Posición: `absolute bottom: 0`, ancho completo, borde top `1px solid rgba(245,245,245,0.12)`
- Fondo: `rgba(13,13,13,0.5)`, padding: 20px 8%
- 3 stats en fila:

| Stat | Número | Descriptor |
|---|---|---|
| Clientes activos | `+40` | negocios creciendo |
| Retorno promedio | `3.8x` | por cada peso invertido en publicidad |
| Tiempo al aire | `14 días` | de firma a campaña activa |

- Separador visual: `1px solid rgba(245,245,245,0.12)` entre cada stat
- Font stat número: Syne Bold, 28px, color #A6E22E | Font descriptor: Inter, 11px, color rgba(245,245,245,0.5)

### Animaciones de entrada
- Eyebrow: fade up, delay 200ms
- Headline: fade up, delay 400ms
- Subheadline: fade up, delay 600ms
- CTAs: fade up, delay 800ms
- Stat strip: fade in, delay 1000ms
- Usar Framer Motion `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`

### Scroll indicator
- Abajo del headline o en el borde inferior derecho: texto "Scroll" + línea animada descendente
- opacity: 0.4, desaparece al hacer scroll

---

## Sección 03 · TESTIMONIOS

### Contexto
Actualmente hay 2 videos testimoniales de clientes hablando a cámara. La sección debe sentirse como prueba social real, no producción corporativa — la autenticidad es el valor.

### Layout
- Fondo: blanco o gris muy claro (#F8F8F6)
- Padding vertical: 120px
- Ancho máximo del contenido: 1200px, centrado

### Encabezado de sección
```
EYEBROW: "Lo que dicen nuestros clientes"
→ 11px, uppercase, letter-spacing: 0.15em, color gris medio

TÍTULO: "Resultados reales,
en palabras de quien los vivió."
→ 36–48px, weight 500, line-height 1.1, negro
```

### Componente de video testimonial
Cada testimonio: tarjeta con fondo oscuro (#0D0D0D) o contenedor con el video.

```
Estructura de cada tarjeta:
┌─────────────────────────────────────┐
│  [THUMBNAIL DEL VIDEO con play btn] │  ← aspect-ratio: 9/16 o 16/9 según formato
│  ─────────────────────────────────  │
│  "Resultado destacado en comillas"  │  ← quote más impactante del testimonio
│  Nombre · Industria                 │  ← 13px, opacity 0.6
└─────────────────────────────────────┘
```

- **Layout desktop:** 2 tarjetas lado a lado, gap 32px
- **Layout mobile:** stack vertical, una por una
- Click en thumbnail: abre modal con el video en autoplay (usar `<dialog>` nativo o portal de React)
- Modal: fondo negro, video centrado, botón X arriba derecha para cerrar, click fuera cierra

### Quote destacada (entre los 2 videos)
Si el cliente proporciona una frase buena de cada video, mostrarla como pull quote:
```
"[Frase impactante del cliente]"
→ font-size: 22px, font-style: italic, font-family: serif, color: #0D0D0D, opacity: 0.85
→ Línea vertical izquierda: 3px solid #A6E22E (acento)
→ Nombre — Industria abajo del quote
```

### UX Notes
- Lazy load los videos (solo cargar cuando están en viewport)
- Preload: `none` en el `<video>` del modal hasta que se abra
- Accesibilidad: `aria-label` en el botón de play con el nombre del cliente

---

## Sección 04 · QUIÉNES SOMOS / QUÉ HACEMOS

### Filosofía de diseño
No una sección de "About". Es una declaración de posicionamiento. Texto grande, espacio generoso, sin imágenes decorativas. Similar al manifesto de Exo Ape.

### Layout
- Fondo: negro (#0D0D0D), texto blanco
- Padding vertical: 140px
- Dos bloques verticales separados por bastante espacio

### Bloque A — Manifiesto
```
EYEBROW: "Quiénes somos"
→ 11px, uppercase, letter-spacing: 0.15em, color blanco/40%

PÁRRAFO GRANDE (editorial):
"No somos una agencia de marketing tradicional.
Somos growth partners."
→ font-size: clamp(28px, 4vw, 52px), weight 400, line-height: 1.3
→ Énfasis en "growth partners": color acento o cursiva

PÁRRAFO EXPLICATIVO:
"Trabajamos con negocios que ya saben cómo funciona lo que venden.
Nuestra labor es construir el sistema digital que convierte esa claridad en clientes."
→ font-size: 18px, color blanco/65%, max-width: 640px, line-height: 1.7
→ Aparece con ScrollTrigger fade-in al entrar en viewport
```

### Bloque B — Las 4 columnas (qué hacemos)
- Grid 4 columnas en desktop, 2 en tablet, 1 en mobile
- Separador: línea top `1px solid rgba(255,255,255,0.12)` en cada columna
- Padding top: 32px por columna

```
Columna 1: PAUTA DIGITAL
→ Número: "01" (11px, opacity 0.3)
→ Título: "Pauta Digital" (16px, weight 500)
→ Descripción: "Anuncios en Meta y Google diseñados para conseguir clientes nuevos,
  no solo clics. Optimizamos el costo de cada cliente que obtienes."
→ (2-3 líneas máximo, 13px, opacity 0.55)

Columna 2: PRODUCCIÓN AUDIOVISUAL
→ "02" / "Producción Audiovisual"
→ "Videos y creatividades con un solo objetivo: que el espectador actúe.
  Cada pieza tiene un gancho, un beneficio claro y un llamado a la acción."

Columna 3: MENSAJERÍA MASIVA
→ "03" / "Mensajería Masiva"
→ "WhatsApp y email coordinados con tu pauta. Captamos prospectos y
  mantenemos la relación con quienes aún no se deciden a comprar."

Columna 4: ECOSISTEMA DIGITAL
→ "04" / "Ecosistema Digital"
→ "Tu perfil de Google, WhatsApp Business, landing page y posicionamiento
  en buscadores trabajando como un solo sistema. La base que convierte."
```

### Bloque C — Diferenciadores (opcional, puede omitirse si satura)
5 bullets concisos bajo los 4 pilares, en 2 columnas:
- Todo integrado — un solo equipo, un solo cargo mensual.
- Presencia en Google desde el primer mes, sin costo extra.
- Videos y anuncios hechos para vender, no para decorar redes.
- Solo trabajamos con quienes tienen algo claro que vender.
- Te explicamos todo en español, sin términos técnicos.

---

## Sección 05 · METODOLOGÍA

### Fuente del contenido
Extraída de la tesis de PG Estrategias: "No validamos modelos de negocio ni inventamos demanda. Cuando el cliente sabe a quién le vende y por qué le compran, nuestra ejecución multiplica el resultado."

### Layout
- Fondo: blanco (#F5F5F5)
- Padding vertical: 140px
- Ancho máximo: 1100px, centrado

### Encabezado
```
EYEBROW: "Nuestra metodología"

TÍTULO:
"Del primer clic al cliente recurrente.
En 14 días al aire."
→ font-size: clamp(32px, 4.5vw, 56px), weight 500, line-height: 1.1

SUBTÍTULO:
"Un proceso de 5 pasos diseñado para que no tengas que coordinar
nada. Nosotros lo operamos todo."
→ 17px, color gris medio (#666), max-width: 560px
```

### Los 5 pasos — Timeline horizontal (desktop) / vertical (mobile)

#### Implementación desktop
- Línea horizontal que conecta los 5 círculos numerados
- Al hacer scroll, la línea se "dibuja" de izquierda a derecha con GSAP DrawSVG o stroke-dashoffset
- Cada paso aparece con fade-up conforme la línea llega a él

```
PASO 01 — DESCUBRIMIENTO (Días 1–2)
Título: "Entendemos tu negocio"
Descripción: "Hacemos una llamada donde conocemos tu producto, tus precios,
cómo funciona tu venta actualmente y a qué plataformas tienes acceso.
Salimos con un plan de 90 días firmado y un brief de estrategia."
→ Ícono sugerido: lupa o conversación (SVG lineal, 24px, color acento)

PASO 02 — CONFIGURACIÓN TÉCNICA (Días 3–5)
Título: "Preparamos todo el sistema"
Descripción: "Conectamos tus cuentas de anuncios, Google, WhatsApp y herramientas.
Instalamos el rastreo para que cada peso invertido en publicidad
sea medible desde el primer día."

PASO 03 — ESTRATEGIA Y LANDING (Días 6–8)
Título: "Diseñamos tu sistema de conversión"
Descripción: "Definimos los ángulos creativos, los mensajes clave y las ofertas.
Diseñamos la página de aterrizaje donde llegará tu tráfico,
lista para convertir visitantes en prospectos."

PASO 04 — PRODUCCIÓN Y LANZAMIENTO (Días 9–13)
Título: "Grabamos, editamos y armamos las campañas"
Descripción: "Sesión de grabación de contenido, edición y aprobación final.
Montamos la estructura de campañas en las plataformas y hacemos
control de calidad de todo el sistema antes de encender."

PASO 05 — CAMPAÑAS AL AIRE (Día 14)
Título: "El motor arranca"
Descripción: "Campañas activas, landing page conectada y primer reporte
agendado a los 7 días. A partir de aquí, optimizamos semana a semana."
→ CTA al final: "Empieza en 14 días →"
```

#### Animación ScrollTrigger (GSAP)
```js
// Pseudo-código de referencia para Claude Code
gsap.to(".timeline-line", {
  scaleX: 1,  // de 0 a 1, transform-origin: left
  scrollTrigger: {
    trigger: ".methodology-section",
    start: "top 60%",
    end: "bottom 60%",
    scrub: 1,
  }
});
// Cada paso con stagger fade-up al alcanzar su punto en la línea
```

### Filosofía de trabajo (bloque final de la sección)
Caja oscura (#0D0D0D) full-width, padding 60px 8%:
```
"Nuestro trabajo empieza cuando el cliente sabe a quién le vende.
Si aún no lo tiene claro, lo decimos antes de firmar."
→ font-size: 24px, cursiva, blanco
→ Atribuido: — Roberto Carpinteyro, PG Estrategias
```

---

## Sección 06 · PAQUETES

### Principio de diseño
Mostrar valor completo sin jerga técnica. El visitante debe entender exactamente qué recibe y para quién es cada nivel. Sin acrónimos (no CPA, no ROAS, no CTR).

### Layout
- Fondo: negro (#0D0D0D)
- Padding vertical: 140px
- 3 tarjetas en grid horizontal (desktop), stack en mobile

### Encabezado
```
EYEBROW: "Planes de trabajo"

TÍTULO: "Elige el nivel que corresponde
a dónde está tu negocio hoy."

NOTA LEGAL (pequeña, debajo del título):
"Todos los precios en pesos mexicanos, sin IVA incluido.
Compromiso mínimo de 3 meses."
→ 12px, opacity 0.4
```

### Tarjeta 01 — IGNICIÓN · $11,000 MXN/mes

```
BADGE: "Para empezar con pie derecho"
→ fondo #1A1A1A, borde 1px rgba(255,255,255,0.15), color blanco/60%, 11px

NOMBRE DEL PLAN: "IGNICIÓN"
→ 13px, uppercase, letter-spacing: 0.2em, acento verde

PRECIO:
"$11,000" → 40px, weight 500, blanco
"/mes" → 14px, opacity 0.5
"Incluye $2,500 para publicidad" → 12px, acento verde, debajo del precio

PARA QUIÉN ES:
"Ideal si facturas entre $40,000 y $80,000 al mes, o si estás lanzando
un negocio con producto o servicio ya definido y primeras ventas."
→ 13px, blanco/60%, padding 16px 0, borde top/bottom rgba(255,255,255,0.1)

QUÉ INCLUYE (lista con checkmarks SVG):
✓ Publicidad en Meta (Facebook/Instagram) o Google — $2,500 incluidos
✓ 1 video de 1 minuto para tu página de ventas
✓ 4 reels mensuales (1 para anuncios, 3 para redes sociales)
✓ 3 diseños gráficos con texto persuasivo
✓ 3 carruseles para redes sociales
✓ 500 mensajes por WhatsApp o correo al mes
✓ Página de ventas (landing page) diseñada e incluida
✓ Configuración técnica completa (rastreo, audiencias, píxeles)
✓ Perfil de Google optimizado + estrategia de reseñas
✓ 1 videollamada estratégica mensual
✓ 1 sesión mensual de grabación de contenido
✓ Reporte mensual en lenguaje claro, sin términos técnicos

CTA: "Empezar con Ignición"
→ borde blanco 1px, fondo transparente, hover fondo blanco/texto negro
```

### Tarjeta 02 — TRACCIÓN · $18,000 MXN/mes ← DESTACADA

```
BADGE DESTACADO: "El más elegido"
→ fondo #A6E22E, texto #0D0D0D, font-family: Syne Bold, font-size: 11px, esquina superior de la tarjeta

BORDE: 2px solid #A6E22E (acento de marca — único elemento con este borde en la sección)

NOMBRE DEL PLAN: "TRACCIÓN"
PRECIO: "$18,000/mes · Incluye $4,000 para publicidad"

PARA QUIÉN ES:
"Ideal si facturas entre $80,000 y $300,000 al mes, con un negocio
que ya funciona y quieres acelerar las ventas de forma consistente."

QUÉ INCLUYE:
✓ Publicidad en Meta y/o Google — $4,000 incluidos
✓ 1 video de 1 minuto para tu página de ventas
✓ 7 reels mensuales (2 para anuncios, 5 para redes sociales)
✓ 8 carruseles para redes sociales con imágenes
✓ WhatsApp Bot para responder a tus leads
✓ Página de ventas + CRM para organizar tus prospectos + hosting 6 meses
✓ Configuración técnica completa
✓ Perfil de Google optimizado + estrategia de reseñas
✓ Videollamada estratégica quincenal (puede ser presencial)
✓ Sesión de grabación de contenido incluida
✓ Consultoría de crecimiento mensual
✓ Reporte quincenal con análisis de qué anuncios están funcionando mejor

CTA: "Empezar con Tracción"
→ fondo blanco, texto negro (el más prominente)
```

### Tarjeta 03 — DOMINIO · $27,000 MXN/mes

```
BADGE: "Operación completa"

NOMBRE DEL PLAN: "DOMINIO"
PRECIO: "$27,000/mes · Incluye $7,000 para publicidad"

PARA QUIÉN ES:
"Ideal si facturas más de $300,000 al mes y necesitas un equipo
de marketing digital externo que opere todo sin que tengas que
contratar personal interno."

QUÉ INCLUYE:
✓ Publicidad en Meta y/o Google — $7,000 incluidos
✓ 1 video de 1 minuto para página de ventas
✓ 10 reels mensuales (4 para anuncios, 6 para redes sociales)
✓ 2,000 mensajes por WhatsApp o correo al mes
✓ 2 páginas de ventas + CRM + hosting permanente + dominio por 1 año
✓ Configuración técnica completa
✓ Perfil de Google optimizado + estrategia de reseñas
✓ Videollamada estratégica semanal
✓ Sesión de grabación de contenido incluida
✓ Consultoría de crecimiento quincenal
✓ Reporte semanal con tablero de métricas en vivo

CTA: "Hablemos de Dominio"
→ borde blanco 1px, fondo transparente
```

### Tabla comparativa colapsable
Debajo de las 3 tarjetas: botón "Ver comparativa completa ↓"
Al hacer click (accordion): tabla HTML con todas las filas del PDF pero en lenguaje llano.

### Nota final de paquetes
```
Caja destacada, fondo #0D0D0D, padding 32px:

"¿No sabes cuál elegir?"
→ "Agenda una llamada de 20 minutos sin costo.
   Te decimos honestamente cuál es el plan correcto para tu negocio
   — o si todavía no es el momento de arrancar con pauta pagada."
→ CTA: "Agendar llamada gratuita →"
```

---

## Sección 07 · FAQ

### Layout
- Fondo: blanco (#F5F5F5)
- Padding vertical: 120px
- Ancho máximo: 760px, centrado
- Acordeón: una pregunta se abre a la vez, animación de altura suave (300ms ease)

### Encabezado
```
EYEBROW: "Preguntas frecuentes"
TÍTULO: "Todo lo que necesitas saber antes de empezar."
```

### Preguntas (extraídas de objeciones del PDF, reescritas sin jerga)

**P1: ¿Por qué el compromiso mínimo es de 3 meses?**
R: "Porque los primeros 30 días son configuración y arranque; los segundos 30 son ajuste y aprendizaje; y los terceros son cuando el sistema empieza a mostrar resultados reales. Cualquier agencia que te prometa resultados en el primer mes está siendo deshonesta contigo o gastando tu presupuesto sin estrategia."

**P2: ¿El presupuesto de publicidad está incluido en la mensualidad?**
R: "Sí. Cada plan incluye un monto base de publicidad — $2,500 en Ignición, $4,000 en Tracción y $7,000 en Dominio — que ya viene dentro de lo que pagas. Si en algún momento quieres invertir más en publicidad para acelerar los resultados, esa diferencia se factura aparte. Siempre lo recomendamos cuando el sistema ya está probado."

**P3: ¿Trabajan con negocios que acaban de iniciar?**
R: "Sí, en el plan Ignición. La única condición es que tengas un producto o servicio definido y al menos tus primeras ventas. No validamos ideas de negocio ni inventamos demanda: si ya sabes qué vendes y a quién, nosotros construimos el sistema para escalar."

**P4: ¿Qué pasa si no veo resultados?**
R: "Si al cierre de los 3 meses las métricas no se movieron por causas atribuibles a nuestra ejecución — y no a factores como precio del producto, cobertura geográfica o problemas internos del negocio — te damos un mes adicional de trabajo sin costo de honorarios. Ponemos la piel en el juego."

**P5: ¿Puedo cambiar de plan?**
R: "Subir de plan puedes hacerlo en cualquier momento. Bajar de plan solo es posible al cierre de tu trimestre vigente, para no fragmentar la estrategia en medio de un ciclo de optimización."

**P6: Ya tengo a alguien manejando mis redes sociales. ¿Esto es diferente?**
R: "Completamente diferente. Manejar redes sociales es publicar contenido para mantener presencia. Nuestro trabajo es construir un sistema de ventas: anuncios pagados, páginas de conversión, mensajería coordinada y rastreo de resultados. Los dos pueden coexistir perfectamente, o podemos asumir todo si lo prefieres."

### Diseño del acordeón
- Pregunta: 16px, weight 500, negro
- Ícono: `+` que rota a `×` al abrir (transform rotate 45deg, 300ms)
- Respuesta: 15px, color gris oscuro (#444), line-height 1.7, padding-top 12px
- Separador: `1px solid #E8E8E8` entre preguntas

---

## Footer

### Layout
- Fondo: negro (#0D0D0D)
- Padding: 80px 8% 40px
- Grid 3 columnas (desktop): Logo/tagline · Links · Contacto + Dirección

### Columna 1 — Identidad
```
LOGO PG Estrategias (blanco)
TAGLINE: "Growth Partners para negocios que ya saben cómo vender."
→ 13px, blanco/45%, max-width: 240px, margin-top: 12px
AÑO: "© 2026 PG Estrategias"
→ 11px, blanco/25%
```

### Columna 2 — Navegación
```
TÍTULO: "Navegación" → 11px, uppercase, blanco/30%, letter-spacing: 0.1em
Links: Servicios · Metodología · Paquetes · FAQ · Agendar llamada
→ 14px, color: rgba(245,245,245,0.6), hover color: #F5F5F5, display: block, gap: 10px
```

### Columna 3 — Contacto y Ubicación
```
TÍTULO: "Contacto"
Email: [correo de contacto]
WhatsApp: [número]

TÍTULO: "Oficina"
Calle Valencia 131-2, Las Palmas
Ciudad de México, México

Redes: Instagram · LinkedIn (íconos SVG simples, 18px)
```

### Línea inferior
```
Separador: 1px solid rgba(255,255,255,0.08)
Texto: "PG Estrategias · Growth Partners · CDMX · 2026"
→ 11px, blanco/20%, text-align: center, padding-top: 24px
```

---

## Notas de accesibilidad y performance

- Todas las imágenes con `alt` descriptivo
- `prefers-reduced-motion`: desactivar todas las animaciones GSAP si el usuario lo prefiere
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```
- Video hero: proporcionar `<track kind="captions">` si tiene audio
- Contraste mínimo WCAG AA en todos los textos sobre fondos oscuros
- Lazy loading en imágenes y videos fuera del viewport inicial
- Font display: `swap` para evitar FOUT
- Meta tags OG para compartir en redes: título, descripción, imagen preview

---

## Archivos que necesitas tener listos

| Archivo | Uso | Formato |
|---|---|---|
| `hero.mp4` + `hero.webm` | Video loop del hero | Max 10MB, sin audio |
| `hero-poster.jpg` | Frame estático del video | 1920×1080px |
| `logo.svg` | Logotipo en blanco (para fondo oscuro) | SVG vectorial |
| `logo-dark.svg` | Logotipo oscuro (para navbar al scroll) | SVG vectorial |
| `testimonio-1.mp4` | Video cliente 1 | Vertical preferible (9:16) |
| `testimonio-2.mp4` | Video cliente 2 | Vertical preferible (9:16) |
| `favicon.ico` + `icon.png` | Favicon | 32×32 y 512×512 |

---

*Documento generado en Mayo 2026 · PG Estrategias · para uso con Claude Code*
