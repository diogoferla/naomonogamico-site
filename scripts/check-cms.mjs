/**
 * Confere se o painel (/admin/config.yml) está alinhado com o site:
 *  - categorias dos campos de seleção = src/data/categories.ts
 *  - pastas e arquivos apontados pelo painel existem
 * Roda antes de cada build (npm run build). Se algo estiver diferente, o build para com uma mensagem clara.
 */
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import * as cats from '../src/data/categories.ts';

const cfg = parse(readFileSync(new URL('../public/admin/config.yml', import.meta.url), 'utf8'));
const errors = [];
const byName = Object.fromEntries(cfg.collections.filter((c) => c.name).map((c) => [c.name, c]));

const expect = {
  articles: cats.ARTICLE_CATEGORIES,
  events: cats.EVENT_CATEGORIES,
  professionals: cats.PROFESSIONAL_CATEGORIES,
  initiatives: cats.INITIATIVE_CATEGORIES,
};
for (const [name, list] of Object.entries(expect)) {
  const field = byName[name]?.fields.find((f) => f.name === 'category');
  const got = (field?.options ?? []).map((o) => o.value).sort().join(',');
  const want = list.map((c) => c.id).sort().join(',');
  if (got !== want) errors.push(`Categorias de "${name}" no painel (${got}) ≠ src/data/categories.ts (${want})`);
}
for (const c of cfg.collections) {
  if (c.folder && !existsSync(new URL(`../${c.folder}`, import.meta.url))) errors.push(`Pasta inexistente: ${c.folder}`);
  for (const f of c.files ?? []) {
    if (!existsSync(new URL(`../${f.file}`, import.meta.url))) errors.push(`Arquivo inexistente: ${f.file}`);
  }
}
if (/^CONFIGURAR\//.test(cfg.backend?.repo ?? '')) {
  console.warn('⚠️  Painel: defina backend.repo em public/admin/config.yml (ver docs/PUBLICACAO.md).');
}
if (errors.length) {
  console.error('❌ Painel desalinhado com o site:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log('✓ Painel (/admin) alinhado com o site.');
