import type { Metadata } from 'next';
import Link from 'next/link';
import {
  domicilioConfigurado,
  domicilioFiscal,
  FECHA_AVISO,
  MARCA,
  VERSION_AVISO,
} from '@/lib/listamedica/marca';
import { rutas, urlAbsoluta } from '@/lib/listamedica/rutas';
import { fechaLarga } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad Integral',
  description:
    'Aviso de Privacidad Integral de Lista Médica. Qué datos tratamos, qué deliberadamente no hacemos, y cómo ejercer sus derechos ARCO.',
  alternates: { canonical: urlAbsoluta('/aviso-de-privacidad') },
};

export default function AvisoPage() {
  return (
    <div className="lm-marco lm-marco--angosto lm-legal">
      <h1>Aviso de Privacidad Integral</h1>
      <p className="lm-legal__version">
        Versión {VERSION_AVISO}. Última actualización: {fechaLarga(FECHA_AVISO)}.
      </p>

      {!domicilioConfigurado() && (
        <div className="lm-aviso lm-aviso--alerta" style={{ marginBottom: 24 }}>
          Falta configurar el domicilio fiscal del responsable en la variable de entorno{' '}
          <code>LISTAMEDICA_DOMICILIO_FISCAL</code>. Hasta entonces este aviso no está completo para
          efectos de la ley.
        </div>
      )}

      <h2>1. Responsable</h2>
      <p>
        {MARCA.responsable}, quien opera comercialmente como PG Estrategias y como Lista Médica, con
        domicilio en {domicilioFiscal()}, Puebla, México, es responsable del tratamiento de los
        datos personales descritos en este aviso. Contacto:{' '}
        <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a> · WhatsApp {MARCA.whatsappLegible}.
      </p>

      <h2>2. Canal para el ejercicio de derechos</h2>
      <p>
        Para cualquier solicitud relacionada con sus datos personales, el canal es{' '}
        <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a>.
      </p>

      <h2>3. Qué datos tratamos</h2>
      <p>
        <em>De profesionales de la salud publicados en el directorio:</em> nombre completo, título
        profesional, número de cédula profesional y de especialidad, especialidades, formación
        académica, certificaciones de consejo, años de experiencia, fotografía, biografía
        profesional, idiomas, aseguradoras con las que trabaja, servicios y precios, y los datos de
        contacto y ubicación de su consultorio. Toda esta información es proporcionada por el propio
        profesional para su publicación, y tiene naturaleza profesional y comercial, no privada.
      </p>
      <p>
        <em>De visitantes del sitio:</em> datos técnicos y de navegación de carácter agregado y
        anónimo — tipo de dispositivo, navegador, origen de la visita, páginas consultadas, términos
        buscados y elementos en los que se hizo clic.{' '}
        <strong>
          No recabamos su dirección IP asociada a su navegación, ni su nombre, ni su teléfono, ni su
          correo electrónico.
        </strong>
      </p>

      <h2>4. Lo que este sitio NO hace</h2>
      <p>Lista Médica es exclusivamente un directorio de consulta. En consecuencia:</p>
      <ul>
        <li>
          <strong>No agendamos citas.</strong> No existe formulario de cita en este sitio. Cuando
          usted decide contactar a un profesional, se abre una conversación de WhatsApp directamente
          entre usted y ese profesional. Esa conversación ocurre fuera de nuestra plataforma y
          nosotros no tenemos acceso a su contenido.
        </li>
        <li>
          <strong>No almacenamos datos personales de pacientes.</strong> No guardamos su nombre, su
          teléfono, ni ningún dato que permita identificarlo.
        </li>
        <li>
          <strong>No almacenamos ni procesamos información clínica de ninguna clase</strong>:
          historiales, diagnósticos, síntomas, padecimientos, estudios, recetas ni notas médicas. Esa
          información permanece exclusivamente en poder del profesional que le atiende.
        </li>
        <li>
          <strong>No vendemos, rentamos ni comercializamos datos personales.</strong>
        </li>
      </ul>
      <p>
        Registramos, de forma anónima y agregada, cuántas personas consultaron cada perfil y cuántas
        usaron el botón de contacto, con la única finalidad de medir el desempeño del directorio. Ese
        registro no permite identificarlo a usted.
      </p>

      <h2>5. Finalidades del tratamiento</h2>
      <p>
        <em>Necesarias:</em> publicar y mantener actualizado el directorio; verificar la cédula
        profesional de las personas publicadas; permitir que los visitantes encuentren y contacten a
        un profesional; medir de forma agregada el uso del sitio; y cumplir obligaciones legales,
        fiscales y contractuales con los profesionales publicados.
      </p>
      <p>
        <em>Secundarias, a las que el profesional publicado puede oponerse:</em> enviarle información
        sobre el directorio y sobre otros servicios de PG Estrategias, y realizar encuestas de
        satisfacción. Para oponerse basta escribir a{' '}
        <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a>; su negativa no afecta su permanencia
        en el directorio.
      </p>

      <h2>6. Transferencias</h2>
      <p>No realizamos transferencias de datos personales a terceros para fines comerciales.</p>
      <p>
        Utilizamos proveedores que tratan información por nuestra cuenta y bajo nuestras
        instrucciones, únicamente para operar el sitio: alojamiento e infraestructura en la nube,
        servicios de mapas, y herramientas de analítica. Algunos pueden almacenar información en
        servidores fuera de México. Actúan como encargados y no están autorizados a usar la
        información para fines propios.
      </p>
      <p>
        La calificación y el número de reseñas que mostramos de algunos profesionales provienen de
        Google y se despliegan mediante un enlace a la ficha pública de Google de ese profesional. No
        alojamos el contenido de esas reseñas.
      </p>
      <p>
        Podremos comunicar información cuando lo requiera una autoridad competente en ejercicio de
        sus facultades.
      </p>

      <h2>7. Derechos ARCO</h2>
      <p>
        Usted tiene derecho a acceder a sus datos personales, a rectificarlos cuando sean inexactos o
        incompletos, a cancelarlos cuando considere que no se requieren para las finalidades
        señaladas, y a oponerse a su tratamiento. También puede revocar el consentimiento otorgado.
      </p>
      <p>
        Envíe su solicitud a <a href={`mailto:${MARCA.correo}`}>{MARCA.correo}</a> con: su nombre
        completo y un medio para responderle; copia de identificación oficial; descripción clara de
        los datos y del derecho que desea ejercer; y, en caso de rectificación, la documentación que
        la sustente.
      </p>
      <p>
        Responderemos en un máximo de veinte días hábiles y, de resultar procedente, se hará efectiva
        dentro de los quince días hábiles siguientes.
      </p>
      <p>
        <strong>
          Los profesionales publicados pueden solicitar en cualquier momento la baja de su perfil,
          sin explicación y sin costo.
        </strong>{' '}
        Se procesa dentro de las 48 horas siguientes.
      </p>

      <h2>8. Medidas de seguridad</h2>
      <p>
        Aplicamos medidas administrativas, técnicas y físicas para proteger la información: cifrado
        en tránsito y en reposo, control de accesos, registro de operaciones administrativas,
        respaldos periódicos y un procedimiento de respuesta ante incidentes. En caso de una
        vulneración que afecte de forma significativa los derechos de una persona, se lo
        comunicaremos.
      </p>

      <h2>9. Conservación</h2>
      <p>
        Los datos de los profesionales se conservan mientras su perfil esté publicado y,
        posteriormente, durante los plazos que exijan las obligaciones legales y fiscales aplicables.
        Los registros de navegación agregados se conservan por un máximo de veinticuatro meses.
      </p>

      <h2>10. Cookies</h2>
      <p>
        Utilizamos cookies propias y de terceros para recordar preferencias, medir el uso del sitio y
        evaluar el desempeño de nuestras campañas publicitarias. Puede deshabilitarlas desde su
        navegador; algunas funciones podrían dejar de operar correctamente.
      </p>

      <h2>11. Naturaleza del servicio</h2>
      <p>
        Lista Médica es una plataforma de información y consulta.{' '}
        <strong>
          No presta servicios de salud, no emite diagnósticos, no recomienda tratamientos, no agenda
          citas y no interviene en la relación entre el paciente y el profesional.
        </strong>{' '}
        La información de cada perfil es proporcionada por el profesional y es su responsabilidad. La
        verificación de cédula tiene el alcance descrito en el texto del sello y en la página{' '}
        <Link href={rutas.comoVerificamos()}>Cómo verificamos</Link>.
      </p>

      <h2>12. Cambios</h2>
      <p>
        Cualquier modificación se publicará en esta misma página indicando la fecha de actualización.
      </p>

      <h2>13. Autoridad</h2>
      <p>
        Si considera que su derecho a la protección de datos personales ha sido vulnerado, puede
        acudir ante la autoridad competente en materia de protección de datos personales en posesión
        de los particulares.
      </p>
    </div>
  );
}
