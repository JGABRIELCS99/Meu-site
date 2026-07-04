import React from 'react';
import { X, FileText } from 'lucide-react';
import { ServiceArea, Article } from '../types';
import { CONTACT_DATA } from '../constants';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceArea | null;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-forest-900/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative bg-cream-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="sticky top-0 bg-cream-50 z-10 p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-100 rounded-lg text-gold-600">
              {service.icon}
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest-900">{service.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid gap-6">
            {service.articles.map((article: Article) => {
              const message = `Olá Dr, gostaria de saber mais sobre ${article.title}, poderia me ajudar?`;
              const whatsappLink = `${CONTACT_DATA.whatsappUrl}?text=${encodeURIComponent(message)}`;

              return (
                <div key={article.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="font-serif text-xl font-bold text-forest-800 mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-gold-500" />
                    {article.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {article.summary}
                  </p>
                  <a 
                     href={whatsappLink}
                     target="_blank"
                     rel="noreferrer"
                     className="inline-block text-xs font-bold text-gold-600 hover:text-gold-500 uppercase tracking-wider border-b border-gold-200 hover:border-gold-500 pb-0.5 transition-all"
                  >
                    Fale comigo sobre esse assunto
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-forest-900 text-center rounded-b-3xl">
            <p className="text-cream-100 mb-3">Precisa de uma análise detalhada do seu caso?</p>
            <a 
              href={CONTACT_DATA.whatsappUrl}
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Fale com Dr. Gabriel agora
            </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;