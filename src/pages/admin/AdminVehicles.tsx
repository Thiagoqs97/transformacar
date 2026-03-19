import { useState } from 'react';
import { useSiteData, Vehicle } from '../../context/SiteDataContext';
import { Plus, Edit2, Trash2, Search, X, Save, Star, StarOff } from 'lucide-react';

const emptyVehicle: Omit<Vehicle, 'id'> = {
  brand: '', model: '', year: '', km: '', price: '', image: '', images: [],
  category: 'TODOS', fuel: 'Flex', transmission: 'Automático', color: '',
  description: '', featured: false,
};

export default function AdminVehicles() {
  const { data, addVehicle, updateVehicle, deleteVehicle } = useSiteData();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  const filtered = data.vehicles.filter(v =>
    `${v.brand} ${v.model}`.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing({ ...emptyVehicle, id: 0 });
    setIsNew(true);
    setShowForm(true);
    setNewImageUrl('');
  };

  const openEdit = (v: Vehicle) => {
    setEditing({ ...v });
    setIsNew(false);
    setShowForm(true);
    setNewImageUrl('');
  };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      const { id: _, ...rest } = editing;
      addVehicle(rest);
    } else {
      updateVehicle(editing.id, editing);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    deleteVehicle(id);
    setConfirmDelete(null);
  };

  const updateField = (field: keyof Vehicle, value: string | boolean | string[]) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const addImage = () => {
    if (!newImageUrl.trim() || !editing) return;
    setEditing({ ...editing, images: [...editing.images, newImageUrl.trim()] });
    setNewImageUrl('');
  };

  const removeImage = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, images: editing.images.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Veículos do Estoque</h2>
          <p className="text-white/50 text-sm">{data.vehicles.length} veículos cadastrados</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#fcbc17] text-[#021631] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#fcbc17]/90 transition-all shadow-lg shadow-[#fcbc17]/20"
        >
          <Plus className="w-4 h-4" /> Adicionar Veículo
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por marca ou modelo..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#fcbc17] transition-colors"
        />
      </div>

      {/* Vehicle List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#fcbc17]/30 transition-colors group">
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
              <img src={v.image} alt={v.model} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              {v.featured && (
                <span className="absolute top-3 left-3 bg-[#fcbc17] text-[#021631] px-2 py-1 rounded-lg text-xs font-bold">
                  ⭐ Destaque
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-white/40 text-xs font-bold uppercase tracking-wider">{v.brand}</p>
              <h3 className="text-white font-bold truncate">{v.model}</h3>
              <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                <span>{v.year}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span>{v.km}</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <span className="text-[#fcbc17] font-bold">{v.price}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(v)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#fcbc17] hover:bg-[#fcbc17]/10 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(v.id)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Car className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">Nenhum veículo encontrado.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center px-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-[#0f1d32] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-white text-lg font-bold mb-2">Confirmar exclusão?</h3>
            <p className="text-white/50 text-sm mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all text-sm font-medium">
                Cancelar
              </button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-bold">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / New Vehicle Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-[#0f1d32] border border-white/10 rounded-2xl p-6 lg:p-8 max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{isNew ? 'Novo Veículo' : 'Editar Veículo'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image Principal */}
              <div>
                <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Imagem Principal (URL)</label>
                <input
                  type="text"
                  value={editing.image}
                  onChange={e => updateField('image', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors"
                  placeholder="https://..."
                />
                {editing.image && (
                  <img src={editing.image} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" referrerPolicy="no-referrer" />
                )}
              </div>

              {/* Grid 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Marca</label>
                  <input type="text" value={editing.brand} onChange={e => updateField('brand', e.target.value.toUpperCase())}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors" placeholder="Ex: HONDA" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Modelo</label>
                  <input type="text" value={editing.model} onChange={e => updateField('model', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors" placeholder="Ex: HR-V LX 1.8" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Ano</label>
                  <input type="text" value={editing.year} onChange={e => updateField('year', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors" placeholder="Ex: 2023" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Quilometragem</label>
                  <input type="text" value={editing.km} onChange={e => updateField('km', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors" placeholder="Ex: 24.564 KM" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Preço</label>
                  <input type="text" value={editing.price} onChange={e => updateField('price', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors" placeholder="Ex: R$ 99.900,00" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Cor</label>
                  <input type="text" value={editing.color} onChange={e => updateField('color', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors" placeholder="Ex: Preto" />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Combustível</label>
                  <select value={editing.fuel} onChange={e => updateField('fuel', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors">
                    <option value="Flex" className="bg-[#0f1d32]">Flex</option>
                    <option value="Gasolina" className="bg-[#0f1d32]">Gasolina</option>
                    <option value="Diesel" className="bg-[#0f1d32]">Diesel</option>
                    <option value="Elétrico" className="bg-[#0f1d32]">Elétrico</option>
                    <option value="Híbrido" className="bg-[#0f1d32]">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Transmissão</label>
                  <select value={editing.transmission} onChange={e => updateField('transmission', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors">
                    <option value="Automático" className="bg-[#0f1d32]">Automático</option>
                    <option value="Manual" className="bg-[#0f1d32]">Manual</option>
                    <option value="CVT" className="bg-[#0f1d32]">CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Categoria</label>
                  <select value={editing.category} onChange={e => updateField('category', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors">
                    <option value="TODOS" className="bg-[#0f1d32]">Todos</option>
                    <option value="BLINDADO" className="bg-[#0f1d32]">Blindado</option>
                    <option value="ELÉTRICO" className="bg-[#0f1d32]">Elétrico</option>
                    <option value="ESPORTIVO" className="bg-[#0f1d32]">Esportivo</option>
                    <option value="FAMÍLIA" className="bg-[#0f1d32]">Família</option>
                    <option value="OFFROAD" className="bg-[#0f1d32]">Offroad</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Descrição</label>
                <textarea
                  value={editing.description}
                  onChange={e => updateField('description', e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors resize-none"
                  placeholder="Descreva o veículo..."
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <button
                  onClick={() => updateField('featured', !editing.featured)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${editing.featured ? 'bg-[#fcbc17]' : 'bg-white/20'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${editing.featured ? 'left-[18px]' : 'left-0.5'}`} />
                </button>
                <div className="flex items-center gap-2">
                  {editing.featured ? <Star className="w-4 h-4 text-[#fcbc17]" /> : <StarOff className="w-4 h-4 text-white/40" />}
                  <span className="text-white text-sm font-medium">{editing.featured ? 'Veículo em destaque na Home' : 'Não está em destaque'}</span>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Galeria de Fotos (URLs)</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#fcbc17] transition-colors"
                    placeholder="Cole a URL da imagem..."
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage(); }}}
                  />
                  <button onClick={addImage} className="px-4 py-2.5 bg-[#fcbc17] text-[#021631] rounded-lg text-sm font-bold hover:bg-[#fcbc17]/90 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {editing.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {editing.images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden">
                        <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all text-sm font-medium">
                  Cancelar
                </button>
                <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-[#fcbc17] text-[#021631] font-bold text-sm hover:bg-[#fcbc17]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#fcbc17]/20">
                  <Save className="w-4 h-4" /> {isNew ? 'Adicionar' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Car(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
