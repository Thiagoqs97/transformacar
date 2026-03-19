import { ChevronRight, Filter, Search, X } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useState } from 'react';

export default function Estoque() {
  const { data } = useSiteData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['TODOS', 'BLINDADO', 'ELÉTRICO', 'ESPORTIVO', 'FAMÍLIA', 'OFFROAD'];

  const filteredVehicles = data.vehicles.filter(v => {
    const matchesSearch = `${v.brand} ${v.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'TODOS' || v.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-gray-50 min-h-screen pb-16 sm:pb-24">
      {/* Page Header */}
      <div className="bg-[#003399] text-white py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase mb-2 block">Nosso Estoque</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 sm:mb-4">Veículos Disponíveis</h1>
          <p className="text-white/70 text-sm sm:text-base">Explore nossa seleção de veículos de luxo e importados.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-[#003399]/10 sticky top-16 sm:top-20 md:top-24 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {/* Search & Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-[#003399]/10 rounded-sm py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-[#E31E24] transition-colors"
              />
              <Search className="w-4 h-4 text-[#003399]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003399]/40 hover:text-[#003399]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-sm text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${showFilters ? 'bg-[#E31E24] border-[#E31E24] text-[#003399]' : 'bg-gray-50 border-[#003399]/10 hover:border-[#E31E24]'}`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
              {activeCategory !== 'TODOS' && <span className="w-2 h-2 rounded-full bg-[#E31E24] sm:hidden" />}
            </button>
          </div>

          {/* Category Filters — collapsible on mobile */}
          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#E31E24] text-[#003399] font-bold'
                      : 'bg-gray-50 border border-[#003399]/10 text-[#003399]/70 hover:border-[#E31E24] hover:text-[#003399]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Always visible on desktop */}
          <div className="hidden md:flex items-center gap-3 mt-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#E31E24] text-[#003399] font-bold'
                    : 'bg-gray-50 border border-[#003399]/10 text-[#003399]/70 hover:border-[#E31E24] hover:text-[#003399]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <p className="text-[#003399] font-medium text-sm sm:text-base">
          <span className="font-bold text-base sm:text-lg">{filteredVehicles.length}</span> veículos
          {activeCategory !== 'TODOS' && (
            <span className="ml-2 text-[#003399]/50">em <span className="text-[#E31E24] font-semibold">{activeCategory}</span></span>
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="group bg-white border border-[#003399]/10 shadow-sm hover:border-[#E31E24]/50 transition-colors flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.model}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow">
                <h4 className="text-xs text-[#003399]/60 mb-0.5">{vehicle.brand}</h4>
                <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2 leading-tight">{vehicle.model}</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#003399]/60 font-medium mb-3 sm:mb-6">
                  <span>{vehicle.year}</span>
                  <span className="w-1 h-1 rounded-full bg-[#003399]/20" />
                  <span className="truncate">{vehicle.km}</span>
                </div>
                <div className="mt-auto flex items-end justify-between pt-3 border-t border-[#003399]/10">
                  <span className="text-sm sm:text-xl font-bold text-[#E31E24] leading-tight">{vehicle.price}</span>
                  <a href="#" className="text-xs text-[#003399]/60 hover:text-[#003399] transition-colors flex items-center gap-0.5">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <p className="text-[#003399]/50 text-base sm:text-lg">Nenhum veículo encontrado.</p>
          </div>
        )}
      </div>
    </main>
  );
}
