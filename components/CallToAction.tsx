import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-forest-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
             <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-gold-500 blur-3xl"></div>
             <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-gold-500 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream-50 mb-6">
              Ainda tem dúvidas sobre o seu caso?
            </h2>
            <p className="text-cream-100 text-lg md:text-xl mb-10 font-light leading-relaxed">
              Não deixe seus direitos para depois. Uma análise rápida e especializada pode mudar o rumo da sua situação.
            </p>
            
            <a 
              href={CONTACT_DATA.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-gold-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-gold-600 transition-all transform hover:-translate-y-1 shadow-lg group"
            >
              Fale Comigo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;