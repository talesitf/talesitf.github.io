const About = () => {
  return (
    <section id="about" className="about section" style={{ 
      padding: '8rem 0',
      background: 'transparent',
      width: '100%'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '4rem', 
          fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
          color: '#4169E1'
        }}>
          Sobre Mim
        </h2>
        
        <div className="card" style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: '#cbd5e1',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            Esta é a seção Sobre Mim. Aqui você pode falar sobre sua experiência, 
            habilidades e o que te motiva como desenvolvedor.
          </p>
          
          <p style={{ 
            fontSize: '1rem',
            color: '#94a3b8',
            lineHeight: '1.6'
          }}>
            O design agora tem um estilo retrô mais limpo, sem sombras excessivas 
            e com separadores sutis entre as seções.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
