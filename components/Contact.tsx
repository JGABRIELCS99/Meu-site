import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { CONTACT_DATA, IMAGES } from '../constants';

const Contact: React.FC = () => {
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_DATA.address)}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_DATA.email}`;

  return (
    <footer id="contact" className="bg-forest-900 text-white pt-8 pb-10 rounded-t-[50px] mt-0">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16">
          
          {/* Contact Info */}
          <div>
            <div className="mb-8 flex flex-col items-center text-center">
               <div className="w-16 h-16 mb-4">
                <img src={IMAGES.LOGO} alt="Logo Gabriel Costa" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-2">Entre em Contato</h2>
              <p className="text-gray-400">Atendimento presencial e online para todo o Brasil.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-forest-800 rounded-lg text-gold-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <a 
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg hover:text-gold-500 transition-colors break-all"
                    title="Abrir no Gmail"
                  >
                    {CONTACT_DATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-forest-800 rounded-lg text-gold-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Telefone / WhatsApp</p>
                  <a 
                    href={CONTACT_DATA.whatsappUrl}
                    target="_blank"
                    rel="noreferrer" 
                    className="text-lg hover:text-gold-500 transition-colors"
                    title="Abrir no WhatsApp"
                  >
                    {CONTACT_DATA.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-forest-800 rounded-lg text-gold-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Endereço</p>
                  <a 
                    href={googleMapsSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg leading-relaxed hover:text-gold-500 transition-colors block"
                    title="Abrir no Google Maps"
                  >
                    {CONTACT_DATA.address}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-80 md:h-full min-h-[300px] bg-forest-800 rounded-3xl overflow-hidden border-4 border-forest-800 shadow-2xl">
            <iframe 
              src={CONTACT_DATA.googleMapsEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(20%) contrast(1.2)' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa do escritório"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-forest-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Gabriel Costa Advocacia. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
             <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
             <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;