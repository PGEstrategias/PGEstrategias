"use client";
import React from "react";
import { whatsappUrl } from "@/components/bodas/contacto";
import { FICHAS, type Plan } from "@/lib/invitaciones/planes";

/**
 * Barra fija que recuerda que esto es una muestra y no la boda de nadie.
 * Va abajo porque es donde el pulgar ya está, y deja a un toque las dos
 * acciones que importan: comparar con el otro plan y cotizar.
 */
export default function BarraDemo({ plan }: { plan: Plan }) {
  const ficha = FICHAS[plan];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(20,18,15,0.94)",
        borderTop: "1px solid rgba(196,160,82,0.35)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="bodas-container !px-4 md:!px-8 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className="font-body text-[9px] uppercase tracking-[0.2em]"
            style={{ color: "#C4A052" }}
          >
            Demo · Paquete {ficha.nombre}
          </p>
          <p
            className="font-body text-[12px] truncate"
            style={{ color: "rgba(247,243,238,0.5)" }}
          >
            <span className="hidden sm:inline">{ficha.promesa} · </span>
            {ficha.precio} MXN
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={`/invitacionesdebodas/demo/${ficha.otro}`}
            className="font-body text-[11px] uppercase tracking-[0.12em] underline underline-offset-4 whitespace-nowrap transition-opacity hover:opacity-70"
            style={{ color: "rgba(247,243,238,0.6)" }}
          >
            Ver <span className="hidden sm:inline">el </span>{ficha.otroNombre}
          </a>
          <a
            href={whatsappUrl(
              `Hola, vi el demo del paquete ${ficha.nombre} de invitaciones digitales (${ficha.precio} MXN) y quiero cotizarlo para mi boda.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="bodas-btn-gold !py-2.5 !px-4 !text-[11px] whitespace-nowrap"
          >
            Lo quiero
          </a>
        </div>
      </div>
    </div>
  );
}
