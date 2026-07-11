import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

const CoverageArea: React.FC = () => {
  const cities = [
    'Camamu',
    'Ituberá',
    'Barra Grande',
    'Maraú',
    'Itacaré',
    'Travessão',
    'Taperoá',
    'Taipu de Fora'
  ];

  return (
    <section id="coverage" className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-forest-900/5 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-600 text-xs font-bold tracking-widest uppercase bg-gold-50 border border-gold-200 px-4 py-1.5 rounded-full">
            Região de Atuação
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-4 mb-4">
            Onde Atendo
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Oferecemos suporte jurídico de alta performance com a agilidade que você merece. Realizamos atendimento presencial em nosso escritório físico e atendimento online por videochamadas e WhatsApp para todo o Brasil.
          </p>
        </div>

        {/* Natural SEO-optimized phrase box */}
        <div className="max-w-4xl mx-auto bg-white border border-gold-100 rounded-3xl p-8 md:p-10 shadow-sm text-center mb-12">
          <p className="text-forest-900 text-lg md:text-xl font-medium leading-relaxed font-sans">
            "Atendimento presencial e online em <strong className="text-gold-600 font-semibold">Camamu</strong>, <strong className="text-gold-600 font-semibold">Ituberá</strong>, <strong className="text-gold-600 font-semibold">Barra Grande</strong>, <strong className="text-gold-600 font-semibold">Maraú</strong>, <strong className="text-gold-600 font-semibold">Itacaré</strong>, <strong className="text-gold-600 font-semibold">Travessão</strong>, <strong className="text-gold-600 font-semibold">Taperoá</strong>, <strong className="text-gold-600 font-semibold">Taipu de Fora</strong> e toda a região do <strong className="text-gold-600 font-semibold">Baixo Sul da Bahia</strong>."
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><CheckCircle className="text-gold-500 w-4.5 h-4.5" /> Advocacia Digital</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="text-gold-500 w-4.5 h-4.5" /> Segurança Jurídica</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="text-gold-500 w-4.5 h-4.5" /> Atendimento Humanizado</span>
          </div>
        </div>

        {/* Bento Grid of Cities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {cities.map((city, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gold-100/40 rounded-2xl p-5 hover:border-gold-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center gap-3"
              id={`coverage-city-${city.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="p-2 bg-gold-50 rounded-xl text-gold-600 border border-gold-100 shrink-0">
                <MapPin size={18} />
              </div>
              <h3 className="font-serif text-base md:text-lg font-bold text-forest-900">{city}</h3>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">Precisa de atendimento em alguma destas localidades do Baixo Sul da Bahia?</p>
          <a
            href={CONTACT_DATA.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-gold-400 hover:text-gold-300 font-bold px-8 py-3.5 rounded-tl-2xl rounded-br-2xl transition-all shadow-md text-xs md:text-sm uppercase tracking-wider"
            id="coverage-cta-btn"
          >
            Fale com o Dr. Gabriel Costa via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoverageArea;
