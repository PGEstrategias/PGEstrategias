"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";
import WhatsAppIcon from "@/components/bodas/WhatsAppIcon";
import { COORDINACION, PLANEACION_360 } from "./datos";

/* Champán sobre chocolate, bronce sobre marfil (variables de .pj-root). */
const GOLD = "var(--b-gold)";
const BRONCE = "var(--b-rose)";

const aparecer = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
};

export default function PlaneacionPaquetes() {
  return (
    <section id="paquetes">
      {/* ── Qué separa a uno del otro ─────────────────────── */}
      <div className="bodas-light py-20 md:py-28">
        <div className="bodas-container">
          <motion.div {...aparecer} className="text-center max-w-3xl mx-auto">
            <p className="bodas-label bodas-label-ink mb-5">Dos paquetes</p>
            <h2 className="bodas-title">
              ¿Les coordinamos el día o <em className="bodas-em-rose">la boda entera</em>?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto">
            {[COORDINACION, PLANEACION_360].map((p) => (
              <motion.a
                key={p.id}
                {...aparecer}
                href={`#${p.id}`}
                className="bodas-card-light p-8 block no-underline"
              >
                <h3 className="bodas-heading text-2xl mb-3" style={{ color: "var(--b-ink)" }}>
                  {p.nombre}
                </h3>
                <p style={{ color: "var(--b-muted-light)", lineHeight: 1.7 }}>{p.paraQuien}</p>
                <p className="mt-6 font-body text-[13px]" style={{ color: BRONCE, letterSpacing: "0.06em" }}>
                  {p.precio ? `Desde ${p.precio} MXN` : "Cotización a medida"}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Paquete 1 ─────────────────────────────────────── */}
      <div id={COORDINACION.id} className="bodas-dark py-24 md:py-32 scroll-mt-20">
        <div className="bodas-container">
          <motion.div {...aparecer} className="max-w-3xl">
            <p className="bodas-label mb-5">Paquete uno</p>
            <h2 className="bodas-title">{COORDINACION.nombre}</h2>
            <p className="bodas-display-split bodas-heading mt-6" style={{ fontSize: "clamp(24px,3vw,34px)", color: GOLD }}>
              {COORDINACION.lema}
            </p>
            <p className="bodas-subtitle mt-6">{COORDINACION.entrada}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
            {COORDINACION.bloques.map((bloque, i) => (
              <motion.div
                key={bloque.titulo}
                {...aparecer}
                transition={{ ...aparecer.transition, delay: i * 0.06 }}
                /* Son cinco bloques en dos columnas: el último ocupa el
                   ancho completo en vez de dejar un hueco a su derecha. */
                className={`bodas-card-dark p-7${
                  i === COORDINACION.bloques.length - 1 && COORDINACION.bloques.length % 2 === 1
                    ? " md:col-span-2"
                    : ""
                }`}
              >
                <h3 className="bodas-heading text-xl mb-4">{bloque.titulo}</h3>
                <ul className="space-y-3">
                  {bloque.puntos.map((punto) => (
                    <li key={punto} className="flex gap-3 text-[15px]" style={{ color: "rgba(247,243,238,0.66)", lineHeight: 1.65 }}>
                      <span aria-hidden style={{ color: GOLD, flexShrink: 0 }}>◆</span>
                      <span>{punto}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div {...aparecer} className="bodas-frame mt-14 px-8 py-10 md:px-12 md:py-12">
            <p className="bodas-label mb-4">{COORDINACION.compromiso.titulo}</p>
            <p className="bodas-subtitle" style={{ maxWidth: "48rem" }}>
              {COORDINACION.compromiso.texto}
            </p>
            <p className="bodas-heading mt-6" style={{ fontSize: "clamp(20px,2.4vw,27px)" }}>
              {COORDINACION.compromiso.cierre}
            </p>
            <div className="flex flex-wrap items-center gap-5 mt-9">
              <a
                href={whatsappUrl(`Hola, quiero información sobre el paquete de ${COORDINACION.nombre.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bodas-btn-gold"
              >
                <WhatsAppIcon />
                Cotizar este paquete
              </a>
              <p className="font-body text-[13px]" style={{ color: "rgba(247,243,238,0.45)" }}>
                {COORDINACION.precioNota}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Paquete 2 ─────────────────────────────────────── */}
      <div id={PLANEACION_360.id} className="bodas-blush py-24 md:py-32 scroll-mt-20">
        <div className="bodas-container">
          <motion.div {...aparecer} className="max-w-3xl">
            <p className="bodas-label bodas-label-ink mb-5">Paquete dos · Todo incluido</p>
            <h2 className="bodas-title">{PLANEACION_360.nombre}</h2>
            <p
              className="bodas-heading mt-6"
              style={{ fontSize: "clamp(22px,2.8vw,32px)", color: BRONCE, fontStyle: "italic" }}
            >
              {PLANEACION_360.lema}
            </p>
            <p className="bodas-subtitle mt-6">{PLANEACION_360.entrada}</p>
            <p className="bodas-subtitle mt-4">{PLANEACION_360.promesa}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            {PLANEACION_360.pilares.map((pilar, i) => (
              <motion.div
                key={pilar.titulo}
                {...aparecer}
                transition={{ ...aparecer.transition, delay: i * 0.05 }}
                className="bodas-card-light p-7"
              >
                <h3 className="bodas-heading text-xl mb-3" style={{ color: "var(--b-ink)" }}>
                  {pilar.titulo}
                </h3>
                <p style={{ color: "var(--b-muted-light)", lineHeight: 1.7, fontSize: "15px" }}>
                  {pilar.texto}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...aparecer} className="mt-14 text-center">
            <p className="bodas-heading" style={{ fontSize: "clamp(20px,2.4vw,28px)", color: "var(--b-ink)" }}>
              {PLANEACION_360.cierre}
            </p>

            <div
              className="bodas-card-light inline-block mt-10 px-10 py-9"
              style={{ borderColor: "rgba(140,94,69,0.35)" }}
            >
              <p className="bodas-label bodas-label-ink mb-3">Inversión</p>
              <p
                className="bodas-display"
                style={{ fontSize: "clamp(42px,6vw,66px)", color: "var(--b-ink)", lineHeight: 1 }}
              >
                {PLANEACION_360.precio}
                <span className="font-body ml-2" style={{ fontSize: "16px", color: "var(--b-muted-light)" }}>
                  MXN
                </span>
              </p>
              <p className="mt-3" style={{ color: "var(--b-muted-light)", fontSize: "15px" }}>
                {PLANEACION_360.precioNota}
              </p>
              <a
                href={whatsappUrl(`Hola, quiero información sobre el paquete ${PLANEACION_360.nombre}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bodas-btn-ink mt-7"
              >
                <WhatsAppIcon />
                Apartar fecha
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
