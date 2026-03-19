import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Estoque from './pages/Estoque';
import AdminPage from './pages/admin/AdminPage';

export default function App() {
  return (
    <SiteDataProvider>
      <Router>
        <div className="min-h-screen bg-white text-[#003399] font-sans selection:bg-[#E31E24] selection:text-[#003399] flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </SiteDataProvider>
  );
}
