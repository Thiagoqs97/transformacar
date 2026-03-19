import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';

export default function Header() {
  const { data } = useSiteData();
  const { settings } = data;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#003399]/10">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 md:h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <img
              src={settings.logoUrl}
              alt="Logo"
              className="h-10 sm:h-12 md:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#003399]/80 tracking-wide uppercase">
            <Link to="/" className="hover:text-[#E31E24] transition-colors">Início</Link>
            <Link to="/estoque" className="hover:text-[#E31E24] transition-colors">Estoque</Link>
            <a href="#" className="hover:text-[#E31E24] transition-colors">Financiamento</a>
            <a href="#" className="hover:text-[#E31E24] transition-colors">Mentoria</a>
            <a href="#" className="hover:text-[#E31E24] transition-colors">Sobre</a>
            <a href="#" className="hover:text-[#E31E24] transition-colors">Contato</a>
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/estoque"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border border-[#E31E24] text-[#E31E24] hover:bg-[#E31E24] hover:text-[#003399] transition-all font-semibold tracking-wider uppercase text-xs rounded-sm"
            >
              Ver Estoque
            </Link>
            <button
              className="lg:hidden text-[#003399] hover:text-[#E31E24] transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <nav
            className="absolute top-16 sm:top-20 left-0 right-0 bg-white border-b border-[#003399]/10 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col py-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-sm font-medium text-[#003399] hover:bg-gray-50 hover:text-[#E31E24] transition-colors uppercase tracking-wide border-b border-[#003399]/5"
              >
                Início
              </Link>
              <Link
                to="/estoque"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-sm font-medium text-[#003399] hover:bg-gray-50 hover:text-[#E31E24] transition-colors uppercase tracking-wide border-b border-[#003399]/5"
              >
                Estoque
              </Link>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-sm font-medium text-[#003399] hover:bg-gray-50 hover:text-[#E31E24] transition-colors uppercase tracking-wide border-b border-[#003399]/5"
              >
                Financiamento
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-sm font-medium text-[#003399] hover:bg-gray-50 hover:text-[#E31E24] transition-colors uppercase tracking-wide border-b border-[#003399]/5"
              >
                Mentoria
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-sm font-medium text-[#003399] hover:bg-gray-50 hover:text-[#E31E24] transition-colors uppercase tracking-wide border-b border-[#003399]/5"
              >
                Sobre
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-sm font-medium text-[#003399] hover:bg-gray-50 hover:text-[#E31E24] transition-colors uppercase tracking-wide border-b border-[#003399]/5"
              >
                Contato
              </a>
              <div className="px-6 py-4">
                <Link
                  to="/estoque"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3 border border-[#E31E24] text-[#E31E24] hover:bg-[#E31E24] hover:text-[#003399] transition-all font-semibold tracking-wider uppercase text-xs rounded-sm"
                >
                  Ver Estoque
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
