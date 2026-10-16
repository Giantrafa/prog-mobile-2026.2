const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function mesAno(data: string | null) {
  if (!data) return null;

  const [ano, mes] = data.split("-");

  return `${MESES[Number(mes) - 1]}/${ano}`;
}

export function periodo(inicio: string | null, fim: string | null) {
  if (!inicio) return mesAno(fim) ?? "";

  return `${mesAno(inicio)} – ${mesAno(fim) ?? "atual"}`;
}

const ROTULOS: Record<string, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
  fluente: "Fluente",
  nativo: "Nativo",
  ensino_medio: "Ensino Médio",
  tecnico: "Técnico",
  tecnologo: "Tecnólogo",
  graduacao: "Graduação",
  pos_graduacao: "Pós-graduação",
  mestrado: "Mestrado",
  doutorado: "Doutorado",
  curso_livre: "Curso livre",
  clt: "CLT",
  pj: "PJ",
  estagio: "Estágio",
  freelancer: "Freelancer",
  voluntario: "Voluntário",
  outro: "Outro",
};

export function rotulo(valor: string) {
  return ROTULOS[valor] ?? valor;
}

export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";

  return (primeira + ultima).toUpperCase();
}
