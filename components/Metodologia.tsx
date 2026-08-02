"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const pasos = [
  {
    num: "01",
    dias: "Días 1–2",
    title: "Entendemos tu negocio",
    desc: "Hacemos una llamada donde conocemos tu producto, precios y cómo funciona tu venta actualmente. Salimos con un plan de 90 días firmado y un brief de estrategia.",
  },
  {
    num: "02",
    dias: "Días 3–5",
    title: "Preparamos todo el sistema",
    desc: "Conectamos tus cuentas de anuncios, Google, WhatsApp y herramientas. Instalamos el rastreo para que cada peso invertido sea medible desde el primer día.",
  },
  {
    num: "03",
    dias: "Días 6–8",
    title: "Diseñamos tu sistema de conversión",
    desc: "Definimos los ángulos creativos, mensajes clave y ofertas. Diseñamos la página de aterrizaje lista para convertir visitantes en prospectos.",
  },
  {
    num: "04",
    dias: "Días 9–13",
    title: "Grabamos y armamos las campañas",
    desc: "Sesión de grabación, edición y aprobación final. Montamos la estructura de campañas y hacemos control de calidad antes de encender.",
  },
  {
    num: "05",
    dias: "Día 14",
    title: "El motor arranca",
    desc: "Campañas activas, landing page conectada y primer reporte agendado a los 7 días. A partir de aquí, optimizamos semana a semana.",
  },
];

export default function Metodologia() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="metodologia"
      className="py-40"
      style={{ background: "#E4E0DD" }}
    >
      <div className="max-w-[1300px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div
          ref={headRef}
          className="mb-24 pt-8"
          style={{ borderTop: "1px solid rgba(28,28,26,0.12)" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="w-8 h-px block"
              style={{ background: "#D63A27" }}
            />
            <p
              className="font-body text-[11px] uppercase tracking-[var(--ls-label)]"
              style={{ color: "rgba(28,28,26,0.45)" }}
            >
              Nuestra metodología
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-title"
              style={{
                fontSize: "var(--t-h2)",
                fontWeight: 400,
                lineHeight: "var(--lh-h2)",
                letterSpacing: "var(--ls-h2)",
                color: "#1C1C1A",
              }}
            >
              Del primer click
              <br />
              al cliente recurrente
              <br />
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                en 2 meses.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[17px] leading-[1.7]"
              style={{ color: "rgba(28,28,26,0.6)" }}
            >
              Un proceso de 5 pasos diseñado para que no tengas que coordinar
              nada. Nosotros lo operamos todo.
            </motion.p>
          </div>
        </div>

        {/* Steps */}
        <div ref={stepsRef}>
          {/* Línea roja animada por scroll (desktop) */}
          <div className="hidden md:block relative">
            <div
              className="absolute top-0 left-0 h-px"
              style={{
                width: "100%",
                background: "rgba(28,28,26,0.15)",
              }}
            />
            <motion.div
              className="absolute top-0 left-0 h-px z-[1]"
              style={{
                width: lineWidth,
                background: "#D63A27",
              }}
            />
          </div>

          {/* Desktop: 5 columnas */}
          <div className="hidden md:grid md:grid-cols-5 relative">
            {pasos.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-8 pb-4 pr-8 relative group"
              >
                {/* Punto en la línea */}
                <span
                  className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: "#D63A27" }}
                />
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-body tabular-nums text-[11px]"
                    style={{
                      color: "rgba(28,28,26,0.35)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="font-body text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: "#D63A27" }}
                  >
                    {p.dias}
                  </span>
                </div>
                <h3
                  className="font-title mb-3 leading-snug transition-colors duration-500 group-hover:text-[color:#D63A27]"
                  style={{
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    fontWeight: 500,
                    color: "#1C1C1A",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-body text-[12px] leading-[1.65]"
                  style={{ color: "rgba(28,28,26,0.55)" }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden flex flex-col">
            {pasos.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: -12 }}
                animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="py-6 relative pl-6"
                style={{
                  borderLeft:
                    i === 4
                      ? "2px solid #D63A27"
                      : "1px solid rgba(28,28,26,0.15)",
                }}
              >
                <span
                  className="absolute -left-[4px] top-8 w-2 h-2 rounded-full"
                  style={{
                    background: i === 4 ? "#D63A27" : "rgba(28,28,26,0.4)",
                  }}
                />
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-body text-[11px] tabular-nums"
                    style={{ color: "rgba(28,28,26,0.35)" }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="font-body text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: "#D63A27" }}
                  >
                    {p.dias}
                  </span>
                </div>
                <h3
                  className="font-title text-[17px] mb-2"
                  style={{ fontWeight: 500, color: "#1C1C1A" }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-body text-[13px] leading-[1.65]"
                  style={{ color: "rgba(28,28,26,0.55)" }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(28,28,26,0.1)" }}
        >
          <a
            href="#contacto"
            className="link-underline font-body text-[13px] tracking-[0.12em] uppercase inline-flex items-center gap-3 transition-colors duration-500"
            style={{ color: "rgba(28,28,26,0.75)" }}
          >
            Empieza en 14 días{" "}
            <span style={{ color: "#D63A27" }}>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
