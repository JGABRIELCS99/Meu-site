import React, { useState } from 'react';
import { FileText, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import { SERVICES, CONTACT_DATA } from '../constants';
import { ARTICLES_DETAILS } from '../articlesDetails';
import ArticlePage from './ArticlePage';

const Services: React.FC = () => {
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const activeService = SERVICES.find(service => service.id === activeAreaId);
  const selectedService = SERVICES.find(service => 
    service.articles.some(a => a.id === selectedArticleId)
  );
  const selectedRichArticle = selectedArticleId ? ARTICLES_DETAILS[selectedArticleId] : null;

  // 1. Render Full Article Detail Page if selected
  if (selectedRichArticle && selectedService) {
    return (
      <ArticlePage
        article={selectedRichArticle}
        onBack={() => {
          setSelectedArticleId(null);
          setTimeout(() => {
            const section = document.getElementById('services');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
        areaIcon={selectedService.icon}
        areaTitle={selectedService.title}
      />
    );
  }

  // Helper to open an area's themes view and scroll smoothly
  const handleOpenAreaThemes = (areaId: string) => {
    setActiveAreaId(areaId);
    setTimeout(() => {
      const section = document.getElementById('services');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // 2. Render Themes Page for a Specific Selected Area
  if (activeService) {
    return (
      <section id="services" className="pt-10 pb-12 md:pt-12 md:pb-14 bg-white relative">
        <div className="container mx-auto px-6">
          
          {/* Back Button & Quick Area Switch Bar */}
          <div className="max-w-5xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <button
              onClick={() => {
                setActiveAreaId(null);
                setTimeout(() => {
                  const section = document.getElementById('services');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 50);
              }}
              className="inline-flex items-center gap-2 text-forest-900 hover:text-gold-600 font-bold text-sm bg-cream-50 hover:bg-gold-50/80 px-4 py-2.5 rounded-xl border border-gold-100/80 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft size={18} />
              Voltar para Áreas de Atuação
            </button>

            {/* Quick Switch Area Tabs */}
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((serv) => (
                <button
                  key={serv.id}
                  onClick={() => handleOpenAreaThemes(serv.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                    serv.id === activeAreaId
                      ? 'bg-forest-900 text-gold-400 border-forest-900 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gold-300 hover:text-forest-900'
                  }`}
                >
                  <span className="scale-75 shrink-0">{serv.icon}</span>
                  {serv.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Area Header Card */}
          <div className="bg-cream-50 rounded-3xl p-8 md:p-10 mb-12 max-w-5xl mx-auto border border-gold-100/50 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between shadow-sm">
            <div className="flex gap-4 md:gap-6 items-start">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-gold-500 shrink-0 border border-gold-100">
                {activeService.icon}
              </div>
              <div>
                <span className="text-gold-600 text-xs font-bold uppercase tracking-wider block mb-1">
                  Temas Relacionados
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-forest-900 mb-2">
                  {activeService.title}
                </h2>
                <p className="text-gray-600 max-w-xl leading-relaxed text-sm md:text-base">
                  {activeService.description}
                </p>
              </div>
            </div>
            
            <a
              href={CONTACT_DATA.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold px-6 py-3.5 rounded-full shrink-0 transition-all shadow-sm flex items-center gap-2 text-sm md:text-base cursor-pointer hover:shadow-md"
            >
              Consultar Especialista
            </a>
          </div>

          {/* Themes Grid for Selected Area */}
          <div className="max-w-5xl mx-auto mb-6">
            <h3 className="font-serif text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
              <BookOpen className="text-gold-500" size={22} />
              Selecione um tema para ler em detalhes:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {activeService.articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="group bg-white rounded-2xl p-6 md:p-8 cursor-pointer border border-gold-100/50 hover:border-gold-400/80 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
                  id={`article-card-${article.id}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-5">
                      <div className="p-2.5 bg-gold-50 rounded-xl text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300 border border-gold-100">
                        <FileText size={20} />
                      </div>
                      <span className="text-xs font-bold text-gold-600 uppercase tracking-wider bg-gold-50 border border-gold-100 px-3 py-1 rounded-md group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500 transition-all">
                        Abrir Matéria
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-forest-900 mb-3 group-hover:text-gold-600 transition-colors leading-snug">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <div className="text-gold-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:underline">
                    Ler artigo completo &rarr;
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    );
  }

  // 3. Render Main View with 1 Card for Each Area
  return (
    <section id="services" className="pt-10 pb-12 md:pt-12 md:pb-14 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-gold-600 text-xs font-bold tracking-widest uppercase bg-gold-50 border border-gold-100 px-4 py-1.5 rounded-full inline-block mb-3">
            Especialidades Jurídicas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mb-4">
            Áreas de Atuação
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Atuação técnica e personalizada para defender seus direitos. Clique em <strong className="text-forest-900 font-semibold">"Ver temas relacionados"</strong> em qualquer área para conferir os assuntos em destaque.
          </p>
        </div>

        {/* 4 Area Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-cream-50/70 hover:bg-cream-50 rounded-3xl p-8 border border-gold-100/80 hover:border-gold-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-gold-500 border border-gold-100 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-bold text-forest-800 bg-white border border-gold-100 px-3 py-1 rounded-full shadow-2xs">
                    {service.articles.length} temas jurídicos
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-forest-900 mb-3 group-hover:text-gold-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-gold-100/50">
                <button
                  onClick={() => handleOpenAreaThemes(service.id)}
                  className="w-full bg-forest-900 hover:bg-forest-800 text-gold-400 border border-forest-900 font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg text-sm group/btn"
                >
                  <BookOpen size={18} className="text-gold-400 group-hover/btn:scale-110 transition-transform" />
                  Ver temas relacionados
                  <ArrowRight size={16} className="ml-auto group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <a
                  href={CONTACT_DATA.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-white hover:bg-gold-50 text-forest-900 hover:text-gold-600 border border-gold-200/80 font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs cursor-pointer"
                >
                  Consultar Especialista
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
