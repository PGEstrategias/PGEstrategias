"use client";

// Logo PG Estrategias recreado en SVG a partir de la imagen oficial.
// Cuatro barras verdes ascendentes + "PG" bold blanco + "ESTRATEGIAS" gris claro.

type Props = {
  height?: number;
  className?: string;
};

export default function LogoPG({ height = 56, className }: Props) {
  const GREEN = "#A7E12F";
  const WHITE = "#FFFFFF";
  const GREY = "#B8B8B8";

  return (
    <svg
      viewBox="0 0 520 100"
      height={height}
      className={className}
      role="img"
      aria-label="PG Estrategias"
    >
      {/* Cuatro barras ascendentes */}
      <g fill={GREEN}>
        <rect x="6" y="60" width="16" height="34" rx="3" />
        <rect x="30" y="46" width="16" height="48" rx="3" />
        <rect x="54" y="30" width="16" height="64" rx="3" />
        <rect x="78" y="14" width="16" height="80" rx="3" />
      </g>

      {/* PG en blanco bold */}
      <text
        x="120"
        y="72"
        fill={WHITE}
        fontFamily="'Syne', system-ui, sans-serif"
        fontWeight={800}
        fontSize="56"
        letterSpacing="-0.5"
      >
        PG
      </text>

      {/* ESTRATEGIAS en gris */}
      <text
        x="220"
        y="72"
        fill={GREY}
        fontFamily="'Syne', system-ui, sans-serif"
        fontWeight={400}
        fontSize="46"
        letterSpacing="3"
      >
        ESTRATEGIAS
      </text>
    </svg>
  );
}
