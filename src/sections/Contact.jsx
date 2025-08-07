const Contact = () => {
  return (
    <section id="contact" className="contact section" style={{ 
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
          Contato
        </h2>
        
        <div className="card" style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: '#cbd5e1',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            Esta é a seção de Contato. Aqui você pode adicionar suas informações 
            de contato e redes sociais.
          </p>
          
          <div className="section-divider--dotted" style={{ margin: '2rem auto' }} />
          
          <p style={{ 
            fontSize: '1rem',
            color: '#6495ED',
            fontWeight: '500'
          }}>
            Entre em contato para projetos e oportunidades!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
