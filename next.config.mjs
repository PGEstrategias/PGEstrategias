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
      {
        source: "/propuestaimagenautomotrizlimon",
        destination: "/propuesta-imagen-automotriz-limon.html",
      },
      {
        source: "/webimagenautomotriz",
        destination: "/webimagenautomotriz/index.html",
      },
      {
        source: "/propuestainvermat",
        destination: "/propuesta-invermat.html",
      },
      {
        source: "/webinvermat",
        destination: "/invermat/index.html",
      },
      {
        source: "/lpinvermat",
        destination: "/invermat/lp.html",
      },
    ];
  },
  async redirects() {
    return [
      // La propuesta de Pádel Lomas vivía en /padellomas antes de
      // homologar el nombre con /propuestawasabi.
      { source: "/padellomas", destination: "/propuestapadel", permanent: true },
      // /bodas se volvió PG Event Films (bodas, XV años y eventos sociales).
      { source: "/bodas", destination: "/eventfilms", permanent: true },
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
