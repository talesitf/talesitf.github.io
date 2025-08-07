const Projects = () => {
  return (
    <section id="projects" className="projects section" style={{ 
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
          Projetos
        </h2>
        
        <div className="card card--primary" style={{
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
            Esta é a seção de Projetos. Aqui você pode mostrar seus trabalhos 
            e experiências profissionais.
          </p>
          
          <p style={{ 
            fontSize: '1rem',
            color: '#94a3b8',
            lineHeight: '1.6'
          }}>
            Com o novo visual retrô limpo, focamos em bordas e separadores 
            ao invés de gradientes grandes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
