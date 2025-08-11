import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, User, Briefcase, Plane } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detectar scroll para adicionar background ao header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao trocar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isExchangePage = location.pathname === '/' || location.pathname === '/intercambio';

  // Scroll suave para seções da página de Intercâmbio
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return setIsMenuOpen(false);

    const container = document.getElementById('interchange-scroll');
    if (container) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isExchangePage ? 'header--compact' : ''}`}>
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo" aria-label="Ir para a página de Intercâmbio">
          <img
            src="/Gemini_Generated_Image_arqv49arqv49arqv.png"
            alt="Logo Tales Ivalque"
            className="header__logo-img"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {isExchangePage ? (
              <>
                <li>
                  <button
                      onClick={() => scrollToSection('como-ajudar')}
                    className="header__nav-link header__nav-link--button"
                  >
                    <User size={18} />
                      <span>Como Ajudar</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('planejamento')}
                    className="header__nav-link header__nav-link--button"
                  >
                      <Briefcase size={18} />
                    <span>Financeiro</span>
                  </button>
                  </li>
              </>
            ) : (
                null
            )}

          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="header__mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <nav className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}>
          <ul className="header__mobile-nav-list">
            <li>
              <button
                onClick={() => scrollToSection('como-ajudar')}
                className="header__mobile-nav-link"
              >
                <User size={20} />
                <span>Como Ajudar</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('planejamento')}
                className="header__mobile-nav-link"
              >
                <Briefcase size={20} />
                <span>Financeiro</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="header__mobile-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
