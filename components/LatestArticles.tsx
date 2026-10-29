import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

// Seção "Artigos recentes" da página inicial.
// A lista vem de /artigos/index.json, gerado no build pelo script
// scripts/build-articles.mjs a partir dos arquivos de content/artigos/.
// Os artigos em si são páginas HTML estáticas em /artigos/<slug>/.

interface ArticleSummary {
  slug: string;
  titulo: string;
  descricao: string;
  data: string;
  area: string;
  areaNome: string;
  imagem: string;
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const formatarData = (iso: string) => {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES[m - 1]} ${a}`;
};

const LatestArticles: React.FC = () => {
  const [artigos, setArtigos] = useState<ArticleSummary[]>([]);

  useEffect(() => {
    fetch('/artigos/index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((lista) => setArtigos(Array.isArray(lista) ? lista.slice(0, 3) : []))
      .catch(() => setArtigos([]));
  }, []);

  // Sem artigos publicados (ou na pré-visualização do AI Studio), a seção não aparece.
  if (artigos.length === 0) return null;

  return (
    <section id="artigos" className="py-20 bg-cream-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              <BookOpen size={14} /> Conteúdo jurídico
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2">Artigos recentes</h2>
            <p className="text-gray-600 mt-2 max-w-xl">Explicações claras sobre os seus direitos, escritas pelo Dr. Gabriel Costa.</p>
          </div>
          <a
            href="/artigos/"
            className="inline-flex items-center gap-2 text-forest-800 font-semibold hover:text-gold-600 transition-colors"
          >
            Ver todos os artigos <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {artigos.map((a) => (
            <a
              key={a.slug}
              href={`/artigos/${a.slug}/`}
              className="group bg-white rounded-2xl overflow-hidden border border-gold-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
            >
              <img src={a.imagem} alt={a.titulo} loading="lazy" className="w-full aspect-video object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-600">{a.areaNome}</span>
                <h3 className="font-serif text-xl font-bold text-forest-900 mt-1 mb-2 leading-snug group-hover:text-gold-600 transition-colors">
                  {a.titulo}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{a.descricao}</p>
                <time dateTime={a.data} className="text-xs text-gray-400 mt-4">{formatarData(a.data)}</time>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
