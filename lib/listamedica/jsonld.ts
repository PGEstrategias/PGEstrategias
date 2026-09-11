import { direccionLegible } from './consultorio';
import { urlAbsoluta } from './rutas';
import { nombreCiudad, nombreCompleto } from './texto';
import type { ProfesionalCompleto } from './tipos';

/**
 * JSON-LD del perfil: Physician + MedicalBusiness.
 *
 * No se declara aggregateRating con los datos de Google: esa calificación es
 * de Google y se muestra enlazada a su ficha, no reclamada como propia.
 */
export function jsonLdPerfil(p: ProfesionalCompleto): Record<string, unknown> {
  const consultorio = p.consultorios[0];
  const url = urlAbsoluta(`/dr/${p.slug}`);
  const especialidades = p.especialidades.map((e) => e.nombre);

  const direccion = consultorio
    ? {
        '@type': 'PostalAddress',
        streetAddress: direccionLegible(consultorio),
        addressLocality: nombreCiudad(consultorio.ciudad),
        addressRegion: 'Puebla',
        postalCode: consultorio.cp || undefined,
        addressCountry: 'MX',
      }
    : undefined;

  const geo =
    consultorio && consultorio.lat !== null && consultorio.lng !== null
      ? { '@type': 'GeoCoordinates', latitude: consultorio.lat, longitude: consultorio.lng }
      : undefined;

  const servicios = p.servicios
    .filter((s) => s.publicar_precio && s.precio_desde !== null)
    .map((s) => ({
      '@type': 'Offer',
      name: s.nombre,
      price: s.precio_desde,
      priceCurrency: 'MXN',
    }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': `${url}#profesional`,
        name: nombreCompleto(p),
        url,
        image: p.foto_url || undefined,
        description: p.bio || undefined,
        medicalSpecialty: especialidades.length ? especialidades : undefined,
        telephone: p.telefono || undefined,
        knowsLanguage: p.idiomas.length ? p.idiomas : undefined,
        alumniOf: p.universidad
          ? { '@type': 'EducationalOrganization', name: p.universidad }
          : undefined,
        address: direccion,
        geo,
      },
      {
        '@type': 'MedicalBusiness',
        '@id': `${url}#consultorio`,
        name: `Consultorio de ${nombreCompleto(p)}`,
        url,
        telephone: p.telefono || undefined,
        address: direccion,
        geo,
        openingHours: consultorio?.horario_texto || undefined,
        makesOffer: servicios.length ? servicios : undefined,
        priceRange: servicios.length ? '$$' : undefined,
      },
    ],
  };
}

export function jsonLdFaqs(p: ProfesionalCompleto): Record<string, unknown> | null {
  if (!p.faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  };
}
