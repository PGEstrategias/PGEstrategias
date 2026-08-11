/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async rewrites() {
    return [
      {
        source: "/lpdoctores",
        destination: "/lpdoctores.html",
      },
    ];
  },
  async redirects() {
    return [
      // La propuesta de Pádel Lomas vivía en /padellomas antes de
      // homologar el nombre con /propuestawasabi.
      { source: "/padellomas", destination: "/propuestapadel", permanent: true },
      // Alias legales — por si el enlace se comparte con la ruta larga.
      {
        source: "/terminos-y-condiciones",
        destination: "/terminos",
        permanent: true,
      },
      {
        source: "/aviso-de-privacidad",
        destination: "/privacidad",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
