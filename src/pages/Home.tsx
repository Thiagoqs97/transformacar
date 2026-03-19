import { Play, ChevronRight, ChevronLeft, Star, Shield, CheckCircle, Clock, Trophy, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';

export default function Home() {
  const { data } = useSiteData();
  const { settings, testimonials } = data;
  const featuredVehicles = data.vehicles.filter(v => v.featured).slice(0, 4);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        <img
          src={settings.heroImage}
          alt="Transformacar Autos Showroom"
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* STATS BAR */}
      <section className="bg-[#fcbc17] py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="flex flex-col items-center justify-center py-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#021631] mb-1">{settings.statsVehiclesInStock}</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#021631]/70 uppercase tracking-widest">Veículos em Estoque</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#021631] mb-1">{settings.statsYearsExperience}</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#021631]/70 uppercase tracking-widest">Anos de Experiência</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2 border-t border-[#021631]/10 md:border-0 col-span-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#021631] mb-1">{settings.statsGoogleRating}</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#021631]/70 uppercase tracking-widest">Avaliação Google</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2 border-t border-[#021631]/10 md:border-0 col-span-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#021631] mb-1">{settings.statsSatisfiedClients}</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#021631]/70 uppercase tracking-widest">Clientes Satisfeitos</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VEHICLE */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[#fcbc17] text-xs font-bold tracking-widest uppercase mb-2 block">Em Destaque</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">Veículo em Destaque</h2>
            <p className="text-[#021631]/70 mt-4 text-sm sm:text-base">Conheça de perto os veículos mais exclusivos do nosso showroom</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video Player Mockup */}
            <div className="relative aspect-video bg-gray-100 rounded-sm overflow-hidden group cursor-pointer">
              <img
                src={settings.featuredVehicleImage}
                alt="Destaque"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#fcbc17] rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#021631] fill-[#010e20]" />
                </div>
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                <span className="text-[#fcbc17] text-xs font-bold tracking-widest uppercase">Clique para ver</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <span className="inline-block px-3 py-1 border border-[#fcbc17] text-[#fcbc17] text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6">Exclusivo</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">{settings.featuredVehicleTitle}</h3>
                <p className="text-[#021631]/70 leading-relaxed text-sm sm:text-base">
                  {settings.featuredVehicleDescription}
                </p>
              </div>

              <div className="flex gap-8 sm:gap-12 py-4 sm:py-6 border-y border-[#021631]/10">
                <div>
                  <span className="block text-2xl sm:text-3xl font-bold text-[#021631] mb-1">{settings.statsAvailableVehicles}</span>
                  <span className="text-xs font-bold text-[#fcbc17] uppercase tracking-widest">Veículos Disponíveis</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-bold text-[#021631] mb-1">{settings.statsCarsSold}</span>
                  <span className="text-xs font-bold text-[#fcbc17] uppercase tracking-widest">Carros Vendidos</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="#" className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-[#fcbc17] text-[#fcbc17] hover:bg-[#fcbc17] hover:text-[#021631] transition-all font-semibold tracking-wider uppercase text-sm text-center">
                  Tenho Interesse
                </a>
                <Link to="/estoque" className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-[#021631]/30 text-[#021631] hover:border-[#021631] transition-all font-semibold tracking-wider uppercase text-sm text-center flex items-center justify-center gap-2">
                  Ver Estoque <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <section className="py-14 sm:py-20 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <span className="text-[#fcbc17] text-xs font-bold tracking-widest uppercase mb-2 block">Nosso Estoque</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">Veículos em Destaque</h2>
              <p className="text-[#021631]/70 mt-3 sm:mt-4 text-sm sm:text-base">Conheça alguns dos veículos disponíveis na loja mais famosa do Brasil</p>
            </div>
            <div className="flex gap-3 sm:gap-4 shrink-0">
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#021631]/20 flex items-center justify-center hover:border-[#fcbc17] hover:text-[#fcbc17] transition-colors">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#021631]/20 flex items-center justify-center hover:border-[#fcbc17] hover:text-[#fcbc17] transition-colors">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredVehicles.map((vehicle, idx) => (
              <div key={vehicle.id} className={`group bg-white border border-[#021631]/10 shadow-sm hover:border-[#fcbc17]/50 transition-colors ${idx >= 3 ? 'hidden lg:block' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h4 className="text-sm text-[#021631]/60 mb-1">{vehicle.brand}</h4>
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 truncate">{vehicle.model}</h3>
                  <div className="flex items-end justify-between">
                    <span className="text-lg sm:text-xl font-bold text-[#fcbc17]">{vehicle.price}</span>
                    <a href="#" className="text-xs text-[#021631]/60 hover:text-[#021631] transition-colors flex items-center gap-1">
                      Ver detalhes <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link to="/estoque" className="inline-flex items-center gap-2 text-[#fcbc17] hover:text-[#021631] transition-colors font-bold uppercase tracking-widest text-sm border-b border-[#fcbc17] pb-1">
              Ver Todo o Estoque <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-12 sm:py-16 bg-white border-y border-[#021631]/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gray-50 p-5 sm:p-8 flex flex-col items-center text-center group hover:bg-gray-100 transition-colors">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-[#fcbc17] mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">Venda seu veículo</h3>
              <p className="text-xs sm:text-sm text-[#021631]/70 hidden sm:block">Recebemos seu carro na troca ou pagamos à vista</p>
            </div>
            <div className="bg-gray-50 p-5 sm:p-8 flex flex-col items-center text-center group hover:bg-gray-100 transition-colors">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#fcbc17] mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">Faça uma simulação</h3>
              <p className="text-xs sm:text-sm text-[#021631]/70 hidden sm:block">Financiamos através dos melhores bancos e mais dividimos no cartão de crédito em até 24X</p>
            </div>
            <div className="bg-gray-50 p-5 sm:p-8 flex flex-col items-center text-center group hover:bg-gray-100 transition-colors">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#fcbc17] mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">Estoque Variado</h3>
              <p className="text-xs sm:text-sm text-[#021631]/70 hidden sm:block">Diversas marcas e modelos para você escolher</p>
            </div>
            <div className="bg-gray-50 p-5 sm:p-8 flex flex-col items-center text-center group hover:bg-gray-100 transition-colors">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#fcbc17] mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">Tradição e Confiança</h3>
              <p className="text-xs sm:text-sm text-[#021631]/70 hidden sm:block">Referência em veículos em Teresina</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-14 sm:py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[#fcbc17] text-xs font-bold tracking-widest uppercase mb-2 block">Depoimentos</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <div className="flex items-center justify-center gap-2 text-[#021631]/70 text-xs sm:text-sm">
              <div className="flex text-[#fcbc17]">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span>{settings.googleReviewRating} de 5 • {settings.googleReviewCount} avaliações no Google</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.slice(0, 3).map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 sm:p-8 border border-[#021631]/10 shadow-sm">
                <div className="flex text-[#fcbc17] mb-4 sm:mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[#021631]/80 mb-6 sm:mb-8 italic leading-relaxed text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-[#021631]">{testimonial.name}</p>
                  <p className="text-xs text-[#fcbc17]">{testimonial.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <a href={settings.googleReviewsUrl} className="inline-flex items-center gap-2 text-[#021631]/60 hover:text-[#021631] transition-colors text-xs sm:text-sm border-b border-[#021631]/30 hover:border-[#021631] pb-1">
              Ver todas as avaliações no Google Maps <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* MAP & LOCATION SECTION */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-[#fcbc17] text-xs font-bold tracking-widest uppercase mb-2 block">Localização</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">Visite Nossa Loja</h2>
              <p className="text-[#021631]/70 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
                Venha conhecer pessoalmente a melhor revenda de veículos do Piauí. Estamos localizados em São Cristóvão, Teresina.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#fcbc17]" />
                  </div>
                  <div>
                    <h4 className="text-[#021631] font-bold mb-1">Endereço</h4>
                    <p className="text-[#021631]/70 text-sm sm:text-base">{settings.address}<br />{settings.city}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#fcbc17]" />
                  </div>
                  <div>
                    <h4 className="text-[#021631] font-bold mb-1">Telefone</h4>
                    <p className="text-[#021631]/70 text-sm sm:text-base">{settings.phone1}<br />WhatsApp: {settings.phone2}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#fcbc17]" />
                  </div>
                  <div>
                    <h4 className="text-[#021631] font-bold mb-1">E-mail</h4>
                    <p className="text-[#021631]/70 text-sm sm:text-base break-all">{settings.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <a href={settings.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#fcbc17] hover:text-[#021631] transition-colors font-bold uppercase tracking-widest text-sm border-b border-[#fcbc17] pb-1">
                  Abrir no Google Maps <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 sm:h-80 lg:h-[500px] bg-gray-100 rounded-sm relative overflow-hidden border border-[#021631]/10 mt-4 lg:mt-0">
              <iframe
                src={settings.googleMapsEmbed}
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Transformacar Autos"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
