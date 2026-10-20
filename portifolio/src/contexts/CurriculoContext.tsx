import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { buscarCurriculo, listarPessoas } from "@/api/curriculo";
import type { Curriculo, Pessoa } from "@/api/types";

type CurriculoContextValue = {
  pessoas: Pessoa[];
  pessoaId: number | null;
  curriculo: Curriculo | null;
  carregando: boolean;
  erro: string | null;
  selecionarPessoa: (id: number) => void;
  recarregar: () => void;
};

const CurriculoContext = createContext<CurriculoContextValue | null>(null);

export function CurriculoProvider({ children }: { children: ReactNode }) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [pessoaId, setPessoaId] = useState<number | null>(null);
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;

    listarPessoas()
      .then((resposta) => {
        if (!ativo) return;
        const lista = [...resposta].sort((a, b) => a.id - b.id);
        setPessoas(lista);
        setPessoaId((atual) =>
          atual !== null && lista.some((p) => p.id === atual) ? atual : (lista[0]?.id ?? null),
        );
        if (lista.length === 0) setCarregando(false);
      })
      .catch((e: Error) => {
        if (!ativo) return;
        setErro(e.message);
        setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [tentativa]);

  useEffect(() => {
    if (pessoaId === null) return;

    let ativo = true;

    buscarCurriculo(pessoaId)
      .then((dados) => {
        if (ativo) setCurriculo(dados);
      })
      .catch((e: Error) => {
        if (ativo) setErro(e.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [pessoaId, tentativa]);

  const iniciarCarregamento = useCallback(() => {
    setCarregando(true);
    setErro(null);
  }, []);

  const selecionarPessoa = useCallback(
    (id: number) => {
      if (id === pessoaId) return;
      iniciarCarregamento();
      setPessoaId(id);
    },
    [iniciarCarregamento, pessoaId],
  );

  const recarregar = useCallback(() => {
    iniciarCarregamento();
    setTentativa((t) => t + 1);
  }, [iniciarCarregamento]);

  return (
    <CurriculoContext.Provider
      value={{
        pessoas,
        pessoaId,
        curriculo,
        carregando,
        erro,
        selecionarPessoa,
        recarregar,
      }}
    >
      {children}
    </CurriculoContext.Provider>
  );
}

export function useCurriculo() {
  const contexto = useContext(CurriculoContext);

  if (!contexto) {
    throw new Error("useCurriculo deve ser usado dentro de <CurriculoProvider>");
  }

  return contexto;
}
