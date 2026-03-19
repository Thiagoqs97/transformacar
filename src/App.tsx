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
        <div className="min-h-screen bg-white text-[#021631] font-sans selection:bg-[#fcbc17] selection:text-[#021631] flex flex-col">
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
