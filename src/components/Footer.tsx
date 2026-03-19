import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';

export default function Footer() {
  const { data } = useSiteData();
  const { settings } = data;

  return (
    <footer className="bg-[#021631] text-white pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Summary */}
          <div className="space-y-6">
            <img 
              src={settings.logoUrl} 
              alt="Logo" 
              className="h-16 object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              A melhor revenda de veículos em Teresina. Encontre os melhores veículos perto de você. Diversas marcas e modelos, acesse nosso estoque.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navegação</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link to="/" className="hover:text-[#fcbc17] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#fcbc17] rounded-full"></span> Início</Link></li>
              <li><Link to="/estoque" className="hover:text-[#fcbc17] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#fcbc17] rounded-full"></span> Estoque</Link></li>
              <li><a href="#" className="hover:text-[#fcbc17] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#fcbc17] rounded-full"></span> Financiamento</a></li>
              <li><a href="#" className="hover:text-[#fcbc17] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#fcbc17] rounded-full"></span> Mentoria</a></li>
              <li><a href="#" className="hover:text-[#fcbc17] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#fcbc17] rounded-full"></span> Sobre a Empresa</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contato & Localização</h3>
            <ul className="space-y-5 text-sm text-white/70">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#fcbc17]/10 transition-colors shrink-0">
                  <Phone className="w-4 h-4 text-[#fcbc17]" />
                </div>
                <span className="group-hover:text-white transition-colors">{settings.phone1}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#fcbc17]/10 transition-colors shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#fcbc17]" />
                </div>
                <span className="group-hover:text-white transition-colors">{settings.phone2}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#fcbc17]/10 transition-colors shrink-0">
                  <Mail className="w-4 h-4 text-[#fcbc17]" />
                </div>
                <span className="group-hover:text-white transition-colors">{settings.email}</span>
              </li>
              <li className="flex items-start gap-4 group pt-2">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#fcbc17]/10 transition-colors shrink-0">
                  <MapPin className="w-4 h-4 text-[#fcbc17]" />
                </div>
                <span className="group-hover:text-white transition-colors leading-relaxed">
                  {settings.address}<br/>{settings.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Grid */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Redes Sociais</h3>
            <div className="flex flex-col gap-4">
              <a href={settings.instagramUrl} className="flex items-center gap-4 group bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#010e20] flex items-center justify-center group-hover:bg-[#fcbc17] transition-colors shrink-0">
                  <Instagram className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Instagram</p>
                  <p className="text-[#fcbc17] text-xs font-medium">{settings.instagramFollowers}</p>
                </div>
              </a>
              <a href={settings.youtubeUrl} className="flex items-center gap-4 group bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#010e20] flex items-center justify-center group-hover:bg-[#fcbc17] transition-colors shrink-0">
                  <Youtube className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">YouTube</p>
                  <p className="text-[#fcbc17] text-xs font-medium">{settings.youtubeSubscribers}</p>
                </div>
              </a>
              <a href={settings.facebookUrl} className="flex items-center gap-4 group bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#010e20] flex items-center justify-center group-hover:bg-[#fcbc17] transition-colors shrink-0">
                  <Facebook className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Facebook</p>
                  <p className="text-[#fcbc17] text-xs font-medium">{settings.facebookFollowers}</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60 font-medium">
          <p>© {new Date().getFullYear()} Transformacar Autos. Todos os direitos reservados.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-[#fcbc17] transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-[#fcbc17] transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
