import { useEffect } from 'react';
import Header from '../components/Header';
import ExchangeSections from '../sections/ExchangePage';
import Footer from '../sections/Footer';

const InterchangePage = () => {
  // Remove overflow duplo do body/html quando nesta página
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  return (
    <div className="interchange-page">
      <Header />
      
      <main
        id="interchange-scroll"
        style={{
          // Contêiner de scroll e snap
          marginTop: '60px',
          height: 'min(100svh, calc(100vh - 60px))',
          overflowY: 'auto',
          // Snap forte em desktop e aceitável em mobile
          scrollSnapType: 'y mandatory',
          // Padding superior menor para reduzir o "respiro" após o snap
          scrollPaddingTop: 'clamp(8px, 2.5vh, 20px)',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'column',
          // Removido padding extra que criava "espaço morto" no final
          paddingBottom: 0
        }}
      >
        {/* Ajustes responsivos adicionais */}
        <style>{`
          #interchange-scroll { scroll-behavior: smooth; }
          @media (max-width: 767px) {
            #interchange-scroll { scroll-snap-type: y proximity; }
          }
        `}</style>
        <ExchangeSections />

        {/* Footer dentro do contêiner de scroll para evitar 2º scrollbar */}
        <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', borderTop: '1px solid #1f3d5c', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default InterchangePage;
