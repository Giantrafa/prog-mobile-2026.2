import { Share } from "react-native";

import type { Curriculo } from "@/api/types";
import { periodo, rotulo } from "./formatar";

function secao(titulo: string, linhas: string[]) {
  return linhas.length > 0 ? [`*${titulo}*`, ...linhas, ""] : [];
}

export function curriculoEmTexto(curriculo: Curriculo) {
  return [
    `*${curriculo.nome}*`,
    curriculo.titulo,
    curriculo.cidade,
    "",
    ...(curriculo.resumo ? [curriculo.resumo, ""] : []),
    ...secao(
      "Experiência profissional",
      curriculo.experiencias.map(
        (e) => `• ${e.cargo} — ${e.empresa} (${periodo(e.data_inicio, e.data_fim)})`,
      ),
    ),
    ...secao(
      "Formação",
      curriculo.formacoes.map(
        (f) => `• ${f.curso} — ${f.instituicao} (${periodo(f.data_inicio, f.data_fim)})`,
      ),
    ),
    ...secao(
      "Projetos",
      curriculo.projetos.map((p) => `• ${p.nome}${p.url_repositorio ? ` — ${p.url_repositorio}` : ""}`),
    ),
    ...secao(
      "Habilidades",
      curriculo.habilidades.length > 0
        ? [curriculo.habilidades.map((h) => `${h.nome} (${rotulo(h.nivel)})`).join(", ")]
        : [],
    ),
    ...secao(
      "Idiomas",
      curriculo.idiomas.length > 0
        ? [curriculo.idiomas.map((i) => `${i.idioma} (${rotulo(i.nivel)})`).join(", ")]
        : [],
    ),
    ...secao(
      "Contato",
      curriculo.contatos.map((c) => `• ${c.valor}`),
    ),
  ]
    .filter((linha): linha is string => linha !== null && linha !== undefined)
    .join("\n")
    .trim();
}

export async function compartilharCurriculo(curriculo: Curriculo) {
  await Share.share({
    title: `Currículo de ${curriculo.nome}`,
    message: curriculoEmTexto(curriculo),
  });
}
