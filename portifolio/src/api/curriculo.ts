import { apiGet } from "./client";
import type { Curriculo, Pessoa } from "./types";

export const listarPessoas = () => apiGet<Pessoa[]>("/pessoas");

export const buscarCurriculo = (id: number) => apiGet<Curriculo>(`/pessoas/${id}/curriculo`);
