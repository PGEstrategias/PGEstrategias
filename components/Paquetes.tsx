"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useContactMenu } from "@/context/ContactMenuContext";

const WA_MSGS: Record<string, string> = {
  ignicion:
    "Hola, me interesa el plan IGNICIÓN de PG Estrategias ($11,000/mes). ¿Podemos agendar una llamada?",
  traccion:
    "Hola, me interesa el plan TRACCIÓN de PG Estrategias ($16,000/mes). ¿Podemos agendar una llamada?",
  dominio:
    "Hola, me interesa el plan DOMINIO de PG Estrategias ($27,000/mes). ¿Podemos agendar una llamada?",
  elegir:
    "Hola, necesito ayuda para elegir el plan correcto de PG Estrategias para mi negocio. ¿Podemos hablar?",
};

const checkIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="flex-shrink-0 mt-0.5"
  >
    <path
      d="M2 6l3 3 5-5"
      stroke="#D63A27"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const planes = [
  {
    id: "ignicion",
    nombre: "IGNICIÓN",
    badge: "Para empezar",
    precio: "$11,000",
    publicidad: "$2,500 en publicidad incluidos",
    paraQuien:
      "Ideal si facturas entre $40,000 y $80,000 al mes, o si estás lanzando un negocio con producto definido y primeras ventas.",
    cta: "Empezar con Ignición",
    destacado: false,
    items: [
      "Publicidad en Meta o Google — $2,500 incluidos",
      "1 video de 1 minuto para tu página de ventas",
      "4 reels mensuales (1 para anuncios, 3 para redes)",
      "3 diseños gráficos con texto persuasivo",
      "3 carruseles para redes sociales",
      "500 mensajes por WhatsApp o correo al mes",
      "Página de ventas diseñada e incluida",
      "Configuración técnica completa (rastreo, píxeles)",
      "Perfil de Google optimizado + estrategia de reseñas",
      "1 videollamada estratégica mensual",
      "Reporte mensual en lenguaje claro",
    ],
  },
  {
    id: "traccion",
    nombre: "TRACCIÓN",
    badge: "El más elegido",
    precio: "$16,000",
    publicidad: "$4,000 en publicidad incluidos",
    paraQuien:
      "Ideal si facturas entre $80,000 y $300,000 al mes. Negocio que ya funciona y quieres acelerar ventas de forma consistente.",
    cta: "Empezar con Tracción",
    destacado: true,
    items: [
      "Publicidad en Meta y/o Google — $4,000 incluidos",
      "1 video de 1 minuto para tu página de ventas",
      "7 reels mensuales (2 para anuncios, 5 para redes)",
      "5 diseños gráficos con texto persuasivo",
      "5 carruseles para redes sociales",
      "1,000 mensajes por WhatsApp o correo al mes",
      "Página de ventas + CRM + hosting 6 meses",
      "Configuración técnica completa",
      "Perfil de Google optimizado + estrategia de reseñas",
      "Videollamada estratégica quincenal",
      "Consultoría de crecimiento mensual",
      "Reporte quincenal",
    ],
  },
  {
    id: "dominio",
    nombre: "DOMINIO",
    badge: "Operación completa",
    precio: "$27,000",
    publicidad: "$7,000 en publicidad incluidos",
    paraQuien:
      "Ideal si facturas más de $300,000 al mes y necesitas un equipo de marketing digital externo que opere todo.",
    cta: "Hablemos de Dominio",
    destacado: false,
    items: [
      "Publicidad en Meta y/o Google — $7,000 incluidos",
      "1 video de 1 minuto para página de ventas",
      "10 reels mensuales (4 para anuncios, 6 para redes)",
      "2,000 mensajes por WhatsApp o correo al mes",
      "2 páginas de ventas + CRM + hosting permanente + dominio",
      "Configuración técnica completa",
      "Perfil de Google optimizado + estrategia de reseñas",
      "Videollamada estratégica semanal",
      "Consultoría de crecimiento quincenal",
      "Reporte semanal con tablero de métricas en vivo",
    ],
  },
];

function PlanCard({
  plan,
  index,
  onCta,
}: {
  plan: typeof planes[0];
  index: number;
  onCta: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="flex flex-col pt-8 relative group"
      style={{
        borderTop: plan.destacado
          ? "2px solid #D63A27"
          : "1px solid rgba(228,224,221,0.12)",
      }}
    >
      {/* Halo rojo destacado */}
      {plan.destacado && (
        <div
          aria-hidden
          className="absolute -inset-x-2 -inset-y-4 -z-10 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(214,58,39,0.12), transparent 60%)",
          }}
        />
      )}

      {/* Badge + Name */}
      <div className="flex items-center justify-between mb-6">
        <p
          className="font-title text-[13px] tracking-[0.18em]"
          style={{
            color: plan.destacado ? "#D63A27" : "rgba(228,224,221,0.55)",
            fontWeight: 700,
          }}
        >
          {plan.nombre}
        </p>
        <span
          className="font-body text-[10px] uppercase tracking-[0.1em] px-3 py-1"
          style={{
            color: plan.destacado ? "#E4E0DD" : "rgba(228,224,221,0.5)",
            background: plan.destacado ? "#D63A27" : "rgba(228,224,221,0.06)",
          }}
        >
          {plan.badge}
        </span>
      </div>

      {/* Price */}
      <div className="mb-1">
        <span
          className="font-title leading-none"
          style={{
            fontSize: "clamp(36px, 3.5vw, 52px)",
            fontWeight: 400,
            color: "#E4E0DD",
            letterSpacing: "-0.02em",
          }}
        >
          {plan.precio}
        </span>
        <span
          className="font-body text-[13px] ml-1.5"
          style={{ color: "rgba(228,224,221,0.4)" }}
        >
          /mes
        </span>
      </div>
      <p
        className="font-body text-[12px] mb-6"
        style={{ color: "#D63A27" }}
      >
        {plan.publicidad}
      </p>

      {/* Para quién */}
      <p
        className="font-body text-[13px] leading-[1.7] pb-6 mb-6"
        style={{
          color: "rgba(228,224,221,0.6)",
          borderBottom: "1px solid rgba(228,224,221,0.1)",
        }}
      >
        {plan.paraQuien}
      </p>

      {/* Items */}
      <ul className="flex flex-col gap-2.5 mb-8 flex-1">
        {plan.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {checkIcon}
            <span
              className="font-body text-[13px] leading-snug"
              style={{ color: "rgba(228,224,221,0.68)" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onCta}
        className="relative overflow-hidden group w-full py-3.5 text-center font-title font-bold text-[13px] tracking-wide transition-all duration-500"
        style={{
          background: plan.destacado ? "#D63A27" : "transparent",
          border: plan.destacado ? "none" : "1px solid rgba(228,224,221,0.28)",
          color: "#E4E0DD",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
          style={{
            background: plan.destacado ? "#1C1C1A" : "#D63A27",
          }}
        />
        <span className="relative">{plan.cta}</span>
      </button>
    </motion.div>
  );
}

export default function Paquetes() {
  const [comparOpen, setComparOpen] = useState(false);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const { open: openContact } = useContactMenu();

  return (
    <section
      id="paquetes"
      className="py-40 relative"
      style={{ background: "#1C1C1A" }}
    >
      <div className="max-w-[1300px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div
          ref={headRef}
          className="mb-20 pt-8"
          style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
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
              style={{ color: "rgba(228,224,221,0.4)" }}
            >
              Planes de trabajo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
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
                color: "#E4E0DD",
              }}
            >
              Elige el nivel que
              <br />
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                le corresponde
              </em>{" "}
              a tu negocio hoy.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={headInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[13px]"
              style={{ color: "rgba(228,224,221,0.4)" }}
            >
              Todos los precios en pesos mexicanos, sin IVA.
              <br />
              Compromiso sugerido de 3 meses.
            </motion.p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {planes.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              onCta={() => openContact(WA_MSGS[plan.id])}
            />
          ))}
        </div>

        {/* Comparativa colapsable */}
        <div
          className="mb-16 pt-6"
          style={{ borderTop: "1px solid rgba(228,224,221,0.08)" }}
        >
          <button
            onClick={() => setComparOpen(!comparOpen)}
            className="font-body text-[12px] tracking-[0.1em] uppercase flex items-center gap-2 transition-colors duration-500 hover:text-[color:#D63A27]"
            style={{ color: "rgba(228,224,221,0.5)" }}
          >
            <motion.span
              animate={{ rotate: comparOpen ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              ↓
            </motion.span>
            {comparOpen ? "Ocultar comparativa" : "Ver comparativa completa"}
          </button>

          <AnimatePresence>
            {comparOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(228,224,221,0.1)",
                        }}
                      >
                        <th
                          className="font-body text-[11px] pb-3 pr-8 uppercase tracking-[0.12em]"
                          style={{ color: "rgba(228,224,221,0.35)" }}
                        >
                          Característica
                        </th>
                        {planes.map((p) => (
                          <th
                            key={p.id}
                            className="font-title text-[11px] pb-3 pr-6 tracking-[0.16em]"
                            style={{
                              color: p.destacado
                                ? "#D63A27"
                                : "rgba(228,224,221,0.55)",
                              fontWeight: 700,
                            }}
                          >
                            {p.nombre}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Presupuesto publicidad incluido", "$2,500", "$4,000", "$7,000"],
                        ["Reels mensuales", "4", "7", "10"],
                        ["Mensajes WhatsApp/email", "500", "1,000", "2,000"],
                        ["Videollamada estratégica", "Mensual", "Quincenal", "Semanal"],
                        ["Páginas de ventas", "1", "1 + CRM", "2 + CRM"],
                        ["Hosting incluido", "—", "6 meses", "Permanente"],
                        ["Dominio incluido", "—", "—", "1 año"],
                        ["Reporte de resultados", "Mensual", "Quincenal", "Semanal"],
                      ].map(([feat, ...vals], i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(228,224,221,0.06)",
                          }}
                        >
                          <td
                            className="py-3.5 pr-8 font-body text-[13px]"
                            style={{ color: "rgba(228,224,221,0.5)" }}
                          >
                            {feat}
                          </td>
                          {vals.map((v, j) => (
                            <td
                              key={j}
                              className="py-3.5 pr-6 font-body text-[13px]"
                              style={{
                                color:
                                  j === 1
                                    ? "#D63A27"
                                    : "rgba(228,224,221,0.65)",
                              }}
                            >
                              {v}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nota final */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 md:p-14 relative overflow-hidden"
          style={{
            background: "#25241F",
            borderTop: "2px solid rgba(214,58,39,0.4)",
          }}
        >
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(214,58,39,0.14), transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            <div>
              <h3
                className="font-title mb-3"
                style={{
                  fontSize: "clamp(24px, 3vw, 40px)",
                  fontWeight: 400,
                  lineHeight: "1.0",
                  letterSpacing: "-0.015em",
                  color: "#E4E0DD",
                }}
              >
                ¿No sabes cuál elegir?
              </h3>
              <p
                className="font-body text-[15px] leading-[1.7]"
                style={{ color: "rgba(228,224,221,0.6)" }}
              >
                Agenda una llamada de 20 minutos sin costo. Te decimos
                honestamente cuál es el plan correcto para tu negocio.
              </p>
            </div>
            <div className="md:text-right">
              <button
                onClick={() => openContact(WA_MSGS.elegir)}
                className="relative overflow-hidden group font-title font-bold text-[13px] tracking-wide inline-flex items-center gap-2 px-8 py-3.5 transition-transform duration-500 hover:-translate-y-0.5"
                style={{ background: "#D63A27", color: "#E4E0DD" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: "#1C1C1A" }}
                />
                <span className="relative">Agendar llamada gratuita</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
