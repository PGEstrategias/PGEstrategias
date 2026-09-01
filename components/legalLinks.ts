/* Enlaces legales compartidos. Vive fuera de Footer.tsx (que es "use client")
   para poder importarse también desde componentes de servidor. */
export const legalLinks = [
  { label: "Aviso de Privacidad", href: "/privacidad" },
  { label: "Términos y Condiciones", href: "/terminos" },
  { label: "Eliminación de datos", href: "/eliminacion-de-datos" },
];
