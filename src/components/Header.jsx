import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Briefcase } from 'lucide-react';
import { useI18n } from '../useI18n.js';
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
  const { lang, setLang, t } = useI18n();
  const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

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
                    <span>{t('howHelp')}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('planejamento')}
                    className="header__nav-link header__nav-link--button"
                  >
                      <Briefcase size={18} />
                    <span>{t('finance')}</span>
                  </button>
                  </li>
              </>
            ) : (
                null
            )}

          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleLang}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              cursor: 'pointer',
              letterSpacing: '.5px'
            }}
            aria-label="Toggle language"
          >
            <span style={{ opacity: lang === 'pt' ? 1 : .55 }}>PT</span>
            <span style={{ margin: '0 4px', opacity: .4 }}>|</span>
            <span style={{ opacity: lang === 'en' ? 1 : .55 }}>EN</span>
          </button>
          <button 
          className="header__mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}>
          <ul className="header__mobile-nav-list">
            <li>
              <button
                onClick={() => scrollToSection('como-ajudar')}
                className="header__mobile-nav-link"
              >
                <User size={20} />
                <span>{t('howHelp')}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('planejamento')}
                className="header__mobile-nav-link"
              >
                <Briefcase size={20} />
                <span>{t('finance')}</span>
              </button>
            </li>
            <li style={{ padding: '0.75rem 0 0.25rem' }}>
              <button
                onClick={toggleLang}
                className="header__mobile-nav-link"
                style={{ background: 'none', border: '1px solid transparent' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>PT | EN</span>
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
