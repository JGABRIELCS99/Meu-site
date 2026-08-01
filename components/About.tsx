import React from 'react';
import { Award, Shield, Check, Trophy, GraduationCap } from 'lucide-react';
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
                alt="Gabriel Costa, advogado especialista em direito previdenciário e trabalhista atuando em Camamu e em todo o Baixo Sul da Bahia" 
                className="w-full h-[550px] object-cover rounded-tl-[80px] rounded-br-[80px] shadow-2xl transition-all duration-700"
              />
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="text-center mb-6">
              <span className="text-gold-400 text-xs font-bold tracking-widest uppercase bg-white/5 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4 inline-block">
                Sobre Mim
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Sobre <span className="text-gold-500">Gabriel Costa</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-cream-100 text-base md:text-lg leading-relaxed font-light">
              <div className="space-y-4">
                <p className="text-cream-100 text-justify">
                  Com uma abordagem moderna e humanizada, o escritório foge do "juridiquês" desnecessário para oferecer um atendimento transparente e acolhedor. Entendemos que por trás de cada processo existe uma história de vida e uma necessidade urgente.
                </p>
                <p className="text-cream-100 text-justify">
                  Atuo com rigor técnico e estratégia personalizada para cada cliente, seja na garantia de uma aposentadoria justa, na reparação de direitos trabalhistas violados ou em demandas cíveis de família, sucessão ou imobiliária.
                </p>
              </div>

              {/* Grid of Cards */}
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                {/* Column 1: Especializações & Aperfeiçoamentos */}
                <div className="flex flex-col gap-6">
                  {/* Especializações Card */}
                  <div className="bg-white/5 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gold-500/10 rounded-xl text-gold-400 border border-gold-500/20">
                        <Award size={20} />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-gold-400">Especializações</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-cream-100">
                      <li className="flex gap-2 items-start">
                        <Check className="text-gold-400 w-4 h-4 shrink-0 mt-0.5" />
                        <span>Pós-graduado em direito previdenciário</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <Check className="text-gold-400 w-4 h-4 shrink-0 mt-0.5" />
                        <span>Pós-graduando em ciências jurídicas</span>
                      </li>
                    </ul>
                  </div>

                  {/* Aperfeiçoamentos Card (Mini Certificados) */}
                  <div className="bg-white/5 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gold-500/10 rounded-xl text-gold-400 border border-gold-500/20">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-gold-400">Aperfeiçoamentos</h4>
                        <span className="text-[11px] text-cream-100/70 uppercase tracking-wider block -mt-0.5">Cursos de Extensão & Atualização</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Direito Civil',
                        'Processo Civil',
                        'Constitucional',
                        'Direito Administrativo',
                        'Holding'
                      ].map((curso, idx) => (
                        <div 
                          key={idx}
                          className={`group bg-forest-950/50 border border-gold-500/30 rounded-xl p-3 hover:border-gold-400 hover:bg-gold-500/10 transition-all duration-300 flex items-center gap-2.5 shadow-sm ${
                            idx === 4 ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <div className="w-6 h-6 rounded-lg bg-gold-500/15 border border-gold-400/40 flex items-center justify-center shrink-0 group-hover:bg-gold-500/30 group-hover:scale-105 transition-all">
                            <Award className="w-3.5 h-3.5 text-gold-400" />
                          </div>
                          <span className="text-xs font-medium text-cream-100 leading-tight">
                            {curso}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: História & Valores */}
                <div className="flex flex-col gap-6">
                  {/* História Card */}
                  <div className="bg-white/5 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gold-500/10 rounded-xl text-gold-400 border border-gold-500/20">
                        <Trophy size={20} />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-gold-400">História</h4>
                    </div>
                    <p className="text-sm text-cream-100 leading-relaxed">
                      Aprovado em dois concursos federais para a justiça do trabalho em 2025.
                    </p>
                  </div>

                  {/* Valores Card */}
                  <div className="bg-white/5 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/40 transition-colors flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gold-500/10 rounded-xl text-gold-400 border border-gold-500/20">
                          <Shield size={20} />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-gold-400">Valores</h4>
                      </div>
                      <ul className="space-y-3 text-sm text-cream-100 mb-6">
                        <li className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>
                          <span>Transparência</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>
                          <span>Excelência técnica</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span>
                          <span>Comprometimento</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-xs text-gold-400 italic font-medium border-t border-gold-500/10 pt-4 mt-auto">
                      "Valorizo a justiça social e me dedico à defesa do cidadão."
                    </p>
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