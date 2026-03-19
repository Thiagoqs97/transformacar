import { useState } from 'react';
import { useSiteData, Vehicle } from '../../context/SiteDataContext';
import { Plus, Edit2, Trash2, Search, X, Save, Star, StarOff } from 'lucide-react';

const emptyVehicle: Omit<Vehicle, 'id'> = {
  brand: '', model: '', year: '', km: '', price: '', image: '', images: [],
  category: 'TODOS', fuel: 'Flex', transmission: 'Automático', color: '',
  description: '', featured: false,
};

const inputCls = "w-full bg-gray-50 border border-[#003399]/15 rounded-lg px-4 py-2.5 text-[#003399] text-sm focus:outline-none focus:border-[#E31E24] focus:bg-white transition-colors placeholder-[#003399]/30";
const selectCls = "w-full bg-gray-50 border border-[#003399]/15 rounded-lg px-4 py-2.5 text-[#003399] text-sm focus:outline-none focus:border-[#E31E24] transition-colors";
const labelCls = "block text-[#003399]/50 text-xs font-bold uppercase tracking-wider mb-2";

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

  const openNew = () => { setEditing({ ...emptyVehicle, id: 0 }); setIsNew(true); setShowForm(true); setNewImageUrl(''); };
  const openEdit = (v: Vehicle) => { setEditing({ ...v }); setIsNew(false); setShowForm(true); setNewImageUrl(''); };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) { const { id: _, ...rest } = editing; addVehicle(rest); }
    else { updateVehicle(editing.id, editing); }
    setShowForm(false); setEditing(null);
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
          <h2 className="text-2xl font-bold text-[#003399]">Veículos do Estoque</h2>
          <p className="text-[#003399]/50 text-sm">{data.vehicles.length} veículos cadastrados</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-[#E31E24] text-[#003399] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#E31E24]/90 transition-all shadow-md">
          <Plus className="w-4 h-4" /> Adicionar Veículo
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#003399]/30 absolute left-4 top-1/2 -translate-y-1/2" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por marca ou modelo..."
          className="w-full bg-white border border-[#003399]/15 rounded-xl px-4 py-3 pl-11 text-[#003399] placeholder-[#003399]/30 text-sm focus:outline-none focus:border-[#E31E24] transition-colors shadow-sm" />
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="bg-white border border-[#003399]/10 rounded-xl overflow-hidden hover:border-[#E31E24]/50 hover:shadow-md transition-all group shadow-sm">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img src={v.image} alt={v.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              {v.featured && (
                <span className="absolute top-3 left-3 bg-[#E31E24] text-[#003399] px-2 py-1 rounded-lg text-xs font-bold">⭐ Destaque</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-[#003399]/40 text-xs font-bold uppercase tracking-wider">{v.brand}</p>
              <h3 className="text-[#003399] font-bold truncate">{v.model}</h3>
              <div className="flex items-center gap-2 text-[#003399]/40 text-xs mt-1">
                <span>{v.year}</span>
                <span className="w-1 h-1 bg-[#003399]/20 rounded-full"></span>
                <span>{v.km}</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#003399]/10">
                <span className="text-[#E31E24] font-bold text-sm">{v.price}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(v)}
                    className="w-8 h-8 rounded-lg bg-gray-50 border border-[#003399]/10 flex items-center justify-center text-[#003399]/40 hover:text-[#E31E24] hover:border-[#E31E24]/50 transition-all">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setConfirmDelete(v.id)}
                    className="w-8 h-8 rounded-lg bg-gray-50 border border-[#003399]/10 flex items-center justify-center text-[#003399]/40 hover:text-red-500 hover:border-red-300 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-[#003399]/10">
          <p className="text-[#003399]/40">Nenhum veículo encontrado.</p>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center px-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white border border-[#003399]/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-[#003399] text-lg font-bold mb-2">Confirmar exclusão?</h3>
            <p className="text-[#003399]/50 text-sm mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-[#003399]/15 text-[#003399]/60 hover:text-[#003399] hover:border-[#003399]/30 transition-all text-sm font-medium">Cancelar</button>
              <button onClick={() => { deleteVehicle(confirmDelete); setConfirmDelete(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-bold">Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / New Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-white border border-[#003399]/10 rounded-2xl p-6 lg:p-8 max-w-3xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#003399]">{isNew ? 'Novo Veículo' : 'Editar Veículo'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-[#003399]/40 hover:text-[#003399] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Imagem Principal */}
              <div>
                <label className={labelCls}>Imagem Principal (URL)</label>
                <input type="text" value={editing.image} onChange={e => updateField('image', e.target.value)} className={inputCls} placeholder="https://..." />
                {editing.image && (
                  <img src={editing.image} alt="Preview" className="mt-2 h-32 object-cover rounded-lg border border-[#003399]/10" referrerPolicy="no-referrer" />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'brand', label: 'Marca', placeholder: 'Ex: HONDA' },
                  { key: 'model', label: 'Modelo', placeholder: 'Ex: HR-V LX 1.8' },
                  { key: 'year', label: 'Ano', placeholder: 'Ex: 2023' },
                  { key: 'km', label: 'Quilometragem', placeholder: 'Ex: 24.564 KM' },
                  { key: 'price', label: 'Preço', placeholder: 'Ex: R$ 99.900,00' },
                  { key: 'color', label: 'Cor', placeholder: 'Ex: Preto' },
                ].map(f => (
                  <div key={f.key}>
                    <label className={labelCls}>{f.label}</label>
                    <input type="text" value={editing[f.key as keyof Vehicle] as string}
                      onChange={e => updateField(f.key as keyof Vehicle, f.key === 'brand' ? e.target.value.toUpperCase() : e.target.value)}
                      className={inputCls} placeholder={f.placeholder} />
                  </div>
                ))}

                <div>
                  <label className={labelCls}>Combustível</label>
                  <select value={editing.fuel} onChange={e => updateField('fuel', e.target.value)} className={selectCls}>
                    {['Flex', 'Gasolina', 'Diesel', 'Elétrico', 'Híbrido'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Transmissão</label>
                  <select value={editing.transmission} onChange={e => updateField('transmission', e.target.value)} className={selectCls}>
                    {['Automático', 'Manual', 'CVT'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Categoria</label>
                  <select value={editing.category} onChange={e => updateField('category', e.target.value)} className={selectCls}>
                    {['TODOS', 'BLINDADO', 'ELÉTRICO', 'ESPORTIVO', 'FAMÍLIA', 'OFFROAD'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className={labelCls}>Descrição</label>
                <textarea value={editing.description} onChange={e => updateField('description', e.target.value)} rows={3}
                  className="w-full bg-gray-50 border border-[#003399]/15 rounded-lg px-4 py-2.5 text-[#003399] text-sm focus:outline-none focus:border-[#E31E24] focus:bg-white transition-colors resize-none"
                  placeholder="Descreva o veículo..." />
              </div>

              {/* Destaque toggle */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-[#003399]/10">
                <button onClick={() => updateField('featured', !editing.featured)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${editing.featured ? 'bg-[#E31E24]' : 'bg-[#003399]/20'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${editing.featured ? 'left-[18px]' : 'left-0.5'}`} />
                </button>
                <div className="flex items-center gap-2">
                  {editing.featured ? <Star className="w-4 h-4 text-[#E31E24]" /> : <StarOff className="w-4 h-4 text-[#003399]/30" />}
                  <span className="text-[#003399] text-sm font-medium">{editing.featured ? 'Veículo em destaque na Home' : 'Não está em destaque'}</span>
                </div>
              </div>

              {/* Galeria */}
              <div>
                <label className={labelCls}>Galeria de Fotos (URLs)</label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)}
                    className={inputCls} placeholder="Cole a URL da imagem..."
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage(); }}} />
                  <button onClick={addImage} className="px-4 py-2.5 bg-[#E31E24] text-[#003399] rounded-lg text-sm font-bold hover:bg-[#E31E24]/90 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {editing.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {editing.images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-[#003399]/10">
                        <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-3 pt-4 border-t border-[#003399]/10">
                <button onClick={() => { setShowForm(false); setEditing(null); }}
                  className="flex-1 py-3 rounded-xl border border-[#003399]/15 text-[#003399]/60 hover:text-[#003399] hover:border-[#003399]/30 transition-all text-sm font-medium">
                  Cancelar
                </button>
                <button onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-[#E31E24] text-[#003399] font-bold text-sm hover:bg-[#E31E24]/90 transition-all flex items-center justify-center gap-2 shadow-md">
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
