"use client";
import React, { useState } from "react";
import { REGALOS } from "@/lib/invitaciones/demo";

/**
 * La CLABE se copia con un toque: nadie transcribe 18 dígitos a mano desde el
 * celular sin equivocarse, y ahí es donde se pierde el regalo.
 */
function BotonCopiar({ valor }: { valor: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* Safari sin permiso de portapapeles: se deja el número a la vista
         para que el invitado lo seleccione a mano. */
      setCopiado(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="font-body text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 transition-opacity hover:opacity-70"
      style={{ color: "#C4A052" }}
    >
      {copiado ? "Copiado" : "Copiar"}
    </button>
  );
}

export default function Regalos() {
  return (
    <section id="regalos" className="bodas-light py-20 md:py-28">
      <div className="bodas-container max-w-2xl">
        <div className="text-center mb-12">
          <p className="bodas-label bodas-label-ink mb-4">Mesa de regalos</p>
          <h2 className="bodas-title">
            Tu presencia ya es <span className="bodas-em-rose">el regalo</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            Pero si te queda la duda, aquí dejamos las opciones.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {REGALOS.map((regalo) => (
            <div
              key={regalo.tienda}
              className="bodas-card-light p-6 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <h3 className="bodas-heading text-xl mb-1">{regalo.tienda}</h3>
                <p
                  className="font-body text-[13px] break-words"
                  style={{ color: "#4A443D" }}
                >
                  {regalo.detalle}
                </p>
              </div>

              <div className="flex items-center gap-5 shrink-0">
                <BotonCopiar valor={regalo.valor} />
                {regalo.url && (
                  <a
                    href={regalo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 transition-opacity hover:opacity-70"
                    style={{ color: "#A85E56" }}
                  >
                    Abrir
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
