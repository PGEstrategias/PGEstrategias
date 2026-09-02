import * as React from 'react';
import { Button, Section, Text, Row, Column } from '@react-email/components';
import { theme } from '../theme';

const { color, font, layout } = theme;

/** Pastilla superior tipo "NUEVA INTEGRACIÓN" del correo de Magnific. */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0}>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: color.surface,
              border: `1px solid ${color.border}`,
              borderRadius: layout.radiusPill,
              padding: '7px 14px',
              fontFamily: font.body,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: color.accentSoft,
            }}
          >
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/** Botón CTA principal (pastilla clara sobre fondo oscuro). */
export function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: color.btnBg,
        color: color.btnText,
        fontFamily: font.body,
        fontSize: '15px',
        fontWeight: 700,
        letterSpacing: '0.2px',
        padding: '15px 30px',
        borderRadius: layout.radiusPill,
        textDecoration: 'none',
        display: 'inline-block',
      }}
    >
      {children}
    </Button>
  );
}

/** Título grande y contundente estilo hero. */
export function Display({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: font.display,
        fontSize: '38px',
        lineHeight: '42px',
        fontWeight: 700,
        letterSpacing: '-0.5px',
        color: color.text,
        margin: '0 0 8px',
      }}
    >
      {children}
    </Text>
  );
}

/** Subtítulo bajo el hero (gris). */
export function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: font.display,
        fontSize: '20px',
        lineHeight: '26px',
        fontWeight: 500,
        color: color.textMuted,
        margin: '0 0 22px',
      }}
    >
      {children}
    </Text>
  );
}

/** Encabezado de sección en mayúsculas (rojo PGE). */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: font.body,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: color.accent,
        margin: '0 0 8px',
      }}
    >
      {children}
    </Text>
  );
}

/** Párrafo de cuerpo. */
export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: font.body,
        fontSize: '16px',
        lineHeight: '25px',
        color: color.textMuted,
        margin: '0 0 16px',
      }}
    >
      {children}
    </Text>
  );
}

/** Fila de característica: número + título + descripción (los "nodos" de Magnific). */
export function Feature({
  index,
  title,
  children,
}: {
  index: number | string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Row style={{ marginBottom: '18px' }}>
      <Column style={{ width: '40px', verticalAlign: 'top' }}>
        <table role="presentation" cellPadding={0} cellSpacing={0} border={0}>
          <tbody>
            <tr>
              <td
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: color.surface,
                  border: `1px solid ${color.border}`,
                  borderRadius: layout.radiusSm,
                  textAlign: 'center',
                  fontFamily: font.display,
                  fontSize: '14px',
                  fontWeight: 700,
                  color: color.accentSoft,
                }}
              >
                {index}
              </td>
            </tr>
          </tbody>
        </table>
      </Column>
      <Column style={{ verticalAlign: 'top', paddingLeft: '6px' }}>
        <Text
          style={{
            fontFamily: font.display,
            fontSize: '16px',
            fontWeight: 600,
            color: color.text,
            margin: '4px 0 3px',
          }}
        >
          {title}
        </Text>
        {children ? (
          <Text
            style={{
              fontFamily: font.body,
              fontSize: '14px',
              lineHeight: '21px',
              color: color.textMuted,
              margin: 0,
            }}
          >
            {children}
          </Text>
        ) : null}
      </Column>
    </Row>
  );
}

/** Separador fino. */
export function Divider() {
  return (
    <Section style={{ padding: '0' }}>
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        border={0}
      >
        <tbody>
          <tr>
            <td
              style={{
                borderTop: `1px solid ${color.border}`,
                fontSize: '1px',
                lineHeight: '1px',
                height: '1px',
              }}
            >
              &nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}
