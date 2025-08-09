import { motion } from 'framer-motion';
import Header from '../components/Header';
import ExchangeSections from '../sections/ExchangePage';
import Footer from '../sections/Footer';

const InterchangePage = () => {
  return (
    <motion.div 
      className="interchange-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main
        id="interchange-scroll"
        style={{
          // Contêiner de scroll e snap
          marginTop: '60px',
          height: 'calc(100vh - 60px)',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <ExchangeSections />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default InterchangePage;
