"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contacto() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    facturacion: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full bg-transparent border-b py-3 font-body text-[15px] placeholder:text-[color:rgba(228,224,221,0.3)] focus:outline-none transition-colors duration-500";
  const inputStyle = {
    borderColor: "rgba(228,224,221,0.18)",
    color: "#E4E0DD",
  } as const;

  return (
    <section
      id="contacto"
      className="py-40 relative"
      style={{ background: "#1C1C1A" }}
    >
      <div className="max-w-[1300px] mx-auto px-8 md:px-16">
        <div
          className="pt-8 mb-20"
          style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
        >
          <div
            ref={headRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32"
          >
            {/* Left: info */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={headInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-10"
              >
                <span
                  className="w-8 h-px block"
                  style={{ background: "#D63A27" }}
                />
                <p
                  className="font-body text-[11px] uppercase tracking-[var(--ls-label)]"
                  style={{ color: "rgba(228,224,221,0.4)" }}
                >
                  Hablemos
                </p>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-title mb-8"
                style={{
                  fontSize: "var(--t-h1)",
                  fontWeight: 400,
                  lineHeight: "var(--lh-h1)",
                  letterSpacing: "var(--ls-display)",
                  color: "#E4E0DD",
                }}
              >
                ¿Listo para
                <br />
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  crecer de verdad?
                </em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={headInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-[16px] leading-[1.75] mb-14"
                style={{ color: "rgba(228,224,221,0.55)" }}
              >
                Agenda una llamada de 20 minutos. Sin costo, sin compromiso.
                Te decimos si podemos ayudarte — y si no, también.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={headInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                {[
                  {
                    label: "WhatsApp",
                    href: "https://wa.me/5212221215051",
                    text: "+52 222 121 5051",
                  },
                  {
                    label: "Email",
                    href: "mailto:contacto@pgestrategias.com",
                    text: "contacto@pgestrategias.com",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="font-body text-[11px] uppercase tracking-[var(--ls-label)] mb-2"
                      style={{ color: "rgba(228,224,221,0.35)" }}
                    >
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      className="link-underline font-title transition-colors duration-500 hover:text-[color:#D63A27]"
                      style={{
                        fontSize: "clamp(16px, 1.8vw, 20px)",
                        fontWeight: 700,
                        color: "#E4E0DD",
                      }}
                    >
                      {item.text}
                    </a>
                  </div>
                ))}

                <div>
                  <p
                    className="font-body text-[11px] uppercase tracking-[var(--ls-label)] mb-2"
                    style={{ color: "rgba(228,224,221,0.35)" }}
                  >
                    Oficina
                  </p>
                  <p
                    className="font-body text-[15px] leading-relaxed"
                    style={{ color: "rgba(228,224,221,0.6)" }}
                  >
                    Calle Valencia 131-2, Las Palmas,
                    <br />
                    Puebla, México
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                    style={{
                      background: "rgba(214,58,39,0.12)",
                      border: "1px solid rgba(214,58,39,0.4)",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 10l5 5 9-9"
                        stroke="#D63A27"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-title"
                    style={{
                      fontSize: "clamp(24px, 3vw, 32px)",
                      fontWeight: 400,
                      color: "#E4E0DD",
                    }}
                  >
                    Mensaje enviado
                  </h3>
                  <p
                    className="font-body text-[15px]"
                    style={{ color: "rgba(228,224,221,0.55)" }}
                  >
                    Te contactamos en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      className={inputClass}
                      style={inputStyle}
                      value={form.nombre}
                      onChange={(e) =>
                        setForm({ ...form, nombre: e.target.value })
                      }
                      onFocus={(e) => (e.target.style.borderColor = "#D63A27")}
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          "rgba(228,224,221,0.18)")
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="¿A qué se dedica tu negocio?"
                      required
                      className={inputClass}
                      style={inputStyle}
                      value={form.negocio}
                      onChange={(e) =>
                        setForm({ ...form, negocio: e.target.value })
                      }
                      onFocus={(e) => (e.target.style.borderColor = "#D63A27")}
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          "rgba(228,224,221,0.18)")
                      }
                    />
                  </div>
                  <div>
                    <select
                      required
                      className={`${inputClass} appearance-none cursor-pointer`}
                      style={{ ...inputStyle, background: "transparent" }}
                      value={form.facturacion}
                      onChange={(e) =>
                        setForm({ ...form, facturacion: e.target.value })
                      }
                      onFocus={(e) => (e.target.style.borderColor = "#D63A27")}
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          "rgba(228,224,221,0.18)")
                      }
                    >
                      <option
                        value=""
                        disabled
                        style={{ background: "#1C1C1A" }}
                      >
                        Facturación mensual aproximada
                      </option>
                      <option
                        value="menos-40k"
                        style={{ background: "#1C1C1A" }}
                      >
                        Menos de $40,000 MXN
                      </option>
                      <option value="40-80k" style={{ background: "#1C1C1A" }}>
                        $40,000 – $80,000 MXN
                      </option>
                      <option value="80-300k" style={{ background: "#1C1C1A" }}>
                        $80,000 – $300,000 MXN
                      </option>
                      <option
                        value="mas-300k"
                        style={{ background: "#1C1C1A" }}
                      >
                        Más de $300,000 MXN
                      </option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="¿Qué quieres lograr? (opcional)"
                      rows={3}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                      value={form.mensaje}
                      onChange={(e) =>
                        setForm({ ...form, mensaje: e.target.value })
                      }
                      onFocus={(e) => (e.target.style.borderColor = "#D63A27")}
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          "rgba(228,224,221,0.18)")
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative overflow-hidden group w-full py-4 font-title font-bold text-[13px] tracking-wide transition-transform duration-500 hover:-translate-y-0.5"
                    style={{ background: "#D63A27", color: "#E4E0DD" }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                      style={{ background: "#1C1C1A" }}
                    />
                    <span className="relative">Quiero mi llamada gratuita</span>
                  </button>
                  <p
                    className="font-body text-[12px] text-center"
                    style={{ color: "rgba(228,224,221,0.3)" }}
                  >
                    Sin spam. Solo te contactamos para la llamada.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
