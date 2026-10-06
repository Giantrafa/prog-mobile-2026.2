export type User = {
  id: number | string;
  name: string;
  email: string;
  createdAt?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
