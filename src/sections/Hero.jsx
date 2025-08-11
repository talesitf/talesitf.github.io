import { motion } from 'framer-motion';
// Referência explícita para satisfazer o linter quando usado apenas em JSX
const _MOTION_USED = motion;

const Hero = () => {
  const focusItems = [
    'sistemas agênticos com IA',
    'segurança de IA',
    'observabilidade',
    'automação inteligente de processos'
  ];
  return (
    <motion.section 
      id="home"
      className="hero section"
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        color: '#f8fafc',
        textAlign: 'center',
        position: 'relative',
        width: '100%'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container" style={{ textAlign: 'left', maxWidth: '1000px', width: '100%', paddingInline: '1.25rem' }}>
        {/* Badge / etiqueta (mantida – alinhada à esquerda) */}
        <motion.div
          style={{
            display: 'inline-block',
            padding: '.45rem .95rem',
            fontSize: '.62rem',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            background: 'rgba(65,105,225,.08)',
            border: '1px solid #4169E1',
            borderRadius: '999px',
            marginBottom: '1rem',
            backdropFilter: 'blur(4px)'
          }}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Engenharia de Computação • Insper
        </motion.div>

        {/* Saudação */}
        <motion.p
          style={{
            fontSize: 'clamp(.85rem,2vw,1rem)',
            color: '#94a3b8',
            margin: '0 0 .35rem',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '.02em'
          }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.22 }}
        >
          Olá, eu sou
        </motion.p>

        {/* Nome com destaque parcial e sobrenome mesmo tamanho */}
        <motion.h1 
          style={{ 
            fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
            marginBottom: '1.15rem',
            color: '#f8fafc',
            fontFamily: 'JetBrains Mono, Courier New, monospace',
            textAlign: 'left',
            lineHeight: 1.1,
            fontWeight: 600
          }}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.28 }}
        >
          Tales <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{
              background: 'linear-gradient(90deg,#60a5fa 0%,#4169E1 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>Ivalq</span><span>ue</span>
          </span><br />
          Taveira de Freitas
        </motion.h1>
        
        {/* Parágrafo principal ajustado para tom conversacional */}
        <motion.p 
          style={{ 
            fontSize: 'clamp(1rem, 2.4vw, 1.25rem)',
            maxWidth: '880px',
            margin: '0 0 1.05rem',
            color: '#cbd5e1',
            textAlign: 'left',
            lineHeight: 1.58,
            fontWeight: 400
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.42 }}
        >
          Sou estudante de Engenharia de Computação no Insper e hoje construo integrações orientadas a IA, experiências conversacionais e agentes que conectam sistemas e pessoas. Gosto de pegar algo complexo, desmontar com cuidado e remontar em uma solução enxuta, confiável e escalável.
        </motion.p>

        {/* Foco atual refeito sem ponto solto, usando separadores gerados */}
        <motion.p
          style={{
            fontSize: 'clamp(.78rem, 1.7vw, .92rem)',
            maxWidth: 820,
            margin: '0 0 2.2rem',
            color: '#94a3b8',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '.02em',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '.5rem',
            alignItems: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          aria-label="Foco atual"
        >
          <span style={{ color: '#cbd5e1' }}>Foco atual:</span>
          {focusItems.map((item, i) => (
            <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
              {i > 0 && <span aria-hidden="true" style={{ opacity: .6 }}>•</span>}
              <span>{item}</span>
            </span>
          ))}
        </motion.p>
        
        {/* Botões com âncoras corrigidas */}
        <motion.div
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.7 }}
        >
          <a href="#projects" className="btn btn--primary" style={{
            fontSize: '1.02rem',
            padding: '1rem 2.2rem',
            textDecoration: 'none'
          }}>
            Ver Projetos
          </a>
          <a href="#contact" className="btn" style={{
            fontSize: '1.02rem',
            padding: '1rem 2.2rem',
            textDecoration: 'none'
          }}>
            Fale Comigo
          </a>
        </motion.div>
      </div>

      {/* Ornamentação sutil */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 40% 40%, rgba(96,165,250,0.15), transparent 55%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
    </motion.section>
  );
};

export default Hero;
