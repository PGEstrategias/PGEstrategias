import fs from 'node:fs';
import path from 'node:path';

/**
 * Logotipo de Lista Médica.
 *
 * Busca el archivo en public/listamedica/ y, mientras no exista, cae en el
 * nombre tipográfico. Así el sitio nunca muestra una imagen rota y meter el
 * logo definitivo es soltar el archivo, sin tocar código.
 *
 * La variante clara es para el pie, que va sobre fondo oscuro: la mitad azul
 * marino del logotipo a color se pierde ahí.
 */

const CARPETA = path.join(process.cwd(), 'public', 'listamedica');

/** Se resuelve una sola vez por proceso, no en cada render. */
function primeroQueExista(nombres: string[]): string | null {
  for (const nombre of nombres) {
    try {
      if (fs.existsSync(path.join(CARPETA, nombre))) return `/listamedica/${nombre}`;
    } catch {
      // Sistema de archivos inaccesible: se usa el nombre tipográfico.
    }
  }
  return null;
}

const COLOR = primeroQueExista(['logo.svg', 'logo.png', 'logo.webp']);
const CLARO = primeroQueExista(['logo-claro.svg', 'logo-claro.png', 'logo-claro.webp']);

export function hayLogotipo(variante: 'color' | 'claro' = 'color'): boolean {
  return Boolean(variante === 'claro' ? CLARO ?? COLOR : COLOR);
}

export default function Logotipo({
  variante = 'color',
  alto = 30,
}: {
  variante?: 'color' | 'claro';
  alto?: number;
}) {
  // Si no hay versión clara todavía, es preferible el nombre tipográfico a
  // poner el logo a color sobre el fondo oscuro del pie.
  const archivo = variante === 'claro' ? CLARO : COLOR;

  if (!archivo) {
    return (
      <span className="lm-marca__texto">
        Lista <em>Médica</em>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={archivo}
      alt="Lista Médica"
      className="lm-marca__logo"
      // Va como variable y no como alto directo para que el CSS pueda
      // encogerlo en pantallas angostas sin pelear con el estilo en línea.
      style={{ '--alto-logo': `${alto}px` } as React.CSSProperties}
      decoding="async"
    />
  );
}
