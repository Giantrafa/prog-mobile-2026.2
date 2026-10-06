// Edite aqui seus dados — todas as telas leem deste arquivo.
export const profile = {
  name: "Seu Nome", 
  tagline: "Criando apps para iOS e Android com React Native e Expo.",
  about:
    "Sou estudante de desenvolvimento mobile, apaixonado(a) por criar interfaces simples e funcionais. Este portfólio reúne meus projetos e experiências.",
  skills: ["React Native", "Expo", "TypeScript", "JavaScript", "Git", "UI/UX"],
  education: [
    { title: "Programação Mobile", subtitle: "2026.2" },
  ],
  contacts: [
    { label: "E-mail", value: "seu@email.com", icon: "email-outline", url: "mailto:seu@email.com" },
    { label: "GitHub", value: "github.com/seu-usuario", icon: "github", url: "https://github.com/seu-usuario" },    
    { label: "WhatsApp", value: "+55 00 00000-0000", icon: "whatsapp", url: "https://wa.me/5500000000000" },
  ],
} as const;