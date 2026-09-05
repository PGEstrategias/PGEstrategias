"use client";
import React from "react";
import { whatsappUrl } from "@/components/bodas/contacto";
import WhatsAppIcon from "@/components/bodas/WhatsAppIcon";

type Props = {
  /* El acento va como fragmento aparte para poder pintarlo en rosa. */
  title: string;
  titleAccent: string;
  text: string;
  ctaLabel: string;
  ctaMessage: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export default function BodasCallToAction({
  title,
  titleAccent,
  text,
  ctaLabel,
  ctaMessage,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <section id="contacto" className="bodas-blush py-24 md:py-32">
      <div className="bodas-container">
        <div className="bodas-frame relative px-8 py-20 md:py-24 text-center">
          <p className="bodas-label bodas-label-ink mb-5">Da el primer paso</p>
          <h2 className="bodas-title max-w-2xl mx-auto">
            {title} <span className="bodas-em-rose">{titleAccent}</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6 max-w-lg">{text}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href={whatsappUrl(ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="bodas-btn-ink"
            >
              <WhatsAppIcon />
              {ctaLabel}
            </a>
            <a
              href={secondaryHref}
              className="font-body text-[13px] tracking-[0.06em] underline underline-offset-8 transition-colors duration-500 hover:text-[color:#A85E56]"
              style={{ color: "#4A443D" }}
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
