import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

/**
 * Correo con el pase del invitado — entregable del paquete Estándar.
 *
 * No usa el tema de los correos de la agencia a propósito: quien lo abre es
 * un invitado de la boda, no un prospecto. Va con la paleta nupcial, y de PG
 * Estrategias solo queda una línea al pie.
 */

const ORO = '#C4A052';
const TINTA = '#14120F';
const MARFIL = '#F7F3EE';
const GRIS = '#4A443D';
const ROSA = '#A85E56';

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const PALO = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export type PaseInvitadoProps = {
  nombre: string;
  pases: number;
  novios: string;
  fecha: string;
  sedes: { etiqueta: string; nombre: string; hora: string; direccion: string }[];
  dressCode: string;
  hashtag: string;
  /** Enlace a la invitación, por si el invitado quiere volver a verla. */
  urlInvitacion: string;
};

function Versalitas({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: PALO,
        fontSize: '10px',
        letterSpacing: '2.4px',
        textTransform: 'uppercase',
        color: ROSA,
        margin: '0 0 6px',
      }}
    >
      {children}
    </Text>
  );
}

export function PaseInvitado({
  nombre,
  pases,
  novios,
  fecha,
  sedes,
  dressCode,
  hashtag,
  urlInvitacion,
}: PaseInvitadoProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{`Tu pase para la boda de ${novios} — ${fecha}`}</Preview>
      <Body style={{ backgroundColor: '#EFE7E0', margin: 0, padding: '32px 0' }}>
        <Container
          style={{
            backgroundColor: MARFIL,
            maxWidth: '520px',
            margin: '0 auto',
            padding: '44px 40px',
            border: `1px solid ${ORO}`,
          }}
        >
          <Section style={{ textAlign: 'center' }}>
            <Versalitas>Confirmación recibida</Versalitas>

            <Text
              style={{
                fontFamily: SERIF,
                fontSize: '34px',
                lineHeight: '40px',
                color: TINTA,
                margin: '18px 0 0',
              }}
            >
              {novios}
            </Text>

            <Hr style={{ borderColor: ORO, opacity: 0.4, margin: '26px 0' }} />

            <Text
              style={{
                fontFamily: PALO,
                fontSize: '15px',
                lineHeight: '25px',
                color: GRIS,
                margin: 0,
              }}
            >
              {`${nombre}, quedaste en la lista con `}
              {/* Una sola cadena y no varios nodos: React separa los nodos de
                  texto con comentarios HTML, y en un correo vale más no
                  repartirlos por clientes viejos. */}
              <strong style={{ color: TINTA }}>
                {`${pases} ${pases === 1 ? 'pase' : 'pases'}`}
              </strong>
              {'. Tu pase va adjunto en PDF: guárdalo en el celular, es lo que te van a pedir en la entrada.'}
            </Text>

            <Hr style={{ borderColor: ORO, opacity: 0.4, margin: '26px 0' }} />

            <Text
              style={{
                fontFamily: SERIF,
                fontSize: '17px',
                color: TINTA,
                margin: '0 0 22px',
              }}
            >
              {fecha}
            </Text>

            {sedes.map((sede) => (
              <Section key={sede.etiqueta} style={{ marginBottom: '18px' }}>
                <Versalitas>{`${sede.hora} · ${sede.etiqueta}`}</Versalitas>
                <Text
                  style={{
                    fontFamily: SERIF,
                    fontSize: '16px',
                    color: TINTA,
                    margin: '0 0 3px',
                  }}
                >
                  {sede.nombre}
                </Text>
                <Text
                  style={{
                    fontFamily: PALO,
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: GRIS,
                    margin: 0,
                  }}
                >
                  {sede.direccion}
                </Text>
              </Section>
            ))}

            <Hr style={{ borderColor: ORO, opacity: 0.4, margin: '26px 0' }} />

            <Text
              style={{
                fontFamily: PALO,
                fontSize: '11px',
                letterSpacing: '1.6px',
                textTransform: 'uppercase',
                color: GRIS,
                margin: '0 0 22px',
              }}
            >
              {dressCode}
            </Text>

            <Link
              href={urlInvitacion}
              style={{
                fontFamily: PALO,
                fontSize: '13px',
                color: TINTA,
                textDecoration: 'underline',
              }}
            >
              Volver a ver la invitación
            </Link>

            <Text
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: '14px',
                color: ORO,
                margin: '30px 0 0',
              }}
            >
              {hashtag}
            </Text>
          </Section>
        </Container>

        <Text
          style={{
            fontFamily: PALO,
            fontSize: '11px',
            lineHeight: '17px',
            color: '#8A837B',
            textAlign: 'center',
            maxWidth: '520px',
            margin: '20px auto 0',
            padding: '0 40px',
          }}
        >
          Esta es una invitación de muestra: los novios son ficticios. Las hace{' '}
          <Link
            href="https://www.pgestrategias.com/invitacionesdebodas"
            style={{ color: '#8A837B' }}
          >
            PG Estrategias
          </Link>
          .
        </Text>
      </Body>
    </Html>
  );
}

export default PaseInvitado;
