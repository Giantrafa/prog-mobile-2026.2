const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
const TIMEOUT_MS = 15000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string | null;
};

export async function apiFetch<T>(path: string, { method = 'GET', body, token }: RequestOptions = {}) {
  if (!BASE_URL) {
    throw new ApiError('EXPO_PUBLIC_API_URL não configurada no arquivo .env.', 0);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor.', 0);
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message ?? data?.error ?? `Erro ${response.status} ao falar com o servidor.`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}
