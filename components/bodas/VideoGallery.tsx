"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Los videos viven en Cloudinary. El .jpg del mismo public_id es el
   thumbnail que Cloudinary genera del primer frame. */
const videos = [
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779377735/Reel_t5pucv.mp4",
    poster:
      "https://res.cloudinary.com/djduba5fd/video/upload/so_0/v1779377735/Reel_t5pucv.jpg",
    title: "Reel de bodas",
    caption: "Los momentos que no se repiten, contados como cine.",
  },
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1788934650/WhatsApp_Video_2026-09-08_at_11.50.52_PM_mcx1as.mp4",
    poster:
      "https://res.cloudinary.com/djduba5fd/video/upload/so_0/v1788934650/WhatsApp_Video_2026-09-08_at_11.50.52_PM_mcx1as.jpg",
    title: "Detrás de la emoción",
    caption: "Así se siente ver tu boda otra vez.",
  },
];

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.4-6.86a.5.5 0 0 0 0-.84L8.77 4.72a.5.5 0 0 0-.77.42z" />
    </svg>
  );
}

function VideoCard({
  video,
  index,
  onOpen,
}: {
  video: (typeof videos)[number];
  index: number;
  onOpen: () => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  /* Arrancamos en vertical (formato reel) y corregimos con las
     dimensiones reales en cuanto el navegador lee los metadatos. */
  const [ratio, setRatio] = React.useState("9 / 16");

  const handleMetadata = () => {
    const el = videoRef.current;
    if (el?.videoWidth && el.videoHeight) {
      setRatio(`${el.videoWidth} / ${el.videoHeight}`);
    }
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Reproducir ${video.title}`}
        className="relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-[#C9A050]/30"
        style={{ aspectRatio: ratio }}
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onLoadedMetadata={handleMetadata}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 pl-1 text-white opacity-80 backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:border-[#C9A050]/60 group-hover:opacity-100">
            <PlayIcon />
          </span>
        </span>
      </button>

      <p className="mt-4 text-sm text-white/40 leading-relaxed">
        {video.caption}
      </p>
    </motion.div>
  );
}

export default function BodasVideoGallery() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const active = openIndex === null ? null : videos[openIndex];

  React.useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="videos" className="relative bg-black py-24 md:py-32">
      <div className="absolute left-0 right-0 top-0 h-px bodas-gold-line" />

      <div className="bodas-container">
        <div className="mb-16 text-center">
          <p className="bodas-label mb-4">Nuestro trabajo</p>
          <h2 className="bodas-title">
            Míralo con tus
            <br />
            <span className="italic text-white/60">propios ojos</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            Antes de contarte los paquetes, te dejamos lo que realmente importa:
            las bodas que ya hemos filmado.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {videos.map((video, index) => (
            <VideoCard
              key={video.src}
              video={video}
              index={index}
              onOpen={() => setOpenIndex(index)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Cerrar video"
              className="absolute right-5 top-5 text-3xl leading-none text-white/50 transition-colors hover:text-white"
            >
              ×
            </button>

            <motion.video
              key={active.src}
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[88vh] w-auto max-w-full rounded-xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
