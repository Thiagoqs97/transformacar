import { useState } from 'react';
import { useSiteData, Testimonial } from '../../context/SiteDataContext';
import { Plus, Edit2, Trash2, X, Save, Star } from 'lucide-react';

export default function AdminTestimonials() {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useSiteData();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const openNew = () => { setEditing({ id: 0, name: '', text: '', rating: 5, label: 'Cliente TCAR' }); setIsNew(true); setShowForm(true); };
  const openEdit = (t: Testimonial) => { setEditing({ ...t }); setIsNew(false); setShowForm(true); };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) { const { id: _, ...rest } = editing; addTestimonial(rest); }
    else { updateTestimonial(editing.id, editing); }
    setShowForm(false); setEditing(null);
  };

  const inputCls = "w-full bg-gray-50 border border-[#021631]/15 rounded-lg px-4 py-2.5 text-[#021631] text-sm focus:outline-none focus:border-[#fcbc17] focus:bg-white transition-colors";

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#021631]">Depoimentos</h2>
          <p className="text-[#021631]/50 text-sm">{data.testimonials.length} depoimentos cadastrados</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-[#fcbc17] text-[#021631] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#fcbc17]/90 transition-all shadow-md">
          <Plus className="w-4 h-4" /> Novo Depoimento
        </button>
      </div>

      <div className="space-y-4">
        {data.testimonials.map(t => (
          <div key={t.id} className="bg-white border border-[#021631]/10 rounded-xl p-6 shadow-sm hover:border-[#fcbc17]/40 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-grow min-w-0">
                <div className="flex text-[#fcbc17] mb-3 gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[#021631]/70 italic mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="text-[#021631] font-bold">{t.name}</p>
                  <p className="text-[#fcbc17] text-xs font-medium">{t.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(t)}
                  className="w-8 h-8 rounded-lg bg-gray-50 border border-[#021631]/10 flex items-center justify-center text-[#021631]/40 hover:text-[#fcbc17] hover:border-[#fcbc17]/50 transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setConfirmDelete(t.id)}
                  className="w-8 h-8 rounded-lg bg-gray-50 border border-[#021631]/10 flex items-center justify-center text-[#021631]/40 hover:text-red-500 hover:border-red-300 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirm */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center px-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white border border-[#021631]/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-[#021631] text-lg font-bold mb-2">Excluir depoimento?</h3>
            <p className="text-[#021631]/50 text-sm mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-[#021631]/15 text-[#021631]/60 hover:text-[#021631] hover:border-[#021631]/30 transition-all text-sm font-medium">Cancelar</button>
              <button onClick={() => { deleteTestimonial(confirmDelete); setConfirmDelete(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-bold">Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / New Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center px-4">
          <div className="bg-white border border-[#021631]/10 rounded-2xl p-6 lg:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#021631]">{isNew ? 'Novo Depoimento' : 'Editar Depoimento'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-[#021631]/40 hover:text-[#021631] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[#021631]/50 text-xs font-bold uppercase tracking-wider mb-2">Nome do Cliente</label>
                <input type="text" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}
                  className={inputCls} placeholder="Ex: João S." />
              </div>

              <div>
                <label className="block text-[#021631]/50 text-xs font-bold uppercase tracking-wider mb-2">Depoimento</label>
                <textarea value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} rows={4}
                  className="w-full bg-gray-50 border border-[#021631]/15 rounded-lg px-4 py-2.5 text-[#021631] text-sm focus:outline-none focus:border-[#fcbc17] focus:bg-white transition-colors resize-none"
                  placeholder="Escreva o depoimento..." />
              </div>

              <div>
                <label className="block text-[#021631]/50 text-xs font-bold uppercase tracking-wider mb-2">Etiqueta</label>
                <input type="text" value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })}
                  className={inputCls} placeholder="Ex: Cliente TCAR" />
              </div>

              <div>
                <label className="block text-[#021631]/50 text-xs font-bold uppercase tracking-wider mb-3">Avaliação</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setEditing({ ...editing, rating: star })} className="transition-transform hover:scale-110">
                      <Star className={`w-8 h-8 ${star <= editing.rating ? 'text-[#fcbc17] fill-current' : 'text-[#021631]/20'} transition-colors`} />
                    </button>
                  ))}
                  <span className="text-[#021631]/50 text-sm ml-2">{editing.rating}/5</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#021631]/10">
                <button onClick={() => { setShowForm(false); setEditing(null); }}
                  className="flex-1 py-3 rounded-xl border border-[#021631]/15 text-[#021631]/60 hover:text-[#021631] hover:border-[#021631]/30 transition-all text-sm font-medium">
                  Cancelar
                </button>
                <button onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-[#fcbc17] text-[#021631] font-bold text-sm hover:bg-[#fcbc17]/90 transition-all flex items-center justify-center gap-2 shadow-md">
                  <Save className="w-4 h-4" /> {isNew ? 'Adicionar' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
