"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

type Pillar = {
  num: string;
  name: string;
  headline: string;
  description: string;
  accent: "lime" | "amber" | "violet";
  items: string[];
};

const pillars: Pillar[] = [
  {
    num: "01",
    name: "Bot de WhatsApp",
    headline: "Atención inmediata, seguimiento sin fugas.",
    description:
      "Un agente conversacional que atiende 24/7, filtra intenciones y no deja pacientes en visto.",
    accent: "lime",
    items: [
      "Respuesta automática a preguntas frecuentes.",
      "Identificación del motivo de consulta del paciente.",
      "Solicitud de la información necesaria antes de agendar.",
      "Seguimiento automático a pacientes que dejaron de responder.",
      "Confirmación y recordatorio de citas para reducir inasistencias.",
    ],
  },
  {
    num: "02",
    name: "Sistema de reseñas",
    headline: "Reputación que se construye sola.",
    description:
      "Flujo automatizado post-consulta que canaliza pacientes satisfechos hacia Google y detecta oportunidades de mejora.",
    accent: "amber",
    items: [
      "Formulario de satisfacción del paciente.",
      "Clasificación automática de pacientes satisfechos.",
      "Envío automático del enlace de Google para reseña.",
      "Registro de comentarios internos para mejora continua.",
    ],
  },
  {
    num: "03",
    name: "Investigación de pacientes",
    headline: "Cada paciente, una fuente de datos accionable.",
    description:
      "Formulario diseñado para conocer el recorrido del paciente y afinar la estrategia de marketing con evidencia real.",
    accent: "violet",
    items: [
      "Cómo encontró al doctor.",
      "Qué síntomas presentaba.",
      "Qué buscó en Google.",
      "Desde qué ciudad acudió.",
      "Qué lo convenció de agendar.",
    ],
  },
  {
    num: "04",
    name: "Optimización de Google Maps",
    headline: "El consultorio, visible donde importa.",
    description:
      "Ficha optimizada para aparecer en las búsquedas locales y transmitir profesionalismo desde el primer clic.",
    accent: "lime",
    items: [
      "Actualización completa del perfil.",
      "Publicaciones periódicas.",
      "Optimización de fotografías.",
      "Estrategia para incrementar reseñas.",
      "Optimización de descripciones y servicios.",
    ],
  },
  {
    num: "05",
    name: "Contenido para marca personal",
    headline: "Posicionar al doctor como referente.",
    description:
      "Plan de contenido educativo que genera confianza antes de la consulta y atrae pacientes cualificados.",
    accent: "amber",
    items: [
      "Producción de videos educativos.",
      "Publicación constante en redes sociales.",
      "Contenido basado en síntomas y dudas frecuentes.",
      "Videos para generar confianza antes de la consulta.",
      "Contenido de mayor alcance para atraer nuevos pacientes.",
    ],
  },
  {
    num: "06",
    name: "Optimización de campañas",
    headline: "Cada peso invertido, mejor asignado.",
    description:
      "Análisis y ajuste continuo de la pauta activa para invertir donde realmente hay conversión.",
    accent: "violet",
    items: [
      "Segmentación por ciudades con mayor conversión.",
      "Campañas dirigidas a síntomas específicos.",
      "Optimización continua del presupuesto.",
      "Identificación de los anuncios con mejor desempeño.",
    ],
  },
  {
    num: "07",
    name: "Seguimiento de pacientes",
    headline: "Ningún paciente se pierde en el camino.",
    description:
      "Flujo estructurado que rescata pacientes fríos y mantiene el contacto post-procedimiento.",
    accent: "lime",
    items: [
      "Pacientes que solicitaron información pero no agendaron.",
      "Pacientes que cancelaron una consulta.",
      "Pacientes que requieren una revisión posterior.",
      "Seguimiento después de un procedimiento.",
    ],
  },
  {
    num: "08",
    name: "Dashboard de indicadores",
    headline: "Decisiones con datos, no con intuición.",
    description:
      "Tablero centralizado con los indicadores clave del consultorio para tomar decisiones informadas cada semana.",
    accent: "amber",
    items: [
      "Pacientes nuevos.",
      "Conversión de consultas.",
      "Origen de los pacientes.",
      "Tiempo de respuesta.",
      "Número de reseñas.",
      "Rendimiento de campañas.",
      "Municipios con mayor captación.",
    ],
  },
];

const stats = [
  { num: "8", label: "Iniciativas estratégicas" },
  { num: "4", label: "Sistemas automatizados" },
  { num: "1", label: "Mes de implementación" },
];

const focos = [
  {
    accent: "lime" as const,
    count: "Captación",
    title: "Más pacientes calificados",
    desc: "Google Maps, campañas segmentadas y contenido diseñado para atraer al paciente correcto.",
  },
  {
    accent: "amber" as const,
    count: "Automatización",
    title: "Procesos que trabajan solos",
    desc: "WhatsApp, reseñas y seguimientos que liberan a la asistente y no dejan pacientes sin atender.",
  },
  {
    accent: "violet" as const,
    count: "Inteligencia",
    title: "Decisiones con información",
    desc: "Formularios, dashboard y análisis de campañas para operar el consultorio con datos reales.",
  },
];

const ACCENT: Record<Pillar["accent"], string> = {
  lime: "#A6E22E",
  amber: "#F5B342",
  violet: "#B79CFF",
};

function AccentBar({ tone }: { tone: Pillar["accent"] }) {
  return (
    <span
      className="absolute left-0 top-0 h-full w-[2px]"
      style={{ background: ACCENT[tone] }}
    />
  );
}

export default function PropuestaProctologoClient() {
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
              style={{ color: "#A6E22E" }}
            >
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect
                x="23"
                y="2"
                width="3"
                height="24"
                fill="currentColor"
                opacity="0.4"
              />
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
              Propuesta · Agosto 2026
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{
                color: "#A6E22E",
                background: "rgba(166,226,46,0.08)",
                fontWeight: 600,
              }}
            >
              Plan del Mes
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
              background:
                "radial-gradient(circle, rgba(166,226,46,0.12) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-20%",
              left: "-10%",
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle, rgba(183,156,255,0.05) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-8 flex items-center gap-2"
                style={{ color: "#A6E22E" }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "#A6E22E" }}
                />
                Propuesta estratégica
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
                Lo que vamos
                <br />
                a implementar{" "}
                <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
                  este mes.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[560px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Plan de trabajo diseñado a partir de la reunión con el
                consultorio. Un sistema integral para{" "}
                <span className="text-white font-medium">
                  captar más pacientes, automatizar tareas repetitivas
                </span>{" "}
                y mejorar la experiencia del consultorio con decisiones basadas
                en información real.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="px-8 py-6"
                  style={{
                    borderBottom:
                      i < stats.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                  }}
                >
                  <p
                    className="font-title leading-none mb-2"
                    style={{
                      color: "#A6E22E",
                      fontSize: "clamp(36px, 4vw, 52px)",
                      fontWeight: 400,
                    }}
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

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* FOCOS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ background: "#A6E22E" }}
            />
            Enfoque del plan
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
            Tres frentes,
            <br />
            un solo{" "}
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
              consultorio.
            </em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Cada iniciativa está alineada a uno de estos tres objetivos.
            Nada se implementa por implementar: cada acción tiene un rol
            claro dentro del sistema.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {focos.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative px-8 py-12"
                style={{
                  borderRight:
                    i < focos.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                }}
              >
                <p
                  className="font-title italic leading-none mb-4"
                  style={{
                    color: ACCENT[s.accent],
                    fontSize: "clamp(24px, 2.4vw, 32px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.count}
                </p>
                <p
                  className="font-body text-[14px] font-medium mb-2 text-white"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  {s.title}
                </p>
                <p
                  className="font-body text-[13px] leading-[1.6]"
                  style={{ color: "rgba(245,245,245,0.45)" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* PILARES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ background: "#A6E22E" }}
            />
            Iniciativas del mes
          </p>

          <h2
            className="font-title text-pg-light mb-16"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Ocho piezas que trabajan
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
              en conjunto.
            </em>
          </h2>

          <div className="flex flex-col gap-16">
            {pillars.map((p, ci) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (ci % 4) * 0.05 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="font-title italic leading-none"
                    style={{
                      color: ACCENT[p.accent],
                      fontSize: "clamp(28px, 3vw, 40px)",
                      fontWeight: 400,
                    }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="font-body text-[11px] uppercase tracking-[var(--ls-label)] font-semibold"
                    style={{ color: "rgba(245,245,245,0.7)" }}
                  >
                    {p.name}
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                  <span
                    className="font-body text-[10px] uppercase tracking-[0.14em] px-3 py-1"
                    style={{
                      color: "rgba(245,245,245,0.45)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    En implementación
                  </span>
                </div>

                <div
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0 md:gap-0"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <AccentBar tone={p.accent} />

                  <div className="p-6 md:p-10 pl-8 md:pl-12">
                    <h3
                      className="font-title text-white mb-4"
                      style={{
                        fontSize: "clamp(22px, 2vw, 28px)",
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {p.headline}
                    </h3>
                    <p
                      className="font-body text-[14px] leading-[1.7]"
                      style={{ color: "rgba(245,245,245,0.6)" }}
                    >
                      {p.description}
                    </p>
                  </div>

                  <div
                    className="p-6 md:p-10"
                    style={{
                      borderLeft: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.01)",
                    }}
                  >
                    <p
                      className="font-body text-[10px] uppercase tracking-[0.14em] mb-4"
                      style={{ color: "rgba(245,245,245,0.4)" }}
                    >
                      Qué incluye
                    </p>
                    <ul className="flex flex-col gap-3">
                      {p.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body text-[13.5px] leading-[1.55]"
                          style={{ color: "rgba(245,245,245,0.75)" }}
                        >
                          <span
                            className="inline-block mt-2 flex-shrink-0"
                            style={{
                              width: 6,
                              height: 1,
                              background: ACCENT[p.accent],
                            }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* OBJETIVO */}
        <section className="px-6 md:px-16 py-24 md:py-28">
          <div className="max-w-[900px] mx-auto">
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
              style={{ color: "#A6E22E" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: "#A6E22E" }}
              />
              Objetivo general
            </p>
            <p
              className="font-title text-pg-light"
              style={{
                fontSize: "clamp(22px, 2.6vw, 34px)",
                fontWeight: 400,
                lineHeight: 1.35,
                letterSpacing: "-0.015em",
              }}
            >
              Desarrollar un{" "}
              <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
                sistema de trabajo
              </em>{" "}
              que permita al consultorio captar más pacientes, automatizar
              procesos administrativos y tomar decisiones con base en
              información, mejorando tanto la experiencia del paciente como
              la eficiencia operativa.
            </p>
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* CTA */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(166,226,46,0.1) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: "#A6E22E" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: "#A6E22E" }}
              />
              PG Estrategias
              <span
                className="inline-block w-8 h-px"
                style={{ background: "#A6E22E" }}
              />
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
              Arrancamos
              <br />
              <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
                este mes.
              </em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[560px] mx-auto mb-12"
              style={{ color: "rgba(245,245,245,0.55)" }}
            >
              Este plan comienza a implementarse de inmediato. Cada semana
              tendrán visibilidad del avance a través del dashboard y de
              nuestros reportes.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <a
                href="https://wa.me/5212221215051"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{
                    background: "rgba(166,226,46,0.08)",
                    color: "#A6E22E",
                  }}
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
                  style={{
                    background: "rgba(166,226,46,0.08)",
                    color: "#A6E22E",
                  }}
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
                  style={{
                    background: "rgba(166,226,46,0.08)",
                    color: "#A6E22E",
                  }}
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
