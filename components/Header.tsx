import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { CONTACT_DATA, IMAGES } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-forest-900/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-12 h-12">
            <img src={IMAGES.LOGO} alt="Logo do escritório de advocacia Gabriel Costa Advogado" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif font-bold leading-none tracking-wide text-lg ${isScrolled ? 'text-cream-50' : 'text-forest-900 md:text-forest-900 lg:text-forest-900'}`}>
              GABRIEL COSTA
            </span>
            <span className={`text-[10px] tracking-[0.2em] uppercase ${isScrolled ? 'text-gold-400' : 'text-gold-600'}`}>
              Advocacia Especializada
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Áreas de Atuação', 'Sobre Mim', 'Onde Atendo', 'Perguntas', 'Contato'].map((item, idx) => {
            const ids = ['services', 'about', 'coverage', 'faq', 'contact'];
            return (
              <button 
                key={item} 
                onClick={() => scrollTo(ids[idx])}
                className={`text-sm font-medium tracking-wide hover:text-gold-500 transition-colors ${isScrolled ? 'text-cream-100' : 'text-forest-900'}`}
              >
                {item}
              </button>
            );
          })}
          <a 
            href={CONTACT_DATA.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 rounded-tl-2xl rounded-br-2xl transition-all transform hover:-translate-y-1 shadow-md font-medium text-sm"
          >
            Fale Comigo
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gold-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-forest-900 p-6 md:hidden shadow-xl border-t border-forest-800 flex flex-col gap-4">
          {['Áreas de Atuação', 'Sobre Mim', 'Onde Atendo', 'Perguntas', 'Contato'].map((item, idx) => {
            const ids = ['services', 'about', 'coverage', 'faq', 'contact'];
            return (
              <button 
                key={item} 
                onClick={() => scrollTo(ids[idx])}
                className="text-left text-cream-100 hover:text-gold-500 py-2 border-b border-forest-800"
              >
                {item}
              </button>
            );
          })}
          <a 
            href={CONTACT_DATA.whatsappUrl}
            className="bg-gold-500 text-center text-white py-3 rounded-xl mt-2"
          >
            Fale Comigo
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;