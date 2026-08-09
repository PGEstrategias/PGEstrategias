import type { Metadata } from "next";
import PropuestaDavidClient from "./PropuestaDavidClient";

export const metadata: Metadata = {
  title: "Propuesta Publicitaria — David Gasera · PG Estrategias",
  description:
    "Propuesta de inversión publicitaria para suministro de gas LP y natural en comercios e industrias de Puebla.",
};

export default function PropuestaDavidPage() {
  return <PropuestaDavidClient />;
}
