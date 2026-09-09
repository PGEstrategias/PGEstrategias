/**
 * Límite de uso para el demo público.
 *
 * El demo del Estándar manda un correo a la dirección que el visitante
 * escriba, así que sin freno es una herramienta de spam servida por nosotros.
 *
 * El contador vive en memoria del proceso: en Vercel cada instancia lleva el
 * suyo, así que el tope real es un múltiplo del que está aquí. Aun así corta
 * el abuso automatizado, que es lo que importa. Si algún día el demo se
 * vuelve un canal serio, esto se cambia por Redis (la credencial ya existe en
 * n8n) sin tocar a quien lo llama.
 */

type Registro = { conteo: number; reinicioEn: number };

const VENTANA_MS = 60 * 60 * 1000;
const POR_IP = 3;
const GLOBAL = 60;

const porIp = new Map<string, Registro>();
let global: Registro = { conteo: 0, reinicioEn: Date.now() + VENTANA_MS };

function pedir(registro: Registro, tope: number) {
  const ahora = Date.now();
  if (ahora > registro.reinicioEn) {
    registro.conteo = 0;
    registro.reinicioEn = ahora + VENTANA_MS;
  }
  if (registro.conteo >= tope) return false;
  registro.conteo += 1;
  return true;
}

/** Limpia las IPs cuya ventana ya venció, para que el Map no crezca sin fin. */
function podar() {
  const ahora = Date.now();
  porIp.forEach((registro, ip) => {
    if (ahora > registro.reinicioEn) porIp.delete(ip);
  });
}

export function permitirEnvio(ip: string) {
  if (porIp.size > 500) podar();

  if (!pedir(global, GLOBAL)) return false;

  const registro = porIp.get(ip) ?? {
    conteo: 0,
    reinicioEn: Date.now() + VENTANA_MS,
  };
  porIp.set(ip, registro);
  return pedir(registro, POR_IP);
}

/** IP del visitante detrás del proxy de Vercel. */
export function ipDe(req: Request) {
  const reenviada = req.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}
