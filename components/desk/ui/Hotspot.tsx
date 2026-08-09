"use client";

/* ============================================================
   Hotspot — control interactivo accesible.
   Cada objeto del escritorio sobre el que se hace clic es un
   <button> real: foco visible, Enter/Espacio nativos y
   aria-label. Es la unidad de interacción de toda la VSL.
   ============================================================ */

import { ReactNode } from "react";

type HotspotProps = {
  label: string; // aria-label (qué hace este clic)
  onActivate: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Hotspot({ label, onActivate, disabled, className = "", children }: HotspotProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onActivate}
      className={`group relative cursor-pointer rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-default ${className}`}
    >
      {children}
    </button>
  );
}
