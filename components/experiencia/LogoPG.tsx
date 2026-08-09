"use client";

// Logo PG Estrategias en HTML + SVG.
// Se maqueta con flex para que "PG" y "ESTRATEGIAS" no puedan solaparse.

type Props = {
  height?: number;
  className?: string;
  monochrome?: boolean; // si true, todo blanco (útil para el fondo desvanecido)
};

export default function LogoPG({ height = 56, className, monochrome = false }: Props) {
  const green = monochrome ? "currentColor" : "#A7E12F";
  const white = "currentColor";
  const grey = monochrome ? "currentColor" : "#B8B8B8";

  // Escalas relativas al height total del bloque
  const barsWidth = height * 1.05;
  const pgSize = height * 0.72;
  const estSize = height * 0.55;

  return (
    <div
      className={`inline-flex items-center ${className ?? ""}`}
      style={{ height, gap: height * 0.18, color: white }}
    >
      {/* Barras ascendentes */}
      <svg
        viewBox="0 0 100 100"
        style={{ height: "100%", width: barsWidth }}
        fill={green}
      >
        <rect x="6" y="60" width="16" height="34" rx="3" />
        <rect x="30" y="46" width="16" height="48" rx="3" />
        <rect x="54" y="30" width="16" height="64" rx="3" />
        <rect x="78" y="14" width="16" height="80" rx="3" />
      </svg>

      {/* Wordmark */}
      <div
        className="flex items-baseline whitespace-nowrap"
        style={{
          fontFamily: "'Syne', system-ui, sans-serif",
          gap: height * 0.22,
        }}
      >
        <span
          style={{
            fontSize: pgSize,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: white,
            lineHeight: 1,
          }}
        >
          PG
        </span>
        <span
          style={{
            fontSize: estSize,
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: grey,
            lineHeight: 1,
          }}
        >
          ESTRATEGIAS
        </span>
      </div>
    </div>
  );
}
