"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";

const RED = "#D63A27";

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
    bonus: ["Invitaciones digitales de regalo, vía email o WhatsApp"],
  },
];

function Check() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="shrink-0 mt-[6px]"
      aria-hidden
    >
      <path
        d="M2 6l3 3 5-5"
        stroke={RED}
        strokeWidth="1.5"
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
    <section id="paquetes" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />

      <div className="bodas-container">
        <div className="text-center mb-16">
          <p className="bodas-label mb-5">Paquetes</p>
          <h2 className="bodas-title">
            Dos formas de{" "}
            <span style={{ color: RED }}>contar tu historia</span>
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
                className="relative overflow-hidden h-full flex flex-col"
                style={{
                  border: destacado
                    ? "1px solid rgba(214,58,39,0.4)"
                    : "1px solid rgba(228,224,221,0.08)",
                  background: destacado
                    ? "linear-gradient(160deg, rgba(214,58,39,0.09) 0%, #25241F 55%)"
                    : "#25241F",
                }}
              >
                {destacado && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #D63A27, transparent)",
                    }}
                  />
                )}

                <div className="p-8 md:p-10 flex flex-col h-full">
                  {/* Encabezado */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3
                        className="font-title text-3xl md:text-4xl mb-1.5"
                        style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="font-body text-[13px]"
                        style={{ color: "rgba(228,224,221,0.45)" }}
                      >
                        {p.subtitle}
                      </p>
                    </div>
                    {p.badge && (
                      <span
                        className="font-body text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 whitespace-nowrap"
                        style={{
                          color: RED,
                          background: "rgba(214,58,39,0.12)",
                          border: "1px solid rgba(214,58,39,0.35)",
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Precio */}
                  <div
                    className="mb-6 pb-6"
                    style={{ borderBottom: "1px solid rgba(228,224,221,0.1)" }}
                  >
                    <p
                      className="font-title text-5xl md:text-6xl leading-none"
                      style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
                    >
                      {p.price}
                      <span
                        className="font-body text-base ml-2"
                        style={{ color: "rgba(228,224,221,0.4)" }}
                      >
                        MXN
                      </span>
                    </p>
                  </div>

                  {/* Cobertura — el diferenciador */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 mb-7"
                    style={{
                      background: destacado
                        ? "rgba(214,58,39,0.10)"
                        : "rgba(228,224,221,0.03)",
                      border: destacado
                        ? "1px solid rgba(214,58,39,0.28)"
                        : "1px solid rgba(228,224,221,0.07)",
                      color: destacado ? RED : "rgba(228,224,221,0.55)",
                    }}
                  >
                    <CameraIcon />
                    <span className="font-body text-[13px] font-medium">
                      {p.cobertura}
                    </span>
                  </div>

                  {/* Entregables */}
                  {p.heredado && (
                    <p
                      className="font-body text-[13px] mb-5"
                      style={{ color: "rgba(228,224,221,0.5)" }}
                    >
                      {p.heredado}
                    </p>
                  )}

                  <ul className="flex flex-col gap-3.5 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check />
                        <span
                          className="font-body text-[14px] leading-[1.7]"
                          style={{ color: "rgba(228,224,221,0.75)" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {p.bonus && (
                    <div
                      className="px-5 py-4 mb-8"
                      style={{
                        background: "rgba(214,58,39,0.07)",
                        border: "1px solid rgba(214,58,39,0.2)",
                      }}
                    >
                      {p.bonus.map((b) => (
                        <p
                          key={b}
                          className="font-body text-[13px] leading-relaxed"
                          style={{ color: "rgba(228,224,221,0.8)" }}
                        >
                          <span style={{ color: RED }}>De regalo · </span>
                          {b}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* CTA — pegado abajo */}
                  <a
                    href={whatsappUrl(
                      `Hola, me interesa el paquete ${p.title} (${p.price} MXN) para mi boda.`
                    )}
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
          className="text-center font-body text-[14px] max-w-2xl mx-auto mt-10 leading-relaxed"
          style={{ color: "rgba(228,224,221,0.45)" }}
        >
          En <span style={{ color: RED }}>Eterna</span> son dos personas
          grabando video al mismo tiempo: mientras una sigue a la novia, la otra
          está con el novio. Se cubren dos momentos a la vez y no se pierde nada.
        </motion.p>
      </div>
    </section>
  );
}
