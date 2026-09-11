'use client';

import Script from 'next/script';

/**
 * Píxel de Meta. Solo se monta si hay NEXT_PUBLIC_META_PIXEL_ID configurado,
 * para que el sitio siga funcionando sin él en local y en pruebas.
 *
 * El evento que importa es `clic_whatsapp`, y se dispara desde el botón de
 * contacto (ver BotonWhatsApp). La API de Conversiones lo manda en paralelo
 * desde el servidor en la ruta /w/[id].
 */
export default function PixelMeta() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id) return null;

  return (
    <>
      <Script id="lm-meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${id}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
