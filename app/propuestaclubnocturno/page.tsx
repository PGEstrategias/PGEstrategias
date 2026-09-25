import type { Metadata } from "next";
import PropuestaClubNocturnoClient from "./PropuestaClubNocturnoClient";

export const metadata: Metadata = {
  title: "Propuesta — Club nocturno · PG Estrategias",
  description:
    "Propuesta de producción audiovisual y marketing digital para clubes nocturnos: temporada Octubre–Noviembre 2026.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaClubNocturnoClient />;
}
