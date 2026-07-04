import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={CONTACT_DATA.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 hover:rotate-3 flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={32} className="group-hover:animate-pulse" fill="white" />
      <span className="absolute right-full mr-4 bg-white text-forest-900 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale Conosco
      </span>
    </a>
  );
};

export default FloatingWhatsApp;