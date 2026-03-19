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
        <h2 className="text-2xl font-bold text-[#021631] mb-1">Bem-vindo ao Painel</h2>
        <p className="text-[#021631]/50">Gerencie todo o conteúdo do seu site em um só lugar.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#021631]/10 rounded-xl p-6 shadow-sm hover:border-[#fcbc17]/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#fcbc17]/10 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-[#fcbc17]" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-[#021631]">{data.vehicles.length}</p>
          <p className="text-[#021631]/50 text-sm">Veículos no Estoque</p>
        </div>

        <div className="bg-white border border-[#021631]/10 rounded-xl p-6 shadow-sm hover:border-[#fcbc17]/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-[#021631]">{data.vehicles.filter(v => v.featured).length}</p>
          <p className="text-[#021631]/50 text-sm">Veículos Destaque</p>
        </div>

        <div className="bg-white border border-[#021631]/10 rounded-xl p-6 shadow-sm hover:border-[#fcbc17]/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#021631]">{data.testimonials.length}</p>
          <p className="text-[#021631]/50 text-sm">Depoimentos</p>
        </div>

        <div className="bg-white border border-[#021631]/10 rounded-xl p-6 shadow-sm hover:border-[#fcbc17]/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-[#fcbc17]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#021631]">{data.settings.googleReviewRating}</p>
          <p className="text-[#021631]/50 text-sm">Avaliação Google</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-[#021631] mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button onClick={() => setActiveTab('vehicles')}
            className="bg-white border border-[#021631]/10 rounded-xl p-6 text-left hover:border-[#fcbc17]/60 hover:shadow-md transition-all group shadow-sm">
            <Car className="w-8 h-8 text-[#fcbc17] mb-3" />
            <h4 className="text-[#021631] font-bold mb-1">Gerenciar Veículos</h4>
            <p className="text-[#021631]/50 text-sm">Adicionar, editar ou remover veículos do estoque</p>
            <ChevronRight className="w-4 h-4 text-[#021631]/30 mt-3 group-hover:text-[#fcbc17] group-hover:translate-x-1 transition-all" />
          </button>

          <button onClick={() => setActiveTab('images')}
            className="bg-white border border-[#021631]/10 rounded-xl p-6 text-left hover:border-[#fcbc17]/60 hover:shadow-md transition-all group shadow-sm">
            <Image className="w-8 h-8 text-[#fcbc17] mb-3" />
            <h4 className="text-[#021631] font-bold mb-1">Alterar Imagens</h4>
            <p className="text-[#021631]/50 text-sm">Trocar o hero, logo e imagens do site</p>
            <ChevronRight className="w-4 h-4 text-[#021631]/30 mt-3 group-hover:text-[#fcbc17] group-hover:translate-x-1 transition-all" />
          </button>

          <button onClick={() => setActiveTab('settings')}
            className="bg-white border border-[#021631]/10 rounded-xl p-6 text-left hover:border-[#fcbc17]/60 hover:shadow-md transition-all group shadow-sm">
            <Settings className="w-8 h-8 text-[#fcbc17] mb-3" />
            <h4 className="text-[#021631] font-bold mb-1">Configurações</h4>
            <p className="text-[#021631]/50 text-sm">Alterar textos, estatísticas e contato</p>
            <ChevronRight className="w-4 h-4 text-[#021631]/30 mt-3 group-hover:text-[#fcbc17] group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* Recent Vehicles */}
      <div>
        <h3 className="text-lg font-bold text-[#021631] mb-4">Últimos Veículos Adicionados</h3>
        <div className="bg-white border border-[#021631]/10 rounded-xl overflow-hidden shadow-sm">
          {data.vehicles.slice(-5).reverse().map(v => (
            <div key={v.id} className="flex items-center gap-4 p-4 border-b border-[#021631]/5 last:border-0 hover:bg-gray-50 transition-colors">
              <img src={v.image} alt={v.model} className="w-16 h-12 object-cover rounded-lg border border-[#021631]/5" referrerPolicy="no-referrer" />
              <div className="flex-grow min-w-0">
                <p className="text-[#021631] font-medium truncate">{v.brand} {v.model}</p>
                <p className="text-[#021631]/50 text-sm">{v.year} · {v.km}</p>
              </div>
              <span className="text-[#fcbc17] font-bold text-sm whitespace-nowrap">{v.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky lg:top-24 inset-y-0 left-0 z-50 lg:z-auto w-64 bg-[#021631] flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:h-[calc(100vh-6rem)]`}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#fcbc17] rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-[#021631]" />
            </div>
            <span className="text-white font-bold text-sm">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-grow p-3 space-y-1 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#fcbc17] text-[#021631]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair do Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#021631]/10 px-6 py-4 flex items-center justify-between sticky top-24 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#021631]/60 hover:text-[#021631]">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-[#021631] font-bold">
              {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="w-8 h-8 bg-[#021631] rounded-full flex items-center justify-center">
            <span className="text-[#fcbc17] text-sm font-bold">A</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
