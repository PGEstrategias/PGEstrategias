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
    ];
  },
};

export default nextConfig;
