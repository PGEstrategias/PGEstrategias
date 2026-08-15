"use client";
import React from "react";
import { motion } from "framer-motion";

const WHATSAPP = "https://wa.me/528141558165";

export default function BodasCallToAction() {
  return (
    <section id="contacto" className="py-24 md:py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-gold-line" />

      <div className="bodas-container">
        <div className="relative rounded-3xl border border-[#C9A050]/10 bg-white/[0.02] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,160,80,0.06)_0%,transparent_60%)]" />

          <div className="relative z-10 text-center px-8 py-20 md:py-28">
            <p className="bodas-label mb-4">Da el primer paso</p>
            <h2 className="bodas-serif text-4xl md:text-6xl tracking-tight leading-[1.1] max-w-2xl mx-auto">
              Tu fecha se puede{" "}
              <span className="italic text-white/60">llenar pronto</span>
            </h2>
            <p className="bodas-subtitle mx-auto mt-6 max-w-lg">
              No dejes tu día más importante al azar. Escríbenos hoy y
              platiquemos sobre cómo hacer de tu boda un recuerdo que dure para
              siempre.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="bodas-btn-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path
                    d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.654-.698c1.048.577 1.603.878 2.806.878 3.181 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.766-5.768-5.766zm3.073 8.237c-.128.36-.744.687-1.037.732-.293.045-.556.064-3.065-.964-2.508-1.027-4.08-3.604-4.204-3.77-.124-.167-.98-1.304-.98-2.486 0-1.183.599-1.764.835-2.01.236-.245.48-.306.648-.306.167 0 .335.002.481.009.167.007.381-.056.583.468.21.543.716 1.867.779 2.002.062.135.09.295.008.468-.083.173-.123.281-.248.431-.124.15-.266.335-.373.449-.124.132-.256.275-.112.542.145.268.645 1.114 1.394 1.812.964.898 1.785 1.18 2.053 1.313.268.133.42.112.579-.056.159-.167.676-.76.861-1.024.185-.264.363-.218.604-.12.24.098 1.532.72 1.795.851.262.13.433.197.496.303.062.106.062.61-.066.97z"
                    fillRule="evenodd"
                  />
                </svg>
                Cotizar por WhatsApp
              </motion.a>
              <a href="#paquetes" className="bodas-btn-outline">
                Ver Paquetes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
