import type { Metadata } from "next";
import LegalPage, {
  Bullets,
  DataList,
  LegalLink,
  Note,
  P,
  Steps,
  SubTitle,
  type LegalSection,
} from "@/components/legal/LegalPage";

const UPDATED = "11 de agosto de 2026";

const DESCRIPTION =
  "Aviso de Privacidad de PG Estrategias conforme a la LFPDPPP: qué datos recabamos, para qué los usamos, a quién los transferimos y cómo ejercer tus derechos ARCO.";

export const metadata: Metadata = {
  title: "Aviso de Privacidad · PG Estrategias",
  description: DESCRIPTION,
  alternates: { canonical: "/privacidad" },
  openGraph: {
    title: "Aviso de Privacidad · PG Estrategias",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Quién es responsable de tus datos",
    body: (
      <>
        <P>
          PG Estrategias (Growth Partners) es responsable del tratamiento de tus
          datos personales, en términos de la Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y
          los Lineamientos del Aviso de Privacidad.
        </P>
        <DataList
          rows={[
            { term: "Responsable", desc: "PG Estrategias · Growth Partners" },
            {
              term: "Domicilio",
              desc: "Calle Valencia 131-2, Las Palmas, Puebla, México",
            },
            {
              term: "Correo",
              desc: (
                <LegalLink href="mailto:contacto@pgestrategias.com">
                  contacto@pgestrategias.com
                </LegalLink>
              ),
            },
            {
              term: "WhatsApp / Teléfono",
              desc: (
                <LegalLink href="https://wa.me/5212221215051" external>
                  +52 222 121 5051
                </LegalLink>
              ),
            },
            {
              term: "Departamento de datos",
              desc: "Las solicitudes sobre datos personales se atienden por el mismo correo y WhatsApp.",
            },
          ]}
        />
        <Note>
          Cuando operamos campañas o mensajería por cuenta de un negocio cliente,
          ese negocio es el responsable de los datos de sus propios contactos y
          PG Estrategias actúa como encargado del tratamiento, siguiendo sus
          instrucciones.
        </Note>
      </>
    ),
  },
  {
    id: "datos-que-recabamos",
    title: "Qué datos personales recabamos",
    body: (
      <>
        <DataList
          rows={[
            {
              term: "Identificación y contacto",
              desc: "Nombre, correo electrónico, número de teléfono y WhatsApp.",
            },
            {
              term: "Datos de negocio",
              desc: "Giro o industria, nombre del negocio, facturación mensual aproximada, presupuesto de publicidad y objetivos comerciales.",
            },
            {
              term: "Datos fiscales",
              desc: "Sólo si te conviertes en cliente: razón social, RFC, régimen fiscal, domicilio fiscal y uso del CFDI.",
            },
            {
              term: "Datos de navegación",
              desc: "Páginas visitadas, tiempo de permanencia, origen del tráfico, dispositivo y navegador, recabados mediante cookies y píxeles de seguimiento.",
            },
            {
              term: "Interacciones publicitarias",
              desc: "Respuestas a anuncios, formularios completados y conversaciones sostenidas por WhatsApp Business o correo.",
            },
          ]}
        />
        <Note label="No recabamos datos sensibles">
          No solicitamos ni tratamos datos personales sensibles: origen racial o
          étnico, estado de salud, información genética, creencias religiosas o
          filosóficas, afiliación sindical, opiniones políticas ni preferencia
          sexual.
        </Note>
      </>
    ),
  },
  {
    id: "como-los-obtenemos",
    title: "Cómo obtenemos tus datos",
    body: (
      <>
        <SubTitle>De forma directa</SubTitle>
        <P>
          Cuando llenas un formulario en nuestro sitio o en una landing page,
          nos escribes por WhatsApp o correo, agendas una llamada, o nos
          proporcionas información durante una reunión o al contratar un
          servicio.
        </P>
        <SubTitle>De forma indirecta</SubTitle>
        <P>
          Cuando interactúas con nuestros anuncios en Meta (Facebook e Instagram)
          o Google y esas plataformas nos comparten los datos del formulario que
          completaste, conforme a sus propias políticas y a los permisos que
          otorgaste.
        </P>
        <SubTitle>De forma automática</SubTitle>
        <P>
          Mediante cookies y tecnologías de rastreo instaladas en nuestro sitio y
          en las páginas de ventas que administramos, según se detalla más
          adelante.
        </P>
      </>
    ),
  },
  {
    id: "finalidades-primarias",
    title: "Para qué usamos tus datos (finalidades primarias)",
    body: (
      <>
        <P>
          Estas finalidades son necesarias para la relación con nosotros. Sin
          ellas no podemos atenderte ni prestarte el servicio:
        </P>
        <Bullets
          items={[
            "Responder a tus solicitudes de información y contactarte por el medio que elegiste.",
            "Elaborar cotizaciones y propuestas comerciales a la medida de tu negocio.",
            "Prestar los servicios contratados: campañas publicitarias, producción audiovisual, mensajería, landing pages, CRM y perfiles de Google Business.",
            "Administrar la relación contractual: agenda de reuniones, reportes, soporte y seguimiento.",
            "Emitir facturas y cumplir obligaciones fiscales, contables y legales.",
            "Medir el desempeño de las campañas y atribuir resultados.",
          ]}
        />
      </>
    ),
  },
  {
    id: "finalidades-secundarias",
    title: "Finalidades secundarias y cómo negarte",
    body: (
      <>
        <P>
          Estas finalidades no son necesarias para prestarte el servicio, pero
          nos ayudan a mejorarlo y a mantener el contacto:
        </P>
        <Bullets
          items={[
            "Envío de comunicaciones comerciales, promociones, contenidos y novedades.",
            "Prospección comercial y seguimiento a interesados que no contrataron.",
            "Elaboración de estadísticas, estudios de mercado y segmentación de audiencias.",
            "Uso de resultados y materiales producidos en nuestro portafolio, casos de éxito y propuestas, cuando corresponda.",
          ]}
        />
        <Note label="Puedes negarte desde ahora">
          Si no quieres que tus datos se usen para estas finalidades secundarias,
          envía un correo a{" "}
          <LegalLink href="mailto:contacto@pgestrategias.com?subject=Negativa%20a%20finalidades%20secundarias">
            contacto@pgestrategias.com
          </LegalLink>{" "}
          con el asunto «Negativa a finalidades secundarias» dentro de los 5 días
          hábiles siguientes a que conozcas este aviso. Tu negativa no es motivo
          para negarte los servicios que contrates.
        </Note>
      </>
    ),
  },
  {
    id: "transferencias",
    title: "Con quién compartimos tus datos",
    body: (
      <>
        <Note label="No vendemos datos">
          PG Estrategias <strong>no vende, renta ni comercializa</strong> datos
          personales con terceros. Las transferencias que hacemos son únicamente
          las necesarias para operar el servicio.
        </Note>
        <DataList
          rows={[
            {
              term: "Meta Platforms",
              desc: "Facebook, Instagram y WhatsApp Business, para operar campañas publicitarias, públicos y mensajería.",
            },
            {
              term: "Google",
              desc: "Google Ads, Google Analytics y Google Business Profile, para operar campañas, medir resultados y administrar perfiles.",
            },
            {
              term: "Proveedores de CRM y automatización",
              desc: "Para almacenar y dar seguimiento a los contactos generados por las campañas.",
            },
            {
              term: "Proveedores de hosting y correo",
              desc: "Para alojar sitios, páginas de ventas y enviar comunicaciones.",
            },
            {
              term: "Contadores y asesores",
              desc: "Para facturación y cumplimiento de obligaciones fiscales.",
            },
            {
              term: "Autoridades competentes",
              desc: "Cuando exista un requerimiento fundado y motivado, en los casos previstos por la ley.",
            },
          ]}
        />
        <P>
          Algunos de estos proveedores se encuentran fuera de México y pueden
          almacenar información en servidores ubicados en el extranjero. En todos
          los casos exigimos que cuenten con medidas de seguridad y con
          obligaciones de confidencialidad equivalentes a las de este aviso.
        </P>
        <P>
          Estas transferencias son necesarias para el mantenimiento y
          cumplimiento de la relación jurídica contigo, por lo que no requieren
          tu consentimiento adicional conforme al artículo 37 de la LFPDPPP.
          Cualquier transferencia distinta a las señaladas se te informará y, en
          su caso, se te pedirá tu consentimiento.
        </P>
      </>
    ),
  },
  {
    id: "derechos-arco",
    title: "Tus derechos ARCO y cómo ejercerlos",
    body: (
      <>
        <P>
          Tienes derecho a conocer qué datos personales tenemos sobre ti, para
          qué los utilizamos y las condiciones de su uso (Acceso). También a
          pedir que corrijamos los que sean inexactos o incompletos
          (Rectificación); que los eliminemos de nuestros registros cuando
          consideres que no se usan conforme a la normativa (Cancelación); y a
          oponerte al uso de tus datos para fines específicos (Oposición).
        </P>
        <SubTitle>Cómo hacer la solicitud</SubTitle>
        <Steps
          items={[
            <>
              Envía tu solicitud al correo{" "}
              <LegalLink href="mailto:contacto@pgestrategias.com?subject=Solicitud%20de%20derechos%20ARCO">
                contacto@pgestrategias.com
              </LegalLink>{" "}
              o por WhatsApp al{" "}
              <LegalLink href="https://wa.me/5212221215051" external>
                +52 222 121 5051
              </LegalLink>
              .
            </>,
            "Incluye tu nombre completo y un medio de contacto para responderte.",
            "Acompaña un documento que acredite tu identidad, o la representación legal si actúas a nombre de otra persona.",
            "Describe de forma clara qué derecho quieres ejercer y sobre qué datos. Si pides una rectificación, indica el dato correcto y aporta el documento que lo respalde.",
          ]}
        />
        <SubTitle>Plazos</SubTitle>
        <DataList
          rows={[
            {
              term: "Respuesta",
              desc: "Comunicamos la determinación en un máximo de 20 días hábiles desde que recibimos la solicitud completa.",
            },
            {
              term: "Ejecución",
              desc: "Si procede, se hace efectiva dentro de los 15 días hábiles siguientes a esa comunicación.",
            },
            { term: "Costo", desc: "El trámite es gratuito." },
          ]}
        />
        <P>
          Si lo que quieres es específicamente la eliminación de tus datos,
          tenemos una página con las instrucciones detalladas:{" "}
          <LegalLink href="/eliminacion-de-datos">
            eliminación de datos personales
          </LegalLink>
          .
        </P>
        <P>
          Si consideras que tu derecho no fue atendido debidamente, puedes acudir
          al Instituto Nacional de Transparencia, Acceso a la Información y
          Protección de Datos Personales (INAI).
        </P>
      </>
    ),
  },
  {
    id: "revocacion",
    title: "Revocación del consentimiento",
    body: (
      <>
        <P>
          Puedes revocar en cualquier momento el consentimiento que nos otorgaste
          para el tratamiento de tus datos personales, por los mismos medios
          señalados para los derechos ARCO.
        </P>
        <P>
          Ten en cuenta que en algunos casos la revocación no puede ser inmediata
          o total, porque existan obligaciones legales que nos exijan seguir
          tratando ciertos datos —por ejemplo, los registros fiscales— o porque
          sean necesarios para concluir una relación contractual vigente.
        </P>
        <P>
          Para dejar de recibir comunicaciones comerciales basta con
          responder «BAJA» al mensaje que recibiste, o escribirnos por correo.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies y tecnologías de rastreo",
    body: (
      <>
        <P>
          Nuestro sitio y las páginas de ventas que administramos usan cookies y
          tecnologías similares para recordar tus preferencias, medir el
          desempeño de las campañas y mostrarte publicidad relevante.
        </P>
        <DataList
          rows={[
            {
              term: "Píxel de Meta",
              desc: "Registra visitas y acciones en el sitio para medir la efectividad de los anuncios de Facebook e Instagram y formar públicos de remarketing.",
            },
            {
              term: "Google Tag / Analytics",
              desc: "Mide el tráfico, el origen de las visitas y las conversiones de las campañas de Google.",
            },
            {
              term: "Cookies funcionales",
              desc: "Permiten que el sitio funcione correctamente y recuerde preferencias básicas de navegación.",
            },
          ]}
        />
        <SubTitle>Cómo desactivarlas</SubTitle>
        <P>
          Puedes bloquear o eliminar las cookies desde la configuración de tu
          navegador —en la sección de privacidad o de datos de navegación—. Si
          las desactivas, algunas funciones del sitio pueden dejar de operar
          correctamente. También puedes ajustar la publicidad personalizada
          desde la configuración de tu cuenta de Facebook o de Google.
        </P>
      </>
    ),
  },
  {
    id: "seguridad",
    title: "Seguridad y conservación de la información",
    body: (
      <>
        <P>
          Aplicamos medidas de seguridad administrativas, técnicas y físicas
          razonables para proteger tus datos contra daño, pérdida, alteración,
          destrucción o uso no autorizado: acceso restringido por usuario,
          contraseñas, autenticación en dos pasos en las plataformas que la
          permiten y acuerdos de confidencialidad con quienes intervienen en el
          servicio.
        </P>
        <P>
          Conservamos tus datos únicamente durante el tiempo necesario para
          cumplir las finalidades descritas y los plazos legales aplicables.
          Cumplido ese periodo, se bloquean y posteriormente se suprimen.
        </P>
      </>
    ),
  },
  {
    id: "menores",
    title: "Datos de menores de edad",
    body: (
      <>
        <P>
          Nuestros servicios están dirigidos a negocios y a personas mayores de
          edad. No recabamos intencionalmente datos personales de menores. Si
          detectamos que recibimos información de un menor sin la autorización de
          quien ejerce la patria potestad, la eliminamos.
        </P>
      </>
    ),
  },
  {
    id: "cambios",
    title: "Cambios a este aviso de privacidad",
    body: (
      <>
        <P>
          Este aviso puede modificarse por cambios en nuestros servicios, en
          nuestras prácticas de privacidad o en la legislación aplicable.
        </P>
        <P>
          La versión vigente es siempre la publicada en esta página, con su fecha
          de última actualización visible al inicio. Cuando el cambio sea
          relevante, lo comunicamos además por correo electrónico a los clientes
          activos y a quienes nos hayan dado su contacto.
        </P>
        <P>
          Te recomendamos revisar esta página periódicamente. Consultar los{" "}
          <LegalLink href="/terminos">Términos y Condiciones</LegalLink> te da el
          panorama completo de la relación contractual.
        </P>
      </>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Protección de datos"
      title={
        <>
          Aviso de <span style={{ color: "#D63A27" }}>Privacidad</span>
        </>
      }
      lead="Qué datos recabamos, para qué los usamos, con quién los compartimos y cómo puedes controlarlos. Redactado conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, y explicado sin términos técnicos."
      updated={UPDATED}
      sections={sections}
    />
  );
}
