/* Destellos champaña que suben despacio. Puramente decorativos: se ocultan
   con movimiento reducido (ver .bodas-sparkles en globals.css). */
const PUNTOS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  d: 10 + ((i * 7) % 9),
  delay: -((i * 1.7) % 12),
  x: ((i % 5) - 2) * 18,
  size: 3 + (i % 3),
}));

export default function Sparkles() {
  return (
    <div className="bodas-sparkles" aria-hidden>
      {PUNTOS.map((p, i) => (
        <span
          key={i}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              "--d": `${p.d}s`,
              "--delay": `${p.delay}s`,
              "--x": `${p.x}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
