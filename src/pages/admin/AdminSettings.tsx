import { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Save, Check } from 'lucide-react';

export default function AdminSettings() {
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

  const inputCls = "w-full bg-gray-50 border border-[#021631]/15 rounded-lg px-4 py-2.5 text-[#021631] text-sm focus:outline-none focus:border-[#fcbc17] focus:bg-white transition-colors";
  const labelCls = "block text-[#021631]/50 text-xs font-bold uppercase tracking-wider mb-2";

  const sections = [
    {
      title: 'Estatísticas da Barra (Home)',
      description: 'Números exibidos na barra amarela abaixo do hero.',
      fields: [
        { key: 'statsVehiclesInStock' as const, label: 'Veículos em Estoque', placeholder: '100+' },
        { key: 'statsYearsExperience' as const, label: 'Anos de Experiência', placeholder: '10+' },
        { key: 'statsGoogleRating' as const, label: 'Avaliação Google', placeholder: '4.8' },
        { key: 'statsSatisfiedClients' as const, label: 'Clientes Satisfeitos', placeholder: '2000+' },
      ]
    },
    {
      title: 'Seção Veículo em Destaque',
      description: 'Textos exibidos na seção de destaque da Home.',
      fields: [
        { key: 'featuredVehicleTitle' as const, label: 'Título', placeholder: 'Conheça Nosso Showroom' },
        { key: 'featuredVehicleDescription' as const, label: 'Descrição', placeholder: 'Texto descritivo...', textarea: true },
        { key: 'statsAvailableVehicles' as const, label: 'Veículos Disponíveis', placeholder: '150+' },
        { key: 'statsCarsSold' as const, label: 'Carros Vendidos', placeholder: '1000+' },
      ]
    },
    {
      title: 'Informações de Contato',
      description: 'Dados de contato exibidos no site e no rodapé.',
      fields: [
        { key: 'phone1' as const, label: 'Telefone Principal', placeholder: '(86) 98162-0102' },
        { key: 'phone2' as const, label: 'WhatsApp', placeholder: '(86) 98181-0103' },
        { key: 'email' as const, label: 'E-mail', placeholder: 'contato@email.com' },
        { key: 'address' as const, label: 'Endereço', placeholder: 'Rua...' },
        { key: 'city' as const, label: 'Cidade', placeholder: 'Teresina - PI' },
      ]
    },
    {
      title: 'Google Maps',
      description: 'Links e embed do Google Maps.',
      fields: [
        { key: 'googleMapsUrl' as const, label: 'Link do Google Maps', placeholder: 'https://maps.app.goo.gl/...' },
        { key: 'googleMapsEmbed' as const, label: 'URL do Embed (iframe)', placeholder: 'https://www.google.com/maps/embed?...' },
      ]
    },
    {
      title: 'Redes Sociais',
      description: 'Links e contadores das redes sociais no footer.',
      fields: [
        { key: 'instagramUrl' as const, label: 'URL Instagram', placeholder: 'https://instagram.com/...' },
        { key: 'instagramFollowers' as const, label: 'Seguidores Instagram', placeholder: '150k seguidores' },
        { key: 'youtubeUrl' as const, label: 'URL YouTube', placeholder: 'https://youtube.com/...' },
        { key: 'youtubeSubscribers' as const, label: 'Inscritos YouTube', placeholder: '85k inscritos' },
        { key: 'facebookUrl' as const, label: 'URL Facebook', placeholder: 'https://facebook.com/...' },
        { key: 'facebookFollowers' as const, label: 'Seguidores Facebook', placeholder: '120k seguidores' },
      ]
    },
    {
      title: 'Avaliações Google',
      description: 'Informações sobre as avaliações no Google.',
      fields: [
        { key: 'googleReviewRating' as const, label: 'Nota', placeholder: '4.8' },
        { key: 'googleReviewCount' as const, label: 'Nº de Avaliações', placeholder: '833+' },
        { key: 'googleReviewsUrl' as const, label: 'Link das Avaliações', placeholder: 'https://...' },
      ]
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#021631]">Configurações do Site</h2>
          <p className="text-[#021631]/50 text-sm">Edite textos, estatísticas, contato e redes sociais.</p>
        </div>
        <button onClick={handleSave} disabled={saved}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
            saved ? 'bg-green-500 text-white' : 'bg-[#fcbc17] text-[#021631] hover:bg-[#fcbc17]/90'
          }`}>
          {saved ? <><Check className="w-4 h-4" /> Salvo!</> : <><Save className="w-4 h-4" /> Salvar Alterações</>}
        </button>
      </div>

      {sections.map((section, idx) => (
        <div key={idx} className="bg-white border border-[#021631]/10 rounded-xl p-6 shadow-sm hover:border-[#fcbc17]/40 transition-colors">
          <h3 className="text-[#021631] font-bold text-lg mb-1">{section.title}</h3>
          <p className="text-[#021631]/40 text-sm mb-6">{section.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.fields.map(field => (
              <div key={field.key} className={'textarea' in field && field.textarea ? 'sm:col-span-2' : ''}>
                <label className={labelCls}>{field.label}</label>
                {'textarea' in field && field.textarea ? (
                  <textarea value={settings[field.key]} onChange={e => update(field.key, e.target.value)} rows={3}
                    className="w-full bg-gray-50 border border-[#021631]/15 rounded-lg px-4 py-2.5 text-[#021631] text-sm focus:outline-none focus:border-[#fcbc17] focus:bg-white transition-colors resize-none"
                    placeholder={field.placeholder} />
                ) : (
                  <input type="text" value={settings[field.key]} onChange={e => update(field.key, e.target.value)}
                    className={inputCls} placeholder={field.placeholder} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
