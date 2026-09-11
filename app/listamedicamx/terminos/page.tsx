import type { Metadata } from 'next';
import Link from 'next/link';
import { FECHA_AVISO, MARCA, domicilioFiscal } from '@/lib/listamedica/marca';
import { rutas, urlAbsoluta } from '@/lib/listamedica/rutas';
import { fechaLarga } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y Condiciones de uso de Lista Médica: naturaleza del servicio, responsabilidad de la información publicada y alcance de la verificación de cédula.',
  alternates: { canonical: urlAbsoluta('/terminos') },
};

export default function TerminosPage() {
  return (
    <div className="lm-marco lm-marco--angosto lm-legal">
      <h1>Términos y Condiciones</h1>
      <p className="lm-legal__version">Última actualización: {fechaLarga(FECHA_AVISO)}.</p>

      <h2>1. Quién opera este sitio</h2>
      <p>
        Lista Médica es operada por {MARCA.responsable}, quien opera comercialmente como PG
        Estrategias, con domicilio en {domicilioFiscal()}, Puebla, México. Contacto:{' '}
        <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a> · WhatsApp {MARCA.whatsappLegible}.
      </p>

      <h2>2. Qué es este servicio</h2>
      <p>
        Lista Médica es un directorio de información sobre profesionales de la salud que ejercen en
        Puebla, Cholula y Atlixco. Su única función es permitir que una persona encuentre a un
        profesional y decida contactarlo por su cuenta.
      </p>
      <p>
        Lista Médica <strong>no presta servicios de salud</strong>, no emite diagnósticos, no
        recomienda tratamientos, no agenda citas y no interviene en la relación entre el paciente y
        el profesional. Nada de lo publicado aquí sustituye una consulta.
      </p>
      <p>
        En una urgencia médica, acuda a un servicio de urgencias o llame al 911. Este sitio no
        atiende urgencias.
      </p>

      <h2>3. Contacto por WhatsApp</h2>
      <p>
        El botón de contacto abre una conversación de WhatsApp directamente entre usted y el
        profesional. Esa conversación ocurre fuera de esta plataforma; no participamos en ella, no
        la vemos y no guardamos su contenido. Lo único que registramos es que alguien usó el botón,
        de forma anónima y agregada.
      </p>

      <h2>4. La información de cada perfil</h2>
      <p>
        Los datos de cada perfil —formación, servicios, precios, horarios y ubicación— los
        proporciona el propio profesional y son su responsabilidad. Hacemos un esfuerzo razonable
        por mantenerlos al día, pero pueden cambiar sin que nos enteremos. Confirme precios y
        horarios directamente con el profesional antes de su visita.
      </p>
      <p>
        Los horarios publicados son informativos y no constituyen disponibilidad reservada: no hay
        agenda en este sitio.
      </p>

      <h2>5. Alcance de la verificación de cédula</h2>
      <p>
        La verificación consiste en comprobar, en el Registro Nacional de Profesionistas de la
        Secretaría de Educación Pública, que el número de cédula declarado existe y corresponde al
        nombre de la persona, en la fecha indicada en el sello.
      </p>
      <p>
        Esa verificación <strong>no</strong> certifica competencia clínica, no constituye
        recomendación y no garantiza la calidad de la atención.{' '}
        <Link href={rutas.comoVerificamos()}>Cómo verificamos</Link> explica el proceso completo.
      </p>

      <h2>6. Reseñas de Google</h2>
      <p>
        En algunos perfiles mostramos la calificación promedio y el número de reseñas que el
        profesional tiene en Google, con un enlace a su ficha pública. Esa información es de Google
        y de quienes la escribieron; no la alojamos, no la editamos y no respondemos por su
        contenido.
      </p>

      <h2>7. Uso permitido</h2>
      <p>
        Este directorio es para consulta personal. No está permitido extraer de forma automatizada
        su contenido, reproducir el listado completo, usar los datos de contacto de los
        profesionales para envíos masivos, ni suplantar a ninguna de las personas publicadas.
      </p>

      <h2>8. Para los profesionales publicados</h2>
      <p>
        Al pedir su publicación, el profesional declara que la información que proporciona es
        verdadera y que está facultado para ejercer. Puede solicitar correcciones o la baja de su
        perfil en cualquier momento escribiendo a{' '}
        <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a>; la baja se procesa dentro de las 48
        horas siguientes, sin explicación y sin costo.
      </p>
      <p>
        Podemos despublicar un perfil si detectamos información inexacta, si no logramos verificar la
        cédula, o a petición de una autoridad competente.
      </p>

      <h2>9. Limitación de responsabilidad</h2>
      <p>
        Lista Médica responde por el funcionamiento del directorio, no por los servicios de salud que
        preste un tercero. La decisión de contactar y de atenderse con determinado profesional es
        suya, y la relación que surja de ahí es entre usted y esa persona.
      </p>

      <h2>10. Datos personales</h2>
      <p>
        El tratamiento de datos se rige por el{' '}
        <Link href={rutas.privacidad()}>Aviso de Privacidad</Link>, que forma parte de estos
        términos.
      </p>

      <h2>11. Cambios</h2>
      <p>
        Estos términos pueden cambiar. Las modificaciones se publican en esta misma página con su
        fecha de actualización.
      </p>

      <h2>12. Ley aplicable</h2>
      <p>
        Estos términos se rigen por la legislación mexicana. Para cualquier controversia, las partes
        se someten a los tribunales competentes de la ciudad de Puebla, Puebla.
      </p>
    </div>
  );
}
