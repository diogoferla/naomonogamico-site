import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { SITE } from '../config/site';

const visible = (d: { draft?: boolean; example?: boolean }) =>
  !d.draft && (SITE.showExamples || !d.example);

export async function getEvents() {
  const all = await getCollection('events', ({ data }) => visible(data));
  return all.sort((a, b) => a.data.start.getTime() - b.data.start.getTime());
}

/** Separa próximos/passados na hora do build. O navegador reavalia (ver EventStatus). */
export function splitEvents(list: CollectionEntry<'events'>[], now = new Date()) {
  const ended = (e: CollectionEntry<'events'>) => (e.data.end ?? e.data.start).getTime() < now.getTime();
  return {
    upcoming: list.filter((e) => !ended(e)),
    past: list.filter(ended).reverse(),
  };
}

export async function getArticles() {
  const all = await getCollection('articles', ({ data }) => visible(data));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getGuides() {
  const all = await getCollection('guides');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getProfessionals() {
  const all = await getCollection('professionals', ({ data }) => visible(data));
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name, 'pt-BR'));
}

export async function getInitiatives() {
  const all = await getCollection('initiatives', ({ data }) => visible(data));
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name, 'pt-BR'));
}

export async function getFaq() {
  const all = await getCollection('faq', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Textos editáveis de uma página (src/content/pages/<id>.md). */
export async function getPage(id: string) {
  const page = await getEntry('pages', id);
  if (!page) throw new Error(`Textos da página "${id}" não encontrados em src/content/pages/${id}.md`);
  return page;
}

/**
 * Converte texto simples em HTML seguro, transformando *trecho* em destaque (<em>)
 * e quebras de linha em <br>. Usado nos títulos editáveis pelo painel.
 */
export function emphasize(text = '') {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return esc.replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\r?\n/g, '<br />');
}

/** Remove a marcação de destaque (*…*) — para títulos de aba e metadados. */
export const plain = (text = '') => text.replace(/\*/g, '').replace(/\s*\n\s*/g, ' ').trim();

/** Texto puro a partir de Markdown simples (para dados estruturados). */
export const mdToText = (s = '') =>
  s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`#>]/g, '').replace(/\s+/g, ' ').trim();

/* ---------- Formatação ---------- */

const tz = SITE.timezone;

export const fmt = {
  day: (d: Date) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', timeZone: tz }).format(d),
  month: (d: Date) =>
    new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: tz }).format(d).replace('.', ''),
  weekday: (d: Date) => new Intl.DateTimeFormat('pt-BR', { weekday: 'long', timeZone: tz }).format(d),
  long: (d: Date) =>
    new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: tz }).format(d),
  time: (d: Date) =>
    new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(d),
  monthKey: (d: Date) =>
    new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', timeZone: tz }).format(d),
};

export function readingTime(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Hash determinístico simples (para capas geradas). */
export function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).toString();
}

/** Normaliza o caminho da página ("/eventos.html", "/index.html" → "/eventos", "/"). */
export function cleanPath(pathname: string) {
  const p = pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '');
  return p || '/';
}
