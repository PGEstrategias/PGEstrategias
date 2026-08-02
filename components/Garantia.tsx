"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useContactMenu } from "@/context/ContactMenuContext";

const MSG_GARANTIA =
  "Hola, me interesa saber más sobre la garantía de 30 días de PG Estrategias.";

export default function Garantia() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { open: openContact } = useContactMenu();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#1C1C1A" }}
    >
      {/* Franja decorativa superior con la marca */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #D63A27, transparent)",
        }}
      />

      {/* Halos de color */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "5%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle, rgba(214,58,39,0.14) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "5%",
          width: "35vw",
          height: "35vw",
          background:
            "radial-gradient(circle, rgba(167,159,153,0.10) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        ref={ref}
        className="relative max-w-[1300px] mx-auto px-8 md:px-16 py-32 md:py-40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — Sello */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative inline-flex items-center justify-center">
              {/* Anillo giratorio de fondo */}
              <motion.div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg
                  viewBox="0 0 260 260"
                  width="260"
                  height="260"
                  className="w-[260px] h-[260px] md:w-[300px] md:h-[300px]"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 130,130 m -110,0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0"
                    />
                  </defs>
                  <text
                    fill="#A79F99"
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="6"
                  >
                    <textPath href="#circlePath">
                      GARANTÍA · GROWTH PARTNERS · 30 DÍAS · PG ESTRATEGIAS ·
                      GROWTH PARTNERS · 30 DÍAS ·
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Sello central */}
              <div
                className="relative flex flex-col items-center justify-center rounded-full"
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid rgba(214,58,39,0.4)",
                  background:
                    "radial-gradient(circle, rgba(214,58,39,0.08) 0%, transparent 70%)",
                }}
              >
                <p
                  className="font-body text-[10px] tracking-[0.24em] uppercase mb-2"
                  style={{ color: "#D63A27" }}
                >
                  Garantía
                </p>
                <p
                  className="font-title leading-none"
                  style={{
                    fontSize: 82,
                    fontWeight: 800,
                    color: "#E4E0DD",
                    letterSpacing: "-0.04em",
                  }}
                >
                  30
                </p>
                <p
                  className="font-body text-[10px] tracking-[0.24em] uppercase mt-2"
                  style={{ color: "rgba(228,224,221,0.55)" }}
                >
                  Días
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Contenido */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="w-10 h-px block"
                style={{ background: "#D63A27" }}
              />
              <p
                className="font-body text-[11px] uppercase tracking-[var(--ls-label)]"
                style={{ color: "#D63A27" }}
              >
                Nuestra promesa
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-title mb-8"
              style={{
                fontSize: "clamp(38px, 5.4vw, 76px)",
                fontWeight: 400,
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: "#E4E0DD",
              }}
            >
              30 días de honorarios{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                sin costo.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-body text-[18px] md:text-[20px] leading-[1.65] mb-8 max-w-[620px]"
              style={{ color: "rgba(228,224,221,0.85)" }}
            >
              Si al cierre del periodo no llegamos a la meta que definimos
              juntos, seguimos trabajando un mes más sin cobrarlos.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-[13px] leading-[1.7] mb-10 max-w-[520px]"
              style={{ color: "#A79F99" }}
            >
              Aplica sobre honorarios, nunca sobre la inversión publicitaria.
            </motion.p>

            {/* Detalles como tarjetas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
              {[
                {
                  n: "01",
                  t: "Definimos meta",
                  d: "Al firmar, fijamos por escrito el objetivo medible del periodo.",
                },
                {
                  n: "02",
                  t: "Ejecutamos",
                  d: "Operamos toda la estrategia y publicamos avances cada semana.",
                },
                {
                  n: "03",
                  t: "Mes extra sin cobrar",
                  d: "Si no llegamos a la meta, un mes más de honorarios va por nuestra cuenta.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                  className="pt-5 pr-4 group cursor-default"
                  style={{
                    borderTop: "1px solid rgba(228,224,221,0.12)",
                    transition: "border-color 0.5s",
                  }}
                  whileHover={{ y: -2 }}
                >
                  <p
                    className="font-body text-[11px] tracking-[0.14em] mb-3 transition-colors duration-500 group-hover:text-[color:#D63A27]"
                    style={{ color: "rgba(228,224,221,0.35)" }}
                  >
                    {item.n}
                  </p>
                  <p
                    className="font-title text-[15px] mb-2"
                    style={{ fontWeight: 400, color: "#E4E0DD" }}
                  >
                    {item.t}
                  </p>
                  <p
                    className="font-body text-[12px] leading-[1.6]"
                    style={{ color: "rgba(228,224,221,0.55)" }}
                  >
                    {item.d}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => openContact(MSG_GARANTIA)}
              className="relative overflow-hidden group inline-flex items-center gap-3 font-body text-[12px] tracking-[0.14em] uppercase px-6 py-3 transition-colors duration-500"
              style={{
                border: "1px solid rgba(214,58,39,0.5)",
                color: "#E4E0DD",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: "#D63A27" }}
              />
              <span className="relative">Quiero conocer los detalles</span>
              <span
                className="relative inline-flex transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
