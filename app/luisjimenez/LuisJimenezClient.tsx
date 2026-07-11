"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const LIME = "#A6E22E";
const AMBER = "#F5B342";
const VIOLET = "#B79CFF";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT_DIM = "rgba(245,245,245,0.6)";
const TEXT_MUTED = "rgba(245,245,245,0.42)";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
      style={{ color: LIME }}
    >
      <span className="inline-block w-8 h-px" style={{ background: LIME }} />
      {children}
    </p>
  );
}

const stats = [
  { num: "$5,500", label: "Inversión mensual" },
  { num: "3", label: "Meses de arranque" },
  { num: "5", label: "Piezas de contenido (mes 1)" },
];

type Month = {
  num: string;
  accent: string;
  badge: string;
  title: string;
  desc: string;
  items: string[];
  note?: string;
};

const months: Month[] = [
  {
    num: "01",
    accent: LIME,
    badge: "Mes 1 · Base y producción",
    title: "Dejamos todo listo para operar",
    desc: "Con el presupuesto de este primer mes construimos la base completa: contenido, landing page y cuentas publicitarias configuradas y listas para encender.",
    items: [
      "5 piezas de contenido",
      "1 landing page para el despacho",
      "Configuración de anuncios en Google Ads y Meta Ads",
      "Creación de cuenta publicitaria",
      "Edición de contenido",
      "Día de producción",
    ],
    note: "Este mes no incluye pauta: todo el presupuesto se invierte en dejar el sistema completo y listo para arrancar.",
  },
  {
    num: "02",
    accent: AMBER,
    badge: "Mes 2 · Primeras campañas activas",
    title: "Encendemos la pauta publicitaria",
    desc: "Con la base ya montada, este mes reasignamos parte del presupuesto a pauta para que las campañas empiecen a generar los primeros contactos.",
    items: [
      "$1,500 pesos de pauta publicitaria (Google Ads y Meta Ads)",
      "Gestión y optimización de campañas activas",
      "Seguimiento de resultados y ajustes a la landing page",
      "Continuidad de edición de contenido",
    ],
  },
  {
    num: "03",
    accent: VIOLET,
    badge: "Mes 3 · Nueva producción",
    title: "Renovamos contenido sin frenar la pauta",
    desc: "Volvemos a un día de producción para refrescar el material, mientras la pauta del despacho se mantiene activa con lo aprendido en el mes anterior.",
    items: [
      "Nuevo día de producción de contenido",
      "Piezas de contenido renovadas",
      "Continuidad de la pauta activa",
      "Reporte de resultados del trimestre",
    ],
  },
];

export default function LuisJimenezClient() {
  return (
    <>
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
          <a href="/" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: LIME }}>
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
            </svg>
            <span
              className="font-title text-white text-[13px] tracking-[0.1em] uppercase leading-none"
              style={{ fontWeight: 700 }}
            >
              PG <span className="opacity-50 font-normal">Estrategias</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.14em] uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Propuesta · Luis Jiménez
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{ color: LIME, background: "rgba(166,226,46,0.08)", fontWeight: 600 }}
            >
              Propuesta Activa
            </span>
          </div>
        </div>
      </nav>

      <main className="bg-pg-black text-pg-white">
        {/* HERO */}
        <section className="relative overflow-hidden px-6 md:px-16 pt-32 pb-24 md:pt-40 md:pb-32">
          <div
            className="pointer-events-none absolute"
            style={{
              top: "-30%",
              right: "-15%",
              width: 700,
              height: 700,
              background: "radial-gradient(circle, rgba(166,226,46,0.12) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-20%",
              left: "-10%",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(183,156,255,0.05) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-8 flex items-center gap-2"
                style={{ color: LIME }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: LIME }} />
                Propuesta publicitaria
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-title text-pg-light mb-8"
                style={{
                  fontSize: "clamp(40px, 6vw, 88px)",
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Un plan a la medida
                <br />
                del <em style={{ color: LIME, fontStyle: "italic" }}>Despacho Jurídico</em>
                <br />
                Luis Jiménez.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[560px]"
                style={{ color: TEXT_DIM }}
              >
                Diseñamos una versión adaptada de nuestro plan de arranque para que quede
                dentro de un presupuesto de{" "}
                <span className="text-white font-medium">$5,500 pesos al mes</span>. Es un
                plan de 3 meses que reparte producción de contenido y pauta publicitaria
                en el orden correcto para que el despacho empiece a generar resultados sin
                salirse de su presupuesto.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
              style={{ border: `1px solid ${BORDER}` }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="px-8 py-6"
                  style={{
                    borderBottom: i < stats.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}
                >
                  <p
                    className="font-title leading-none mb-2"
                    style={{ color: LIME, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 400 }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: "rgba(245,245,245,0.4)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* POR QUÉ ESTE PLAN */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Por qué este plan</SectionLabel>
          <h2
            className="font-title text-pg-light mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Adaptado a tu presupuesto,
            <br />
            no al <em style={{ color: LIME, fontStyle: "italic" }}>revés.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[640px]"
            style={{ color: TEXT_DIM }}
          >
            Nuestro paquete base de arranque tiene un costo de más de $10,000 pesos al mes.
            Con $5,500 pesos al mes no alcanza para producción y pauta publicitaria al mismo
            tiempo, así que construimos un plan de 3 meses que alterna entre ambas: primero
            dejamos todo montado, después encendemos la pauta, y luego renovamos el
            contenido sin dejar de invertir en anuncios. Así el proyecto funciona dentro de
            tu presupuesto real, sin prometerte algo que este mes no se puede cumplir.
          </p>
        </section>

        <Divider />

        {/* PLAN DE 3 MESES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Plan de trabajo</SectionLabel>
          <h2
            className="font-title text-pg-light mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Tres meses,
            <br />
            un <em style={{ color: LIME, fontStyle: "italic" }}>solo sistema.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: TEXT_DIM }}
          >
            Cada mes tiene un enfoque distinto para que, sin aumentar la inversión, el
            despacho pase de no tener presencia digital a tener campañas activas generando
            contactos.
          </p>

          <div className="flex flex-col gap-6">
            {months.map((m, i) => (
              <motion.article
                key={m.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-6 md:p-10"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}
              >
                <span
                  className="absolute left-0 top-0 h-full w-[2px]"
                  style={{ background: m.accent }}
                />

                <div className="pl-4 md:pl-6 grid grid-cols-1 md:grid-cols-[auto_1fr_1.1fr] gap-8 md:items-start">
                  <span
                    className="font-title italic leading-none"
                    style={{ color: m.accent, fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 400 }}
                  >
                    {m.num}
                  </span>

                  <div>
                    <p
                      className="font-body text-[10px] uppercase tracking-[0.14em] font-semibold mb-3"
                      style={{ color: m.accent }}
                    >
                      {m.badge}
                    </p>
                    <h3
                      className="font-title text-white mb-3"
                      style={{
                        fontSize: "clamp(20px, 2vw, 28px)",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {m.title}
                    </h3>
                    <p className="font-body text-[14px] leading-[1.65]" style={{ color: TEXT_DIM }}>
                      {m.desc}
                    </p>
                  </div>

                  <div>
                    <ul className="flex flex-col gap-2 mb-4">
                      {m.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body text-[13px] leading-[1.6]"
                          style={{ color: "rgba(245,245,245,0.75)" }}
                        >
                          <span className="mt-[3px] shrink-0" style={{ color: m.accent }}>
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {m.note && (
                      <p
                        className="font-body text-[12px] leading-[1.6] italic px-4 py-3"
                        style={{
                          color: TEXT_MUTED,
                          borderLeft: `2px solid ${BORDER}`,
                        }}
                      >
                        {m.note}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <Divider />

        {/* QUOTE / CIERRE */}
        <section className="px-6 md:px-16 py-24 md:py-28">
          <div className="max-w-[820px] mx-auto text-center">
            <p
              className="font-title leading-none mb-6"
              style={{ color: LIME, opacity: 0.25, fontSize: 72, fontWeight: 400 }}
            >
              &ldquo;
            </p>
            <p
              className="font-title italic text-pg-light mb-6"
              style={{
                fontSize: "clamp(20px, 2.4vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
              }}
            >
              Cuando el presupuesto crezca, el despacho puede subir a nuestro paquete
              completo de arranque, con producción y pauta trabajando cada mes al mismo
              tiempo.
            </p>
            <p
              className="font-body text-[12px] uppercase tracking-[var(--ls-label)]"
              style={{ color: "rgba(245,245,245,0.4)" }}
            >
              <span className="text-white font-semibold">PG Estrategias</span> &middot; Growth
              Partners
            </p>
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600,
              height: 600,
              background: "radial-gradient(circle, rgba(166,226,46,0.1) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: LIME }}
            >
              <span className="inline-block w-8 h-px" style={{ background: LIME }} />
              Próximos pasos
              <span className="inline-block w-8 h-px" style={{ background: LIME }} />
            </p>
            <h2
              className="font-title text-pg-light mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Listos para arrancar
              <br />
              con el <em style={{ color: LIME, fontStyle: "italic" }}>despacho.</em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[560px] mx-auto mb-12"
              style={{ color: TEXT_DIM }}
            >
              Cualquier duda sobre la propuesta o el orden de los 3 meses, estamos
              disponibles para platicarlo antes de arrancar.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <a
                href="https://wa.me/5212221215051"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(166,226,46,0.08)", color: LIME }}
                >
                  ☎
                </span>
                +52 222 121 5051
              </a>
              <a
                href="mailto:contacto@pgestrategias.com"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(166,226,46,0.08)", color: LIME }}
                >
                  ✉
                </span>
                contacto@pgestrategias.com
              </a>
              <a
                href="/"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(166,226,46,0.08)", color: LIME }}
                >
                  ◎
                </span>
                pgestrategias.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
