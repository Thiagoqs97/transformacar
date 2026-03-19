import { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import {
  LayoutDashboard, Car, Image, Settings, MessageSquare, LogOut,
  ChevronRight, TrendingUp, Package, Star, Menu, X
} from 'lucide-react';
import AdminVehicles from './AdminVehicles';
import AdminImages from './AdminImages';
import AdminSettings from './AdminSettings';
import AdminTestimonials from './AdminTestimonials';

type Tab = 'dashboard' | 'vehicles' | 'images' | 'settings' | 'testimonials';

export default function AdminDashboard() {
  const { data, logout } = useSiteData();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vehicles' as Tab, label: 'Veículos', icon: Car },
    { id: 'images' as Tab, label: 'Imagens do Site', icon: Image },
    { id: 'testimonials' as Tab, label: 'Depoimentos', icon: MessageSquare },
    { id: 'settings' as Tab, label: 'Configurações', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'vehicles': return <AdminVehicles />;
      case 'images': return <AdminImages />;
      case 'settings': return <AdminSettings />;
      case 'testimonials': return <AdminTestimonials />;
      default: return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Bem-vindo ao Painel</h2>
        <p className="text-white/50">Gerencie todo o conteúdo do seu site em um só lugar.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fcbc17]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#fcbc17]/10 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-[#fcbc17]" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.vehicles.length}</p>
          <p className="text-white/50 text-sm">Veículos no Estoque</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fcbc17]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.vehicles.filter(v => v.featured).length}</p>
          <p className="text-white/50 text-sm">Veículos Destaque</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fcbc17]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{data.testimonials.length}</p>
          <p className="text-white/50 text-sm">Depoimentos</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fcbc17]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{data.settings.googleReviewRating}</p>
          <p className="text-white/50 text-sm">Avaliação Google</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('vehicles')}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:border-[#fcbc17]/50 hover:bg-white/[0.07] transition-all group"
          >
            <Car className="w-8 h-8 text-[#fcbc17] mb-3" />
            <h4 className="text-white font-bold mb-1">Gerenciar Veículos</h4>
            <p className="text-white/50 text-sm">Adicionar, editar ou remover veículos do estoque</p>
            <ChevronRight className="w-4 h-4 text-white/30 mt-3 group-hover:text-[#fcbc17] group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:border-[#fcbc17]/50 hover:bg-white/[0.07] transition-all group"
          >
            <Image className="w-8 h-8 text-[#fcbc17] mb-3" />
            <h4 className="text-white font-bold mb-1">Alterar Imagens</h4>
            <p className="text-white/50 text-sm">Trocar o hero, logo e imagens do site</p>
            <ChevronRight className="w-4 h-4 text-white/30 mt-3 group-hover:text-[#fcbc17] group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:border-[#fcbc17]/50 hover:bg-white/[0.07] transition-all group"
          >
            <Settings className="w-8 h-8 text-[#fcbc17] mb-3" />
            <h4 className="text-white font-bold mb-1">Configurações</h4>
            <p className="text-white/50 text-sm">Alterar textos, estatísticas e contato</p>
            <ChevronRight className="w-4 h-4 text-white/30 mt-3 group-hover:text-[#fcbc17] group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* Recent Vehicles */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Últimos Veículos Adicionados</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {data.vehicles.slice(-5).reverse().map(v => (
            <div key={v.id} className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <img src={v.image} alt={v.model} className="w-16 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
              <div className="flex-grow min-w-0">
                <p className="text-white font-medium truncate">{v.brand} {v.model}</p>
                <p className="text-white/50 text-sm">{v.year} • {v.km}</p>
              </div>
              <span className="text-[#fcbc17] font-bold text-sm whitespace-nowrap">{v.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a1628] flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#021631] border-r border-white/10 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fcbc17] rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#021631]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">Admin Panel</h1>
              <p className="text-white/40 text-xs">Transformacar</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-grow p-4 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#fcbc17] text-[#021631] shadow-lg shadow-[#fcbc17]/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
            Ver Site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-white font-bold text-lg">
              {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#fcbc17] rounded-full flex items-center justify-center">
              <span className="text-[#021631] text-sm font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
