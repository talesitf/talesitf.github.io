import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterchangePage from './pages/InterchangePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<InterchangePage />} />
          <Route path="/intercambio" element={<InterchangePage />} />
          <Route path="*" element={<InterchangePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
