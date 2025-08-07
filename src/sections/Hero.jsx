import { motion } from 'framer-motion';

const Hero = () => {
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
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.h1 
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 5rem)', 
            marginBottom: '1.5rem',
            color: '#f8fafc',
            fontFamily: 'JetBrains Mono, Courier New, monospace',
            textAlign: 'center'
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tales Ferreira
        </motion.h1>
        
        <motion.p 
          style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', 
            maxWidth: '800px', 
            margin: '0 auto 3rem',
            color: '#cbd5e1',
            textAlign: 'center'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Desenvolvedor Frontend especializado em React e JavaScript
        </motion.p>
        
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="btn btn--primary" style={{
            fontSize: '1.1rem',
            padding: '1rem 2.5rem'
          }}>
            Ver Meus Projetos
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
