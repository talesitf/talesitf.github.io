const Footer = () => {
  return (
    <footer style={{ 
      background: 'transparent', 
      color: '#f8fafc', 
      textAlign: 'center', 
      padding: '4rem 0 2rem',
      borderTop: '1px solid rgba(65, 105, 225, 0.3)',
      width: '100%'
    }}>
      <div className="container">        
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          fontWeight: '500',
          color: '#cbd5e1',
          marginBottom: '0.5rem'
        }}>
          &copy; 2025 Tales Taveira. Todos os direitos reservados.
        </p>
        
        <p style={{
          color: '#6495ED',
          fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)'
        }}>
          Desenvolvido com ❤️ e muito ☕
        </p>
      </div>
    </footer>
  );
};

export default Footer;
