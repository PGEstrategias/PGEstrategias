"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContactMenu } from "@/context/ContactMenuContext";

const WA_NUMBER = "5212221215051";
const PHONE_TEL = "tel:+5212221215051";
const PHONE_DISPLAY = "+52 222 121 5051";

const IconWA = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-1.07-8.82A2 2 0 014 .74h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const IconForm = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export default function ContactMenu() {
  const { isOpen, close, message } = useContactMenu();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  const scrollToForm = () => {
    close();
    setTimeout(() => {
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  const options = [
    {
      icon: <IconWA />,
      label: "WhatsApp",
      sub: "Respuesta en minutos",
      accent: "#25D366",
      action: () => { window.open(waUrl, "_blank"); close(); },
    },
    {
      icon: <IconPhone />,
      label: "Llamar ahora",
      sub: PHONE_DISPLAY,
      accent: "#D63A27",
      action: () => { window.location.href = PHONE_TEL; close(); },
    },
    {
      icon: <IconForm />,
      label: "Llenar formulario",
      sub: "Te contactamos en 24 h",
      accent: "rgba(228,224,221,0.6)",
      action: scrollToForm,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(28,28,26,0.78)", backdropFilter: "blur(6px)" }}
          />

          {/* Positioner: bottom on mobile, centered on desktop */}
          <div className="fixed inset-0 z-[201] flex items-end justify-center md:items-center pointer-events-none">
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 28 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[400px] pointer-events-auto"
              style={{
                background: "#25241F",
                borderTop: "1px solid rgba(228,224,221,0.1)",
                borderLeft: "1px solid rgba(228,224,221,0.06)",
                borderRight: "1px solid rgba(228,224,221,0.06)",
                borderRadius: "12px 12px 0 0",
              }}
              // On desktop, override rounded corners
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 pt-6 pb-5"
                style={{ borderBottom: "1px solid rgba(228,224,221,0.08)" }}
              >
                <div>
                  <p className="font-title text-[15px]" style={{ fontWeight: 400, letterSpacing: "-0.01em", color: "#E4E0DD" }}>
                    ¿Cómo prefieres contactarnos?
                  </p>
                  <p className="font-body text-[11px] mt-0.5" style={{ color: "rgba(228,224,221,0.4)" }}>
                    Elige la opción que más te convenga
                  </p>
                </div>
                <button
                  onClick={close}
                  className="flex items-center justify-center w-7 h-7 transition-colors duration-300"
                  style={{ color: "rgba(228,224,221,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D63A27")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(228,224,221,0.4)")}
                  aria-label="Cerrar"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                </button>
              </div>

              {/* Options */}
              <div className="px-4 py-3 pb-6">
                {options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={opt.action}
                    className="w-full flex items-center gap-4 px-3 py-4 transition-colors duration-300 group"
                    style={{ borderBottom: i < options.length - 1 ? "1px solid rgba(228,224,221,0.06)" : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(228,224,221,0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Icon bubble */}
                    <span
                      className="flex items-center justify-center w-10 h-10 flex-shrink-0"
                      style={{ color: opt.accent, background: `${opt.accent}14`, borderRadius: "8px" }}
                    >
                      {opt.icon}
                    </span>

                    {/* Text */}
                    <span className="flex flex-col text-left">
                      <span className="font-title text-[14px]" style={{ fontWeight: 400, color: "#E4E0DD" }}>
                        {opt.label}
                      </span>
                      <span className="font-body text-[12px] mt-0.5" style={{ color: "rgba(228,224,221,0.5)" }}>
                        {opt.sub}
                      </span>
                    </span>

                    {/* Arrow */}
                    <span className="ml-auto group-hover:translate-x-1 transition-transform duration-500" style={{ color: "rgba(228,224,221,0.3)" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="2" y1="7" x2="12" y2="7" />
                        <polyline points="8 3 12 7 8 11" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
