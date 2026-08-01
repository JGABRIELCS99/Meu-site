import React, { useState } from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';
import { SERVICES, CONTACT_DATA } from '../constants';
import { ARTICLES_DETAILS } from '../articlesDetails';
import ArticlePage from './ArticlePage';

const Services: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedService = SERVICES.find(service => 
    service.articles.some(a => a.id === selectedArticleId)
  );
  const selectedRichArticle = selectedArticleId ? ARTICLES_DETAILS[selectedArticleId] : null;

  // If a specific article is clicked, render the gorgeous full-screen detail view
  if (selectedRichArticle && selectedService) {
    return (
      <ArticlePage
        article={selectedRichArticle}
        onBack={() => {
          setSelectedArticleId(null);
          // Scroll back to the services section when coming back
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

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mb-4">Áreas de Atuação</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira abaixo todos os temas em destaque de nossas áreas de atuação e clique para obter informações úteis e detalhadas sobre cada direito.
          </p>
        </div>

        {/* All Areas and Themes Grid one below the other */}
        <div className="space-y-16">
          {SERVICES.map((service) => (
            <div key={service.id} className="space-y-8">
              {/* Area Summary Header Card */}
              <div className="bg-cream-50 rounded-3xl p-8 md:p-10 max-w-5xl mx-auto border border-gold-100/50 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between shadow-sm">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-gold-500 shrink-0 border border-gold-100">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 max-w-xl leading-relaxed text-sm md:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <a
                  href={CONTACT_DATA.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gold-500 hover:bg-gold-600 text-white font-bold px-6 py-3 rounded-full shrink-0 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base cursor-pointer hover:shadow-md"
                >
                  Consultar Especialista
                </a>
              </div>

              {/* Themes Grid for this Area */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {service.articles.map((article) => (
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
          ))}
        </div>


      </div>
    </section>
  );
};

export default Services;
