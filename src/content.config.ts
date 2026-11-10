import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  EVENT_CATEGORY_IDS,
  ARTICLE_CATEGORY_IDS,
  PROFESSIONAL_CATEGORY_IDS,
  INITIATIVE_CATEGORY_IDS,
} from './data/categories';

/*
 * Todo o conteúdo fica em src/content/<coleção>/*.md (um arquivo por item) e pode ser
 * editado pelo painel (/admin) ou diretamente nos arquivos. O painel grava campos vazios
 * como "" — os auxiliares abaixo tratam "" como "não preenchido".
 */
const blank = (v: unknown) => (typeof v === 'string' && v.trim() === '') || v === null ? undefined : v;
const optText = z.preprocess(blank, z.string().trim().optional());
const optUrl = z.preprocess(blank, z.url({ message: 'Use um link completo, começando com https://' }).optional());
const optDate = z.preprocess(blank, z.coerce.date().optional());

/** Datas sem horário (AAAA-MM-DD) viram meio-dia UTC, evitando "voltar um dia" no fuso de Brasília. */
const toNoon = (d: Date) => (d.getUTCHours() === 0 && d.getUTCMinutes() === 0 ? new Date(d.getTime() + 12 * 3600e3) : d);
const dateOnly = z.coerce.date().transform(toNoon);
const optDateOnly = z.preprocess(blank, z.coerce.date().transform(toNoon).optional());

const md = (folder: string) => glob({ pattern: '**/[^_]*.md', base: `./src/content/${folder}` });

/** Eventos */
const events = defineCollection({
  loader: md('events'),
  schema: z.object({
    title: z.string(),
    /** Data/hora de início no formato ISO com fuso: 2026-11-14T22:00:00-03:00 */
    start: z.coerce.date(),
    end: optDate,
    category: z.enum(EVENT_CATEGORY_IDS),
    city: z.string(),
    state: z.preprocess(blank, z.string().length(2).optional()),
    venue: optText,
    address: optText,
    online: z.boolean().default(false),
    organizer: z.string(),
    summary: z.string().max(220),
    url: optUrl,
    instagram: optUrl,
    price: optText,
    image: optText,
    imageAlt: optText,
    example: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/** Artigos e entrevistas */
const articles = defineCollection({
  loader: md('articles'),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    date: dateOnly,
    updated: optDateOnly,
    author: z.preprocess(blank, z.string().default('Não Monogâmico')),
    category: z.enum(ARTICLE_CATEGORY_IDS),
    /** 'entrevista' faz o texto aparecer também em /conversas */
    type: z.enum(['artigo', 'entrevista']).default('artigo'),
    interviewee: optText,
    tags: z.array(z.string()).default([]),
    image: optText,
    imageAlt: optText,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    example: z.boolean().default(false),
  }),
});

/** Guias introdutórios da seção "Entenda" */
const guides = defineCollection({
  loader: md('guides'),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    short: z.string().max(140),
    order: z.number(),
    updated: dateOnly,
  }),
});

/** Profissionais (o corpo do arquivo é a apresentação completa, opcional) */
const professionals = defineCollection({
  loader: md('professionals'),
  schema: z.object({
    name: z.string(),
    profession: z.string(),
    category: z.enum(PROFESSIONAL_CATEGORY_IDS),
    specialties: z.array(z.string()).default([]),
    attendance: z.array(z.enum(['presencial', 'online'])).default([]),
    city: optText,
    state: optText,
    description: z.string().max(280),
    registration: optText,
    instagram: optUrl,
    website: optUrl,
    whatsapp: optText,
    email: z.preprocess(blank, z.email().optional()),
    phone: optText,
    /** 'indicacao' = perfil incluído a partir de indicação de terceiros (não é certificação) */
    source: z.preprocess(blank, z.enum(['proprio', 'indicacao']).optional()),
    draft: z.boolean().default(false),
    example: z.boolean().default(false),
  }),
});

/** Iniciativas (festas, comunidades, projetos…) */
const initiatives = defineCollection({
  loader: md('initiatives'),
  schema: z.object({
    name: z.string(),
    category: z.enum(INITIATIVE_CATEGORY_IDS),
    description: z.string().max(280),
    region: optText,
    instagram: optUrl,
    website: optUrl,
    link: optUrl,
    image: optText,
    imageAlt: optText,
    /** false = informações ainda não confirmadas com a própria iniciativa */
    verified: z.boolean().default(false),
    draft: z.boolean().default(false),
    example: z.boolean().default(false),
  }),
});

/** Perguntas frequentes (o corpo do arquivo é a resposta) */
const faq = defineCollection({
  loader: md('faq'),
  schema: z.object({
    question: z.string(),
    group: z.enum(['conceitos', 'na-pratica', 'sobre-o-site']),
    order: z.number(),
    link: z
      .preprocess(
        (v) => (v && typeof v === 'object' && !(v as { href?: string }).href ? undefined : v),
        z.object({ href: z.string(), label: z.string() }).optional(),
      ),
    draft: z.boolean().default(false),
  }),
});

/** Textos das páginas (cabeçalhos, descrições para o Google, textos institucionais) */
const pages = defineCollection({
  loader: md('pages'),
  schema: z.object({
    seo_title: z.string(),
    seo_description: z.string().max(220),
    eyebrow: optText,
    title: z.string(),
    lede: optText,
    // Início
    journey_title: optText,
    journey_text: optText,
    what_eyebrow: optText,
    what_title: optText,
    what_highlight: optText,
    what_text: optText,
    values: z.array(z.string()).default([]),
    updated: optDateOnly,
    // Sobre
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  }),
});

export const collections = { events, articles, guides, professionals, initiatives, faq, pages };
