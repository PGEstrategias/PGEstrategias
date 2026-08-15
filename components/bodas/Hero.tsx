"use client";
import React from "react";
import { motion } from "framer-motion";

const WHATSAPP = "https://wa.me/528141558165";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.654-.698c1.048.577 1.603.878 2.806.878 3.181 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.766-5.768-5.766zm3.073 8.237c-.128.36-.744.687-1.037.732-.293.045-.556.064-3.065-.964-2.508-1.027-4.08-3.604-4.204-3.77-.124-.167-.98-1.304-.98-2.486 0-1.183.599-1.764.835-2.01.236-.245.48-.306.648-.306.167 0 .335.002.481.009.167.007.381-.056.583.468.21.543.716 1.867.779 2.002.062.135.09.295.008.468-.083.173-.123.281-.248.431-.124.15-.266.335-.373.449-.124.132-.256.275-.112.542.145.268.645 1.114 1.394 1.812.964.898 1.785 1.18 2.053 1.313.268.133.42.112.579-.056.159-.167.676-.76.861-1.024.185-.264.363-.218.604-.12.24.098 1.532.72 1.795.851.262.13.433.197.496.303.062.106.062.61-.066.97z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default function BodasHero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,160,80,0.03)_0%,transparent_70%)]" />

      <div className="bodas-container relative z-10 pt-28 pb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="bodas-label mb-6">Oasis Creativa × PG Estrategias</p>

          <h1 className="bodas-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Tu boda merece{" "}
            <span className="italic text-white/70">ser una película</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mt-8">
            Cada mirada, cada risa, cada lágrima de felicidad merece ser
            capturada como se siente — con la emoción intacta y la belleza que
            solo el cine puede darle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="#paquetes" className="bodas-btn-primary">
              Ver Paquetes
            </a>
            <a
              href={WHATSAPP}
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
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(201,160,80,0.08)_0%,transparent_70%)] blur-2xl" />

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] aspect-video">
            <iframe
              src="https://drive.google.com/file/d/1AtBE8gsV4VG2UIUVbKNvwzLniZIjwzvT/preview"
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
              allow="autoplay"
              allowFullScreen
              title="Demo reel de bodas"
            />
          </div>

          <p className="text-center text-white/30 text-xs uppercase tracking-[0.2em] mt-4">
            ▶ Demo reel — Así se vive una boda con nosotros
          </p>
        </motion.div>
      </div>
    </section>
  );
}
