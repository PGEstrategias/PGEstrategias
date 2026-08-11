"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   Layout compartido de las páginas legales. Reutiliza el Navbar
   y el Footer del sitio y sólo aporta la jerarquía de lectura:
   índice pegado en desktop, secciones numeradas y prosa cómoda.
   Los colores y tipografías salen del brand kit en globals.css.
   ──────────────────────────────────────────────────────────── */

const ACCENT = "#D63A27";
const TEXT = "#E4E0DD";
const MUTED = "rgba(228,224,221,0.62)";
const FAINT = "rgba(228,224,221,0.38)";
const BORDER = "rgba(228,224,221,0.10)";
const SURFACE = "#25241F";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

/* ── Primitivas de prosa ────────────────────────────────────── */

export function P({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-body text-[15px] leading-[1.85] mb-5 last:mb-0"
      style={{ color: MUTED }}
    >
      {children}
    </p>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      className="font-title text-[17px] mt-9 mb-4"
      style={{ color: TEXT, fontWeight: 400, letterSpacing: "-0.01em" }}
    >
      {children}
    </h3>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3 mb-5 last:mb-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <svg
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0 mt-[7px]"
            aria-hidden
          >
            <path
              d="M2 6l3 3 5-5"
              stroke={ACCENT}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="font-body text-[15px] leading-[1.8]"
            style={{ color: MUTED }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-5 mb-5 last:mb-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-5">
          <span
            className="font-title shrink-0 flex items-center justify-center"
            style={{
              width: 34,
              height: 34,
              border: `1px solid rgba(214,58,39,0.45)`,
              color: ACCENT,
              fontSize: "14px",
              fontWeight: 400,
            }}
            aria-hidden
          >
            {i + 1}
          </span>
          <span
            className="font-body text-[15px] leading-[1.8] pt-[5px]"
            style={{ color: MUTED }}
          >
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Note({
  label = "Importante",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="p-6 md:p-7 my-8"
      style={{
        border: `1px solid rgba(214,58,39,0.28)`,
        background: "linear-gradient(150deg, rgba(214,58,39,0.06) 0%, rgba(255,255,255,0.015) 60%)",
      }}
    >
      <p
        className="font-body text-[11px] uppercase tracking-[0.14em] mb-3"
        style={{ color: ACCENT }}
      >
        {label}
      </p>
      <div
        className="font-body text-[14.5px] leading-[1.8]"
        style={{ color: TEXT }}
      >
        {children}
      </div>
    </div>
  );
}

export function DataList({
  rows,
}: {
  rows: { term: string; desc: ReactNode }[];
}) {
  return (
    <dl className="flex flex-col gap-px mb-5 last:mb-0">
      {rows.map((r) => (
        <div
          key={r.term}
          className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-1 sm:gap-6 py-4"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          <dt
            className="font-body text-[12px] uppercase tracking-[0.10em] pt-[3px]"
            style={{ color: ACCENT }}
          >
            {r.term}
          </dt>
          <dd
            className="font-body text-[15px] leading-[1.8]"
            style={{ color: MUTED }}
          >
            {r.desc}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function LegalLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="link-underline transition-colors duration-500"
      style={{ color: TEXT }}
    >
      {children}
    </a>
  );
}

/* ── Página ─────────────────────────────────────────────────── */

export default function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  // Resalta en el índice la sección que se está leyendo.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const rise = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <>
      <Navbar />

      <main style={{ background: "#1C1C1A", color: TEXT }}>
        {/* ══ ENCABEZADO ═══════════════════════════════════════ */}
        <section className="relative px-8 md:px-16 pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[70vh] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(214,58,39,0.12) 0%, transparent 65%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-[11px] tracking-[0.14em] uppercase mb-7 flex items-center gap-3"
              style={{ color: ACCENT, fontWeight: 500 }}
            >
              <span className="inline-block w-8 h-px" style={{ background: ACCENT }} />
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-title mb-8 max-w-[900px]"
              style={{
                fontSize: "clamp(34px, 5.4vw, 76px)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: TEXT,
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-[15px] leading-[1.85] max-w-[620px] mb-10"
              style={{ color: MUTED }}
            >
              {lead}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-[12px] uppercase tracking-[0.12em] inline-block px-4 py-2"
              style={{ color: ACCENT, background: "rgba(214,58,39,0.12)" }}
            >
              Última actualización: {updated}
            </motion.p>
          </div>
        </section>

        {/* ══ CONTENIDO ════════════════════════════════════════ */}
        <section
          className="relative px-8 md:px-16 pb-28 md:pb-36"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pt-16 md:pt-20">
            {/* Índice */}
            <aside className="md:col-span-4 lg:col-span-3">
              <div className="md:sticky md:top-28">
                <p
                  className="font-body text-[11px] uppercase tracking-[0.14em] mb-6"
                  style={{ color: FAINT }}
                >
                  Contenido
                </p>
                <nav className="flex flex-col gap-3">
                  {sections.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="font-body text-[13.5px] leading-[1.5] transition-colors duration-500 flex gap-3"
                      style={{ color: active === s.id ? TEXT : MUTED }}
                    >
                      <span
                        style={{
                          color: active === s.id ? ACCENT : FAINT,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Secciones */}
            <div className="md:col-span-8 lg:col-span-8 lg:col-start-5 max-w-[720px]">
              {sections.map((s, i) => (
                <motion.article
                  key={s.id}
                  id={s.id}
                  {...rise}
                  className="mb-16 last:mb-0 scroll-mt-28"
                >
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.14em] mb-4"
                    style={{ color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2
                    className="font-title mb-6 pb-6"
                    style={{
                      fontSize: "clamp(22px, 2.6vw, 30px)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      color: TEXT,
                      borderBottom: `1px solid ${BORDER}`,
                    }}
                  >
                    {s.title}
                  </h2>
                  {s.body}
                </motion.article>
              ))}

              {/* Bloque de contacto — cierra las tres páginas igual */}
              <div
                className="mt-20 p-7 md:p-9"
                style={{ border: `1px solid ${BORDER}`, background: SURFACE }}
              >
                <p
                  className="font-body text-[11px] uppercase tracking-[0.14em] mb-5"
                  style={{ color: ACCENT }}
                >
                  ¿Dudas sobre este documento?
                </p>
                <p
                  className="font-body text-[15px] leading-[1.8] mb-6"
                  style={{ color: MUTED }}
                >
                  Escríbenos y te lo explicamos sin términos técnicos. Somos PG
                  Estrategias, con domicilio en Calle Valencia 131-2, Las Palmas,
                  Puebla, México.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
                  <a
                    href="mailto:contacto@pgestrategias.com"
                    className="link-underline font-body text-[15px] w-fit"
                    style={{ color: TEXT }}
                  >
                    contacto@pgestrategias.com
                  </a>
                  <a
                    href="https://wa.me/5212221215051"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-body text-[15px] w-fit"
                    style={{ color: TEXT }}
                  >
                    +52 222 121 5051
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
