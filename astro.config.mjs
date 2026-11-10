// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// A URL canônica também está em src/config/site.ts — mantenha as duas iguais.
const SITE_URL = 'https://www.naomonogamico.com.br';

// PREVIEW_BUNDLE=1 gera uma versão com CSS/JS embutidos (usada só para a página de teste).
const previewBundle = !!process.env.PREVIEW_BUNDLE;

export default defineConfig({
  site: SITE_URL,
  ...(previewBundle && {
    outDir: './dist-preview',
    vite: { build: { assetsInlineLimit: 100_000_000 } },
  }),
  trailingSlash: 'never',
  build: { format: 'file', ...(previewBundle && { inlineStylesheets: 'always' }) },
  integrations: [
    sitemap({
      // Conteúdo demonstrativo (arquivos "exemplo-*") e a 404 ficam fora do sitemap.
      filter: (page) => !page.includes('/exemplo-') && !/\/(404|admin|contribua\/enviado)/.test(page),
    }),
  ],
});
