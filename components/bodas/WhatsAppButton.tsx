"use client";
import React from "react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";

export function BodasWhatsAppButton({ mensaje }: { mensaje: string }) {
  return (
    <motion.a
      href={whatsappUrl(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14"
      style={{
        background: "#C4A052",
        color: "#14120F",
        boxShadow: "0 6px 28px rgba(20,18,15,0.4)",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
        <path
          d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.654-.698c1.048.577 1.603.878 2.806.878 3.181 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.504-4.465 9.969-9.969 9.969-1.742 0-3.37-.442-4.81-1.218l-5.221 1.371 1.395-5.082c-.868-1.503-1.333-3.08-1.333-4.84 0-5.504 4.465-9.969 9.969-9.969 5.503 0 9.969 4.464 9.969 9.969z"
          fillRule="evenodd"
        />
      </svg>
    </motion.a>
  );
}
