/** Inserta un bloque JSON-LD. Se usa en el perfil y en las páginas de listado. */
export default function DatosEstructurados({ datos }: { datos: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
