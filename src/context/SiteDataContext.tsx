import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ==================== TYPES ====================
export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: string;
  km: string;
  price: string;
  image: string;
  images: string[];
  category: string;
  fuel: string;
  transmission: string;
  color: string;
  description: string;
  featured: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  label: string;
}

export interface SiteSettings {
  heroImage: string;
  logoUrl: string;
  featuredVehicleImage: string;
  featuredVehicleTitle: string;
  featuredVehicleDescription: string;
  statsVehiclesInStock: string;
  statsYearsExperience: string;
  statsGoogleRating: string;
  statsSatisfiedClients: string;
  statsAvailableVehicles: string;
  statsCarsSold: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  instagramFollowers: string;
  instagramUrl: string;
  youtubeSubscribers: string;
  youtubeUrl: string;
  facebookFollowers: string;
  facebookUrl: string;
  googleReviewCount: string;
  googleReviewRating: string;
  googleReviewsUrl: string;
}

export interface SiteData {
  vehicles: Vehicle[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}

// ==================== DEFAULT DATA ====================
const defaultVehicles: Vehicle[] = [
  {
    id: 1, brand: 'CHEVROLET', model: 'CORSA GSI 16V', year: '1995', km: '46.000 KM',
    price: 'R$ 65.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/0ed7f437aace493a9daedcc5b868da4e_1770045026050.jpg',
    images: [], category: 'TODOS', fuel: 'Gasolina', transmission: 'Manual', color: 'Preto',
    description: 'Veículo em excelente estado de conservação.', featured: true
  },
  {
    id: 2, brand: 'VOLKSWAGEN', model: 'T-CROSS HIG. 250 TSI', year: '2023', km: '24.564 KM',
    price: 'R$ 127.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/089c53d8c1cc4d7b970478df608bcaba_1753452047812.jpg',
    images: [], category: 'TODOS', fuel: 'Flex', transmission: 'Automático', color: 'Branco',
    description: 'SUV compacto com baixa quilometragem.', featured: true
  },
  {
    id: 3, brand: 'HONDA', model: 'HR-V LX 1.8', year: '2019', km: '54.265 KM',
    price: 'R$ 99.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/063c99bd215e43bc9dc69577360acc8d_1756126218623.jpg',
    images: [], category: 'TODOS', fuel: 'Flex', transmission: 'CVT', color: 'Prata',
    description: 'Honda HR-V econômico e espaçoso.', featured: true
  },
  {
    id: 4, brand: 'FIAT', model: 'STRADA RANCH T200AT', year: '2024', km: '18.000 KM',
    price: 'R$ 155.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/ca2fc71582f0446d8a6e8343526d6d35_1755030956030.jpeg',
    images: [], category: 'TODOS', fuel: 'Flex', transmission: 'Automático', color: 'Cinza',
    description: 'Pickup moderna com pouca quilometragem.', featured: true
  },
  {
    id: 5, brand: 'TOYOTA', model: 'HILUX CD SRX 4X4 2.8 TDI', year: '2023', km: '60.691 KM',
    price: 'R$ 272.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/c9eb7fb1354d405a8462967f2c7fbd5b_1767881808226.jpg',
    images: [], category: 'OFFROAD', fuel: 'Diesel', transmission: 'Automático', color: 'Branco',
    description: 'Hilux SRX top de linha.', featured: false
  },
  {
    id: 6, brand: 'CHEVROLET', model: 'S-10 PICK-UP LTZ 2.8 TDI', year: '2022', km: '59.232 KM',
    price: 'R$ 179.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/48dcb8141bf64c4eae474829f4bde68c_1770036391425.jpg',
    images: [], category: 'OFFROAD', fuel: 'Diesel', transmission: 'Automático', color: 'Cinza',
    description: 'S-10 LTZ completa.', featured: false
  },
  {
    id: 7, brand: 'NISSAN', model: 'KICKS ACTIVE S 1.6', year: '2021', km: '52.272 KM',
    price: 'R$ 89.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/088b19c31f3f4fdfba3185f1387634c1_1770210215368.jpg',
    images: [], category: 'TODOS', fuel: 'Flex', transmission: 'CVT', color: 'Vermelho',
    description: 'Nissan Kicks econômico e moderno.', featured: false
  },
  {
    id: 8, brand: 'HYUNDAI', model: 'CRETA PRESTIGE 2.0', year: '2021', km: '77.050 KM',
    price: 'R$ 105.900,00',
    image: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/51dbe57ecbb845b295ae0fed650b469f_1773145841913.jpg',
    images: [], category: 'TODOS', fuel: 'Flex', transmission: 'Automático', color: 'Preto',
    description: 'Creta Prestige completo.', featured: false
  },
];

const defaultTestimonials: Testimonial[] = [
  { id: 1, name: 'Lucas R.', text: 'Top! Confiança total no trabalho da equipe. Atendimento nota 10 do começo ao fim. Sempre à disposição quando precisei.', rating: 5, label: 'Cliente TCAR' },
  { id: 2, name: 'Claudemir S.', text: 'Experiência excelente! Equipe muito profissional e atenciosa. Com certeza volto para fechar meu próximo carro.', rating: 5, label: 'Cliente TCAR' },
  { id: 3, name: 'M. A.', text: 'Fico com muita certeza de encontrar o carro dos sonhos por um preço e segurança nunca sonhados. Recomendo demais!', rating: 5, label: 'Cliente TCAR' },
];

const defaultSettings: SiteSettings = {
  heroImage: 'https://zngosfnoajpqzxrgwrtw.supabase.co/storage/v1/object/public/Catalogo/1580846b6906f6259148.jpg',
  logoUrl: 'https://zngosfnoajpqzxrgwrtw.supabase.co/storage/v1/object/public/Catalogo/Captura-de-tela-2025-02-10-172638-1-Photoroom.jpg',
  featuredVehicleImage: 'https://s3.amazonaws.com/altimus2.arquivos.prod/0a00ec6f-b26d-4aa0-ad12-6603691e6d00/fotos/veiculo/07283ed81f1448b1aeb6e48a9060e439_1754418270271.jpg',
  featuredVehicleTitle: 'Conheça Nosso Showroom',
  featuredVehicleDescription: 'Visite a loja mais famosa do Brasil e conheça de perto os veículos mais exclusivos do mercado. Nossa equipe de especialistas está pronta para ajudá-lo a encontrar o carro perfeito.',
  statsVehiclesInStock: '100+',
  statsYearsExperience: '10+',
  statsGoogleRating: '4.8',
  statsSatisfiedClients: '2000+',
  statsAvailableVehicles: '150+',
  statsCarsSold: '1000+',
  phone1: '(86) 98162-0102',
  phone2: '(86) 98181-0103',
  email: 'contato@transformacarautos.com.br',
  address: 'Avenida Governador Gayoso e Almendra, 604 - São Cristóvão',
  city: 'Teresina - PI',
  googleMapsUrl: 'https://maps.app.goo.gl/QeQc2e6Z1vXy4Y7M8',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15896.724514417714!2d-42.7945026!3d-5.0743731!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x78e3b00325052f3%3A0x5bc5ffec2eb1e7ae!2sTransformacar%20Autos%20%7C%20Venda%20de%20ve%C3%ADculos%20em%20Teresina!5e0!3m2!1spt-BR!2sbr!4v1743602048165!5m2!1spt-BR!2sbr',
  instagramFollowers: '150k seguidores',
  instagramUrl: '#',
  youtubeSubscribers: '85k inscritos',
  youtubeUrl: '#',
  facebookFollowers: '120k seguidores',
  facebookUrl: '#',
  googleReviewCount: '833+',
  googleReviewRating: '4.8',
  googleReviewsUrl: '#',
};

// ==================== CONTEXT ====================
interface SiteDataContextType {
  data: SiteData;
  // Vehicles
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: number, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: number) => void;
  // Testimonials
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: number, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: number) => void;
  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void;
  // Auth
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

const STORAGE_KEY = 'transformacar_site_data';
const AUTH_KEY = 'transformacar_auth';
const ADMIN_PASSWORD = 'admin123';

function loadData(): SiteData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch { /* ignore */ }
  return {
    vehicles: defaultVehicles,
    testimonials: defaultTestimonials,
    settings: defaultSettings,
  };
}

function saveData(data: SiteData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(loadData);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  useEffect(() => {
    saveData(data);
  }, [data]);

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    setData(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, { ...vehicle, id: Date.now() }]
    }));
  };

  const updateVehicle = (id: number, updates: Partial<Vehicle>) => {
    setData(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(v => v.id === id ? { ...v, ...updates } : v)
    }));
  };

  const deleteVehicle = (id: number) => {
    setData(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter(v => v.id !== id)
    }));
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    setData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { ...testimonial, id: Date.now() }]
    }));
  };

  const updateTestimonial = (id: number, updates: Partial<Testimonial>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  };

  const deleteTestimonial = (id: number) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }));
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  return (
    <SiteDataContext.Provider value={{
      data, addVehicle, updateVehicle, deleteVehicle,
      addTestimonial, updateTestimonial, deleteTestimonial,
      updateSettings, isAuthenticated, login, logout
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}
