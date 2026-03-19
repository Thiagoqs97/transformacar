import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { Settings } from 'lucide-react';

export default function Footer() {
  const { data } = useSiteData();
  const { settings } = data;

  return (
    <footer className="bg-[#003399] text-white pt-12 sm:pt-20 pb-6 sm:pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-10 sm:mb-16">

          {/* Brand Summary */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <img
              src={settings.logoUrl}
              alt="Logo"
              className="h-14 sm:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              A melhor revenda de veículos em Teresina. Encontre os melhores veículos perto de você. Diversas marcas e modelos, acesse nosso estoque.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6 uppercase tracking-widest text-xs">Navegação</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm text-white/70">
              <li><Link to="/" className="hover:text-[#E31E24] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#E31E24] rounded-full" /> Início</Link></li>
              <li><Link to="/estoque" className="hover:text-[#E31E24] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#E31E24] rounded-full" /> Estoque</Link></li>
              <li><a href="#" className="hover:text-[#E31E24] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#E31E24] rounded-full" /> Financiamento</a></li>
              <li><a href="#" className="hover:text-[#E31E24] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#E31E24] rounded-full" /> Mentoria</a></li>
              <li><a href="#" className="hover:text-[#E31E24] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#E31E24] rounded-full" /> Sobre a Empresa</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6 uppercase tracking-widest text-xs">Contato & Localização</h3>
            <ul className="space-y-4 sm:space-y-5 text-sm text-white/70">
              <li className="flex items-center gap-3 sm:gap-4 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E31E24]/10 transition-colors shrink-0">
                  <Phone className="w-4 h-4 text-[#E31E24]" />
                </div>
                <span className="group-hover:text-white transition-colors">{settings.phone1}</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E31E24]/10 transition-colors shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#E31E24]" />
                </div>
                <span className="group-hover:text-white transition-colors">{settings.phone2}</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E31E24]/10 transition-colors shrink-0">
                  <Mail className="w-4 h-4 text-[#E31E24]" />
                </div>
                <span className="group-hover:text-white transition-colors break-all text-xs sm:text-sm">{settings.email}</span>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 group pt-1 sm:pt-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E31E24]/10 transition-colors shrink-0">
                  <MapPin className="w-4 h-4 text-[#E31E24]" />
                </div>
                <span className="group-hover:text-white transition-colors leading-relaxed">
                  {settings.address}<br />{settings.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Grid */}
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6 uppercase tracking-widest text-xs">Redes Sociais</h3>
            <div className="flex flex-col gap-3">
              <a href={settings.instagramUrl} className="flex items-center gap-3 sm:gap-4 group bg-white/5 p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#010e20] flex items-center justify-center group-hover:bg-[#E31E24] transition-colors shrink-0">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-bold">Instagram</p>
                  <p className="text-[#E31E24] text-xs font-medium">{settings.instagramFollowers}</p>
                </div>
              </a>
              <a href={settings.youtubeUrl} className="flex items-center gap-3 sm:gap-4 group bg-white/5 p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#010e20] flex items-center justify-center group-hover:bg-[#E31E24] transition-colors shrink-0">
                  <Youtube className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-bold">YouTube</p>
                  <p className="text-[#E31E24] text-xs font-medium">{settings.youtubeSubscribers}</p>
                </div>
              </a>
              <a href={settings.facebookUrl} className="flex items-center gap-3 sm:gap-4 group bg-white/5 p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#010e20] flex items-center justify-center group-hover:bg-[#E31E24] transition-colors shrink-0">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-bold">Facebook</p>
                  <p className="text-[#E31E24] text-xs font-medium">{settings.facebookFollowers}</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-medium text-center sm:text-left">
          <p>© {new Date().getFullYear()} Transformacar Autos. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="#" className="hover:text-[#E31E24] transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-[#E31E24] transition-colors">Termos de Uso</a>
            <Link to="/admin" className="flex items-center gap-1 text-white/20 hover:text-white/40 transition-colors text-[10px] uppercase tracking-widest">
              <Settings className="w-3 h-3" /> Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
