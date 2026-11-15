import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import CoverageArea from './components/CoverageArea';
import FAQ from './components/FAQ';
import LatestArticles from './components/LatestArticles';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminMetrics from './components/AdminMetrics';
import { trackPageView } from './analytics';

const App: React.FC = () => {
  const [showMetrics, setShowMetrics] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.hash === '#metricas' ||
      window.location.pathname === '/metricas' ||
      window.location.search.includes('metricas')
    );
  });

  useEffect(() => {
    // Registra visualização da página inicial
    trackPageView('Página Inicial (Home)', window.location.pathname);

    // Monitora rota/hash para abrir o painel de métricas diretamente
    const checkRoute = () => {
      const isMetricas = (
        window.location.hash === '#metricas' ||
        window.location.pathname === '/metricas' ||
        window.location.search.includes('metricas')
      );
      if (isMetricas) {
        setShowMetrics(true);
      }

      // Rastrear navegação de âncoras
      const hash = window.location.hash;
      if (hash && hash !== '#metricas') {
        const sectionMap: Record<string, string> = {
          '#about': 'Sobre Mim (Biografia)',
          '#services': 'Áreas de Atuação',
          '#coverage': 'Onde Atendo',
          '#faq': 'Dúvidas Frequentes',
          '#contact': 'Contato / Endereço',
          '#hero': 'Página Inicial (Topo)',
        };
        const title = sectionMap[hash] || `Seção ${hash}`;
        trackPageView(title, hash);
      }
    };

    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    // Atalho de teclado secreto para o Dr. Gabriel Costa: Ctrl + Shift + M
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'M' || e.key === 'm')) {
        e.preventDefault();
        setShowMetrics(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseMetrics = () => {
    setShowMetrics(false);
    if (window.location.hash === '#metricas') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="font-sans text-forest-900 bg-cream-50 overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <CoverageArea />
        <LatestArticles />
        <FAQ />
      </main>
      <Contact onOpenMetrics={() => setShowMetrics(true)} />
      <FloatingWhatsApp />

      {/* Painel de Métricas Privado (Alternativa 2) */}
      {showMetrics && (
        <AdminMetrics onClose={handleCloseMetrics} />
      )}
    </div>
  );
};

export default App;