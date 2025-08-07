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

  const isHomePage = location.pathname === '/';

  // Scroll suave para seções na página principal
  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <span className="header__logo-text">TF</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {isHomePage ? (
              <>
                <li>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="header__nav-link header__nav-link--button"
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="header__nav-link header__nav-link--button"
                  >
                    <User size={18} />
                    <span>Sobre Mim</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="header__nav-link header__nav-link--button"
                  >
                    <Briefcase size={18} />
                    <span>Projetos</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/" className="header__nav-link">
                  <Home size={18} />
                  <span>Voltar ao Portfolio</span>
                </Link>
              </li>
            )}
            
            <li>
              <Link 
                to="/intercambio" 
                className={`header__nav-link ${location.pathname === '/intercambio' ? 'header__nav-link--active' : ''}`}
              >
                <Plane size={18} />
                <span>Intercâmbio</span>
              </Link>
            </li>
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
            {isHomePage ? (
              <>
                <li>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="header__mobile-nav-link"
                  >
                    <Home size={20} />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="header__mobile-nav-link"
                  >
                    <User size={20} />
                    <span>Sobre Mim</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="header__mobile-nav-link"
                  >
                    <Briefcase size={20} />
                    <span>Projetos</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/" className="header__mobile-nav-link">
                  <Home size={20} />
                  <span>Voltar ao Portfolio</span>
                </Link>
              </li>
            )}
            
            <li>
              <Link 
                to="/intercambio" 
                className={`header__mobile-nav-link ${location.pathname === '/intercambio' ? 'header__mobile-nav-link--active' : ''}`}
              >
                <Plane size={20} />
                <span>Intercâmbio</span>
              </Link>
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
