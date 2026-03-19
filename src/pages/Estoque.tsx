import { ChevronRight, Filter, Search } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useState } from 'react';

export default function Estoque() {
  const { data } = useSiteData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('TODOS');

  const categories = ['TODOS', 'BLINDADO', 'ELÉTRICO', 'ESPORTIVO', 'FAMÍLIA', 'OFFROAD'];

  const filteredVehicles = data.vehicles.filter(v => {
    const matchesSearch = `${v.brand} ${v.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'TODOS' || v.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-gray-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-[#021631] text-white py-16">
        <div className="container mx-auto px-6">
          <span className="text-[#fcbc17] text-xs font-bold tracking-widest uppercase mb-2 block">Nosso Estoque</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Veículos Disponíveis</h1>
          <p className="text-white/70">Explore nossa seleção de veículos de luxo e importados.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-[#021631]/10 sticky top-24 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input 
                  type="text" 
                  placeholder="Buscar modelo..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-[#021631]/10 rounded-sm py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#fcbc17] transition-colors"
                />
                <Search className="w-4 h-4 text-[#021631]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-[#021631]/10 rounded-sm text-sm font-medium hover:border-[#fcbc17] transition-colors whitespace-nowrap">
                <Filter className="w-4 h-4" /> Filtros
              </button>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#fcbc17] text-[#021631] font-bold'
                      : 'bg-gray-50 border border-[#021631]/10 text-[#021631]/70 hover:border-[#fcbc17] hover:text-[#021631]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-6 py-8">
        <p className="text-[#021631] font-medium"><span className="font-bold text-lg">{filteredVehicles.length}</span> veículos</p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="group bg-white border border-[#021631]/10 shadow-sm hover:border-[#fcbc17]/50 transition-colors flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.model} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-sm text-[#021631]/60 mb-1">{vehicle.brand}</h4>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{vehicle.model}</h3>
                <div className="flex items-center gap-2 text-xs text-[#021631]/60 font-medium mb-6">
                  <span>{vehicle.year}</span>
                  <span className="w-1 h-1 rounded-full bg-[#021631]/20"></span>
                  <span>{vehicle.km}</span>
                </div>
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-[#021631]/10">
                  <span className="text-xl font-bold text-[#fcbc17]">{vehicle.price}</span>
                  <a href="#" className="text-xs text-[#021631]/60 hover:text-[#021631] transition-colors flex items-center gap-1">
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#021631]/50 text-lg">Nenhum veículo encontrado.</p>
          </div>
        )}
      </div>
    </main>
  );
}
