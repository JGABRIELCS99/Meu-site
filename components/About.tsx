import React from 'react';
import { Scale, MapPin } from 'lucide-react';
import { IMAGES } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-forest-900 text-cream-50 relative overflow-hidden">
      {/* Decorative curves */}
      <div className="absolute top-0 left-0 w-full h-20 bg-white clip-curve-top transform rotate-180"></div>

      <div className="container mx-auto px-6 relative z-10 mt-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 relative order-2 lg:order-1">
            <div className="relative">
              {/* Border Frame */}
              <div className="absolute -inset-4 border-2 border-gold-500 rounded-tl-[80px] rounded-br-[80px]"></div>
              <img 
                src={IMAGES.ABOUT_PORTRAIT} 
                alt="Gabriel Costa Advogado" 
                className="w-full h-[500px] object-cover rounded-tl-[80px] rounded-br-[80px] shadow-2xl transition-all duration-700"
              />
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Sobre <span className="text-gold-500">Gabriel Costa</span>
            </h2>
            <div className="space-y-6 text-cream-100 text-lg leading-relaxed font-light">
              <p>
                Advogado pós-graduando em direito previdenciário, família e sucessões. Valorizo a justiça social e me dedico à defesa do cidadão.
              </p>
              <p>
                Aprovado em dois concursos federais para a justiça do trabalho em 2025. Atuei na Vara Criminal da Comarca de Camamu-BA de 2022 a 2023, bem como em demandas tributárias entre 2023 a 2024.
              </p>
              <p>
                Com uma abordagem moderna e humanizada, o escritório foge do "juridiquês" desnecessário para oferecer um atendimento transparente e acolhedor. Entendemos que por trás de cada processo existe uma história de vida e uma necessidade urgente.
              </p>
              <p>
                Atuo com rigor técnico e estratégia personalizada para cada cliente, seja na garantia de uma aposentadoria justa, na reparação de direitos trabalhistas violados ou em demandas cíveis de família, sucessão ou imobiliária.
              </p>
              
              <div className="pt-8 grid grid-cols-2 gap-6">
                {/* Item 1: Compromisso Ético */}
                <div className="flex flex-col items-center text-center">
                  <Scale className="w-12 h-12 text-gold-500 mb-3" strokeWidth={1.5} />
                  <span className="text-sm uppercase tracking-wider text-cream-100 font-bold">Compromisso Ético</span>
                </div>

                {/* Item 2: Atendimento Online */}
                <div className="flex flex-col items-center text-center">
                  <MapPin className="w-12 h-12 text-gold-500 mb-3" strokeWidth={1.5} />
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-serif text-cream-100 leading-tight mb-1">Atendimento em todo Brasil</span>
                    <span className="text-sm uppercase tracking-wider text-gray-400 font-bold">100% Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;