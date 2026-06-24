"use client";

/* ============================================================
   Registro central de GSAP + plugins (una sola vez).
   GSAP 3.12+ incluye todos los plugins de forma gratuita.
   En el paso 1 sólo usamos el core; los plugins quedan
   registrados para los pasos siguientes (Flip, SplitText,
   DrawSVG, MotionPath).
   ============================================================ */

import gsap from "gsap";

// El registro de plugins se hará escena por escena cuando se
// necesiten (para no inflar el bundle del andamiaje). Aquí sólo
// centralizamos la instancia de gsap.

export { gsap };
