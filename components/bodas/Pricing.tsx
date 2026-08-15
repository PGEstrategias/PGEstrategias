"use client";
import React from "react";
import { motion } from "framer-motion";

const WHATSAPP = "https://wa.me/528141558165";

const GOLD = "#C9A050";

type Paquete = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  badge?: string;
  /* Nota corta de cobertura — el diferenciador real entre los dos. */
  cobertura: string;
  heredado?: string;
  features: string[];
  bonus?: string[];
};

const paquetes: Paquete[] = [
  {
    id: "esencia",
    title: "Esencia",
    subtitle: "Ceremonia y fiesta, completas",
    price: "$32,000",
    cobertura: "1 videógrafo + 1 camarógrafo",
    features: [
      "Cobertura total del evento: ceremonia y fiesta",
      "Cineminuto de hasta 120 segundos",
      "Video cinematográfico largo de hasta 15 minutos",
      "400 fotografías profesionales",
      "1 sesión de fotos familiar",
      "Sesión de fotos first look",
      "Staff de producción",
      "Equipo de alta gama calidad cine",
      "Tomas aéreas e iluminación profesional",
    ],
  },
  {
    id: "eterna",
    title: "Eterna",
    subtitle: "Desde el get ready hasta el último baile",
    price: "$47,300",
    badge: "Mayor cobertura",
    cobertura: "2 videógrafos + 1 camarógrafo",
    heredado: "Todo lo del paquete Esencia, más:",
    features: [
      "Get ready: cobertura de la preparación de los novios",
      "2 videógrafos y 1 camarógrafo",
      "500 fotografías profesionales",
      "Photobook impreso",
    ],
    bonus: ["🎁 Invitaciones digitales de regalo, vía email o WhatsApp"],
  },
];

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      className="shrink-0 mt-[5px]"
      aria-hidden
    >
      <path
        d="M2 6l3 3 5-5"
        stroke={GOLD}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

export default function BodasPricing() {
  return (
    <section id="paquetes" className="py-24 md:py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-gold-line" />

      <div className="bodas-container">
        <div className="text-center mb-16">
          <p className="bodas-label mb-4">Paquetes</p>
          <h2 className="bodas-title">
            Dos formas de{" "}
            <span className="italic text-white/60">contar tu historia</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            La diferencia entre uno y otro es cuánto de tu día queda grabado — y
            cuántas cámaras lo están grabando.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
          {paquetes.map((p, i) => {
            const destacado = !!p.badge;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl border overflow-hidden h-full flex flex-col"
                style={{
                  borderColor: destacado
                    ? "rgba(201,160,80,0.35)"
                    : "rgba(255,255,255,0.08)",
                  background: destacado
                    ? "linear-gradient(160deg, rgba(201,160,80,0.07) 0%, rgba(255,255,255,0.02) 55%)"
                    : "rgba(255,255,255,0.02)",
                }}
              >
                {destacado && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #C9A050, transparent)",
                    }}
                  />
                )}

                <div className="p-8 md:p-10 flex flex-col h-full">
                  {/* Encabezado */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="bodas-serif text-3xl md:text-4xl mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-sm text-white/40">{p.subtitle}</p>
                    </div>
                    {p.badge && (
                      <span
                        className="text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 rounded-full whitespace-nowrap"
                        style={{
                          color: GOLD,
                          background: "rgba(201,160,80,0.12)",
                          border: "1px solid rgba(201,160,80,0.3)",
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <p className="bodas-serif text-5xl md:text-6xl leading-none">
                      {p.price}
                      <span className="text-base text-white/40 ml-2 font-sans">
                        MXN
                      </span>
                    </p>
                  </div>

                  {/* Cobertura — el diferenciador */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl mb-7"
                    style={{
                      background: destacado
                        ? "rgba(201,160,80,0.10)"
                        : "rgba(255,255,255,0.03)",
                      border: destacado
                        ? "1px solid rgba(201,160,80,0.25)"
                        : "1px solid rgba(255,255,255,0.06)",
                      color: destacado ? GOLD : "rgba(255,255,255,0.55)",
                    }}
                  >
                    <CameraIcon />
                    <span className="text-sm font-medium">{p.cobertura}</span>
                  </div>

                  {/* Entregables */}
                  {p.heredado && (
                    <p className="text-sm text-white/50 mb-5">{p.heredado}</p>
                  )}

                  <ul className="flex flex-col gap-3.5 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check />
                        <span className="text-[15px] leading-[1.6] text-white/75">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {p.bonus && (
                    <div
                      className="rounded-xl px-5 py-4 mb-8"
                      style={{
                        background: "rgba(201,160,80,0.07)",
                        border: "1px solid rgba(201,160,80,0.18)",
                      }}
                    >
                      {p.bonus.map((b) => (
                        <p key={b} className="text-sm leading-relaxed text-white/80">
                          {b}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* CTA — pegado abajo */}
                  <a
                    href={`${WHATSAPP}?text=${encodeURIComponent(
                      `Hola, me interesa el paquete ${p.title} (${p.price} MXN) para mi boda.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto w-full ${
                      destacado ? "bodas-btn-primary" : "bodas-btn-outline"
                    }`}
                  >
                    Reservar {p.title}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Nota de cobertura — breve y precisa */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm text-white/45 max-w-2xl mx-auto mt-10 leading-relaxed"
        >
          En <span style={{ color: GOLD }}>Eterna</span> son dos personas
          grabando video al mismo tiempo: mientras una sigue a la novia, la otra
          está con el novio. Se cubren dos momentos a la vez y no se pierde nada.
        </motion.p>
      </div>
    </section>
  );
}
