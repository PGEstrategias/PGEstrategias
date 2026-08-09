"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import CatalogoModal from "./CatalogoModal";

const TALLER_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779507243/05.1___MetaAds_yrtgmr.mp4";

// Lead de registro → WhatsApp
const WHATSAPP_NUMBER = "5212221215051";

const aprenderas = [
  "Diseñar un mueble completo desde tu celular o computadora",
  "Cotizar al instante con materiales, herrajes y servicios incluidos",
  "Mandar tu primer pedido a producción industrial con un clic",
  "Entender cómo funciona el modelo de negocio de principio a fin",
];

const paraQuien = [
  "Eres carpintero y quieres crecer sin comprar más maquinaria",
  "Eres arquitecto o diseñador y quieres ofrecer mobiliario como servicio",
  "Quieres emprender en muebles sin rentar bodega ni contratar personal",
  "Tienes clientes que necesitan muebles y no sabes cómo producirlos",
  "No sabes nada de carpintería — y quieres aprender desde cero",
];

const respaldoStats = [
  { num: "+192,000", label: "Usuarios en Latinoamérica" },
  { num: "450", label: "Centros de servicio" },
  { num: "1 clic", label: "De tu diseño a producción" },
];

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span
        className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 font-bold"
        style={{ background: "#A6E22E", color: "#0D0D0D", fontSize: 11 }}
      >
        ✓
      </span>
      <span
        className="font-body text-[15px] md:text-[16px] leading-[1.6]"
        style={{ color: "rgba(245,245,245,0.78)" }}
      >
        {children}
      </span>
    </li>
  );
}

function Divider() {
  return (
    <div
      className="max-w-[1300px] mx-auto h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
      }}
    />
  );
}

export default function TallerLanding() {
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [catalogoOpen, setCatalogoOpen] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg =
      `Hola, quiero registrarme al taller gratuito de CorteCloud.%0A%0A` +
      `Nombre: ${nombre}%0A` +
      `WhatsApp: ${whatsapp}%0A` +
      `Me dedico a: ${ocupacion || "Sin especificar"}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <>
      <CatalogoModal open={catalogoOpen} onClose={() => setCatalogoOpen(false)} />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(13,13,13,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 h-16 max-w-[1300px] mx-auto">
          <a href="#top" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: "#A6E22E" }}>
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
            </svg>
            <span
              className="font-title text-white text-[13px] tracking-[0.1em] uppercase leading-none"
              style={{ fontWeight: 700 }}
            >
              Corte<span className="text-lime">Cloud</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCatalogoOpen(true)}
              className="hidden sm:inline-flex font-body text-pg-light px-4 py-2.5 text-[12px] tracking-wide transition-colors duration-300 hover:text-lime"
            >
              Catálogo
            </button>
            <a
              href="#registro"
              className="font-title font-bold text-pg-black px-5 py-2.5 text-[12px] tracking-wide transition-opacity duration-500 hover:opacity-80"
              style={{ background: "#A6E22E" }}
            >
              Quiero mi lugar
            </a>
          </div>
        </div>
      </nav>

      <main id="top" className="bg-pg-black text-pg-white">
        {/* HERO */}
        <section className="relative overflow-hidden px-6 md:px-16 pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            className="pointer-events-none absolute"
            style={{
              top: "-30%",
              right: "-15%",
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(166,226,46,0.12) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-25%",
              left: "-10%",
              width: 520,
              height: 520,
              background:
                "radial-gradient(circle, rgba(166,226,46,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 md:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 mb-8 px-4 py-2"
                style={{
                  border: "1px solid rgba(166,226,46,0.3)",
                  background: "rgba(166,226,46,0.06)",
                }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#A6E22E" }} />
                <span
                  className="font-body text-[10px] md:text-[11px] tracking-[var(--ls-label)] uppercase"
                  style={{ color: "#A6E22E", fontWeight: 600 }}
                >
                  Taller gratuito · Puebla · Cupos limitados
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-title text-pg-light mb-8"
                style={{
                  fontSize: "clamp(36px, 5.4vw, 76px)",
                  fontWeight: 400,
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                }}
              >
                Aprende a diseñar
                <br />y vender muebles{" "}
                <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
                  sin taller propio.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] md:text-[16px] leading-[1.7] max-w-[540px] mb-10"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Un taller práctico donde aprendes a usar{" "}
                <span className="text-white font-medium">CorteCloud</span> desde
                cero — y descubres cómo fabricar muebles profesionales sin
                maquinaria, sin bodega y sin empleados fijos.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#registro"
                  className="inline-flex items-center gap-3 font-title font-bold text-pg-black px-8 py-4 text-[14px] tracking-wide transition-opacity duration-500 hover:opacity-80"
                  style={{ background: "#A6E22E" }}
                >
                  Quiero mi lugar — es gratis
                  <span aria-hidden>→</span>
                </a>
                <button
                  type="button"
                  onClick={() => setCatalogoOpen(true)}
                  className="inline-flex items-center gap-3 font-body text-pg-light px-8 py-4 text-[14px] tracking-wide transition-colors duration-500 hover:border-white"
                  style={{ border: "1px solid rgba(255,255,255,0.28)" }}
                >
                  Ver catálogo
                  <span aria-hidden style={{ color: "#A6E22E" }}>↗</span>
                </button>
              </motion.div>
            </div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mx-auto w-full max-w-[340px]"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "9/16",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#111",
                }}
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={TALLER_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* QUÉ VAS A APRENDER */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            Qué vas a aprender
          </p>
          <h2
            className="font-title text-pg-light mb-12"
            style={{
              fontSize: "clamp(30px, 4.6vw, 60px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            En este taller
            <br />
            vas a <em style={{ color: "#A6E22E", fontStyle: "italic" }}>aprender a:</em>
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-[980px]">
            {aprenderas.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Check>{item}</Check>
              </motion.div>
            ))}
          </ul>

          <p
            className="font-body text-[13px] tracking-[0.04em] mt-12"
            style={{ color: "rgba(245,245,245,0.4)" }}
          >
            Sin experiencia previa en carpintería. Sin software complicado. Sin
            inversión para participar.
          </p>
        </section>

        <Divider />

        {/* PARA QUIÉN ES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            Para quién es
          </p>
          <h2
            className="font-title text-pg-light mb-12"
            style={{
              fontSize: "clamp(30px, 4.6vw, 60px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Este taller es
            <br />
            para ti <em style={{ color: "#A6E22E", fontStyle: "italic" }}>si...</em>
          </h2>

          <ul className="flex flex-col gap-5 max-w-[820px]">
            {paraQuien.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Check>{item}</Check>
              </motion.div>
            ))}
          </ul>
        </section>

        <Divider />

        {/* RESPALDO */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(166,226,46,0.08) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[1300px] mx-auto">
            <h2
              className="font-title text-pg-light mb-8 max-w-[900px]"
              style={{
                fontSize: "clamp(30px, 4.6vw, 60px)",
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              No es un curso.
              <br />
              Es una{" "}
              <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
                demostración real.
              </em>
            </h2>
            <p
              className="font-body text-[15px] md:text-[16px] leading-[1.7] max-w-[640px] mb-14"
              style={{ color: "rgba(245,245,245,0.6)" }}
            >
              CorteCloud es la plataforma de{" "}
              <span className="text-white font-medium">
                Cubiertas y Herrajes
              </span>{" "}
              — empresa con más de 192,000 usuarios en Latinoamérica y 450
              centros de servicio. En el taller no te explicamos teoría: te
              mostramos el proceso completo en vivo y te acompañamos a subir tu
              primera orden.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {respaldoStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="px-8 py-10"
                  style={{
                    borderRight:
                      i < respaldoStats.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                  }}
                >
                  <p
                    className="font-title leading-none mb-3"
                    style={{
                      color: "#A6E22E",
                      fontSize: "clamp(34px, 4vw, 52px)",
                      fontWeight: 400,
                    }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="font-body text-[12px] uppercase tracking-[0.12em]"
                    style={{ color: "rgba(245,245,245,0.45)" }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* FORMULARIO */}
        <section id="registro" className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-20"
            style={{
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(166,226,46,0.1) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[560px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: "#A6E22E" }}
            >
              <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
              Regístrate
              <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            </p>
            <h2
              className="font-title text-pg-light mb-5"
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              Te avisamos cuando
              <br />
              haya <em style={{ color: "#A6E22E", fontStyle: "italic" }}>fecha disponible.</em>
            </h2>
            <p
              className="font-body text-[14px] leading-[1.7] mb-12"
              style={{ color: "rgba(245,245,245,0.55)" }}
            >
              Cupos limitados. Confirmas tu lugar cuando te contactemos.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-4 text-left">
              <div>
                <label
                  className="block font-body text-[11px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "rgba(245,245,245,0.45)" }}
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3.5 font-body text-[15px] text-white outline-none transition-colors duration-300 focus:border-lime"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block font-body text-[11px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "rgba(245,245,245,0.45)" }}
                >
                  WhatsApp (10 dígitos)
                </label>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3.5 font-body text-[15px] text-white outline-none transition-colors duration-300 focus:border-lime"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block font-body text-[11px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "rgba(245,245,245,0.45)" }}
                >
                  ¿A qué te dedicas?
                </label>
                <select
                  required
                  value={ocupacion}
                  onChange={(e) => setOcupacion(e.target.value)}
                  className="w-full px-4 py-3.5 font-body text-[15px] outline-none transition-colors duration-300 focus:border-lime"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: ocupacion ? "#fff" : "rgba(245,245,245,0.4)",
                  }}
                >
                  <option value="" disabled style={{ background: "#0D0D0D" }}>
                    Selecciona una opción
                  </option>
                  <option value="Carpintero" style={{ background: "#0D0D0D", color: "#fff" }}>
                    Carpintero
                  </option>
                  <option value="Diseñador o Arquitecto" style={{ background: "#0D0D0D", color: "#fff" }}>
                    Diseñador o Arquitecto
                  </option>
                  <option value="Emprendedor sin experiencia" style={{ background: "#0D0D0D", color: "#fff" }}>
                    Emprendedor sin experiencia
                  </option>
                  <option value="Otro" style={{ background: "#0D0D0D", color: "#fff" }}>
                    Otro
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 w-full font-title font-bold text-pg-black px-8 py-4 text-[14px] tracking-wide transition-opacity duration-500 hover:opacity-80"
                style={{ background: "#A6E22E" }}
              >
                Quiero mi lugar — es gratis →
              </button>
            </form>

            <p
              className="font-body text-[12px] leading-[1.6] mt-6"
              style={{ color: "rgba(245,245,245,0.4)" }}
            >
              Tus datos están protegidos · Sin spam · Te contactamos por WhatsApp
              para confirmar fecha
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="px-6 md:px-16 py-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none" style={{ color: "#A6E22E" }}>
                <rect x="2" y="18" width="5" height="8" fill="currentColor" />
                <rect x="9" y="12" width="5" height="14" fill="currentColor" />
                <rect x="16" y="6" width="5" height="20" fill="currentColor" />
                <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
              </svg>
              <span
                className="font-title text-white text-[13px] tracking-[0.1em] uppercase leading-none"
                style={{ fontWeight: 700 }}
              >
                Corte<span className="text-lime">Cloud</span>
                <span className="opacity-40 font-normal"> · Cubiertas y Herrajes</span>
              </span>
            </div>
            <p
              className="font-body text-[13px] leading-[1.6] max-w-[460px]"
              style={{ color: "rgba(245,245,245,0.45)" }}
            >
              Tecnología de producción industrial para quienes quieren fabricar
              muebles sin las barreras tradicionales.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
