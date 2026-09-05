"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";
import WhatsAppIcon from "@/components/bodas/WhatsAppIcon";

const MSG_HERO =
  "Hola, me interesa la cobertura de video y foto para mi boda. ¿Podemos hablar?";

export default function BodasHero() {
  return (
    <section className="bodas-dark relative min-h-screen overflow-hidden">
      {/* Halos cálidos: dorado arriba, rosa abajo */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "-18%",
          right: "-8%",
          width: "58vw",
          height: "58vw",
          background:
            "radial-gradient(circle, rgba(196,160,82,0.16) 0%, transparent 62%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "-5%",
          left: "-10%",
          width: "48vw",
          height: "48vw",
          background:
            "radial-gradient(circle, rgba(231,201,196,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="bodas-container relative z-10 pt-32 pb-24">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="bodas-label mb-7">Producción audiovisual · PG Estrategias</p>

          <h1 className="bodas-display max-w-5xl mx-auto">
            Tu boda merece{" "}
            <span className="bodas-em">ser una película</span>
          </h1>

          <div className="bodas-ornament my-9" aria-hidden>
            <span
              style={{
                display: "block",
                width: 6,
                height: 6,
                transform: "rotate(45deg)",
                background: "#C4A052",
              }}
            />
          </div>

          <p className="bodas-subtitle mx-auto">
            Cada mirada, cada risa, cada lágrima de felicidad merece ser
            capturada como se siente — con la emoción intacta y la belleza que
            solo el cine puede darle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="#paquetes" className="bodas-btn-gold">
              Ver paquetes
            </a>
            <a
              href={whatsappUrl(MSG_HERO)}
              target="_blank"
              rel="noopener noreferrer"
              className="bodas-btn-outline"
            >
              <WhatsAppIcon />
              Contáctanos
            </a>
          </div>
        </motion.div>

        {/* Demo reel */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="bodas-frame relative overflow-hidden aspect-video"
            style={{ boxShadow: "0 0 90px rgba(0,0,0,0.55)" }}
          >
            <iframe
              src="https://drive.google.com/file/d/1AtBE8gsV4VG2UIUVbKNvwzLniZIjwzvT/preview"
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
              allow="autoplay"
              allowFullScreen
              title="Demo reel de bodas"
            />
          </div>

          <p
            className="text-center font-body text-[11px] uppercase tracking-[0.2em] mt-8"
            style={{ color: "rgba(247,243,238,0.38)" }}
          >
            Demo reel — así se vive una boda con nosotros
          </p>
        </motion.div>
      </div>
    </section>
  );
}
