"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NOVIOS, FECHA_CORTA } from "@/lib/invitaciones/demo";

export const EVENTO_ABRIR = "invitacion:abrir";

/* Apertura de la invitación: un sobre con sello de lacre que se abre al
   tocarlo. El mismo toque es el gesto que permite arrancar la música. Si
   el invitado ya la abrió en esta sesión, no se repite. */
export default function Sobre() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [abriendo, setAbriendo] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("invitacion-abierta") === "1") setVisible(false);
    } catch {}
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  function abrir() {
    if (abriendo) return;
    setAbriendo(true);
    window.dispatchEvent(new Event(EVENTO_ABRIR));
    try {
      sessionStorage.setItem("invitacion-abierta", "1");
    } catch {}
    window.setTimeout(() => setVisible(false), reduce ? 0 : 1400);
  }

  const iniciales = `${NOVIOS.ella[0]}${NOVIOS.el[0]}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(circle at 50% 40%, #2A221C 0%, #14110F 70%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            type="button"
            onClick={abrir}
            className="relative flex flex-col items-center gap-10 rounded-[28px] p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <div className="relative w-[300px] h-[200px] sm:w-[380px] sm:h-[250px]" style={{ perspective: 900 }}>
              {/* Carta que sale del sobre */}
              <motion.div
                className="absolute left-4 right-4 top-4 bottom-4 rounded-xl flex flex-col items-center justify-center text-center"
                style={{ background: "#F7F2EA", color: "#14110F", zIndex: 1 }}
                animate={abriendo ? { y: -150, scale: 1.05 } : { y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="bodas-heading text-3xl">
                  {NOVIOS.ella} <span style={{ color: "#B8914F" }}>&amp;</span> {NOVIOS.el}
                </span>
                <span className="font-body text-[10px] tracking-[0.3em] mt-2" style={{ color: "#6B6157" }}>
                  {FECHA_CORTA}
                </span>
              </motion.div>
              {/* Cuerpo del sobre */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  zIndex: 2,
                  background: "linear-gradient(160deg, #EADFCF 0%, #D9C8B0 100%)",
                  clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
                }}
              />
              {/* Solapa */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[60%] origin-top"
                style={{
                  zIndex: 3,
                  background: "linear-gradient(180deg, #E3D5C1 0%, #D2BFA4 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                }}
                animate={abriendo ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              />
              {/* Sello de lacre */}
              <motion.span
                className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bodas-heading italic text-xl"
                style={{
                  zIndex: 4,
                  color: "#F3DDB0",
                  background: "radial-gradient(circle at 35% 30%, #A84553 0%, #7A2634 60%, #5C1A26 100%)",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.35), inset 0 -3px 6px rgba(0,0,0,0.25)",
                }}
                animate={abriendo ? { scale: 0, opacity: 0 } : { scale: [1, 1.06, 1] }}
                transition={abriendo ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {iniciales}
              </motion.span>
            </div>

            <motion.span
              className="font-body text-[11px] uppercase tracking-[0.3em]"
              style={{ color: "#E6CB97" }}
              animate={abriendo ? { opacity: 0 } : { opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.2, repeat: abriendo ? 0 : Infinity }}
            >
              Toca para abrir tu invitación
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
