import { motion } from 'framer-motion';

const ExchangePage = () => {
  return (
    <motion.div 
      style={{ minHeight: '80vh', padding: '8rem 0', width: '100%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.h1 
          style={{ 
            textAlign: 'center', 
            marginBottom: '4rem', 
            fontSize: '4rem',
            color: '#f8fafc',
            fontFamily: 'JetBrains Mono, Courier New, monospace'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experiência de Intercâmbio
        </motion.h1>
        
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Card Principal */}
          <div className="card" style={{
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#4169E1',
              fontSize: '1.8rem',
              marginBottom: '1.5rem'
            }}>
              🌍 Aventura Internacional
            </h3>
            
            <p style={{ 
              fontSize: '1.2rem',
              color: '#cbd5e1',
              lineHeight: '1.8'
            }}>
              Esta é a página dedicada à experiência de intercâmbio. 
              Aqui você pode detalhar sua experiência internacional.
            </p>
          </div>
          
          {/* Card Secundário */}
          <div className="card card--primary" style={{
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#6495ED',
              fontSize: '1.8rem',
              marginBottom: '1.5rem'
            }}>
              🚀 Crescimento Pessoal
            </h3>
            
            <p style={{
              color: '#cbd5e1',
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}>
              Como essa experiência impactou sua carreira e desenvolvimento 
              profissional, adaptação cultural e networking internacional.
            </p>
          </div>
        </motion.div>
        
        {/* Seção de destaque */}
        <motion.div
          className="card"
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            borderColor: '#6495ED'
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="section-divider--dotted" style={{ marginBottom: '1.5rem' }} />
          
          <p style={{
            fontSize: '1.2rem',
            color: '#6495ED',
            fontStyle: 'italic',
            fontWeight: '500'
          }}>
            "Uma experiência que transformou minha perspectiva profissional e pessoal"
          </p>
          
          <div className="section-divider--dotted" style={{ marginTop: '1.5rem' }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExchangePage;
