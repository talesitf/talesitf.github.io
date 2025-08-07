import { motion } from 'framer-motion';
import Header from '../components/Header';
import ExchangePage from '../sections/ExchangePage';
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
      
      <main style={{ paddingTop: '70px' }}>
        <ExchangePage />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default InterchangePage;
