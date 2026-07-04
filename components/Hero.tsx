import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { CONTACT_DATA, IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 bg-cream-50">
      {/* Decorative Background Wrapper - Handles overflow for the clip-path so the main section doesn't clip the card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Decorative Background Element */}
         <div className="absolute top-0 mt-24 right-0 w-1/2 h-[calc(100%-6rem)] bg-gradient-to-bl from-forest-900 to-forest-800 clip-curve hidden lg:block" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Text Content - Added max-width and padding to prevent overlap with green background */}
          <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0 lg:max-w-2xl lg:pr-8">
            <div className="inline-block mb-4 px-3 py-1 border border-gold-500 rounded-full">
              <span className="text-gold-600 text-xs font-bold tracking-widest uppercase">Advocacia Especializada</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-forest-900 leading-tight mb-6 uppercase">
              Direito <span className="text-gold-500">Trabalhista</span>, <br />
              Previdenciário e Cível
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Atuação especializada para garantir o que é seu por direito.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href={CONTACT_DATA.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group bg-forest-900 text-white px-8 py-4 rounded-tl-3xl rounded-br-3xl hover:bg-forest-800 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                Fale Comigo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative flex justify-center mb-10 lg:mb-0">
             <div className="relative w-72 h-96 md:w-96 md:h-[500px] lg:w-[450px] lg:h-[600px]">
                {/* Background Shape behind image */}
                <div className="absolute inset-0 bg-gold-500/20 rounded-tl-[100px] rounded-br-[100px] transform translate-x-4 translate-y-4"></div>
                
                {/* Main Image */}
                <img 
                  src={IMAGES.HERO_PORTRAIT} 
                  alt="Dr. Gabriel Costa" 
                  className="w-full h-full object-cover rounded-tl-[100px] rounded-br-[100px] shadow-2xl relative z-10"
                />
                
                {/* Floating Card Badge - Z-index higher to stay on top of next section */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-30 max-w-[240px] border-l-4 border-gold-500">
                  <p className="text-forest-900 font-serif font-bold text-lg">Gabriel Costa</p>
                  <div className="mt-1 flex flex-col items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">OAB/BA 88.548</span>
                    <a 
                      href="https://cna.oab.org.br/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[10px] text-gold-600 hover:text-gold-500 underline mt-1"
                    >
                      Consultar no CNA <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;