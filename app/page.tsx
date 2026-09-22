import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import QuienesSomos from "@/components/QuienesSomos";
import Testimonios from "@/components/Testimonios";
import Metodologia from "@/components/Metodologia";
import Garantia from "@/components/Garantia";
import Paquetes from "@/components/Paquetes";
import FAQ from "@/components/FAQ";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

/* Orden del ciclo de persuasión: atención → dolor → solución → prueba →
   claridad → reducir riesgo → oferta → objeciones → acción.
   El cambio de fondo respecto al orden anterior es que la garantía pasa a
   estar justo antes de los planes, para quitar el riesgo pegado al precio. */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <QuienesSomos />
        <Testimonios />
        <Metodologia />
        <Garantia />
        <Paquetes />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
