import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PG Estrategias — Experiencia",
  description:
    "Una experiencia interactiva en 8 actos. Sin scroll. Sin menú. Solo el relato.",
};

export default function ExperienciaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-hidden select-none">
      {children}
    </div>
  );
}
