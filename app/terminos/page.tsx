import type { Metadata } from "next";
import LegalPage, {
  Bullets,
  DataList,
  LegalLink,
  Note,
  P,
  SubTitle,
  type LegalSection,
} from "@/components/legal/LegalPage";

const UPDATED = "11 de agosto de 2026";

const DESCRIPTION =
  "Términos y condiciones de los servicios de marketing digital de PG Estrategias: alcance, vigencia, pagos, presupuesto publicitario, garantía de 30 días y ley aplicable.";

export const metadata: Metadata = {
  title: "Términos y Condiciones · PG Estrategias",
  description: DESCRIPTION,
  alternates: { canonical: "/terminos" },
  openGraph: {
    title: "Términos y Condiciones · PG Estrategias",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

const sections: LegalSection[] = [
  {
    id: "quienes-somos",
    title: "Quiénes somos",
    body: (
      <>
        <P>
          Estos términos y condiciones regulan la relación entre PG Estrategias
          (Growth Partners) —en adelante «PG Estrategias» o «nosotros»— y la
          persona física o moral que contrata nuestros servicios —en adelante «el
          Cliente».
        </P>
        <DataList
          rows={[
            { term: "Nombre comercial", desc: "PG Estrategias · Growth Partners" },
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
          ]}
        />
        <P>
          Al contratar cualquiera de nuestros paquetes o servicios, el Cliente
          acepta estos términos en su totalidad.
        </P>
      </>
    ),
  },
  {
    id: "objeto",
    title: "Qué servicios prestamos",
    body: (
      <>
        <P>
          PG Estrategias es una agencia de growth marketing. Según el paquete
          contratado, los servicios pueden incluir:
        </P>
        <Bullets
          items={[
            "Gestión de pauta digital en Meta Ads y Google Ads.",
            "Producción audiovisual: reels, videos de venta, diseños gráficos y carruseles.",
            "Mensajería masiva y automatizada por WhatsApp Business y correo electrónico.",
            "Diseño y desarrollo de landing pages o páginas de ventas.",
            "Configuración y operación de CRM.",
            "Optimización de perfiles de Google Business Profile y estrategia de reseñas.",
            "Configuración técnica de medición: píxeles, eventos y rastreo de campañas.",
            "Videollamadas estratégicas y reportes periódicos.",
          ]}
        />
        <P>
          El alcance exacto —cantidades, frecuencias y entregables— es el que
          corresponde al paquete contratado (Ignición, Tracción, Dominio o un
          paquete a la medida) y el que quede por escrito en la propuesta
          aceptada por el Cliente. Esa propuesta forma parte de estos términos.
        </P>
      </>
    ),
  },
  {
    id: "vigencia",
    title: "Vigencia, compromiso mínimo y cancelación",
    body: (
      <>
        <SubTitle>Compromiso mínimo de 3 meses</SubTitle>
        <P>
          Los servicios se contratan por un periodo mínimo de tres meses. No es
          una cláusula de permanencia arbitraria: los primeros 45 días son de
          construcción —estudio, estrategia, producción y configuración
          técnica—, y los resultados de campaña empiezan a leerse después. Un
          periodo más corto no permite evaluar el trabajo con datos reales.
        </P>
        <SubTitle>Renovación</SubTitle>
        <P>
          Cumplido el periodo mínimo, el servicio se renueva de forma automática
          mes a mes, bajo las mismas condiciones, salvo que alguna de las partes
          avise lo contrario.
        </P>
        <SubTitle>Cancelación</SubTitle>
        <Bullets
          items={[
            "Después del periodo mínimo, cualquiera de las partes puede terminar la relación avisando por escrito con 30 días naturales de anticipación.",
            "El aviso puede enviarse al correo o al WhatsApp de contacto indicados en este documento.",
            "Durante esos 30 días el servicio continúa con normalidad y se cubre la mensualidad correspondiente.",
            "La cancelación no genera devolución de mensualidades ya pagadas ni de inversión publicitaria ya ejecutada en las plataformas.",
          ]}
        />
        <P>
          Si el Cliente decide terminar antes de cumplir el periodo mínimo de
          tres meses, se cubren las mensualidades restantes de ese periodo,
          porque la producción y la configuración inicial ya fueron realizadas.
        </P>
      </>
    ),
  },
  {
    id: "pagos",
    title: "Precios, pago y facturación",
    body: (
      <>
        <Bullets
          items={[
            "Todos los precios se expresan en pesos mexicanos (MXN) y no incluyen IVA.",
            "La mensualidad se paga por adelantado, dentro de los primeros cinco días naturales de cada periodo.",
            "El pago se realiza por transferencia electrónica a la cuenta que PG Estrategias indique.",
            "Emitimos CFDI conforme a la legislación fiscal vigente. El Cliente debe proporcionar sus datos fiscales completos y correctos antes de la primera facturación.",
            "Los precios de un paquete se mantienen durante el periodo mínimo contratado. Cualquier ajuste posterior se avisa con 30 días naturales de anticipación.",
          ]}
        />
        <SubTitle>Falta de pago</SubTitle>
        <P>
          Si una mensualidad no se cubre en tiempo, PG Estrategias puede
          suspender los servicios —incluida la pauta activa— hasta que el pago se
          regularice, previo aviso al Cliente. La suspensión por falta de pago no
          extiende la vigencia contratada ni activa la garantía descrita más
          adelante.
        </P>
      </>
    ),
  },
  {
    id: "presupuesto-publicitario",
    title: "Presupuesto publicitario",
    body: (
      <>
        <Note label="Esto es importante entenderlo bien">
          El monto de pauta incluido en cada paquete se destina{" "}
          <strong>100% a las plataformas publicitarias</strong> (Meta y/o
          Google). No forma parte de los honorarios de PG Estrategias y no es
          dinero que nosotros conservemos.
        </Note>
        <Bullets
          items={[
            "Cada paquete indica el monto de inversión publicitaria incluido dentro de la mensualidad. Ese monto se ejecuta íntegramente en las campañas del Cliente.",
            "Si el Cliente quiere invertir más de lo incluido en su paquete, ese excedente es adicional a la mensualidad y se acuerda por escrito antes de ejecutarse.",
            "Siempre que sea posible, las cuentas publicitarias, los perfiles y los activos digitales se mantienen a nombre del Cliente, que es su titular.",
            "PG Estrategias no controla los precios de subasta, los costos por resultado ni las políticas de cobro de Meta o Google.",
            "El presupuesto publicitario no ejecutado en un mes no se acumula automáticamente al siguiente, salvo acuerdo expreso.",
          ]}
        />
      </>
    ),
  },
  {
    id: "obligaciones-cliente",
    title: "Lo que necesitamos del Cliente",
    body: (
      <>
        <P>
          Buena parte del resultado depende de que el Cliente cumpla con lo
          siguiente:
        </P>
        <Bullets
          items={[
            "Entregar en tiempo los accesos necesarios: administrador comercial de Meta, cuenta de Google Ads, perfil de Google Business, sitio web, redes sociales y número de WhatsApp Business.",
            "Proporcionar información veraz sobre su negocio, sus precios y sus servicios.",
            "Revisar y aprobar los materiales dentro de los plazos acordados. Los retrasos en aprobaciones recorren el calendario de publicación.",
            "Atender los contactos y leads que genere la campaña. PG Estrategias genera la demanda; la atención comercial y la operación del negocio corresponden al Cliente.",
            "Cumplir las políticas de publicidad y de plataforma de Meta y Google, así como la normativa aplicable a su giro.",
          ]}
        />
        <SubTitle>Bases de datos y mensajería</SubTitle>
        <P>
          Cuando el Cliente entrega una base de datos de contactos para campañas
          de mensajería por WhatsApp o correo, declara y garantiza que obtuvo
          esos datos de forma lícita y que cuenta con el consentimiento
          necesario para contactarlos con fines comerciales. PG Estrategias
          opera como encargado del tratamiento de esos datos, siguiendo las
          instrucciones del Cliente, en los términos del{" "}
          <LegalLink href="/privacidad">Aviso de Privacidad</LegalLink>.
        </P>
      </>
    ),
  },
  {
    id: "garantia",
    title: "Garantía de 30 días",
    body: (
      <>
        <P>
          Nos comprometemos con lo que sí está en nuestras manos. Si al cierre
          del periodo acordado no se cumplió lo que quedó por escrito en la
          propuesta, seguimos trabajando <strong>30 días adicionales sin
          honorarios</strong> hasta lograrlo.
        </P>
        <Note label="Alcance de la garantía">
          La garantía aplica <strong>únicamente sobre los honorarios</strong> de
          PG Estrategias. Nunca sobre la inversión publicitaria, que se ejecuta
          en las plataformas y no es recuperable.
        </Note>
        <SubTitle>Condiciones para que aplique</SubTitle>
        <Bullets
          items={[
            "El punto de partida se registra por escrito entre ambas partes antes de arrancar. Sin línea base registrada no hay forma de medir el cumplimiento.",
            "El Cliente debe haber cubierto sus mensualidades en tiempo y haber mantenido la inversión publicitaria acordada durante todo el periodo.",
            "El Cliente debe haber entregado accesos, información y aprobaciones dentro de los plazos acordados.",
            "La garantía cubre el trabajo adicional de PG Estrategias, no la devolución de importes ya pagados.",
            "No aplica cuando el incumplimiento se origina en causas ajenas a PG Estrategias, como suspensión de cuentas publicitarias por decisión de la plataforma, cierre del negocio o cambios de giro durante el periodo.",
          ]}
        />
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "Propiedad intelectual del material producido",
    body: (
      <>
        <SubTitle>Material creativo del Cliente</SubTitle>
        <P>
          Una vez cubierto el pago total del periodo correspondiente, el material
          creativo producido específicamente para el Cliente —videos, reels,
          fotografías, diseños gráficos, carruseles y textos publicitarios— puede
          ser usado por el Cliente de forma indefinida para fines comerciales
          propios.
        </P>
        <SubTitle>Lo que sigue siendo nuestro</SubTitle>
        <Bullets
          items={[
            "Nuestras metodologías, marcos de trabajo, plantillas, estructuras de campaña, flujos de automatización y código base.",
            "Los archivos de proyecto en crudo y los proyectos de edición, salvo acuerdo expreso por escrito.",
            "Las licencias de música, imágenes o recursos de terceros, que se rigen por los términos de quien las otorga.",
          ]}
        />
        <SubTitle>Portafolio</SubTitle>
        <P>
          Salvo que el Cliente indique lo contrario por escrito, PG Estrategias
          puede mostrar el material producido y mencionar al Cliente en su
          portafolio, redes sociales y propuestas comerciales.
        </P>
        <SubTitle>Contenido entregado por el Cliente</SubTitle>
        <P>
          El Cliente conserva la propiedad de sus marcas, logotipos y materiales,
          y garantiza que cuenta con los derechos para usarlos y para
          autorizarnos a usarlos en las campañas.
        </P>
      </>
    ),
  },
  {
    id: "confidencialidad",
    title: "Confidencialidad",
    body: (
      <>
        <P>
          Ambas partes se obligan a mantener como confidencial la información
          comercial, financiera, técnica y estratégica a la que tengan acceso con
          motivo de esta relación, y a no divulgarla a terceros sin autorización
          escrita, salvo requerimiento de autoridad competente.
        </P>
        <P>
          Esta obligación continúa vigente durante dos años después de terminada
          la relación comercial.
        </P>
      </>
    ),
  },
  {
    id: "limitacion-responsabilidad",
    title: "Limitación de responsabilidad",
    body: (
      <>
        <Note label="Sin promesas de ventas">
          PG Estrategias <strong>no garantiza resultados específicos de
          ventas, ingresos o utilidades.</strong> Nos comprometemos con la
          ejecución del proceso, los entregables y las métricas acordadas por
          escrito en la propuesta.
        </Note>
        <P>
          El resultado comercial final depende de factores fuera de nuestro
          control: el precio del Cliente, su capacidad de atención y cierre, la
          calidad de su producto o servicio, su operación interna, la
          competencia y las condiciones del mercado.
        </P>
        <SubTitle>No somos responsables por</SubTitle>
        <Bullets
          items={[
            "Cambios en las políticas, algoritmos, precios o condiciones de Meta, Google, WhatsApp o cualquier otra plataforma de terceros.",
            "Suspensiones, restricciones o cancelaciones de cuentas publicitarias, perfiles o números de WhatsApp decididas por la plataforma.",
            "Fallas, caídas o interrupciones de servicios de terceros: hosting, CRM, plataformas de mensajería o proveedores de pago.",
            "Daños indirectos, incidentales o lucro cesante.",
            "Consecuencias derivadas de información incorrecta o incompleta proporcionada por el Cliente.",
          ]}
        />
        <P>
          En cualquier caso, la responsabilidad máxima de PG Estrategias frente
          al Cliente se limita al monto de los honorarios efectivamente pagados
          por el Cliente durante los tres meses anteriores al hecho que origine
          la reclamación, excluyendo la inversión publicitaria.
        </P>
      </>
    ),
  },
  {
    id: "suspension",
    title: "Suspensión y terminación anticipada",
    body: (
      <>
        <P>
          PG Estrategias puede suspender o terminar el servicio de forma
          anticipada, sin responsabilidad, cuando:
        </P>
        <Bullets
          items={[
            "Exista falta de pago no regularizada tras el aviso correspondiente.",
            "El Cliente solicite publicar contenido falso, engañoso, discriminatorio o contrario a la ley o a las políticas de las plataformas.",
            "El Cliente entregue bases de datos obtenidas de forma ilícita o sin consentimiento para contacto comercial.",
            "Exista un trato ofensivo o abusivo hacia el equipo de PG Estrategias.",
          ]}
        />
        <P>
          En estos supuestos no procede devolución de mensualidades pagadas ni la
          garantía de 30 días.
        </P>
      </>
    ),
  },
  {
    id: "datos-personales",
    title: "Datos personales",
    body: (
      <>
        <P>
          El tratamiento de datos personales se rige por nuestro{" "}
          <LegalLink href="/privacidad">Aviso de Privacidad</LegalLink>,
          elaborado conforme a la Ley Federal de Protección de Datos Personales
          en Posesión de los Particulares.
        </P>
        <P>
          Cualquier persona puede solicitar la eliminación de sus datos
          siguiendo las{" "}
          <LegalLink href="/eliminacion-de-datos">
            instrucciones de eliminación de datos
          </LegalLink>
          .
        </P>
      </>
    ),
  },
  {
    id: "modificaciones",
    title: "Modificaciones a estos términos",
    body: (
      <>
        <P>
          PG Estrategias puede actualizar estos términos para reflejar cambios en
          sus servicios o en la normativa aplicable. La versión vigente es
          siempre la publicada en esta página, con su fecha de última
          actualización visible al inicio.
        </P>
        <P>
          Los cambios relevantes que afecten condiciones económicas o el alcance
          contratado se avisan al Cliente por correo electrónico con al menos 30
          días naturales de anticipación.
        </P>
      </>
    ),
  },
  {
    id: "ley-aplicable",
    title: "Ley aplicable y jurisdicción",
    body: (
      <>
        <P>
          Estos términos se rigen por la legislación mexicana aplicable.
        </P>
        <P>
          Para la interpretación y cumplimiento de estos términos, las partes se
          someten expresamente a la jurisdicción de los tribunales competentes de
          la ciudad de Puebla, Puebla, México, renunciando a cualquier otro fuero
          que pudiera corresponderles por razón de su domicilio presente o
          futuro.
        </P>
        <P>
          Antes de acudir a instancias legales, ambas partes se comprometen a
          intentar resolver cualquier diferencia mediante comunicación directa y
          de buena fe.
        </P>
      </>
    ),
  },
];

export default function TerminosPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Términos y{" "}
          <span style={{ color: "#D63A27" }}>condiciones</span>
        </>
      }
      lead="Las reglas del trabajo entre PG Estrategias y sus clientes, escritas para entenderse. Qué incluye el servicio, cómo se paga, qué pasa con el presupuesto de publicidad y hasta dónde llega nuestra responsabilidad."
      updated={UPDATED}
      sections={sections}
    />
  );
}
