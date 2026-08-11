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
  "Instrucciones para solicitar la eliminación de tus datos personales en poder de PG Estrategias, incluidos los obtenidos a través de integraciones con Meta, WhatsApp Business y Google.";

export const metadata: Metadata = {
  title: "Eliminación de datos · PG Estrategias",
  description: DESCRIPTION,
  alternates: { canonical: "/eliminacion-de-datos" },
  openGraph: {
    title: "Eliminación de datos · PG Estrategias",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

const sections: LegalSection[] = [
  {
    id: "que-es",
    title: "Qué es esta página",
    body: (
      <>
        <P>
          Esta página explica, paso a paso, cómo pedir que PG Estrategias elimine
          los datos personales que tenga sobre ti. Es una página pública: no
          necesitas cuenta ni iniciar sesión para leerla ni para hacer la
          solicitud.
        </P>
        <P>
          Aplica para cualquier persona cuyos datos hayamos podido recibir, ya
          sea porque nos contactó directamente, porque interactuó con un anuncio
          o un WhatsApp de alguno de los negocios que atendemos, o porque dejó
          sus datos en una landing page administrada por nosotros.
        </P>
        <P>
          El trámite es gratuito y puedes hacerlo en cualquier momento.
        </P>
      </>
    ),
  },
  {
    id: "que-datos",
    title: "Qué datos podemos tener sobre ti",
    body: (
      <>
        <P>
          Según cómo hayas llegado a nosotros, podemos conservar alguno de estos
          datos:
        </P>
        <Bullets
          items={[
            "Datos de identificación y contacto: nombre, número de teléfono o WhatsApp y correo electrónico.",
            "Conversaciones sostenidas por WhatsApp Business, incluidos los mensajes automatizados que hayas recibido o respondido.",
            "Interacciones con anuncios en Meta (Facebook e Instagram) y Google: clics, respuestas y formularios de contacto que hayas completado.",
            "Datos capturados en landing pages y almacenados en el CRM: el formulario que llenaste y las notas de seguimiento comercial.",
            "Datos de navegación recabados mediante cookies y píxeles de seguimiento de Meta y Google, en forma de identificadores, no de nombre.",
            "Si además fuiste cliente nuestro: datos fiscales y de facturación.",
          ]}
        />
        <P>
          No recabamos datos personales sensibles —origen étnico, estado de
          salud, creencias religiosas, opiniones políticas o preferencia
          sexual—.
        </P>
      </>
    ),
  },
  {
    id: "de-quien-son",
    title: "De quién son los datos que tenemos",
    body: (
      <>
        <Note>
          Buena parte de la información que manejamos pertenece a los negocios
          que contratan nuestros servicios. Nosotros la tratamos por cuenta de
          ellos, siguiendo sus instrucciones.
        </Note>
        <P>
          Esto significa que hay dos escenarios, y en los dos te ayudamos:
        </P>
        <SubTitle>Si el dato es nuestro</SubTitle>
        <P>
          Cuando nos contactaste directamente a PG Estrategias —por nuestro
          sitio, nuestro WhatsApp o nuestras redes—, nosotros somos los
          responsables del tratamiento y eliminamos tus datos directamente.
        </P>
        <SubTitle>Si el dato es de un negocio que atendemos</SubTitle>
        <P>
          Cuando interactuaste con la campaña, el WhatsApp o la landing page de
          uno de nuestros clientes, el responsable de esos datos es ese negocio y
          nosotros actuamos como encargados. En ese caso recibimos tu solicitud,
          la ejecutamos en los sistemas que administramos y la trasladamos al
          negocio responsable para que haga lo propio, informándote de a quién se
          trasladó.
        </P>
      </>
    ),
  },
  {
    id: "como-solicitar",
    title: "Cómo solicitar la eliminación de tus datos",
    body: (
      <>
        <Steps
          items={[
            <>
              <strong>Escríbenos por cualquiera de estos dos medios:</strong> al
              correo{" "}
              <LegalLink href="mailto:contacto@pgestrategias.com?subject=Eliminaci%C3%B3n%20de%20datos%20personales">
                contacto@pgestrategias.com
              </LegalLink>{" "}
              con el asunto «Eliminación de datos personales», o por WhatsApp al{" "}
              <LegalLink href="https://wa.me/5212221215051?text=Solicito%20la%20eliminaci%C3%B3n%20de%20mis%20datos%20personales" external>
                +52 222 121 5051
              </LegalLink>{" "}
              con ese mismo texto.
            </>,
            <>
              <strong>Incluye los datos con los que podamos encontrarte:</strong>{" "}
              tu nombre completo, y el número de teléfono o el correo electrónico
              con el que te contactaron. Si lo recuerdas, dinos también el nombre
              del negocio o de la campaña por la que llegaste.
            </>,
            <>
              <strong>Dinos qué quieres eliminar:</strong> todos tus datos, o
              solo un canal —por ejemplo, dejar de recibir mensajes de WhatsApp
              pero conservar tu expediente como cliente—. Si no especificas,
              procedemos con la eliminación total.
            </>,
            <>
              <strong>Confirma tu identidad:</strong> para proteger tus datos,
              pedimos que la solicitud llegue desde el mismo número o correo que
              queremos eliminar, o que nos envíes una identificación oficial si
              eso no es posible. Es el único requisito y sirve para que nadie más
              pueda borrar tu información.
            </>,
            <>
              <strong>Espera nuestra confirmación:</strong> te respondemos por el
              mismo medio por el que nos escribiste, con el resultado del
              trámite.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "plazos",
    title: "Plazos de respuesta",
    body: (
      <>
        <DataList
          rows={[
            {
              term: "Acuse de recibo",
              desc: "Confirmamos que recibimos tu solicitud en un máximo de 5 días hábiles.",
            },
            {
              term: "Resolución",
              desc: "Te comunicamos la determinación en un máximo de 20 días hábiles contados desde que recibimos la solicitud completa.",
            },
            {
              term: "Ejecución",
              desc: "Si la solicitud procede, la eliminación se hace efectiva dentro de los 15 días hábiles siguientes a esa comunicación.",
            },
            {
              term: "Confirmación",
              desc: "Te avisamos por el mismo medio de contacto cuando la eliminación queda ejecutada.",
            },
          ]}
        />
        <P>
          Estos plazos siguen lo previsto en la Ley Federal de Protección de
          Datos Personales en Posesión de los Particulares. En la práctica solemos
          resolver bastante antes.
        </P>
        <P>
          Si la información que nos das no basta para localizarte en nuestros
          sistemas, te lo hacemos saber dentro de los primeros 5 días hábiles
          para que puedas completarla.
        </P>
      </>
    ),
  },
  {
    id: "excepciones",
    title: "Qué datos no podemos borrar de inmediato",
    body: (
      <>
        <P>
          Hay información que estamos obligados a conservar por un tiempo
          determinado, aunque pidas su eliminación. En esos casos los datos se
          bloquean —dejan de usarse para cualquier fin comercial y se resguardan—
          hasta que vence el plazo legal, y entonces se suprimen.
        </P>
        <DataList
          rows={[
            {
              term: "Registros fiscales",
              desc: "Facturas, comprobantes y contabilidad relacionados con servicios contratados. Se conservan 5 años, conforme al Código Fiscal de la Federación.",
            },
            {
              term: "Constancias de consentimiento",
              desc: "El registro mínimo que acredita que autorizaste el contacto y que atendimos tu solicitud, para poder demostrar el cumplimiento de la ley.",
            },
            {
              term: "Defensa legal",
              desc: "Información estrictamente necesaria para atender una reclamación o un requerimiento de autoridad competente, mientras dure el procedimiento.",
            },
            {
              term: "Copias de respaldo",
              desc: "Los respaldos técnicos se sobrescriben en sus ciclos normales. Los datos eliminados desaparecen de ellos cuando se cumple ese ciclo.",
            },
          ]}
        />
        <P>
          Fuera de estos supuestos, la eliminación es completa: tus datos salen
          del CRM, de las listas de mensajería y de los públicos de campaña que
          administramos.
        </P>
      </>
    ),
  },
  {
    id: "quitar-app-facebook",
    title: "Esto es distinto de quitar la app desde Facebook",
    body: (
      <>
        <P>
          Si quieres retirar el permiso que diste a una aplicación desde tu
          cuenta de Facebook, puedes hacerlo tú mismo:
        </P>
        <Steps
          items={[
            "Entra a tu cuenta de Facebook y abre «Configuración y privacidad».",
            "Selecciona «Configuración» y después «Aplicaciones y sitios web».",
            "Busca la aplicación en la lista y elige «Eliminar».",
          ]}
        />
        <Note>
          Quitar la aplicación desde Facebook impide que se recopile información
          nueva, pero <strong>no elimina por sí solo los datos que ya
          recibimos</strong>. Para eso hace falta la solicitud descrita en esta
          página.
        </Note>
      </>
    ),
  },
  {
    id: "otros-derechos",
    title: "Otros derechos que puedes ejercer",
    body: (
      <>
        <P>
          La eliminación es uno de los derechos ARCO. Por el mismo canal puedes
          también:
        </P>
        <Bullets
          items={[
            "Acceder: saber qué datos tuyos tenemos y para qué los usamos.",
            "Rectificar: corregir datos inexactos o incompletos.",
            "Cancelar: pedir que dejemos de tratarlos, que es lo que explica esta página.",
            "Oponerte: pedir que dejemos de usarlos para una finalidad concreta, como la publicidad, conservando el resto.",
          ]}
        />
        <P>
          El detalle de cada derecho y del tratamiento completo está en nuestro{" "}
          <LegalLink href="/privacidad">Aviso de Privacidad</LegalLink>.
        </P>
      </>
    ),
  },
];

export default function EliminacionDeDatosPage() {
  return (
    <LegalPage
      eyebrow="Protección de datos"
      title={
        <>
          Eliminación de{" "}
          <span style={{ color: "#D63A27" }}>datos personales</span>
        </>
      }
      lead="Si quieres que borremos tus datos, aquí están los pasos exactos para pedirlo, los plazos en los que respondemos y lo que la ley nos obliga a conservar. Sin cuenta, sin formularios raros y sin costo."
      updated={UPDATED}
      sections={sections}
    />
  );
}
