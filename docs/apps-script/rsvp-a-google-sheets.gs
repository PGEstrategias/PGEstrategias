/**
 * Confirmaciones de invitaciones digitales → Google Sheets.
 *
 * Cómo instalarlo (una sola vez por hoja):
 *  1. Abre la hoja de Google › Extensiones › Apps Script.
 *  2. Borra lo que haya y pega este archivo completo.
 *  3. Cambia TOKEN por la clave que te dio PG (no la publiques).
 *  4. Implementar › Nueva implementación › Tipo: Aplicación web.
 *     - Ejecutar como: Yo.
 *     - Quién tiene acceso: Cualquier usuario.
 *  5. Autoriza los permisos y copia la URL que termina en /exec.
 *  6. Esa URL y la clave van en las variables de entorno de Vercel.
 */

const TOKEN = "PEGA_AQUI_LA_CLAVE";

function doPost(e) {
  let datos;
  try {
    datos = JSON.parse(e.postData.contents);
  } catch (err) {
    return respuesta({ ok: false, error: "json" });
  }
  if (datos.token !== TOKEN) return respuesta({ ok: false, error: "token" });

  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const candado = LockService.getScriptLock();
  candado.waitLock(10000);
  try {
    if (hoja.getLastRow() === 0) {
      hoja.appendRow(["Fecha y hora", "Nombre", "Personas", "Mensaje", "Acompañantes"]);
      hoja.getRange(1, 1, 1, 5).setFontWeight("bold");
      hoja.setFrozenRows(1);
    }
    hoja.appendRow([
      new Date(),
      limpiar(datos.nombre),
      Math.max(1, Math.min(20, Number(datos.personas) || 1)),
      limpiar(datos.mensaje),
      limpiar(datos.acompanantes, 800),
    ]);
  } finally {
    candado.releaseLock();
  }
  return respuesta({ ok: true });
}

/* Texto corto y sin fórmulas: un nombre que empiece con "=" no se ejecuta. */
function limpiar(valor, max) {
  const texto = String(valor || "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max || 140);
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
