/**
 * Categorias usadas em todo o site.
 * Para criar uma nova categoria, adicione um item aqui — os filtros e selos
 * são gerados automaticamente a partir destas listas.
 *
 * `tone` define a cor de destaque: coral | violet | teal | sun | rose
 */
export type Tone = 'coral' | 'violet' | 'teal' | 'sun' | 'rose';
export interface Category { id: string; label: string; tone: Tone }

export const EVENT_CATEGORIES: Category[] = [
  { id: 'festas', label: 'Festas', tone: 'coral' },
  { id: 'encontros', label: 'Encontros', tone: 'teal' },
  { id: 'palestras', label: 'Palestras', tone: 'violet' },
  { id: 'workshops', label: 'Workshops', tone: 'sun' },
  { id: 'outros', label: 'Outros', tone: 'rose' },
];

export const ARTICLE_CATEGORIES: Category[] = [
  { id: 'comecando', label: 'Começando na não monogamia', tone: 'coral' },
  { id: 'conceitos', label: 'Conceitos', tone: 'violet' },
  { id: 'relacionamentos', label: 'Relacionamentos', tone: 'rose' },
  { id: 'comunicacao', label: 'Comunicação', tone: 'teal' },
  { id: 'eventos', label: 'Eventos', tone: 'sun' },
  { id: 'entrevistas', label: 'Entrevistas', tone: 'violet' },
  { id: 'comunidade', label: 'Comunidade', tone: 'teal' },
];

export const PROFESSIONAL_CATEGORIES: Category[] = [
  { id: 'psicologia', label: 'Psicologia', tone: 'violet' },
  { id: 'terapia', label: 'Terapia', tone: 'teal' },
  { id: 'direito', label: 'Direito', tone: 'coral' },
  { id: 'saude', label: 'Saúde', tone: 'rose' },
  { id: 'educacao', label: 'Educação', tone: 'sun' },
  { id: 'outros', label: 'Outros', tone: 'teal' },
];

export const INITIATIVE_CATEGORIES: Category[] = [
  { id: 'festas', label: 'Festas', tone: 'coral' },
  { id: 'comunidades', label: 'Comunidades', tone: 'teal' },
  { id: 'eventos', label: 'Eventos', tone: 'sun' },
  { id: 'projetos', label: 'Projetos', tone: 'violet' },
  { id: 'criadores', label: 'Criadores de conteúdo', tone: 'rose' },
  { id: 'organizacoes', label: 'Organizações', tone: 'violet' },
  { id: 'outros', label: 'Outros', tone: 'teal' },
];

const ids = (list: Category[]) => list.map((c) => c.id) as [string, ...string[]];
export const EVENT_CATEGORY_IDS = ids(EVENT_CATEGORIES);
export const ARTICLE_CATEGORY_IDS = ids(ARTICLE_CATEGORIES);
export const PROFESSIONAL_CATEGORY_IDS = ids(PROFESSIONAL_CATEGORIES);
export const INITIATIVE_CATEGORY_IDS = ids(INITIATIVE_CATEGORIES);

export function findCategory(list: Category[], id: string): Category {
  return list.find((c) => c.id === id) ?? { id, label: id, tone: 'teal' };
}
