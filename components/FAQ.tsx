"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "¿Por qué el compromiso mínimo es de 3 meses?",
    a: "Porque los primeros 30 días son configuración y arranque; los segundos 30 son ajuste y aprendizaje; y los terceros son cuando el sistema empieza a mostrar resultados reales. Cualquier agencia que te prometa resultados en el primer mes está siendo deshonesta contigo.",
  },
  {
    q: "¿El presupuesto de publicidad está incluido en la mensualidad?",
    a: "Sí. Cada plan incluye un monto base de publicidad — $2,500 en Ignición, $4,000 en Tracción y $7,000 en Dominio — que ya viene dentro de lo que pagas. Si quieres invertir más para acelerar resultados, esa diferencia se factura aparte.",
  },
  {
    q: "¿Trabajan con negocios que acaban de iniciar?",
    a: "Sí, en el plan Ignición. La única condición es que tengas un producto o servicio definido y al menos tus primeras ventas. No validamos ideas de negocio ni inventamos demanda: si ya sabes qué vendes y a quién, nosotros construimos el sistema para escalar.",
  },
  {
    q: "¿Qué pasa si no veo resultados?",
    a: "Si al cierre del periodo no llegamos a la meta que definimos juntos, seguimos trabajando un mes más de honorarios sin cobrarlos. Aplica sobre honorarios, nunca sobre la inversión publicitaria.",
  },
  {
    q: "¿Puedo cambiar de plan?",
    a: "Subir de plan puedes hacerlo en cualquier momento. Bajar de plan solo es posible al cierre de tu trimestre vigente, para no fragmentar la estrategia en medio de un ciclo de optimización.",
  },
  {
    q: "Ya tengo a alguien manejando mis redes sociales. ¿Esto es diferente?",
    a: "Completamente diferente. Manejar redes sociales es publicar contenido para mantener presencia. Nuestro trabajo es construir un sistema de ventas: anuncios pagados, páginas de conversión, mensajería coordinada y rastreo de resultados.",
  },
];

function AccordionItem({
  faq,
  index,
}: {
  faq: typeof faqs[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      style={{ borderBottom: "1px solid rgba(28,28,26,0.12)" }}
      className="group"
    >
      <button
        className="w-full flex items-start justify-between py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="font-body text-[17px] leading-snug pr-8 transition-colors duration-500 group-hover:text-[color:#D63A27]"
          style={{ fontWeight: 400, color: "#1C1C1A" }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 text-[22px] leading-none mt-0.5 transition-colors duration-500"
          style={{ color: open ? "#D63A27" : "rgba(28,28,26,0.4)" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 pr-8 flex gap-4">
              <span
                className="w-0.5 flex-shrink-0 mt-1 mb-1"
                style={{ background: "#D63A27" }}
              />
              <p
                className="font-body text-[15px] leading-[1.75]"
                style={{ color: "rgba(28,28,26,0.65)" }}
              >
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      className="py-40"
      style={{ background: "#E4E0DD" }}
    >
      <div className="max-w-[900px] mx-auto px-8 md:px-16">
        <div
          ref={headRef}
          className="mb-20 pt-8"
          style={{ borderTop: "1px solid rgba(28,28,26,0.12)" }}
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
              style={{ color: "rgba(28,28,26,0.45)" }}
            >
              Preguntas frecuentes
            </p>
          </motion.div>
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
              color: "#1C1C1A",
            }}
          >
            Todo lo que necesitas saber
            <br />
            <em style={{ color: "#D63A27", fontStyle: "italic" }}>
              antes de empezar.
            </em>
          </motion.h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(28,28,26,0.1)" }}
        >
          <p
            className="font-body text-[14px] mb-4"
            style={{ color: "rgba(28,28,26,0.55)" }}
          >
            ¿Tu pregunta no está aquí?
          </p>
          <a
            href="#contacto"
            className="link-underline font-body text-[13px] tracking-[0.12em] uppercase inline-flex items-center gap-3 transition-colors duration-500"
            style={{ color: "rgba(28,28,26,0.75)" }}
          >
            Escríbenos directamente{" "}
            <span style={{ color: "#D63A27" }}>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
