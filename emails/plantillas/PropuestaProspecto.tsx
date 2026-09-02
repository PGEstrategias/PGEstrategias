import * as React from 'react';
import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Link,
  Text,
} from '@react-email/components';
import { theme } from '../theme';
import {
  Badge,
  CTA,
  Display,
  Subhead,
  SectionLabel,
  Paragraph,
  Feature,
  Divider,
} from '../components/ui';

const { color, font, layout } = theme;

export interface FeatureItem {
  title: string;
  descripcion?: string;
}

export interface EjemploTrabajo {
  titulo: string;
  /** Imagen de preview (thumbnail). Ideal: 520x300 aprox, URL absoluta. */
  imagen: string;
  /** A dónde lleva el clic (video, caso de éxito, etc.). */
  enlace: string;
}

export interface PropuestaProspectoProps {
  /** Texto de la pastilla superior. Ej: "PROPUESTA SIN COSTO". */
  badge?: string;
  /** Título grande del hero. */
  titulo: string;
  /** Subtítulo bajo el título. */
  subtitulo?: string;
  /** Saludo. Ej: "Estimada María," */
  saludo?: string;
  /** Párrafos de introducción (uno por elemento). */
  parrafos: string[];
  /** Texto e enlace del botón principal. */
  ctaTexto: string;
  ctaEnlace: string;
  /** Imagen hero opcional (URL absoluta). */
  heroImagen?: string;
  heroAlt?: string;
  /** Encabezado de la sección de características. */
  seccionTitulo?: string;
  /** Lista de características / lo que incluye. */
  features?: FeatureItem[];
  /** Ejemplos de trabajo (portafolio) opcionales. */
  ejemplosTitulo?: string;
  ejemplos?: EjemploTrabajo[];
  /** Cierre antes de la firma. */
  cierre?: string;
  /** Datos de firma. */
  firmaNombre?: string;
  firmaCargo?: string;
  firmaEmail?: string;
  firmaWeb?: string;
  /** Texto de preview en la bandeja (oculto en el cuerpo). */
  preheader?: string;
  /** Línea legal del footer (a quién y por qué). */
  footerNota?: string;
}

const defaults = {
  badge: 'PROPUESTA SIN COSTO',
  saludo: 'Hola,',
  seccionTitulo: '¿Qué incluye?',
  firmaNombre: 'Pablo Guillermo Grageda',
  firmaCargo: 'Director de Estrategia · pg estrategias',
  firmaEmail: 'contacto@pgestrategias.com',
  firmaWeb: 'pgestrategias.com',
  footerNota:
    'Recibiste este correo porque identificamos una oportunidad de colaboración para tu marca.',
};

export function PropuestaProspecto(props: PropuestaProspectoProps) {
  const {
    badge = defaults.badge,
    titulo,
    subtitulo,
    saludo = defaults.saludo,
    parrafos,
    ctaTexto,
    ctaEnlace,
    heroImagen,
    heroAlt = 'pg estrategias',
    seccionTitulo = defaults.seccionTitulo,
    features,
    ejemplosTitulo = 'Ejemplos de nuestro trabajo',
    ejemplos,
    cierre,
    firmaNombre = defaults.firmaNombre,
    firmaCargo = defaults.firmaCargo,
    firmaEmail = defaults.firmaEmail,
    firmaWeb = defaults.firmaWeb,
    preheader,
    footerNota = defaults.footerNota,
  } = props;

  const pad = '40px';

  return (
    <Html lang="es">
      <Head>
        <Font
          fontFamily="Space Grotesk"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {preheader ? <Preview>{preheader}</Preview> : null}
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: color.bg,
          fontFamily: font.body,
        }}
      >
        <Container
          style={{
            maxWidth: `${layout.maxWidth}px`,
            margin: '0 auto',
            padding: '28px 12px 40px',
          }}
        >
          <Section
            style={{
              backgroundColor: color.panel,
              borderRadius: `${layout.radius}px`,
              border: `1px solid ${color.border}`,
              overflow: 'hidden',
            }}
          >
            {/* Logo / marca */}
            <Section style={{ padding: `${pad} ${pad} 0` }}>
              <Text
                style={{
                  fontFamily: font.display,
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  color: color.text,
                  margin: 0,
                }}
              >
                <span style={{ color: color.accent }}>◆</span>&nbsp; pg
                estrategias
              </Text>
            </Section>

            {/* Badge + hero */}
            <Section style={{ padding: `26px ${pad} 0` }}>
              <Badge>{badge}</Badge>
            </Section>

            <Section style={{ padding: `18px ${pad} 0` }}>
              <Display>{titulo}</Display>
              {subtitulo ? <Subhead>{subtitulo}</Subhead> : null}
            </Section>

            {/* Cuerpo */}
            <Section style={{ padding: `6px ${pad} 0` }}>
              <Text
                style={{
                  fontFamily: font.body,
                  fontSize: '16px',
                  lineHeight: '25px',
                  color: color.text,
                  margin: '0 0 14px',
                  fontWeight: 600,
                }}
              >
                {saludo}
              </Text>
              {parrafos.map((p, i) => (
                <Paragraph key={i}>{p}</Paragraph>
              ))}
            </Section>

            {/* CTA principal */}
            <Section style={{ padding: `10px ${pad} 4px` }}>
              <CTA href={ctaEnlace}>{ctaTexto}</CTA>
            </Section>

            {/* Hero image */}
            {heroImagen ? (
              <Section style={{ padding: `26px ${pad} 0` }}>
                <Img
                  src={heroImagen}
                  alt={heroAlt}
                  width="520"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: `${layout.radiusSm}px`,
                    border: `1px solid ${color.border}`,
                    display: 'block',
                  }}
                />
              </Section>
            ) : null}

            {/* Features */}
            {features && features.length > 0 ? (
              <Section style={{ padding: `34px ${pad} 0` }}>
                <SectionLabel>{seccionTitulo}</SectionLabel>
                <div style={{ height: '8px' }} />
                {features.map((f, i) => (
                  <Feature key={i} index={i + 1} title={f.title}>
                    {f.descripcion}
                  </Feature>
                ))}
              </Section>
            ) : null}

            {/* Ejemplos / portafolio */}
            {ejemplos && ejemplos.length > 0 ? (
              <Section style={{ padding: `28px ${pad} 0` }}>
                <SectionLabel>{ejemplosTitulo}</SectionLabel>
                <div style={{ height: '14px' }} />
                <Row>
                  {ejemplos.slice(0, 2).map((e, i) => (
                    <Column
                      key={i}
                      style={{
                        width: '50%',
                        paddingRight: i === 0 ? '8px' : 0,
                        paddingLeft: i === 1 ? '8px' : 0,
                        verticalAlign: 'top',
                      }}
                    >
                      <Link href={e.enlace}>
                        <Img
                          src={e.imagen}
                          alt={e.titulo}
                          width="248"
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: `${layout.radiusSm}px`,
                            border: `1px solid ${color.border}`,
                            display: 'block',
                          }}
                        />
                      </Link>
                      <Text
                        style={{
                          fontFamily: font.body,
                          fontSize: '13px',
                          color: color.textMuted,
                          margin: '8px 0 0',
                        }}
                      >
                        {e.titulo}
                      </Text>
                    </Column>
                  ))}
                </Row>
              </Section>
            ) : null}

            {/* Cierre */}
            {cierre ? (
              <Section style={{ padding: `28px ${pad} 0` }}>
                <Paragraph>{cierre}</Paragraph>
              </Section>
            ) : null}

            {/* Firma */}
            <Section style={{ padding: `30px ${pad} 0` }}>
              <Divider />
              <Section style={{ paddingTop: '22px' }}>
                <Text
                  style={{
                    fontFamily: font.display,
                    fontSize: '15px',
                    fontWeight: 700,
                    color: color.text,
                    margin: '0 0 3px',
                  }}
                >
                  {firmaNombre}
                </Text>
                <Text
                  style={{
                    fontFamily: font.body,
                    fontSize: '13px',
                    color: color.textMuted,
                    margin: '0 0 8px',
                  }}
                >
                  {firmaCargo}
                </Text>
                <Text
                  style={{
                    fontFamily: font.body,
                    fontSize: '13px',
                    color: color.textMuted,
                    margin: 0,
                  }}
                >
                  <Link
                    href={`mailto:${firmaEmail}`}
                    style={{ color: color.accentSoft, textDecoration: 'none' }}
                  >
                    {firmaEmail}
                  </Link>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <Link
                    href={`https://${firmaWeb}`}
                    style={{ color: color.accentSoft, textDecoration: 'none' }}
                  >
                    {firmaWeb}
                  </Link>
                </Text>
              </Section>
            </Section>

            {/* Footer */}
            <Section style={{ padding: `34px ${pad} ${pad}` }}>
              <Text
                style={{
                  fontFamily: font.body,
                  fontSize: '11px',
                  lineHeight: '17px',
                  color: color.textFaint,
                  margin: 0,
                }}
              >
                pg estrategias · Puebla, México
                <br />
                {footerNota}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default PropuestaProspecto;
