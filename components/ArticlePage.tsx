import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Phone, Mail, MapPin, Clock, Send, ShieldCheck, HelpCircle } from 'lucide-react';
import { RichArticle } from '../articlesDetails';
import { CONTACT_DATA, IMAGES } from '../constants';

interface ArticlePageProps {
  article: RichArticle;
  onBack: () => void;
  areaIcon: React.ReactNode;
  areaTitle: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack, areaIcon, areaTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compile pre-filled WhatsApp message
    const waText = `Olá Dr. Gabriel Costa!\n\nMeus dados de contato:\n- Nome: ${formData.name}\n- E-mail: ${formData.email}\n- WhatsApp: ${formData.phone}\n\nDúvida sobre a área de *${article.title}*:\n"${formData.message || 'Gostaria de uma consulta detalhada sobre este tema.'}"`;
    
    const whatsappLink = `${CONTACT_DATA.whatsappUrl}?text=${encodeURIComponent(waText)}`;
    
    // Open in a new tab
    window.open(whatsappLink, '_blank');
    setFormSubmitted(true);
  };

  // Pre-fill the WhatsApp link for the quick button
  const quickWaText = `Olá Dr. Gabriel Costa! Gostaria de agendar uma consulta sobre *${article.title}*. Como podemos proceder?`;
  const quickWhatsappLink = `${CONTACT_DATA.whatsappUrl}?text=${encodeURIComponent(quickWaText)}`;

  return (
    <div className="bg-cream-50 min-h-screen pb-20 animate-fade-in">
      {/* Sticky Top Bar / Back button */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gold-100 z-40 shadow-sm py-4">
        <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-forest-800 hover:text-gold-600 transition-colors font-medium text-sm md:text-base group"
            id="back-to-areas-btn"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para Áreas de Atuação
          </button>
          
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-serif">
            <span className="text-gold-600">{areaTitle}</span>
            <span>/</span>
            <span className="text-forest-900 font-semibold">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl mt-12">
        {/* Main Article Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-900 leading-tight mb-4">
            {article.title}
          </h1>
          <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          
          <div className="flex justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-600 bg-gold-50 w-fit mx-auto px-4 py-1.5 rounded-full border border-gold-200">
            <span>{areaTitle}</span>
          </div>
        </div>

        {/* Decorative Premium Banner Card */}
        <div className="relative overflow-hidden bg-forest-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl mb-12">
          {/* Accent decoration overlay */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-gold-500/10 blur-xl"></div>
          <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-white/5 blur-xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mb-4 text-gold-400">
              {areaIcon}
            </div>
            <p className="text-gold-400 font-mono text-xs uppercase tracking-widest mb-2">Artigo Jurídico Informativo</p>
            <p className="text-sm md:text-base text-cream-100 font-medium italic">
              "Conhecimento é o primeiro passo para garantir a justiça. Entenda seus direitos de forma clara e assertiva."
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gold-100/50 mb-10">
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-sans first-letter:text-4xl first-letter:font-serif first-letter:text-gold-500 first-letter:font-bold first-letter:mr-2">
            {article.introduction}
          </p>
        </div>

        {/* Situations / Sintomas Frequentes Layout */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-md border-l-4 border-l-gold-500 border border-gray-100 mb-12">
          <h2 className="font-serif text-2xl font-bold text-forest-900 mb-6 flex items-center gap-3">
            <ShieldCheck className="text-gold-500 w-7 h-7 shrink-0" />
            Situações Comuns e Direitos Violados
          </h2>
          
          <div className="grid gap-4">
            {article.situations.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start text-gray-700">
                <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center shrink-0 mt-0.5 border border-gold-200">
                  <Check className="text-gold-600 w-3.5 h-3.5" strokeWidth={3} />
                </div>
                <p className="text-base md:text-lg leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid for Causes, Diagnosis, Treatment */}
        <div className="space-y-12 mb-16">
          {/* Causes */}
          <div className="border-b border-gold-100 pb-10">
            <h3 className="font-serif text-2xl font-bold text-forest-900 mb-4">
              Por que isso acontece? (Causas Comuns)
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-sans">
              {article.causes}
            </p>
          </div>

          {/* Diagnostic */}
          <div className="border-b border-gold-100 pb-10">
            <h3 className="font-serif text-2xl font-bold text-forest-900 mb-4">
              Como identificar o seu direito? (Diagnóstico)
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-sans">
              {article.diagnostic}
            </p>
          </div>

          {/* Treatment */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-forest-900 mb-4 text-gold-600">
              Como o nosso escritório pode lhe ajudar? (Ação Recomendada)
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-sans">
              {article.treatment}
            </p>
          </div>
        </div>

        {/* Specialized Atendimento Banner Block */}
        <div className="bg-forest-900 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12 text-center relative overflow-hidden">
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-gold-500/10 blur-xl"></div>
          <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/5 blur-lg"></div>

          <span className="inline-block bg-gold-400 text-forest-950 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            ATENDIMENTO ESPECIALIZADO
          </span>
          
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
            Dr. Gabriel Costa
          </h3>
          
          <p className="text-cream-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Oferecemos uma advocacia premium focada na excelência, transparência e personalização de cada caso. 
            Realizamos atendimento presencial em nosso escritório físico e atendimento online para clientes de todo o Brasil via WhatsApp e videochamadas.
          </p>
          
          <p className="text-gold-400 font-medium text-sm md:text-base tracking-wide mb-8 uppercase">
            Informe-se mais CLICANDO NO BOTÃO ABAIXO!
          </p>

          <a
            href={quickWhatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm md:text-base tracking-wider uppercase animate-pulse"
            id="quick-cta-btn"
          >
            AGENDER MINHA CONSULTA CLICANDO AQUI!
          </a>
        </div>

        {/* Styled Contact Form */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gold-100 mb-12">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">Envie Sua Dúvida Diretamente</h3>
            <p className="text-gray-500 text-sm">Preencha o formulário e fale diretamente conosco via WhatsApp de forma estruturada.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-widest mb-2">
                  Seu Nome (Obrigatório)
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                  className="w-full bg-cream-50 border border-gold-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 rounded-xl px-4 py-3 text-forest-950 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-widest mb-2">
                  Seu E-mail (Obrigatório, mas não divulgado)
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="w-full bg-cream-50 border border-gold-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 rounded-xl px-4 py-3 text-forest-950 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-widest mb-2">
                  WhatsApp (Com DDD)
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(73) 99999-9999"
                  className="w-full bg-cream-50 border border-gold-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 rounded-xl px-4 py-3 text-forest-950 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-widest mb-2">
                  Assunto de Interesse
                </label>
                <input
                  type="text"
                  readOnly
                  value={article.title}
                  className="w-full bg-gold-50/50 border border-gold-200 text-gold-800 font-semibold rounded-xl px-4 py-3 outline-none cursor-default"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-800 uppercase tracking-widest mb-2">
                Sua Mensagem / Descreva seu caso
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Escreva sua mensagem ou dúvida aqui..."
                className="w-full bg-cream-50 border border-gold-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 rounded-xl px-4 py-3 text-forest-950 outline-none transition-all placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              id="form-submit-btn"
            >
              <Send size={18} />
              ENVIAR MENSAGEM VIA WHATSAPP
            </button>

            {formSubmitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium text-center">
                Mensagem gerada com sucesso! Você foi direcionado ao WhatsApp para enviar os detalhes ao Dr. Gabriel Costa.
              </div>
            )}
          </form>
        </div>

        {/* Detailed Contact Cards */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gold-100/50 mb-12">
          <h3 className="font-serif text-2xl font-bold text-forest-900 mb-8 text-center">Informações de Contato</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-gold-50 rounded-xl text-gold-600 border border-gold-200 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest-900 mb-1">Endereço</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{CONTACT_DATA.address}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-gold-50 rounded-xl text-gold-600 border border-gold-200 shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest-900 mb-1">WhatsApp</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{CONTACT_DATA.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-gold-50 rounded-xl text-gold-600 border border-gold-200 shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest-900 mb-1">E-mail</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{CONTACT_DATA.email}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-gold-50 rounded-xl text-gold-600 border border-gold-200 shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-forest-900 mb-1">Horário de Atendimento</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Segunda a Sexta: 08h00 às 18h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Google Map */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gold-100 h-96">
          <iframe
            src={CONTACT_DATA.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Escritório de Advocacia"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
