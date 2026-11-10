# Não Monogâmico — www.naomonogamico.com.br

Guia independente sobre não monogamia: guias introdutórios, blog, agenda de eventos,
diretório de iniciativas e de profissionais.

Site estático em [Astro](https://astro.build), hospedado na Netlify, com painel administrativo
([Sveltia CMS](https://sveltiacms.app)) em `/admin`. Sem banco de dados: o conteúdo fica em arquivos
Markdown/JSON dentro de `src/`, editados pelo painel e versionados no GitHub.

- **Publicar o site:** [`docs/PUBLICACAO.md`](docs/PUBLICACAO.md)
- **Usar o painel (para o Diogo):** [`docs/GUIA-DO-PAINEL.md`](docs/GUIA-DO-PAINEL.md)

---

## Rodando localmente

Requisitos: Node.js 22.18+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # confere o painel e gera dist/
npm run check      # verificação de tipos + painel
```

O comando `npm run build` primeiro roda `scripts/check-cms.mjs`, que bloqueia o build se as categorias
do painel (`public/admin/config.yml`) estiverem diferentes das do site (`src/data/categories.ts`).

## Conteúdo

| O quê | Onde | Painel |
|---|---|---|
| Artigos e entrevistas | `src/content/articles/*.md` | Artigos e entrevistas |
| Guias "Entenda" | `src/content/guides/*.md` | Guias |
| Perguntas frequentes | `src/content/faq/*.md` | Perguntas frequentes |
| Eventos | `src/content/events/*.md` | Eventos |
| Profissionais | `src/content/professionals/*.md` | Profissionais |
| Iniciativas | `src/content/initiatives/*.md` | Iniciativas |
| Textos das páginas | `src/content/pages/*.md` | Textos das páginas |
| Contatos, privacidade, exemplos | `src/data/settings.json` | Configurações |
| Categorias | `src/data/categories.ts` + `public/admin/config.yml` | — (código) |
| Imagens enviadas | `public/images/uploads/` | Campo de imagem |

Os esquemas (campos obrigatórios, formatos) ficam em `src/content.config.ts`. Arquivos que começam
com `_` (ex.: `_modelo.md`) são ignorados. Itens com `draft: true` não são publicados; itens com
`example: true` aparecem com o selo "Exemplo", ficam fora do sitemap e com `noindex`.

Títulos editáveis aceitam `*trecho*` para destaque com o degradê da marca.

## Páginas

| URL | Conteúdo |
|---|---|
| `/` | Início: proposta, portas de entrada, o que é, guias, eventos, diretórios, conteúdos |
| `/entenda`, `/entenda/[guia]` | Guias introdutórios |
| `/eventos`, `/eventos/[evento]` | Agenda (filtros por período, categoria, cidade e mês; ordenação por data, nome, cidade, categoria) + página do evento com .ics e Google Agenda |
| `/conteudos`, `/conteudos/[texto]` | Blog com filtro por categoria, relacionados e compartilhamento |
| `/conversas` | Entrevistas |
| `/profissionais`, `/profissionais/[perfil]` | Diretório (área, atendimento online/presencial, cidade) + página do perfil |
| `/iniciativas`, `/iniciativas/[iniciativa]` | Diretório + página da iniciativa |
| `/faq` | Perguntas frequentes (`FAQPage`) |
| `/sobre` | Sobre o projeto |
| `/contribua` | 4 formulários (Netlify Forms) |
| `/privacidade` | Política de privacidade |
| `/admin` | Painel administrativo (não indexado) |

## Formulários e privacidade

- Enviados via **Netlify Forms** (`data-netlify="true"`, anti-spam por honeypot). Os envios ficam no painel da Netlify.
- Fora do domínio publicado (prévias, localhost) o envio é **simulado** e nada é transmitido.
- Nenhum dado de quem indica é obrigatório. O único contato pessoal possível é opcional (formulário de conteúdo)
  e exige autorização explícita quando preenchido.
- O site não usa cookies, analytics nem scripts de terceiros (os botões de compartilhar são links simples).

## Identidade visual

- **Logo oficial:** selo circular "Não Monogamia" (três figuras com corpos em forma de coração, entrelaçadas).
  - Original: `src/assets/logo-original.png`; versão com fundo transparente: `src/assets/logo-transparent.png`
  - No site: `public/brand/logo-badge.webp|png` (selo completo — Home e rodapé) e
    `public/brand/symbol.png` (só o símbolo — cabeçalho). Favicons gerados a partir do símbolo.
  - Para trocar por um arquivo vetorial (SVG) quando existir, basta substituir esses arquivos mantendo os nomes.
- **Tema:** escuro, como a logo. Fundo `#0B0B0F`, texto `#F5F4F8`.
- **Paleta (extraída do gradiente da logo):** laranja `#FF7A45`, coral `#F4475F`, magenta `#D8327A`,
  violeta `#8B3FD1`, azul `#4750E0`, turquesa `#44C3C8`. Gradiente completo em `--grad`.
  Para texto colorido, usar as variantes `--*-ink` (contraste AA sobre o fundo escuro).
- **Tipografia:** Montserrat (títulos, alinhada ao lettering da logo) e Inter (texto). Fontes hospedadas no próprio site.
- **Tokens:** espaçamento, tipografia fluida, raios e sombras em `src/styles/global.css` (`:root`).

---

## SEO e acessibilidade

- `title`, `description`, `canonical` (com www), Open Graph e Twitter Cards em todas as páginas
- `sitemap-index.xml` e `robots.txt` (painel e páginas de exemplo fora do índice)
- JSON-LD: `WebSite`, `BreadcrumbList`, `Event`, `BlogPosting`, `Article`, `FAQPage`, `Person`, `Organization`, `AboutPage`
  (nunca para conteúdo de exemplo)
- HTML semântico, um `h1` por página, "Pular para o conteúdo", foco visível, menu mobile acessível,
  `aria-pressed`/`aria-live` nos filtros, labels em todos os campos, `prefers-reduced-motion`

## Prévia em arquivo único

```bash
npm run preview:bundle   # gera preview.html (todas as páginas navegáveis em um só arquivo)
```
