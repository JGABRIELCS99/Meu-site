// =====================================================================
// GERADOR DE ARTIGOS — Gabriel Costa Advogado
// ---------------------------------------------------------------------
// Roda automaticamente depois do "vite build" (ver package.json).
// Lê cada arquivo .md de content/artigos/ e gera, dentro de dist/:
//   /artigos/<slug>/index.html   página estática completa de cada artigo
//   /artigos/<slug>/capa.png     capa 1200x675 (se o artigo não tiver imagem)
//   /artigos/index.html          página "Artigos" com todos os artigos
//   /artigos/index.json          lista usada pela seção de artigos da home
//   /artigos/feed.xml            feed RSS
//   /sitemap.xml                 sitemap com lastmod de cada artigo
//   /robots.txt                  aponta o sitemap para os buscadores
//
// Para publicar um artigo novo basta criar content/artigos/<slug>.md.
// Veja CLAUDE.md para o formato completo.
// =====================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { Resvg } from '@resvg/resvg-js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'artigos');
const PUBLIC_IMG_DIR = path.join(ROOT, 'public');
const DIST = path.join(ROOT, 'dist');
const FONTS_DIR = path.join(ROOT, 'scripts', 'fonts');

// O Netlify informa a URL principal do site na variável URL durante o build.
// Se um dia o site ganhar domínio próprio, as URLs mudam sozinhas.
const SITE_URL = (process.env.URL || 'https://gabrielcostaadvogado.netlify.app').replace(/\/$/, '');

const SITE = {
  nome: 'Gabriel Costa Advogado',
  autor: 'Gabriel Costa',
  oab: 'OAB/BA 88.548',
  logo: 'https://lh3.googleusercontent.com/d/1p3Ff_i9V9KoWPiwUgEDamIq6U4IZhBin',
  foto: 'https://lh3.googleusercontent.com/d/1QYeSTARApJLgWtkSthwdTSYFvAatAK7k',
  whatsapp: 'https://wa.me/5573982052016',
  telefone: '(73) 98205-2016',
  email: 'jgabrielcostasouza@gmail.com',
  instagram: 'https://www.instagram.com/gabrielcostaadvogado/',
  endereco: 'Avenida Beira Mar, Nº 45, Cidade Baixa, Camamu-BA',
};

const AREAS = {
  previdenciario: 'Direito Previdenciário',
  trabalhista: 'Direito do Trabalho',
  familia: 'Direito de Família',
  consumidor: 'Direito do Consumidor',
  civil: 'Direito Civil',
  sucessoes: 'Sucessões e Inventário',
  imobiliario: 'Direito Imobiliário',
  marcas: 'Marcas e Propriedade Intelectual',
};

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

// ---------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------
const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const dataExtenso = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
};

const isoValida = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

// Frontmatter simples: linhas "chave: valor" entre dois "---".
function lerFrontmatter(texto, arquivo) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${arquivo}: falta o cabeçalho entre "---" no início do arquivo.`);
  const dados = {};
  for (const linha of m[1].split(/\r?\n/)) {
    if (!linha.trim() || linha.trim().startsWith('#')) continue;
    const i = linha.indexOf(':');
    if (i === -1) throw new Error(`${arquivo}: linha inválida no cabeçalho: "${linha}"`);
    const chave = linha.slice(0, i).trim();
    let valor = linha.slice(i + 1).trim();
    if ((valor.startsWith('"') && valor.endsWith('"')) || (valor.startsWith("'") && valor.endsWith("'"))) {
      valor = valor.slice(1, -1);
    }
    dados[chave] = valor;
  }
  return { dados, corpo: m[2] };
}

// ---------------------------------------------------------------------
// Leitura e validação dos artigos
// ---------------------------------------------------------------------
function carregarArtigos() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const arquivos = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  const artigos = [];
  const slugs = new Set();

  for (const arquivo of arquivos) {
    const bruto = fs.readFileSync(path.join(CONTENT_DIR, arquivo), 'utf8');
    const { dados, corpo } = lerFrontmatter(bruto, arquivo);

    // INCLUIR_RASCUNHOS=1 serve só para pré-visualizar no computador; o Netlify nunca usa.
    if (String(dados.rascunho).toLowerCase() === 'true' && process.env.INCLUIR_RASCUNHOS !== '1') {
      console.log(`  · rascunho ignorado: ${arquivo}`);
      continue;
    }

    const erros = [];
    for (const campo of ['titulo', 'descricao', 'data', 'area']) {
      if (!dados[campo]) erros.push(`campo obrigatório "${campo}" ausente`);
    }
    if (dados.data && !isoValida(dados.data)) erros.push(`"data" deve estar no formato AAAA-MM-DD (recebido: ${dados.data})`);
    if (dados.atualizado && !isoValida(dados.atualizado)) erros.push(`"atualizado" deve estar no formato AAAA-MM-DD`);
    if (dados.area && !AREAS[dados.area]) erros.push(`"area" deve ser uma destas: ${Object.keys(AREAS).join(', ')}`);
    if (dados.descricao && dados.descricao.length > 170) erros.push(`"descricao" tem ${dados.descricao.length} caracteres; use até 170 para não ser cortada no Google`);
    if (erros.length) throw new Error(`${arquivo}:\n   - ${erros.join('\n   - ')}`);

    const slug = slugify(dados.slug || arquivo.replace(/\.md$/, ''));
    if (slugs.has(slug)) throw new Error(`${arquivo}: o endereço "${slug}" já é usado por outro artigo.`);
    slugs.add(slug);

    // Markdown -> HTML, com id em cada H2 para o sumário.
    const sumario = [];
    const renderer = new marked.Renderer();
    renderer.heading = function ({ tokens, depth, text }) {
      const html = this.parser.parseInline(tokens);
      if (depth === 2) {
        const id = slugify(text);
        sumario.push({ id, texto: text });
        return `<h2 id="${id}">${html}</h2>\n`;
      }
      return `<h${depth}>${html}</h${depth}>\n`;
    };
    renderer.link = function ({ href, title, tokens }) {
      const texto = this.parser.parseInline(tokens);
      const externo = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);
      return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${externo ? ' target="_blank" rel="noopener"' : ''}>${texto}</a>`;
    };
    // Corpo do artigo não pode repetir o título como H1 (a página já tem um).
    const corpoLimpo = corpo.replace(/^\s*#\s+.+\n/, '');
    const html = marked.parse(corpoLimpo, { renderer, gfm: true });

    const palavras = corpoLimpo.replace(/[#>*_`\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;

    artigos.push({
      slug,
      titulo: dados.titulo,
      descricao: dados.descricao,
      data: dados.data,
      atualizado: dados.atualizado || dados.data,
      area: dados.area,
      areaNome: AREAS[dados.area],
      imagem: dados.imagem || '',
      imagemAlt: dados.imagem_alt || dados.titulo,
      html,
      sumario,
      minutos: Math.max(1, Math.round(palavras / 200)),
      url: `${SITE_URL}/artigos/${slug}/`,
    });
  }

  artigos.sort((a, b) => b.data.localeCompare(a.data) || a.titulo.localeCompare(b.titulo));
  return artigos;
}

// ---------------------------------------------------------------------
// Capa automática (1200x675, 16:9) — aparece no Google e no WhatsApp
// ---------------------------------------------------------------------
function quebrarLinhas(texto, maxChars) {
  const palavras = texto.split(/\s+/);
  const linhas = [];
  let atual = '';
  for (const p of palavras) {
    if ((atual + ' ' + p).trim().length > maxChars && atual) {
      linhas.push(atual);
      atual = p;
    } else {
      atual = (atual + ' ' + p).trim();
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

function gerarCapa(artigo, destino) {
  let tamanho = 64;
  let maxChars = 30;
  let linhas = quebrarLinhas(artigo.titulo, maxChars);
  if (linhas.length > 4) { tamanho = 52; maxChars = 38; linhas = quebrarLinhas(artigo.titulo, maxChars); }
  if (linhas.length > 5) { linhas = linhas.slice(0, 5); linhas[4] = linhas[4].replace(/\s*\S*$/, '…'); }
  const alturaLinha = tamanho * 1.18;
  const yInicial = 337 - ((linhas.length - 1) * alturaLinha) / 2 + tamanho * 0.1;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0F2F24"/><stop offset="1" stop-color="#0A2218"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle cx="1130" cy="600" r="260" fill="#C5A059" fill-opacity="0.07"/>
  <circle cx="60" cy="40" r="180" fill="#FFFFFF" fill-opacity="0.03"/>
  <rect x="80" y="80" width="6" height="515" fill="#C5A059"/>
  <text x="120" y="128" font-family="Inter" font-weight="600" font-size="22" letter-spacing="4" fill="#C5A059">${esc(artigo.areaNome.toUpperCase())}</text>
  ${linhas.map((l, i) => `<text x="120" y="${(yInicial + i * alturaLinha).toFixed(1)}" font-family="Playfair Display" font-weight="700" font-size="${tamanho}" fill="#F9F7F2">${esc(l)}</text>`).join('\n  ')}
  <text x="120" y="560" font-family="Playfair Display" font-weight="700" font-size="30" fill="#F9F7F2">Gabriel Costa</text>
  <text x="120" y="592" font-family="Inter" font-weight="400" font-size="20" letter-spacing="2" fill="#C5A059">ADVOGADO · ${esc(SITE.oab)}</text>
</svg>`;

  const resvg = new Resvg(svg, {
    font: {
      fontFiles: fs.readdirSync(FONTS_DIR).map((f) => path.join(FONTS_DIR, f)),
      loadSystemFonts: false,
      defaultFontFamily: 'Inter',
    },
    fitTo: { mode: 'width', value: 1200 },
  });
  fs.writeFileSync(destino, resvg.render().asPng());
}

// ---------------------------------------------------------------------
// Layout comum (cabeçalho, rodapé, estilos)
// ---------------------------------------------------------------------
const CSS = `
:root{--forest:#0F2F24;--forest-d:#0A2218;--gold:#C5A059;--gold-d:#B08D55;--cream:#F9F7F2;--cream2:#F2EFE9;--text:#2b2f2c;--muted:#5f6b64;--line:#e7dfcd}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--cream);color:var(--text);font-family:Inter,system-ui,sans-serif;font-size:18px;line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:var(--forest)}img{max-width:100%;height:auto}
.wrap{max-width:1100px;margin:0 auto;padding:0 20px}
.top{background:var(--forest-d);position:sticky;top:0;z-index:20;box-shadow:0 2px 12px rgba(0,0,0,.15)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:68px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none}
.brand img{width:42px;height:42px;object-fit:contain}
.brand b{display:block;font-family:'Playfair Display',serif;color:var(--cream);letter-spacing:.05em;font-size:17px;line-height:1.1}
.brand small{display:block;color:var(--gold);font-size:9px;letter-spacing:.22em;text-transform:uppercase}
.nav{display:flex;align-items:center;gap:22px;font-size:14px}
.nav a{color:#e9e4d8;text-decoration:none}.nav a:hover,.nav a.on{color:var(--gold)}
.btn{display:inline-block;background:var(--gold);color:#fff!important;text-decoration:none;font-weight:600;border-radius:16px 0 16px 0;padding:10px 20px;font-size:14px}
.btn:hover{background:var(--gold-d)}
@media(max-width:820px){.nav a:not(.btn){display:none}}
.crumbs{font-size:13px;color:var(--muted);margin:28px 0 0}.crumbs a{color:var(--muted);text-decoration:none}.crumbs a:hover{color:var(--gold-d)}
.hero{max-width:760px;margin:0 auto;padding:28px 0 8px}
.tag{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-d);background:#f5ecd9;border:1px solid #ead9b5;border-radius:999px;padding:4px 14px;text-decoration:none}
h1{font-family:'Playfair Display',serif;color:var(--forest-d);font-size:clamp(30px,5vw,46px);line-height:1.15;margin:16px 0 14px}
.lead{font-size:20px;color:#3d4641;margin:0 0 18px}
.meta{font-size:14px;color:var(--muted);display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:12px 0}
.meta img{width:34px;height:34px;border-radius:50%;object-fit:cover}
.cover{max-width:860px;margin:28px auto 0;border-radius:18px;overflow:hidden;box-shadow:0 12px 30px rgba(10,34,24,.18)}
.cover img{display:block;width:100%}
.layout{max-width:760px;margin:0 auto}
.toc{background:#fff;border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;padding:18px 22px;margin:34px 0 8px;font-size:16px}
.toc strong{font-family:'Playfair Display',serif;color:var(--forest-d);font-size:18px}
.toc ol{margin:8px 0 0;padding-left:20px}.toc a{text-decoration:none}.toc a:hover{color:var(--gold-d)}
.content h2{font-family:'Playfair Display',serif;color:var(--forest-d);font-size:30px;line-height:1.25;margin:44px 0 12px;scroll-margin-top:90px}
.content h3{font-family:'Playfair Display',serif;color:var(--forest);font-size:23px;margin:30px 0 8px}
.content p{margin:0 0 18px}
.content ul,.content ol{padding-left:24px;margin:0 0 20px}.content li{margin:6px 0}
.content blockquote{margin:24px 0;padding:14px 22px;background:#fff;border-left:4px solid var(--gold);border-radius:0 12px 12px 0;font-size:16px;color:#3d4641}
.content blockquote p:last-child{margin:0}
.content table{width:100%;border-collapse:collapse;font-size:16px;margin:10px 0 24px;background:#fff}
.content th,.content td{border:1px solid var(--line);padding:10px 12px;text-align:left;vertical-align:top}
.content th{background:var(--forest);color:var(--cream)}
.content a{color:var(--gold-d);font-weight:500}
.content hr{border:0;border-top:1px solid var(--line);margin:36px 0}
.note{font-size:14px;color:var(--muted);background:var(--cream2);border-radius:12px;padding:14px 18px;margin:36px 0}
.author{display:flex;gap:18px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px;margin:30px 0}
.author img{width:84px;height:84px;border-radius:50%;object-fit:cover;flex-shrink:0}
.author b{font-family:'Playfair Display',serif;font-size:20px;color:var(--forest-d)}
.author p{margin:4px 0 0;font-size:15px;line-height:1.6;color:#4a524e}
.cta{background:var(--forest-d);color:var(--cream);border-radius:22px;padding:34px 28px;text-align:center;margin:34px 0}
.cta h2{font-family:'Playfair Display',serif;color:#fff;font-size:28px;margin:0 0 8px}
.cta p{margin:0 auto 20px;max-width:560px;color:#d9d4c7;font-size:16px}
.cta .btn{font-size:15px;padding:13px 28px}
.related h2,.list-head h2{font-family:'Playfair Display',serif;color:var(--forest-d);font-size:26px}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px;margin:16px 0 50px}
.card{background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
.card:hover{transform:translateY(-3px);box-shadow:0 12px 26px rgba(10,34,24,.12)}
.card img{aspect-ratio:16/9;object-fit:cover;width:100%;display:block}
.card div{padding:16px 18px 20px}
.card span{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-d)}
.card h3{font-family:'Playfair Display',serif;font-size:20px;line-height:1.3;color:var(--forest-d);margin:6px 0 8px}
.card p{font-size:15px;line-height:1.55;color:#555f5a;margin:0}
.card time{display:block;font-size:13px;color:var(--muted);margin-top:10px}
.filters{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 4px}
.filters a{font-size:13px;text-decoration:none;border:1px solid var(--line);background:#fff;border-radius:999px;padding:6px 14px;color:var(--forest)}
.filters a.on,.filters a:hover{background:var(--forest);color:var(--cream);border-color:var(--forest)}
.page-hero{background:var(--forest-d);color:var(--cream);padding:48px 0 44px}
.page-hero h1{color:#fff;margin:6px 0 10px}
.page-hero p{color:#d9d4c7;max-width:640px;margin:0;font-size:18px}
.empty{background:#fff;border:1px dashed var(--line);border-radius:18px;padding:40px;text-align:center;color:var(--muted);margin:30px 0 60px}
footer{background:var(--forest-d);color:#cfc9bb;font-size:14px;padding:36px 0;margin-top:20px}
footer .wrap{display:flex;flex-wrap:wrap;gap:16px 40px;justify-content:space-between}
footer a{color:var(--gold);text-decoration:none}
footer b{color:#fff;font-family:'Playfair Display',serif;font-size:17px}
`;

function head({ titulo, descricao, url, imagem, tipo = 'website', jsonld = [], extra = '' }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:locale" content="pt_BR">
<meta property="og:type" content="${tipo}">
<meta property="og:site_name" content="${esc(SITE.nome)}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(imagem)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="alternate" type="application/rss+xml" title="Artigos — ${esc(SITE.nome)}" href="${SITE_URL}/artigos/feed.xml">
<link rel="icon" href="${esc(SITE.logo)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<style>${CSS.replace(/\n/g, '')}</style>
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
${extra}
</head>`;
}

function topo(ativo = '') {
  return `<header class="top"><div class="wrap">
  <a class="brand" href="/"><img src="${esc(SITE.logo)}" alt="Logo Gabriel Costa Advogado" width="42" height="42"><span><b>GABRIEL COSTA</b><small>Advocacia Especializada</small></span></a>
  <nav class="nav">
    <a href="/#about">Sobre Mim</a>
    <a href="/#services">Áreas de Atuação</a>
    <a href="/artigos/"${ativo === 'artigos' ? ' class="on"' : ''}>Artigos</a>
    <a href="/#contact">Contato</a>
    <a class="btn" href="${SITE.whatsapp}" target="_blank" rel="noopener">Fale Comigo</a>
  </nav>
</div></header>`;
}

function rodape() {
  return `<footer><div class="wrap">
  <div><b>Gabriel Costa Advogado</b><br>${esc(SITE.oab)}<br>${esc(SITE.endereco)}</div>
  <div>WhatsApp: <a href="${SITE.whatsapp}" target="_blank" rel="noopener">${esc(SITE.telefone)}</a><br>E-mail: <a href="mailto:${SITE.email}">${esc(SITE.email)}</a><br>Instagram: <a href="${SITE.instagram}" target="_blank" rel="noopener">@gabrielcostaadvogado</a></div>
  <div><a href="/">Página inicial</a><br><a href="/artigos/">Todos os artigos</a><br><a href="/artigos/feed.xml">Feed RSS</a></div>
</div></footer>`;
}

function card(a) {
  return `<a class="card" href="/artigos/${a.slug}/">
  <img src="${esc(a.imagemSrc)}" alt="${esc(a.imagemAlt)}" loading="lazy" width="1200" height="675">
  <div><span>${esc(a.areaNome)}</span><h3>${esc(a.titulo)}</h3><p>${esc(a.descricao)}</p><time datetime="${a.data}">${dataExtenso(a.data)}</time></div>
</a>`;
}

// ---------------------------------------------------------------------
// Página de cada artigo
// ---------------------------------------------------------------------
function paginaArtigo(a, todos) {
  const relacionados = [
    ...todos.filter((o) => o.slug !== a.slug && o.area === a.area),
    ...todos.filter((o) => o.slug !== a.slug && o.area !== a.area),
  ].slice(0, 3);

  const waTexto = `Olá, Dr. Gabriel! Li o artigo "${a.titulo}" no seu site e gostaria de conversar sobre o meu caso.`;
  const waLink = `${SITE.whatsapp}?text=${encodeURIComponent(waTexto)}`;

  const autor = {
    '@type': 'Person',
    name: SITE.autor,
    jobTitle: 'Advogado',
    url: `${SITE_URL}/`,
    image: SITE.foto,
    sameAs: [SITE.instagram],
  };

  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: a.titulo,
      description: a.descricao,
      image: [a.imagemUrl],
      datePublished: `${a.data}T08:00:00-03:00`,
      dateModified: `${a.atualizado}T08:00:00-03:00`,
      inLanguage: 'pt-BR',
      articleSection: a.areaNome,
      mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
      url: a.url,
      author: autor,
      publisher: {
        '@type': 'LegalService',
        name: SITE.nome,
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: SITE.logo },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Artigos', item: `${SITE_URL}/artigos/` },
        { '@type': 'ListItem', position: 3, name: a.titulo, item: a.url },
      ],
    },
  ];

  const extra = `<meta property="article:published_time" content="${a.data}T08:00:00-03:00">
<meta property="article:modified_time" content="${a.atualizado}T08:00:00-03:00">
<meta property="article:section" content="${esc(a.areaNome)}">`;

  return `${head({ titulo: `${a.titulo} | ${SITE.nome}`, descricao: a.descricao, url: a.url, imagem: a.imagemUrl, tipo: 'article', jsonld, extra })}
<body>
${topo('artigos')}
<main class="wrap">
  <nav class="crumbs" aria-label="Você está em"><a href="/">Início</a> › <a href="/artigos/">Artigos</a> › <a href="/artigos/?area=${a.area}">${esc(a.areaNome)}</a></nav>
  <article>
    <header class="hero">
      <a class="tag" href="/artigos/?area=${a.area}">${esc(a.areaNome)}</a>
      <h1>${esc(a.titulo)}</h1>
      <p class="lead">${esc(a.descricao)}</p>
      <div class="meta">
        <img src="${esc(SITE.foto)}" alt="Foto de Gabriel Costa" width="34" height="34">
        <span>Por <strong>${esc(SITE.autor)}</strong> · ${esc(SITE.oab)}</span>
        <span>Publicado em <time datetime="${a.data}">${dataExtenso(a.data)}</time></span>
        ${a.atualizado !== a.data ? `<span>Atualizado em <time datetime="${a.atualizado}">${dataExtenso(a.atualizado)}</time></span>` : ''}
        <span>${a.minutos} min de leitura</span>
      </div>
    </header>
    <figure class="cover"><img src="${esc(a.imagemSrc)}" alt="${esc(a.imagemAlt)}" width="1200" height="675"></figure>
    <div class="layout">
      ${a.sumario.length >= 3 ? `<nav class="toc" aria-label="Sumário"><strong>Neste artigo</strong><ol>${a.sumario.map((s) => `<li><a href="#${s.id}">${esc(s.texto)}</a></li>`).join('')}</ol></nav>` : ''}
      <div class="content">
${a.html}
      </div>
      <p class="note">Este conteúdo tem caráter exclusivamente informativo e não substitui a análise individual do seu caso por um advogado.</p>
      <section class="author">
        <img src="${esc(SITE.foto)}" alt="Gabriel Costa, advogado" width="84" height="84">
        <div><b>Gabriel Costa</b><p>Advogado (${esc(SITE.oab)}), pós-graduado em Direito Previdenciário e em Direito das Famílias e Sucessões. Atende em Camamu e no Baixo Sul da Bahia, presencialmente e on-line.</p></div>
      </section>
      <section class="cta">
        <h2>Ficou com alguma dúvida sobre o seu caso?</h2>
        <p>Cada situação tem detalhes próprios. Fale com o escritório e receba uma orientação sobre o seu caso.</p>
        <a class="btn" href="${esc(waLink)}" target="_blank" rel="noopener">Conversar pelo WhatsApp</a>
      </section>
    </div>
  </article>
  ${relacionados.length ? `<section class="related"><h2>Leia também</h2><div class="cards">${relacionados.map(card).join('')}</div></section>` : ''}
</main>
${rodape()}
</body>
</html>`;
}

// ---------------------------------------------------------------------
// Página /artigos/ (lista com filtro por área)
// ---------------------------------------------------------------------
function paginaLista(artigos) {
  const areasUsadas = [...new Set(artigos.map((a) => a.area))];
  const url = `${SITE_URL}/artigos/`;
  const descricao = 'Artigos do advogado Gabriel Costa sobre INSS e aposentadoria, direitos trabalhistas, família, divórcio e direito do consumidor, em linguagem simples.';
  const jsonld = [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Artigos | ${SITE.nome}`,
    description: descricao,
    url,
    inLanguage: 'pt-BR',
    hasPart: artigos.map((a) => ({ '@type': 'BlogPosting', headline: a.titulo, url: a.url, datePublished: a.data })),
  }];

  // Filtro por área via ?area= (o HTML completo já traz todos os links para o Google).
  const filtroJs = `<script>(function(){var p=new URLSearchParams(location.search).get('area');if(!p)return;var n=0;document.querySelectorAll('.cards .card').forEach(function(c){var ok=c.getAttribute('data-area')===p;c.style.display=ok?'':'none';if(ok)n++;});document.querySelectorAll('.filters a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-area')===p);});})();</script>`;

  return `${head({ titulo: `Artigos jurídicos | ${SITE.nome}`, descricao, url, imagem: SITE.foto, jsonld })}
<body>
${topo('artigos')}
<section class="page-hero"><div class="wrap">
  <span class="tag">Conteúdo jurídico</span>
  <h1>Artigos</h1>
  <p>Explicações claras sobre os seus direitos: INSS e aposentadoria, trabalho, família e consumidor.</p>
</div></section>
<main class="wrap">
  ${artigos.length ? `
  <div class="filters" aria-label="Filtrar por área">
    <a href="/artigos/" data-area="" class="on">Todos</a>
    ${areasUsadas.map((ar) => `<a href="/artigos/?area=${ar}" data-area="${ar}">${esc(AREAS[ar])}</a>`).join('\n    ')}
  </div>
  <div class="cards">
    ${artigos.map((a) => card(a).replace('<a class="card"', `<a class="card" data-area="${a.area}"`)).join('\n    ')}
  </div>` : `<div class="empty">Os primeiros artigos estão sendo preparados. Volte em breve.</div>`}
</main>
${rodape()}
${filtroJs}
</body>
</html>`;
}

// ---------------------------------------------------------------------
// Sitemap, robots, feed, índice JSON
// ---------------------------------------------------------------------
function sitemap(artigos) {
  const urls = [`  <url><loc>${SITE_URL}/</loc></url>`];
  if (artigos.length) {
    const maisRecente = artigos.map((a) => a.atualizado).sort().at(-1);
    urls.push(`  <url><loc>${SITE_URL}/artigos/</loc><lastmod>${maisRecente}</lastmod></url>`);
  } else {
    urls.push(`  <url><loc>${SITE_URL}/artigos/</loc></url>`);
  }
  for (const a of artigos) urls.push(`  <url><loc>${a.url}</loc><lastmod>${a.atualizado}</lastmod></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

function feed(artigos) {
  const itens = artigos.slice(0, 30).map((a) => `  <item>
    <title>${esc(a.titulo)}</title>
    <link>${a.url}</link>
    <guid isPermaLink="true">${a.url}</guid>
    <pubDate>${new Date(`${a.data}T11:00:00Z`).toUTCString()}</pubDate>
    <category>${esc(a.areaNome)}</category>
    <description>${esc(a.descricao)}</description>
  </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Artigos — ${esc(SITE.nome)}</title>
  <link>${SITE_URL}/artigos/</link>
  <atom:link href="${SITE_URL}/artigos/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Artigos jurídicos do advogado Gabriel Costa (${esc(SITE.oab)}).</description>
  <language>pt-BR</language>
${itens}
</channel>
</rss>
`;
}

// ---------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------
function main() {
  if (!fs.existsSync(DIST)) throw new Error('Pasta dist/ não encontrada. Rode "vite build" antes.');
  console.log(`\n▶ Gerando artigos para ${SITE_URL}`);

  const artigos = carregarArtigos();
  const pastaArtigos = path.join(DIST, 'artigos');
  fs.mkdirSync(pastaArtigos, { recursive: true });

  for (const a of artigos) {
    const pasta = path.join(pastaArtigos, a.slug);
    fs.mkdirSync(pasta, { recursive: true });
    if (a.imagem) {
      // Imagem própria: URL completa ou caminho dentro de public/ (ex.: /artigos/img/foto.jpg)
      if (!/^https?:\/\//.test(a.imagem) && !fs.existsSync(path.join(PUBLIC_IMG_DIR, a.imagem))) {
        throw new Error(`${a.slug}: imagem "${a.imagem}" não encontrada em public/.`);
      }
      a.imagemUrl = /^https?:\/\//.test(a.imagem) ? a.imagem : `${SITE_URL}${a.imagem.startsWith('/') ? '' : '/'}${a.imagem}`;
    } else {
      gerarCapa(a, path.join(pasta, 'capa.png'));
      a.imagemUrl = `${SITE_URL}/artigos/${a.slug}/capa.png`;
    }
    // Nas tags <img> usa caminho relativo (funciona em qualquer domínio/pré-visualização).
    a.imagemSrc = a.imagemUrl.startsWith(SITE_URL) ? a.imagemUrl.slice(SITE_URL.length) : a.imagemUrl;
  }

  for (const a of artigos) {
    fs.writeFileSync(path.join(pastaArtigos, a.slug, 'index.html'), paginaArtigo(a, artigos));
    console.log(`  ✓ /artigos/${a.slug}/`);
  }

  fs.writeFileSync(path.join(pastaArtigos, 'index.html'), paginaLista(artigos));
  fs.writeFileSync(path.join(pastaArtigos, 'index.json'), JSON.stringify(artigos.map((a) => ({
    slug: a.slug, titulo: a.titulo, descricao: a.descricao, data: a.data, area: a.area, areaNome: a.areaNome, imagem: a.imagemSrc,
  }))));
  fs.writeFileSync(path.join(pastaArtigos, 'feed.xml'), feed(artigos));
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap(artigos));
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robots());

  console.log(`✔ ${artigos.length} artigo(s) publicado(s). Sitemap e robots.txt atualizados.\n`);
}

try {
  main();
} catch (e) {
  console.error(`\n✖ ERRO AO GERAR ARTIGOS:\n   ${e.message}\n`);
  process.exit(1);
}
