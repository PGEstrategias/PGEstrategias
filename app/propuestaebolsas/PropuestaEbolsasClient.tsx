"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

const WHATSAPP_URL =
  "https://wa.me/5212221215051?text=" +
  encodeURIComponent(
    "Hola PG Estrategias, soy de e-bolsas y quiero avanzar con la propuesta."
  );

const includes = [
  {
    num: "01",
    title: "Optimización de la página de ventas",
    desc:
      "Revisamos e-bolsas.com de principio a fin y ajustamos lo que impacta la conversión: encabezados, jerarquía visual, fichas de producto, botones, velocidad y flujo de compra.",
  },
  {
    num: "02",
    title: "Estudio estratégico de campaña",
    desc:
      "Investigación de mercado, definición de audiencias, análisis de ángulos y hooks, y estructura de campaña antes de gastar un peso en Meta.",
  },
  {
    num: "03",
    title: "Un par de creativos para Meta",
    desc:
      "Producimos dos creativos publicitarios listos para pauta —copy, arte y variantes básicas— pensados para detener el scroll y llevar al carrito.",
  },
  {
    num: "04",
    title: "Configuración de la campaña de Meta",
    desc:
      "Estructura de cuenta, píxel/CAPI, públicos, presupuestos, objetivos y lanzamiento. Dejamos la campaña corriendo y monitoreada.",
  },
  {
    num: "05",
    title: "Orientación en videos para la marca",
    desc:
      "Guía práctica para que graben en casa: qué grabar, cómo grabarlo, luz, encuadre y formato. Piezas que se ven profesionales sin equipo de producción.",
  },
];

export default function PropuestaEbolsasClient() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(28,28,26,0.88)"
            : "rgba(28,28,26,0.35)",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(228,224,221,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-14 h-16 max-w-[1400px] mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <Logo size={24} tone="cream" />
          </a>
          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.16em] uppercase"
              style={{ color: "rgba(228,224,221,0.45)" }}
            >
              Propuesta · e-bolsas
            </span>
            <span
              className="font-body text-[10px] tracking-[0.16em] uppercase px-3 py-1.5"
              style={{
                color: "#D63A27",
                background: "rgba(214,58,39,0.1)",
                border: "1px solid rgba(214,58,39,0.25)",
                fontWeight: 600,
              }}
            >
              Precio preferente
            </span>
          </div>
        </div>
      </nav>

      <main style={{ background: "#1C1C1A", color: "#E4E0DD" }}>
        {/* ============================================================
            HERO
           ============================================================ */}
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col">
          {/* Halos de color */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none z-[1]"
            style={{
              top: "-10%",
              right: "-10%",
              width: "60vw",
              height: "60vw",
              background:
                "radial-gradient(circle, rgba(214,58,39,0.18) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="absolute pointer-events-none z-[1]"
            style={{
              bottom: "5%",
              left: "-8%",
              width: "45vw",
              height: "45vw",
              background:
                "radial-gradient(circle, rgba(228,224,221,0.06) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
            animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
            transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
          />

          {/* Grid sutil */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-[1] opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(228,224,221,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(228,224,221,0.9) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />

          <div className="relative z-[3] flex-1 flex flex-col justify-center px-6 md:px-14 pt-32 pb-16 max-w-[1400px] mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-px block" style={{ background: "#D63A27" }} />
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "#D63A27", fontWeight: 500 }}
              >
                Propuesta para e-bolsas.com
              </p>
            </motion.div>

            <div className="overflow-hidden mb-8 max-w-[1050px]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-title"
                style={{
                  fontSize: "clamp(46px, 8vw, 124px)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.035em",
                  color: "#E4E0DD",
                }}
              >
                Empezar a{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  vender más,
                </em>
                <br />
                sin complicarlo.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="font-body text-[16px] md:text-[18px] leading-[1.7] mb-10 max-w-[640px]"
              style={{ color: "rgba(228,224,221,0.75)" }}
            >
              Un paquete diseñado a la medida para e-bolsas: optimizamos la
              página, armamos la estrategia, producimos los creativos y dejamos
              corriendo la campaña de Meta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group font-title font-bold px-8 py-4 text-[13px] tracking-[0.08em] uppercase transition-transform duration-500 hover:-translate-y-0.5"
                style={{ background: "#D63A27", color: "#E4E0DD" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: "#1C1C1A" }}
                />
                <span className="relative flex items-center gap-3">
                  Quiero avanzar
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1 5H13M13 5L9 1M13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#incluye"
                className="font-body text-[13px] tracking-[0.08em] uppercase link-underline"
                style={{ color: "rgba(228,224,221,0.7)" }}
              >
                Ver qué incluye
              </a>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            QUÉ INCLUYE
           ============================================================ */}
        <section
          id="incluye"
          className="relative px-6 md:px-14 py-24 md:py-32 max-w-[1400px] mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20 max-w-[820px]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "#D63A27", fontWeight: 500 }}
              >
                Qué incluye la propuesta
              </p>
            </div>
            <h2
              className="font-title"
              style={{
                fontSize: "clamp(32px, 4.2vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "#E4E0DD",
              }}
            >
              Cinco cosas concretas, cada mes.
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1"
            style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
          >
            {includes.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="relative grid grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 group"
                style={{ borderBottom: "1px solid rgba(228,224,221,0.12)" }}
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: "#D63A27" }}
                />
                <div className="col-span-12 md:col-span-2">
                  <p
                    className="font-title"
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      color: "#D63A27",
                    }}
                  >
                    {item.num}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3
                    className="font-title"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      color: "#E4E0DD",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p
                    className="font-body text-[15px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.7)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            INVERSIÓN
           ============================================================ */}
        <section
          className="relative px-6 md:px-14 py-24 md:py-32"
          style={{
            background:
              "linear-gradient(180deg, #1C1C1A 0%, #25241F 55%, #1C1C1A 100%)",
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            >
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
                  <p
                    className="font-body text-[11px] tracking-[0.22em] uppercase"
                    style={{ color: "#D63A27", fontWeight: 500 }}
                  >
                    Inversión
                  </p>
                </div>
                <h2
                  className="font-title mb-6"
                  style={{
                    fontSize: "clamp(32px, 4vw, 56px)",
                    fontWeight: 700,
                    lineHeight: 1.04,
                    letterSpacing: "-0.025em",
                    color: "#E4E0DD",
                  }}
                >
                  Un precio pensado{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    para nosotros.
                  </em>
                </h2>
                <p
                  className="font-body text-[15px] md:text-[16px] leading-[1.75] mb-4"
                  style={{ color: "rgba(228,224,221,0.7)" }}
                >
                  Este paquete no forma parte de nuestro portafolio abierto —
                  es una propuesta especial armada específicamente para
                  e-bolsas, con un precio preferente por relación de confianza.
                </p>
                <p
                  className="font-body text-[14px] leading-[1.7]"
                  style={{ color: "rgba(228,224,221,0.55)" }}
                >
                  El presupuesto de pauta en Meta corre por separado y lo
                  administras tú.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div
                  className="relative p-8 md:p-12"
                  style={{
                    background: "rgba(228,224,221,0.03)",
                    border: "1px solid rgba(228,224,221,0.14)",
                  }}
                >
                  {/* Etiqueta preferente */}
                  <div
                    className="absolute -top-3 left-8 px-3 py-1.5"
                    style={{
                      background: "#D63A27",
                      color: "#E4E0DD",
                    }}
                  >
                    <p
                      className="font-body text-[9px] tracking-[0.22em] uppercase"
                      style={{ fontWeight: 700 }}
                    >
                      Precio preferente
                    </p>
                  </div>

                  <p
                    className="font-body text-[11px] tracking-[0.22em] uppercase mb-4"
                    style={{ color: "rgba(228,224,221,0.5)" }}
                  >
                    Iguala mensual
                  </p>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span
                      className="font-title"
                      style={{
                        fontSize: 22,
                        color: "rgba(228,224,221,0.55)",
                        fontWeight: 400,
                      }}
                    >
                      $
                    </span>
                    <span
                      className="font-title"
                      style={{
                        fontSize: "clamp(72px, 10vw, 112px)",
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "#E4E0DD",
                      }}
                    >
                      2,000
                    </span>
                    <div className="flex flex-col">
                      <span
                        className="font-body text-[13px] tracking-[0.14em] uppercase"
                        style={{ color: "rgba(228,224,221,0.7)" }}
                      >
                        MXN
                      </span>
                      <span
                        className="font-body text-[12px]"
                        style={{ color: "rgba(228,224,221,0.5)" }}
                      >
                        / mes
                      </span>
                    </div>
                  </div>

                  <div
                    className="pt-6 mb-6"
                    style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
                  >
                    <ul className="space-y-3">
                      {includes.map((it) => (
                        <li
                          key={it.num}
                          className="flex items-start gap-3 font-body text-[14px]"
                          style={{ color: "rgba(228,224,221,0.8)" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="mt-1 flex-shrink-0"
                          >
                            <path
                              d="M2 7L5.5 10.5L12 3.5"
                              stroke="#D63A27"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{it.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden group font-title font-bold px-8 py-4 text-[13px] tracking-[0.08em] uppercase transition-transform duration-500 hover:-translate-y-0.5 inline-flex"
                    style={{ background: "#D63A27", color: "#E4E0DD" }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                      style={{ background: "#1C1C1A" }}
                    />
                    <span className="relative flex items-center gap-3">
                      Aceptar propuesta
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path
                          d="M1 5H13M13 5L9 1M13 5L9 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            NOTAS FINALES
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-32 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              {
                k: "Sin plazo forzoso",
                v: "Trabajamos mes a mes. Si algo no te cuadra, lo hablamos y ajustamos.",
              },
              {
                k: "Un solo contacto",
                v: "Todo directo con nosotros por WhatsApp. Nada de agencias con capas.",
              },
              {
                k: "Ajuste continuo",
                v: "Cada mes revisamos qué funcionó, qué no, y afinamos el rumbo.",
              },
            ].map((n) => (
              <div
                key={n.k}
                className="pt-6"
                style={{ borderTop: "1px solid rgba(228,224,221,0.14)" }}
              >
                <p
                  className="font-title mb-3"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    color: "#E4E0DD",
                  }}
                >
                  {n.k}
                </p>
                <p
                  className="font-body text-[14px] leading-[1.7]"
                  style={{ color: "rgba(228,224,221,0.6)" }}
                >
                  {n.v}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ============================================================
            CTA FINAL
           ============================================================ */}
        <section
          className="relative overflow-hidden px-6 md:px-14 py-24 md:py-32"
          style={{ background: "#0e0e0d" }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80vw",
              height: "80vw",
              maxWidth: 900,
              maxHeight: 900,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.12) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <div className="relative z-10 max-w-[820px] mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-body text-[11px] tracking-[0.28em] uppercase mb-6"
              style={{ color: "#D63A27", fontWeight: 500 }}
            >
              El siguiente paso
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-title mb-8"
              style={{
                fontSize: "clamp(40px, 6vw, 84px)",
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: "#E4E0DD",
              }}
            >
              ¿Le entramos{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                este mes?
              </em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-[16px] md:text-[17px] leading-[1.75] mb-12 max-w-[620px] mx-auto"
              style={{ color: "rgba(228,224,221,0.7)" }}
            >
              Con que confirmes por WhatsApp arrancamos: en los primeros 7 días
              tenemos la auditoría de la página lista y el plan de campaña
              armado.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group font-title font-bold px-10 py-5 text-[14px] tracking-[0.08em] uppercase transition-transform duration-500 hover:-translate-y-0.5"
                style={{ background: "#D63A27", color: "#E4E0DD" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: "#1C1C1A" }}
                />
                <span className="relative flex items-center gap-3">
                  Confirmar por WhatsApp
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1 5H13M13 5L9 1M13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="mailto:contacto@pgestrategias.com?subject=Propuesta%20e-bolsas"
                className="font-body text-[13px] tracking-[0.08em] uppercase link-underline"
                style={{ color: "rgba(228,224,221,0.7)" }}
              >
                contacto@pgestrategias.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
