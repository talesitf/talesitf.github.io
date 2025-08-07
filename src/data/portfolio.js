// Dados pessoais do portfólio
export const personalInfo = {
  name: "Tales Ferreira",
  title: "Desenvolvedor Frontend",
  subtitle: "Especialista em React & JavaScript",
  description: "Desenvolvedor apaixonado por criar experiências digitais incríveis e soluções inovadoras.",
  location: "Brasil",
  email: "contato@ivalq.dev.br",
  
  // Links sociais
  social: {
    github: "https://github.com/talesitf",
    linkedin: "https://linkedin.com/in/talesferreira",
    portfolio: "https://www.ivalq.dev.br"
  }
};

// Seção Sobre Mim
export const aboutMe = {
  introduction: "Olá! Sou um desenvolvedor frontend com paixão por criar interfaces modernas e funcionais.",
  
  skills: [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "CSS/SCSS", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "Git", level: 80 }
  ],
  
  highlights: [
    "3+ anos de experiência em desenvolvimento frontend",
    "Especialista em React e ecossistema JavaScript",
    "Experiência internacional com intercâmbio",
    "Focado em performance e experiência do usuário"
  ]
};

// Seção Intercâmbio
export const exchangeExperience = {
  title: "Experiência Internacional",
  country: "Canadá", // Exemplo - ajuste conforme sua experiência
  duration: "6 meses",
  year: "2024",
  description: "Experiência transformadora que ampliou minha visão de mundo e habilidades profissionais.",
  
  achievements: [
    "Aperfeiçoamento do inglês técnico",
    "Networking internacional",
    "Adaptação a nova cultura de trabalho",
    "Desenvolvimento de soft skills"
  ],
  
  skills_gained: [
    "Comunicação intercultural",
    "Adaptabilidade",
    "Pensamento global",
    "Liderança"
  ]
};

// Projetos
export const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Site pessoal desenvolvido com React e Vite",
    technologies: ["React", "Vite", "CSS3", "JavaScript"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/talesitf/portfolio",
    demo: "https://www.ivalq.dev.br",
    featured: true
  },
  {
    id: 2, 
    title: "App de Tarefas",
    description: "Aplicativo de gerenciamento de tarefas com React",
    technologies: ["React", "LocalStorage", "CSS Modules"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/talesitf/todo-app",
    demo: "https://todo-app-demo.vercel.app",
    featured: true
  },
  {
    id: 3,
    title: "Landing Page",
    description: "Landing page responsiva para empresa fictícia", 
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/talesitf/landing-page",
    demo: "https://landing-demo.netlify.app",
    featured: false
  }
];

// Informações de contato
export const contactInfo = {
  title: "Vamos Conversar?",
  description: "Estou sempre aberto para discutir novas oportunidades e projetos interessantes.",
  
  methods: [
    {
      type: "email",
      label: "Email",
      value: "contato@ivalq.dev.br",
      link: "mailto:contato@ivalq.dev.br"
    },
    {
      type: "linkedin", 
      label: "LinkedIn",
      value: "Tales Ferreira",
      link: "https://linkedin.com/in/talesferreira"
    },
    {
      type: "github",
      label: "GitHub", 
      value: "@talesitf",
      link: "https://github.com/talesitf"
    }
  ]
};
