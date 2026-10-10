"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ContactMenuProvider, useContactMenu } from "@/context/ContactMenuContext";

/* El menú de contacto usa framer-motion (~115 KB). Se descarga solo la
   primera vez que alguien lo abre, para no cargarlo en cada página. */
const ContactMenu = dynamic(() => import("./ContactMenu"), { ssr: false });

function LazyContactMenu() {
  const { isOpen } = useContactMenu();
  const [montado, setMontado] = useState(false);
  useEffect(() => {
    if (isOpen) setMontado(true);
  }, [isOpen]);
  return montado ? <ContactMenu /> : null;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ContactMenuProvider>
      {children}
      <LazyContactMenu />
    </ContactMenuProvider>
  );
}
