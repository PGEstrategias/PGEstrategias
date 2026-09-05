"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";

const GOLD = "#C4A052";

type Paquete = {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  badge?: string;
  heredado?: string;
  features: string[];
};

/* Los cuatro niveles van de menor a mayor automatización: el Básico
   resuelve la invitación, el Bespoke resuelve el evento completo. */
const paquetes: Paquete[] = [
  {
    id: "basico",
    title: "Básico",
    tag: "Essential",
    subtitle: "Tu invitación en línea, con confirmaciones ordenadas.",
    price: "$1,999",
    features: [
      "Landing page con fotos, historia, música, Maps y código de vestimenta",
      "Formulario RSVP conectado a Excel",
      "Pantalla final de confirmación con pase digital para capturar",
    ],
  },
  {
    id: "estandar",
    title: "Estándar",
    tag: "Pro",
    subtitle: "El pase llega solo al correo, en PDF y con su nombre.",
    price: "$3,999",
    badge: "El más vendido",
    heredado: "Todo lo del Básico, más:",
    features: [
      "Envío automático e inmediato por correo al confirmar",
      "PDF personalizado con diseño elegante, nombre del invitado y ubicación",
      "Confirmación directa, sin depender de capturas de pantalla",
    ],
  },
  {
    id: "premium",
    title: "Premium VIP",
    tag: "All-In",
    subtitle: "La logística de mesas y banquete, resuelta.",
    price: "$6,899",
    heredado: "Todo lo del Estándar, más:",
    features: [
      "Recordatorio programado 15 días antes con mesa asignada y croquis",
      "Módulo de cambios: alergias y pases hasta la fecha límite",
      "Reporte para el banquetero con restricciones alimenticias",
    ],
  },
  {
    id: "bespoke",
    title: "A la Medida",
    tag: "Bespoke",
    subtitle: "Desarrollo propio, con WhatsApp y control en puerta.",
    price: "$9,500",
    priceNote: "Desde",
    heredado: "Todo lo del Premium VIP, más:",
    features: [
      "Dominio web propio (ej. mariaycarlos.com)",
      "Automatizaciones por WhatsApp API en lugar de correo",
      "Validación con código QR en la recepción del evento",
      "Galería para que los invitados suban fotos en tiempo real",
    ],
  },
];

function Check() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="shrink-0 mt-[7px]"
      aria-hidden
    >
      <path
        d="M2 6l3 3 5-5"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InvitacionesPricing() {
  return (
    <section id="paquetes" className="bodas-dark py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />

      <div className="bodas-container">
        <div className="text-center mb-16">
          <p className="bodas-label mb-5">Paquetes</p>
          <h2 className="bodas-title">
            Cuatro niveles de{" "}
            <span className="bodas-em">tranquilidad</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            Todos incluyen la invitación y el RSVP. Lo que cambia es cuánto del
            trabajo se hace solo — y cuánto dejas de hacer tú.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {paquetes.map((p, i) => {
            const destacado = !!p.badge;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative overflow-hidden flex flex-col"
                style={{
                  border: destacado
                    ? "1px solid rgba(196,160,82,0.5)"
                    : "1px solid rgba(247,243,238,0.1)",
                  background: destacado
                    ? "linear-gradient(160deg, rgba(196,160,82,0.1) 0%, #201D19 55%)"
                    : "#201D19",
                }}
              >
                {destacado && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bodas-rule"
                  />
                )}

                <div className="p-7 flex flex-col h-full">
                  {/* Encabezado */}
                  <div className="mb-5 min-h-[2.25rem]">
                    {p.badge ? (
                      <span
                        className="font-body text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 inline-block"
                        style={{
                          color: GOLD,
                          background: "rgba(196,160,82,0.12)",
                          border: "1px solid rgba(196,160,82,0.4)",
                        }}
                      >
                        {p.badge}
                      </span>
                    ) : (
                      <span
                        className="font-body text-[10px] uppercase tracking-[0.16em]"
                        style={{ color: "rgba(247,243,238,0.35)" }}
                      >
                        {p.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="bodas-heading text-3xl mb-2">{p.title}</h3>
                  <p
                    className="font-body text-[13px] leading-[1.6] mb-6 min-h-[2.6rem]"
                    style={{ color: "rgba(247,243,238,0.48)" }}
                  >
                    {p.subtitle}
                  </p>

                  {/* Precio */}
                  <div
                    className="mb-6 pb-6"
                    style={{ borderBottom: "1px solid rgba(247,243,238,0.12)" }}
                  >
                    {/* Se reserva la línea aunque no haya nota, para que los
                        cuatro precios queden a la misma altura. */}
                    <p
                      className="font-body text-[11px] uppercase tracking-[0.16em] mb-1"
                      style={{ color: "rgba(247,243,238,0.4)" }}
                    >
                      {p.priceNote ?? "\u00A0"}
                    </p>
                    <p
                      className="bodas-heading text-4xl leading-none"
                      style={{ color: GOLD }}
                    >
                      {p.price}
                      <span
                        className="font-body text-sm ml-2"
                        style={{ color: "rgba(247,243,238,0.4)" }}
                      >
                        MXN
                      </span>
                    </p>
                  </div>

                  {/* Entregables */}
                  {p.heredado && (
                    <p
                      className="font-body text-[13px] mb-4"
                      style={{ color: "rgba(247,243,238,0.5)" }}
                    >
                      {p.heredado}
                    </p>
                  )}

                  <ul className="flex flex-col gap-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check />
                        <span
                          className="font-body text-[13.5px] leading-[1.7]"
                          style={{ color: "rgba(247,243,238,0.78)" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — pegado abajo */}
                  <a
                    href={whatsappUrl(
                      `Hola, me interesa el paquete ${p.title} de invitaciones digitales (${
                        p.priceNote ? `desde ${p.price}` : p.price
                      } MXN) para mi boda.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto w-full !px-4 ${
                      destacado ? "bodas-btn-gold" : "bodas-btn-outline"
                    }`}
                  >
                    Lo quiero
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center font-body text-[14px] max-w-2xl mx-auto mt-12 leading-relaxed"
          style={{ color: "rgba(247,243,238,0.48)" }}
        >
          ¿Ya contrataste la cobertura de video?{" "}
          <a
            href="/bodas"
            className="underline underline-offset-4 transition-colors duration-500 hover:text-[color:#C4A052]"
            style={{ color: "rgba(247,243,238,0.7)" }}
          >
            El paquete Eterna incluye las invitaciones digitales de regalo
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
