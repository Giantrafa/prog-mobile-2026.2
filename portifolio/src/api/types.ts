export type Pessoa = {
  id: number;
  nome: string;
  titulo: string | null;
  email: string;
  telefone: string | null;
  cidade: string | null;
  data_nascimento: string | null;
  resumo: string | null;
  foto_url: string | null;
};

export type TipoContato = "email" | "telefone" | "whatsapp" | "github" | "linkedin" | "site" | "outro";

export type Contato = {
  id: number;
  tipo: TipoContato;
  valor: string;
  url: string | null;
};

export type Formacao = {
  id: number;
  instituicao: string;
  curso: string;
  nivel: string;
  data_inicio: string;
  data_fim: string | null;
  descricao: string | null;
};

export type Experiencia = {
  id: number;
  empresa: string;
  cargo: string;
  tipo: string;
  local: string | null;
  data_inicio: string;
  data_fim: string | null;
  descricao: string | null;
};

export type Habilidade = {
  id: number;
  nome: string;
  categoria: string;
};

export type Projeto = {
  id: number;
  experiencia_id: number | null;
  nome: string;
  descricao: string | null;
  url_repositorio: string | null;
  url_demo: string | null;
  data_inicio: string | null;
  data_fim: string | null;
  tecnologias: Habilidade[];
};

export type Certificacao = {
  id: number;
  nome: string;
  emissor: string;
  data_emissao: string | null;
  carga_horaria: number | null;
  url_credencial: string | null;
};

export type Idioma = {
  id: number;
  idioma: string;
  nivel: string;
};

export type Curriculo = Pessoa & {
  contatos: Contato[];
  formacoes: Formacao[];
  experiencias: Experiencia[];
  projetos: Projeto[];
  habilidades: (Habilidade & { nivel: string })[];
  certificacoes: Certificacao[];
  idiomas: Idioma[];
};
