import { apiFetch, isOfflineError } from './client';
import * as mock from './mock';
import type { AuthResponse, User } from './types';

const FORCE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK_API === 'true';

let backendOffline = FORCE_MOCK;

async function withFallback<T>(real: () => Promise<T>, fake: () => Promise<T>) {
  if (backendOffline) return fake();

  try {
    return await real();
  } catch (e) {
    if (!isOfflineError(e)) throw e;
    console.warn('Backend inacessível, usando o backend falso.');
    backendOffline = true;
    return fake();
  }
}

export function register(data: { name: string; email: string; password: string }) {
  return withFallback(
    () => apiFetch<AuthResponse>('/auth/register', { method: 'POST', body: data }),
    () => mock.register(data),
  );
}

export function login(email: string, password: string) {
  return withFallback(
    () => apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } }),
    () => mock.login(email, password),
  );
}

export function getMe(token: string) {
  if (mock.isMockToken(token)) return mock.getMe(token);
  return apiFetch<User>('/auth/me', { token });
}

export { isMockToken } from './mock';
