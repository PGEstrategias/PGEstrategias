/* Genera el PDF de una propuesta HTML de public/ (servida en local).
   Uso: node docs/propuestas/propuesta-a-pdf.js <url> <salida.pdf> <enlace público> [id1,id2,.clase]
   Los ids/clases de la lista empiezan en página nueva. Requiere playwright. */
const { chromium } = require('playwright');
const CSS = `
  @page { size: Letter; margin: 0; }
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .top { position: static !important; }
  .btns, .alt, #countdown, .thumb { display: none !important; }
  section { padding: 44px 0 !important; }
  .hero { padding: 34px 0 40px !important; }
  .card, .pcard, .plan-card, .phase, .items li, .bonos li, .goals tr, .central, .demo-link, .bono-caja, .pasos-est > *, figure { break-inside: avoid; page-break-inside: avoid; }
  h2, .eyebrow, h3 { break-after: avoid; page-break-after: avoid; }
  .port { gap: 12px !important; }
  .pbody { padding: 16px !important; }
  .pdf-nota { margin-top: 14px; font-size: 13px; color: var(--muted); }
  .deadline { color: var(--bg) !important; font-size: 15px !important; }
  .bono-caja { padding: 18px 20px !important; }
`;
(async () => {
  const [,, url, out, enlace, cortes] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: CSS + (cortes || '').split(',').filter(Boolean).map(id => `${id.startsWith('.')?id:'#'+id}{break-before:page;page-break-before:always;}`).join('') });
  await p.evaluate((enlace) => {
    const port = document.querySelector('#portafolio .port');
    if (port) {
      const n = document.createElement('p'); n.className = 'pdf-nota';
      n.textContent = 'Los videos se pueden ver completos en la propuesta en línea: ' + enlace;
      port.after(n);
    }
    document.querySelectorAll('.demo-link .impact').forEach(e => { e.innerHTML = '<b>Web demo:</b> ' + e.closest('a').href.replace(/^https?:\/\/[^/]+/, 'www.pgestrategias.com'); });
    const dl = document.getElementById('deadline-text');
    if (dl) dl.innerHTML = 'Válido para colaboraciones que inicien antes del <b>martes 1 de diciembre de 2026</b>.';
  }, enlace);
  await p.pdf({ path: out, format: 'Letter', printBackground: true, scale: 0.72, margin: { top: '0', bottom: '0', left: '0', right: '0' } });
  await b.close();
})();
