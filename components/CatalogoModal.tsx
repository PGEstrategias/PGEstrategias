"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = { name: string; discontinued?: boolean };

type PriceGroup = { price: number; items: Item[] };

type Section = {
  finish: string;
  subtitle?: string;
  groups: PriceGroup[];
};

const sections: Section[] = [
  {
    finish: "Acabado Matt",
    subtitle: "Línea Ascale piedra sinterizada",
    groups: [
      { price: 22930, items: [{ name: "CROMA SILVER" }, { name: "CROMA BLACK" }, { name: "CROMA GRAY" }] },
      { price: 23200, items: [{ name: "ALPI WHITE" }] },
      {
        price: 26990,
        items: [
          { name: "BAHIA SILVER", discontinued: true },
          { name: "BOREAL UMBER" },
          { name: "BOREAL SAND" },
          { name: "GRASSI WHITE" },
          { name: "NEW TORANO STATUARIO" },
          { name: "ALTO STATUARIO", discontinued: true },
          { name: "ARMANI SILVER" },
          { name: "MARQUINA BLACK" },
          { name: "BELVEDERE BLACK" },
          { name: "DUCAL GOLD" },
          { name: "CARDOSO GRAY" },
          { name: "TIVOLI WHITE" },
          { name: "MOON BLACK" },
          { name: "ALLURE BLACK" },
          { name: "ETNA BLACK" },
          { name: "COSMOPOLITA GRAY" },
          { name: "MONTBLANC WHITE" },
          { name: "VAGLI GOLD" },
          { name: "ARIZONA SAND" },
          { name: "BORGOGNA SILVER", discontinued: true },
          { name: "CEPPO DI GRE" },
          { name: "PALOMA STONE LINEN" },
          { name: "ANTALYA SAND" },
          { name: "PIERRE BLEUE" },
          { name: "DUNE GRAY", discontinued: true },
          { name: "NEBULA BROWN" },
          { name: "PORTLAND LINEN" },
          { name: "PORTLAND PEARL" },
          { name: "MOMA RUSTEL", discontinued: true },
          { name: "MILLENIUM COOPER", discontinued: true },
          { name: "SAHARA NOIR", discontinued: true },
        ],
      },
      {
        price: 29300,
        items: [
          { name: "LUCCA GOLD" },
          { name: "TAJ MAHAL" },
          { name: "CROTONE PULPIS" },
          { name: "MACCHIA VECCHIA GOLD" },
          { name: "ARABESCATO WHITE", discontinued: true },
          { name: "LAURENT BLACK" },
          { name: "LABRADORITE ROYAL BLUE" },
          { name: "AMAZONITE SEAGREEN" },
          { name: "PATAGONIA" },
          { name: "CRYSTAL LUX WHITE" },
        ],
      },
    ],
  },
  {
    finish: "Acabado Polished",
    subtitle: "Línea Ascale piedra sinterizada",
    groups: [
      {
        price: 31000,
        items: [
          { name: "VAGLI GOLD" },
          { name: "GRASSI WHITE" },
          { name: "TORANO STATUARIO", discontinued: true },
          { name: "ARMANI SILVER", discontinued: true },
          { name: "MARQUINA BLACK" },
          { name: "BAHIA SILVER", discontinued: true },
          { name: "BELVEDERE BLACK" },
          { name: "DUCAL GOLD" },
          { name: "ALLURE BLACK", discontinued: true },
          { name: "LASA WHITE" },
          { name: "MONTBLANC WHITE", discontinued: true },
          { name: "LUCCA GOLD" },
          { name: "TAJ MAHAL" },
          { name: "ALTO STATUARIO", discontinued: true },
          { name: "CALACATTA VIOLA", discontinued: true },
          { name: "ARABESCATO WHITE", discontinued: true },
        ],
      },
      {
        price: 35000,
        items: [
          { name: "MACCHIA VECCHIA GOLD" },
          { name: "AMAZONITE SEAGREEN" },
          { name: "LABRADORITE ROYAL BLUE" },
          { name: "LAURENT BLACK" },
          { name: "PATAGONIA" },
          { name: "CRYSTAL LUX WHITE" },
        ],
      },
    ],
  },
  {
    finish: "Luxury Onice",
    subtitle: "Línea Ascale piedra sinterizada · dos formatos",
    groups: [
      {
        price: 30000,
        items: [
          { name: "ONICE BLACK" },
          { name: "ONICE BLUE" },
          { name: "ONICE SEAGREEN" },
          { name: "ONICE LUX WHITE" },
        ],
      },
      {
        price: 40000,
        items: [
          { name: "ONICE BLACK" },
          { name: "ONICE BLUE" },
          { name: "ONICE SEAGREEN" },
          { name: "ONICE LUX WHITE" },
        ],
      },
    ],
  },
];

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

export default function CatalogoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-0 md:p-6"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1100px] h-full md:h-[90vh] overflow-hidden flex flex-col"
            style={{
              background: "#0D0D0D",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Header sticky */}
            <div
              className="flex items-center justify-between px-6 md:px-10 py-5"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(13,13,13,0.95)",
              }}
            >
              <div>
                <p
                  className="font-body text-[10px] tracking-[var(--ls-label)] uppercase mb-1"
                  style={{ color: "#A6E22E" }}
                >
                  Lista 2026 · Ascale
                </p>
                <h3
                  className="font-title text-pg-light"
                  style={{
                    fontSize: "clamp(20px, 2.4vw, 28px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Catálogo <em style={{ color: "#A6E22E", fontStyle: "italic" }}>Cubiertas y Herrajes</em>
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar catálogo"
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </button>
            </div>

            {/* Intro */}
            <div
              className="px-6 md:px-10 py-4"
              style={{
                background: "rgba(166,226,46,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="font-body text-[12px] md:text-[13px] leading-[1.6]"
                style={{ color: "rgba(245,245,245,0.7)" }}
              >
                Precios públicos con IVA incluido, puestos en bodega.{" "}
                <span style={{ color: "#A6E22E", fontWeight: 600 }}>
                  Pregunta por tu descuento.
                </span>{" "}
                Los modelos marcados con
                <span
                  className="inline-block mx-1.5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider align-middle"
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    color: "#F5B342",
                    border: "1px solid rgba(245,158,11,0.4)",
                  }}
                >
                  Descontinuado
                </span>
                dejan de producirse en febrero 2026 — consulta disponibilidad antes de cotizar.
              </p>
            </div>

            {/* Body scrollable */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 md:py-10">
              {sections.map((section, si) => (
                <section key={section.finish} className={si > 0 ? "mt-14" : ""}>
                  <div className="flex items-end justify-between mb-1 gap-4">
                    <h4
                      className="font-title text-pg-light"
                      style={{
                        fontSize: "clamp(22px, 2.8vw, 34px)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {section.finish}
                    </h4>
                  </div>
                  {section.subtitle && (
                    <p
                      className="font-body text-[12px] uppercase tracking-[0.12em] mb-8"
                      style={{ color: "rgba(245,245,245,0.4)" }}
                    >
                      {section.subtitle}
                    </p>
                  )}

                  {section.groups.map((g) => (
                    <div key={`${section.finish}-${g.price}`} className="mb-10 last:mb-0">
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="font-title font-bold leading-none"
                          style={{ color: "#A6E22E", fontSize: 24 }}
                        >
                          {fmt(g.price)}
                        </span>
                        <span
                          className="flex-1 h-px"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(166,226,46,0.3), transparent)",
                          }}
                        />
                        <span
                          className="font-body text-[10px] uppercase tracking-[0.14em]"
                          style={{ color: "rgba(245,245,245,0.35)" }}
                        >
                          {g.items.length} modelo{g.items.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {g.items.map((it, idx) => (
                          <div
                            key={`${it.name}-${idx}`}
                            className="flex items-center justify-between px-4 py-3 transition-colors duration-300 hover:bg-white/5"
                            style={{
                              border: "1px solid rgba(255,255,255,0.08)",
                              background: "rgba(255,255,255,0.02)",
                            }}
                          >
                            <div className="min-w-0 flex-1">
                              <p
                                className="font-body text-[13px] md:text-[14px] text-white truncate"
                                style={{ fontWeight: 500, letterSpacing: "0.02em" }}
                              >
                                {it.name}
                              </p>
                              {it.discontinued && (
                                <p
                                  className="font-body text-[9px] uppercase tracking-[0.12em] mt-1"
                                  style={{ color: "#F5B342" }}
                                >
                                  Descontinuado feb 2026
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ))}

              {/* Footer info */}
              <div
                className="mt-14 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.14em] mb-2"
                    style={{ color: "rgba(245,245,245,0.4)" }}
                  >
                    Envíos
                  </p>
                  <p
                    className="font-body text-[13px] leading-[1.6]"
                    style={{ color: "rgba(245,245,245,0.7)" }}
                  >
                    Sin costo dentro de la zona conurbada de Puebla. Fuera de la
                    zona o del estado se cotiza por distancia. Materiales no
                    existentes en Puebla tardan de 3 a 7 días hábiles en llegar.
                  </p>
                </div>
                <div>
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.14em] mb-2"
                    style={{ color: "rgba(245,245,245,0.4)" }}
                  >
                    Bodega y oficinas
                  </p>
                  <p
                    className="font-body text-[13px] leading-[1.6]"
                    style={{ color: "rgba(245,245,245,0.7)" }}
                  >
                    19 Poniente 2911, Belisario Domínguez, C.P. 72180, Puebla,
                    Pue.
                    <br />
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/522212550728"
                      target="_blank"
                      rel="noopener"
                      className="transition-colors duration-300 hover:text-lime"
                      style={{ color: "#A6E22E" }}
                    >
                      221 255 0728
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div
              className="px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(13,13,13,0.95)",
              }}
            >
              <p
                className="font-body text-[12px]"
                style={{ color: "rgba(245,245,245,0.55)" }}
              >
                ¿Listo para cotizar? Pregunta por tu descuento.
              </p>
              <a
                href="https://wa.me/522212550728?text=Hola%2C%20vi%20el%20cat%C3%A1logo%20Ascale%202026%20y%20quiero%20cotizar."
                target="_blank"
                rel="noopener"
                className="font-title font-bold text-pg-black px-6 py-3 text-[12px] tracking-wide transition-opacity duration-500 hover:opacity-80"
                style={{ background: "#A6E22E" }}
              >
                Cotizar por WhatsApp →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
