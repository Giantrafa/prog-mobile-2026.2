import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import * as authApi from '@/api/auth';
import { ApiError } from '@/api/client';
import type { AuthResponse, User } from '@/api/types';

const TOKEN_KEY = 'auth-token';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (!savedToken) return;

        setUser(await authApi.getMe(savedToken));
        setToken(savedToken);
      } catch (e) {
        // Token expirado/inválido: descarta. Erro de rede: mantém o token para a próxima tentativa.
        if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function startSession(response: AuthResponse) {
    await SecureStore.setItemAsync(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
  }

  async function signUp({ name, email, password }: SignUpData) {
    const response = await authApi.register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    await startSession(response);
  }

  async function signIn(email: string, password: string) {
    const response = await authApi.login(email.trim().toLowerCase(), password);
    await startSession(response);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>.');
  }
  return context;
}
