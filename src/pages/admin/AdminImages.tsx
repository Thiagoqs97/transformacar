import { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Save, RefreshCw, Check } from 'lucide-react';

export default function AdminImages() {
  const { data, updateSettings } = useSiteData();
  const [settings, setSettings] = useState(data.settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const imageFields = [
    {
      key: 'heroImage' as const,
      label: 'Hero Banner (Topo da Home)',
      description: 'Imagem principal do topo do site. Recomendado: 1920x900px',
      default: 'https://zngosfnoajpqzxrgwrtw.supabase.co/storage/v1/object/public/Catalogo/1580846b6906f6259148.jpg',
    },
    {
      key: 'logoUrl' as const,
      label: 'Logo do Site',
      description: 'Logo exibida no header e footer. Recomendado: PNG com fundo transparente',
      default: 'https://zngosfnoajpqzxrgwrtw.supabase.co/storage/v1/object/public/Catalogo/Captura-de-tela-2025-02-10-172638-1-Photoroom.jpg',
    },
    {
      key: 'featuredVehicleImage' as const,
      label: 'Imagem do Veículo em Destaque',
      description: 'Imagem exibida na seção "Veículo em Destaque" da Home',
      default: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/07283ed81f1448b1aeb6e48a9060e439_1754418270271.jpg',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#021631]">Imagens do Site</h2>
          <p className="text-[#021631]/50 text-sm">Altere as imagens principais exibidas no site.</p>
        </div>
        <button onClick={handleSave} disabled={saved}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
            saved ? 'bg-green-500 text-white' : 'bg-[#fcbc17] text-[#021631] hover:bg-[#fcbc17]/90'
          }`}>
          {saved ? <><Check className="w-4 h-4" /> Salvo!</> : <><Save className="w-4 h-4" /> Salvar Alterações</>}
        </button>
      </div>

      <div className="space-y-5">
        {imageFields.map(field => (
          <div key={field.key} className="bg-white border border-[#021631]/10 rounded-xl p-6 shadow-sm hover:border-[#fcbc17]/40 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[#021631] font-bold">{field.label}</h3>
                <p className="text-[#021631]/40 text-sm mt-1">{field.description}</p>
              </div>
              <button onClick={() => update(field.key, field.default)}
                className="flex items-center gap-1 text-[#021631]/30 hover:text-[#021631]/60 text-xs font-medium transition-colors">
                <RefreshCw className="w-3 h-3" /> Padrão
              </button>
            </div>

            <input type="text" value={settings[field.key]} onChange={(e) => update(field.key, e.target.value)}
              className="w-full bg-gray-50 border border-[#021631]/15 rounded-lg px-4 py-2.5 text-[#021631] text-sm focus:outline-none focus:border-[#fcbc17] focus:bg-white transition-colors mb-4"
              placeholder="https://..." />

            {settings[field.key] && (
              <div className="rounded-lg overflow-hidden border border-[#021631]/10">
                <img src={settings[field.key]} alt={field.label}
                  className={`w-full object-cover ${field.key === 'logoUrl' ? 'h-24 object-contain bg-gray-50 p-4' : 'h-48'}`}
                  referrerPolicy="no-referrer" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
