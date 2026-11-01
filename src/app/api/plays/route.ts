/**
 * How many plays the playground has had (every time someone plays with a
 * piece; the client groups them, see components/playground/plays.ts).
 *
 * In production the number lives in Upstash Redis (connected from the Vercel
 * dashboard, which sets KV_REST_API_URL and KV_REST_API_TOKEN). Without those
 * variables, e.g. on localhost, it falls back to a counter in memory that
 * resets when the server restarts.
 */
const KEY = "playground:plays";
const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
// El total no tiene límite. Esto solo frena a alguien que intente sumar millones de una vez
// llamando a la API a mano: un paquete real nunca pasa de una jugada por pieza (cada pieza
// cuenta una vez cada 2,5 s y los paquetes salen cada 2 s), así que ninguna jugada se pierde.
const MAX_POR_ENVIO = 500;

const memory = globalThis as unknown as { __plays?: number };

async function redis(path: string): Promise<number> {
  const res = await fetch(`${URL_}/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const { result } = (await res.json()) as { result: string | number | null };
  return Number(result ?? 0);
}

export async function GET() {
  try {
    const plays = URL_ && TOKEN ? await redis(`get/${KEY}`) : (memory.__plays ?? 0);
    return Response.json({ plays });
  } catch {
    return Response.json({ plays: null }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let n = 1;
  try {
    const body = (await request.json()) as { n?: unknown };
    n = Math.max(1, Math.min(MAX_POR_ENVIO, Math.floor(Number(body.n) || 1)));
  } catch {}
  try {
    const plays = URL_ && TOKEN ? await redis(`incrby/${KEY}/${n}`) : (memory.__plays = (memory.__plays ?? 0) + n);
    return Response.json({ plays });
  } catch {
    return Response.json({ plays: null }, { status: 503 });
  }
}
