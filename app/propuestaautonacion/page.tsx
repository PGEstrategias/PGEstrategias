import type { Metadata } from "next";
import PropuestaAutonacionClient from "./PropuestaAutonacionClient";

export const metadata: Metadata = {
  title: "Propuesta — Autonación · PG Estrategias",
  description:
    "El inventario ya lo tienen. La audiencia ya la construyeron. Producción, campañas y automatización para convertirlos en ventas.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaAutonacionClient />;
}
