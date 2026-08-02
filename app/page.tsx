import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Testimonios from "@/components/Testimonios";
import Garantia from "@/components/Garantia";
import QuienesSomos from "@/components/QuienesSomos";
import Metodologia from "@/components/Metodologia";
import Paquetes from "@/components/Paquetes";
import FAQ from "@/components/FAQ";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Testimonios />
        <Garantia />
        <QuienesSomos />
        <Metodologia />
        <Paquetes />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
