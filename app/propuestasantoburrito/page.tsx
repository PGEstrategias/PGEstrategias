import type { Metadata } from "next";
import PropuestaSantoBurritoClient from "./PropuestaSantoBurritoClient";

export const metadata: Metadata = {
  title: "Propuesta Digital — Mi Santo Burrito · PG Estrategias",
  description:
    "Propuesta de gestión digital para posicionar Mi Santo Burrito como el referente de comida mexicana auténtica en Polonia.",
};

export default function PropuestaSantoBurritoPage() {
  return <PropuestaSantoBurritoClient />;
}
