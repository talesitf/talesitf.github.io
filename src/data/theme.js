// Configurações globais do design - Estilo Retrô
export const theme = {
  colors: {
    // Paleta de Azuis (tons retrô)
    primary: '#4169E1',      // Royal Blue - azul vibrante retrô
    primaryLight: '#6495ED', // Cornflower Blue
    primaryDark: '#191970',  // Midnight Blue
    
    // Gradientes azuis
    gradients: {
      primary: 'linear-gradient(135deg, #4169E1 0%, #191970 100%)',
      accent: 'linear-gradient(90deg, #6495ED 0%, #4169E1 50%, #191970 100%)',
      subtle: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)'
    },
    
    // Cinzas (fundo principal)
    background: '#1e293b',   // Slate 800 - cinza escuro principal
    surface: '#334155',      // Slate 700 - cinza médio
    surfaceLight: '#475569', // Slate 600 - cinza claro
    
    // Textos
    text: {
      primary: '#f8fafc',    // Branco/cinza muito claro
      secondary: '#cbd5e1',  // Cinza claro
      muted: '#94a3b8',      // Cinza médio
      accent: '#60a5fa'      // Azul claro para links/destaques
    },
    
    // Cores de apoio
    white: '#ffffff',
    black: '#0f172a',
    
    // Bordas e divisores
    border: '#475569',
    borderLight: '#64748b'
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem', 
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem'
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px'
  },
  
  // Efeitos retrô
  effects: {
    // Padrões pontilhados
    dots: {
      small: 'radial-gradient(circle, #4169E1 1px, transparent 1px)',
      medium: 'radial-gradient(circle, #4169E1 2px, transparent 2px)',
      large: 'radial-gradient(circle, #4169E1 3px, transparent 3px)'
    },
    
    // Sombras retrô
    shadows: {
      retro: '8px 8px 0px #191970',
      soft: '4px 4px 12px rgba(65, 105, 225, 0.3)',
      glow: '0 0 20px rgba(65, 105, 225, 0.5)',
      text: '2px 2px 4px rgba(0, 0, 0, 0.8)'
    },
    
    // Bordas estilo retrô
    borders: {
      retro: '3px solid #4169E1',
      dashed: '2px dashed #6495ED',
      dotted: '2px dotted #4169E1'
    }
  }
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  slideIn: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7 }
  },
  retroPop: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, type: "spring", stiffness: 200 }
  }
};
