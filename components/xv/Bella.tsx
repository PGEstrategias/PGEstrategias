/* Escenografía del tema "La Bella y la Bestia" para las invitaciones de XV.
   Todo está dibujado aquí en SVG (castillo, rosa encantada, filigranas y
   pétalos): no usa imágenes ni logotipos de la película. */
import s from "./xv.module.css";

/* Estrellas fijas (posiciones deterministas para que el servidor y el
   navegador pinten lo mismo). */
const ESTRELLAS = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 173) % 1200,
  y: (i * 97) % 430,
  r: 0.6 + ((i * 7) % 10) / 9,
  d: `${2 + (i % 5)}s`,
  delay: `${-((i * 0.37) % 4)}s`,
}));

/* Castillo de noche sobre colinas, con ventanas encendidas. */
export function EscenaCastillo() {
  return (
    <>
    <svg className={s.escena} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bb-cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050a1f" />
          <stop offset="0.55" stopColor="#13235a" />
          <stop offset="0.85" stopColor="#3b3f86" />
          <stop offset="1" stopColor="#6d5a9e" />
        </linearGradient>
        <radialGradient id="bb-luna" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff8e1" />
          <stop offset="0.45" stopColor="#f8e7b0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f8e7b0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bb-castillo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2350" />
          <stop offset="1" stopColor="#0a0f2a" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bb-cielo)" />
      {ESTRELLAS.map((e, i) => (
        <circle
          key={i}
          className={s.estrella}
          cx={e.x}
          cy={e.y}
          r={e.r}
          fill="#fff6d8"
          style={{ ["--d" as string]: e.d, ["--delay" as string]: e.delay }}
        />
      ))}
      <circle cx="940" cy="150" r="130" fill="url(#bb-luna)" opacity="0.55" />
      <circle cx="940" cy="150" r="46" fill="#fff4cf" opacity="0.95" />
    </svg>

    <svg className={s.castillo} viewBox="0 170 1200 630" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <defs>
        <linearGradient id="bb-castillo2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2350" />
          <stop offset="1" stopColor="#0a0f2a" />
        </linearGradient>
      </defs>
      {/* Colinas lejanas */}
      <path d="M0 610 C180 540 320 560 470 590 C620 620 760 540 900 560 C1030 578 1120 600 1200 590 V800 H0Z" fill="#1a2152" opacity="0.85" />

      {/* Castillo */}
      <g fill="url(#bb-castillo2)">
        <rect x="455" y="420" width="290" height="230" />
        <rect x="520" y="330" width="60" height="320" />
        <rect x="620" y="300" width="70" height="350" />
        <rect x="420" y="380" width="52" height="270" />
        <rect x="730" y="390" width="52" height="260" />
        <rect x="565" y="250" width="34" height="200" />
        <path d="M520 330 L550 250 L580 330Z" />
        <path d="M620 300 L655 190 L690 300Z" />
        <path d="M420 380 L446 318 L472 380Z" />
        <path d="M730 390 L756 330 L782 390Z" />
        <path d="M565 250 L582 190 L599 250Z" />
        <path d="M455 420 h290 v-14 h-14 v-10 h-16 v10 h-18 v-10 h-16 v10 h-18 v-10 h-16 v10 h-18 v-10 h-16 v10 h-18 v-10 h-16 v10 h-18 v-10 h-16 v10 h-18 v-10 h-16 v10 h-18 v-10 h-16 v10 h-12z" />
      </g>
      {/* Banderines */}
      <path d="M655 190 v-26 l22 8 l-22 8" stroke="#d9b25f" strokeWidth="2" fill="#d9b25f" className={s.banderin} />
      <path d="M550 250 v-22 l18 7 l-18 7" stroke="#d9b25f" strokeWidth="2" fill="#d9b25f" className={s.banderin} />
      {/* Ventanas encendidas */}
      <g fill="#f6c86b" className={s.ventanas}>
        <rect x="540" y="370" width="12" height="20" rx="6" />
        <rect x="645" y="340" width="14" height="24" rx="7" />
        <rect x="645" y="400" width="14" height="24" rx="7" />
        <rect x="436" y="430" width="10" height="18" rx="5" />
        <rect x="748" y="440" width="10" height="18" rx="5" />
        <rect x="500" y="480" width="16" height="26" rx="8" />
        <rect x="690" y="480" width="16" height="26" rx="8" />
        <rect x="585" y="520" width="30" height="46" rx="15" />
        <rect x="576" y="285" width="10" height="16" rx="5" />
      </g>

      {/* Bosque en primer plano */}
      <path
        d="M0 700 L30 640 L55 700 L80 610 L110 700 L140 650 L165 700 L200 590 L235 700 L270 640 L300 700 L330 660 L360 700 L1200 700 V800 H0Z"
        fill="#060a1d"
      />
      <path
        d="M840 700 L870 640 L900 700 L930 600 L965 700 L995 650 L1025 700 L1060 590 L1095 700 L1125 640 L1160 700 L1200 620 V800 H840Z"
        fill="#060a1d"
      />
      <rect y="698" width="1200" height="102" fill="#060a1d" />
    </svg>
    </>
  );
}

/* La rosa encantada bajo su campana de cristal. */
export function RosaEncantada({ className = "" }: { className?: string }) {
  return (
    <svg className={`${s.rosaEncantada} ${className}`} viewBox="0 0 140 190" aria-hidden>
      <defs>
        <radialGradient id="bb-brillo" cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor="#ff9fb0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ff9fb0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bb-petalo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2324f" />
          <stop offset="1" stopColor="#8e1027" />
        </linearGradient>
        <linearGradient id="bb-oro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dc94" />
          <stop offset="0.5" stopColor="#c99a3e" />
          <stop offset="1" stopColor="#f1d48a" />
        </linearGradient>
      </defs>
      <circle cx="70" cy="78" r="58" fill="url(#bb-brillo)" className={s.rosaBrillo} />
      {/* Tallo y hojas */}
      <path d="M70 150 C68 130 72 112 70 96" stroke="#3f7d4a" strokeWidth="3" fill="none" />
      <path d="M70 128 C58 122 52 112 56 104 C64 108 70 116 70 128Z" fill="#3f7d4a" />
      <path d="M70 118 C82 114 88 104 85 96 C77 100 71 108 70 118Z" fill="#3f7d4a" />
      {/* Rosa */}
      <g transform="translate(70 80)">
        <path d="M-20 4 C-24 -14 -8 -26 0 -24 C8 -26 24 -14 20 4 C16 18 -16 18 -20 4Z" fill="url(#bb-petalo)" />
        <path d="M-12 -2 C-14 -14 -4 -20 2 -18 C10 -20 16 -10 12 0 C8 8 -8 8 -12 -2Z" fill="#c21d3a" />
        <path d="M-5 -6 C-4 -14 6 -14 6 -6 C6 0 -4 0 -5 -6Z" fill="#7a0c20" />
        <path d="M-22 6 C-30 0 -30 -10 -22 -14 C-20 -6 -18 0 -22 6Z" fill="#a8142f" />
        <path d="M22 6 C30 0 30 -10 22 -14 C20 -6 18 0 22 6Z" fill="#a8142f" />
      </g>
      {/* Pétalo que cae */}
      <path className={s.petaloCae} d="M84 104 c5 -4 11 -1 10 5 c-1 5 -8 6 -10 2 z" fill="#c21d3a" />
      {/* Campana de cristal */}
      <path
        d="M22 156 V70 C22 30 46 12 70 12 C94 12 118 30 118 70 V156"
        fill="rgba(200,220,255,0.10)"
        stroke="rgba(235,245,255,0.75)"
        strokeWidth="2"
      />
      <path d="M34 140 V74 C34 44 50 28 64 24" stroke="rgba(255,255,255,0.55)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="10" r="5" fill="url(#bb-oro)" />
      {/* Base dorada */}
      <path d="M12 156 H128 L120 172 H20Z" fill="url(#bb-oro)" />
      <rect x="28" y="172" width="84" height="10" rx="3" fill="#b88a34" />
    </svg>
  );
}

/* Pétalos de rosa que caen por toda la invitación. Capa fija y sin
   interacción, por encima de los fondos y debajo del contenido. */
const PETALOS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 71 + 7) % 100,
  d: `${13 + (i % 6) * 2}s`,
  delay: `${-((i * 2.3) % 18)}s`,
  x: `${((i % 5) - 2) * 40}px`,
  s: `${12 + (i % 4) * 4}px`,
}));

export function Petalos() {
  return (
    <div className={s.petalos} aria-hidden>
      {PETALOS.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            ["--d" as string]: p.d,
            ["--delay" as string]: p.delay,
            ["--x" as string]: p.x,
            width: p.s,
            height: p.s,
          }}
        />
      ))}
    </div>
  );
}

/* Separador dorado con una rosa al centro. */
export function Separador() {
  return (
    <svg className={s.separador} viewBox="0 0 260 30" aria-hidden>
      <path d="M0 15 H100 M160 15 H260" stroke="currentColor" strokeWidth="1" />
      <path d="M100 15 C108 6 116 6 120 15 C116 24 108 24 100 15Z M160 15 C152 6 144 6 140 15 C144 24 152 24 160 15Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="130" cy="15" r="7" fill="#b3203a" />
      <circle cx="130" cy="15" r="3" fill="#7a0c20" />
    </svg>
  );
}
