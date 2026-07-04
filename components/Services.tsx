import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceArea } from '../types';
import ArticleModal from './ArticleModal';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceArea | null>(null);

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mb-4">Áreas de Atuação</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Clique nos cartões abaixo para ler matérias exclusivas e entender seus direitos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative bg-cream-50 rounded-3xl p-8 md:p-10 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-gold-200"
            >
              <div className="absolute top-8 right-8 bg-white p-3 rounded-full shadow-sm group-hover:bg-gold-500 transition-colors">
                <ArrowUpRight className="text-forest-900 group-hover:text-white" size={20} />
              </div>

              <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="font-serif text-2xl font-bold text-forest-900 mb-3 group-hover:text-gold-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-bold text-forest-800 uppercase tracking-widest mb-3">Temas em destaque:</p>
                {service.articles.map(article => (
                   <div key={article.id} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-forest-800 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></div>
                      {article.title}
                   </div>
                ))}
                <div className="pt-2 text-gold-600 text-sm font-medium underline decoration-transparent group-hover:decoration-gold-600 transition-all">
                   Ler mais sobre esses temas
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ArticleModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService} 
      />
    </section>
  );
};

export default Services;