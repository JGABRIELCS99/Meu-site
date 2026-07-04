import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
  return (
    <div className="font-sans text-forest-900 bg-cream-50 overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <FAQ />
      </main>
      <Contact />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;