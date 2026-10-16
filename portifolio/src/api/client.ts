const BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const TIMEOUT_MS = 15000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  if (!BASE_URL) {
    throw new ApiError("EXPO_PUBLIC_API_URL não configurada no arquivo .env.local.", 0);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } catch {
    throw new ApiError(`Não foi possível conectar ao servidor (${BASE_URL}).`, 0);
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(data?.mensagem ?? `Erro ${response.status} ao falar com o servidor.`, response.status);
  }

  return data as T;
}
