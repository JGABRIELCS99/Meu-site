import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS_TRABALHISTA, FAQS_PREVIDENCIARIO, FAQS_CIVIL, FAQS_MARCAS, CONTACT_DATA } from '../constants';
import { FaqItem } from '../types';

const FAQ: React.FC = () => {
  // We use a string key like 'tab-index' to track open items across different lists uniquely
  // Format: 'category-index', e.g., 'trab-0'
  const [openId, setOpenId] = useState<string | null>('trab-0');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const renderFaqList = (items: FaqItem[], categoryPrefix: string, title: string, extraContent?: React.ReactNode) => (
    <div className="mb-12">
      <h3 className="font-serif text-2xl font-bold text-forest-800 mb-6 pl-4 border-l-4 border-gold-500">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((faq, index) => {
          const id = `${categoryPrefix}-${index}`;
          const isOpen = openId === id;
          
          return (
            <div 
              key={id} 
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-transparent hover:border-gold-200 transition-colors"
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => toggleFaq(id)}
              >
                <span className={`font-medium text-lg ${isOpen ? 'text-gold-600' : 'text-forest-900'}`}>
                  {faq.question}
                </span>
                {isOpen ? (
                  <Minus className="text-gold-500 shrink-0" size={20} />
                ) : (
                  <Plus className="text-gray-400 shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {extraContent}
    </div>
  );

  return (
    <section id="faq" className="pt-24 pb-10 bg-cream-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mb-4">Dúvidas Frequentes</h2>
          <p className="text-gray-600">Respostas diretas para as principais questões sobre seus direitos.</p>
        </div>

        <div className="grid gap-8">
           {renderFaqList(FAQS_TRABALHISTA, 'trab', 'Dúvidas Trabalhistas')}
           {renderFaqList(FAQS_PREVIDENCIARIO, 'prev', 'Dúvidas Previdenciárias')}
           {renderFaqList(FAQS_CIVIL, 'civil', 'Dúvidas de Direito Civil')}
           {renderFaqList(FAQS_MARCAS, 'marcas', 'Dúvidas sobre Registro de Marcas', (
             <div className="mt-8 flex justify-center">
                <a 
                  href={CONTACT_DATA.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-forest-900 hover:bg-forest-800 text-white px-8 py-3 rounded-full font-bold shadow-md transition-all transform hover:-translate-y-1"
                >
                  Fale Comigo
                </a>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;