// Backend falso: usado quando o backend real está inacessível ou com EXPO_PUBLIC_USE_MOCK_API=true no .env.
// Os dados ficam só na memória: ao recarregar o app, só o usuário de demonstração existe.
import { ApiError } from './client';
import type { AuthResponse, User } from './types';

type MockUser = User & { password: string };

const DELAY_MS = 600;
const TOKEN_PREFIX = 'mock.';

const users: MockUser[] = [
  {
    id: 1,
    name: 'Usuário Teste',
    email: 'teste@teste.com',
    password: '123456',
    createdAt: new Date().toISOString(),
  },
];

function wait() {
  return new Promise((resolve) => setTimeout(resolve, DELAY_MS));
}

function publicUser({ password, ...user }: MockUser): User {
  return user;
}

// o token carrega o próprio usuário, então a sessão sobrevive a um reload do app
function createSession(user: MockUser): AuthResponse {
  const publicData = publicUser(user);
  return { token: TOKEN_PREFIX + encodeURIComponent(JSON.stringify(publicData)), user: publicData };
}

export function isMockToken(token: string | null) {
  return !!token?.startsWith(TOKEN_PREFIX);
}

export async function register(data: { name: string; email: string; password: string }) {
  await wait();
  if (users.some((u) => u.email === data.email)) {
    throw new ApiError('Já existe uma conta com este e-mail.', 409);
  }
  const user: MockUser = { id: users.length + 1, ...data, createdAt: new Date().toISOString() };
  users.push(user);
  return createSession(user);
}

export async function login(email: string, password: string) {
  await wait();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new ApiError('E-mail ou senha incorretos.', 401);
  }
  return createSession(user);
}

export async function getMe(token: string) {
  await wait();
  try {
    return JSON.parse(decodeURIComponent(token.slice(TOKEN_PREFIX.length))) as User;
  } catch {
    throw new ApiError('Sessão inválida.', 401);
  }
}
