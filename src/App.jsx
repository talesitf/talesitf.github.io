import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InterchangePage from './pages/InterchangePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intercambio" element={<InterchangePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
