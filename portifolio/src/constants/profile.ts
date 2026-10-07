// Edite aqui seus dados — todas as telas leem deste arquivo.
export const profile = {
  name: "Seu Nome",       
  tagline: "Este e o meu portfólio Mobile onde reúno mimhas e experiências e projetos.",
  about:
    "Sou estudante da area de Ti e Busco melhorar minhas abilidades e explorar outras areas para conhecimento",
  skills: ["React Native", "React", "Linux", "Java", "Git", "UI/UX", "Redes","Banco de Dados","Back End","Front End"],
  education: [
    { title: "Cursando Sistemas Para Ineternet", subtitle: "2025.1" },
  ],
  contacts: [
    { label: "E-mail", value: "seu@email.com", icon: "email-outline", url: "mailto:seu@email.com" },
    { label: "GitHub", value: "github.com/seu-usuario", icon: "github", url: "https://github.com/seu-usuario" },    
    { label: "WhatsApp", value: "+55 00 00000-0000", icon: "whatsapp", url: "https://wa.me/5500000000000" },
  ],
} as const;