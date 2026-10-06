import { apiFetch } from './client';
import type { AuthResponse, User } from './types';

export function register(data: { name: string; email: string; password: string }) {
  return apiFetch<AuthResponse>('/auth/register', { method: 'POST', body: data });
}

export function login(email: string, password: string) {
  return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } });
}

export function getMe(token: string) {
  return apiFetch<User>('/auth/me', { token });
}
