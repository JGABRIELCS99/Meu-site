# Site Gabriel Costa Advogado

Site institucional (React + Vite, criado no Google AI Studio) publicado no Netlify a partir da branch `main` deste repositório. Endereço: https://gabrielcostaadvogado.netlify.app

## Como os artigos funcionam

- Cada artigo é um arquivo Markdown em `content/artigos/<slug>.md`. O nome do arquivo vira o endereço: `/artigos/<slug>/`.
- No build (`npm run build` = `vite build` + `node scripts/build-articles.mjs`), o gerador cria páginas HTML estáticas para cada artigo, a página `/artigos/`, `/artigos/index.json` (usado pela seção "Artigos recentes" da home), `/artigos/feed.xml`, `/sitemap.xml` e `/robots.txt`.
- Capa 1200x675 gerada automaticamente (`capa.png`) quando o artigo não define `imagem`.
- O Netlify reconstrói o site sozinho a cada push na `main` (configuração em `netlify.toml`). Se o gerador encontrar erro num artigo, o build falha e o site anterior continua no ar.

## Formato do arquivo

```markdown
---
titulo: Título do artigo (como aparece no Google)
descricao: Resumo de até 170 caracteres (vira a descrição no Google)
data: AAAA-MM-DD
area: familia
atualizado: AAAA-MM-DD        # opcional, quando o artigo for revisado
imagem: /artigos/img/foto.jpg # opcional (arquivo em public/ ou URL); sem isso, a capa é gerada
imagem_alt: Descrição da imagem # opcional
slug: endereco-personalizado  # opcional; padrão = nome do arquivo
rascunho: true                # opcional; artigos com rascunho: true NÃO são publicados
---

Texto em Markdown. Use ## para seções (geram o sumário) e ### para subseções.
Não repita o título com # no corpo.
```

Áreas válidas: `previdenciario`, `trabalhista`, `familia`, `consumidor`, `civil`, `sucessoes`, `imobiliario`, `marcas`.

## Regras de conteúdo (obrigatórias)

- Nunca inventar artigos de lei, súmulas, julgados ou números de processo. Toda citação legal ou jurisprudencial precisa ser verificada em fonte pública antes de entrar no texto, e listada na seção final "Fontes".
- Linguagem simples, voltada ao cidadão, caráter informativo (sem promessa de resultado, sem captação ostensiva).
- Publicar somente após aprovação expressa do Dr. Gabriel Costa.

## Publicar um artigo

1. Criar `content/artigos/<slug>.md` (ou remover `rascunho: true` de um rascunho aprovado).
2. Conferir localmente: `npm install && INCLUIR_RASCUNHOS=1 npm run build` e abrir `dist/artigos/<slug>/index.html`.
3. Commit e push na `main`. O Netlify publica em 1–3 minutos.
4. Conferir `https://gabrielcostaadvogado.netlify.app/artigos/<slug>/` e o `sitemap.xml`.
5. Opcional: no Google Search Console, "Inspeção de URL" → "Solicitar indexação" para acelerar.

## Atenção

O projeto também é editado no Google AI Studio (app "LANDING PAGE", sincronizado com este repositório). Antes de editar pelo AI Studio, sincronizar com o GitHub para não sobrescrever `content/`, `scripts/`, `netlify.toml` e `package.json`.
