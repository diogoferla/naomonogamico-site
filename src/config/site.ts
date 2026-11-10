/**
 * Configuração central do site.
 * Valores editáveis pelo painel (/admin → Configurações) ficam em src/data/settings.json.
 */
import settings from '../data/settings.json';

const clean = (v: string | undefined) => (v ?? '').trim();
const instagramUrl = (v: string) => {
  const s = clean(v);
  if (!s) return '';
  if (/^https?:\/\//.test(s)) return s;
  return `https://www.instagram.com/${s.replace(/^@/, '')}/`;
};
const whatsappUrl = (v: string) => {
  const d = clean(v).replace(/\D/g, '');
  return d ? `https://wa.me/${d.startsWith('55') ? d : '55' + d}` : '';
};

export const SITE = {
  name: 'Não Monogâmico',
  /** URL canônica (domínio principal com www). Mantenha igual em astro.config.mjs. */
  url: 'https://www.naomonogamico.com.br',
  domainLabel: 'NaoMonogamico.com.br',
  locale: 'pt_BR',
  lang: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  tagline: 'Relações no plural.',
  description:
    'Guia independente sobre não monogamia: conteúdos introdutórios, agenda de eventos, iniciativas da comunidade e profissionais que atendem pessoas não monogâmicas.',

  /** Canais oficiais — vazios não aparecem em lugar nenhum. Editáveis no painel. */
  social: {
    instagram: instagramUrl(settings.instagram),
    instagramHandle: clean(settings.instagram).replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '').replace(/^@?/, '@'),
    email: clean(settings.contact_email),
    whatsapp: whatsappUrl(settings.whatsapp),
  },

  privacy: {
    controller: clean(settings.privacy_controller),
    email: clean(settings.privacy_email) || clean(settings.contact_email),
  },

  /**
   * Envio de formulários: 'netlify' usa Netlify Forms (envios ficam no painel da Netlify).
   * Em qualquer outro ambiente (ex.: prévia local), o envio é simulado e nada é transmitido.
   */
  forms: 'netlify' as const,

  /** Exibe entradas marcadas como `example: true`. Editável no painel. */
  showExamples: settings.show_examples !== false,
};

export const NAV = [
  { href: '/', label: 'Início' },
  { href: '/entenda', label: 'Entenda' },
  { href: '/eventos', label: 'Eventos', highlight: true },
  { href: '/conteudos', label: 'Conteúdos' },
  { href: '/profissionais', label: 'Profissionais' },
  { href: '/iniciativas', label: 'Iniciativas' },
  { href: '/sobre', label: 'Sobre' },
];
