/** Canais públicos de contato (profissionais/iniciativas) → links prontos para exibir. */
export interface ContactLink { label: string; href: string; external: boolean; text?: string }

const digits = (s = '') => s.replace(/\D/g, '');

export function contactLinks(d: {
  website?: string; instagram?: string; link?: string; whatsapp?: string; email?: string; phone?: string;
}): ContactLink[] {
  const out: ContactLink[] = [];
  if (d.instagram) out.push({ label: 'Instagram', href: d.instagram, external: true });
  if (d.website) out.push({ label: 'Site', href: d.website, external: true });
  if (d.link) out.push({ label: 'Link', href: d.link, external: true });
  if (d.whatsapp) {
    const n = digits(d.whatsapp);
    out.push({ label: 'WhatsApp', href: `https://wa.me/${n.startsWith('55') ? n : '55' + n}`, external: true, text: d.whatsapp });
  }
  if (d.email) out.push({ label: 'E-mail', href: `mailto:${d.email}`, external: false, text: d.email });
  if (d.phone) out.push({ label: 'Telefone', href: `tel:+${digits(d.phone).startsWith('55') ? '' : '55'}${digits(d.phone)}`, external: false, text: d.phone });
  return out;
}

export const ATTENDANCE_LABEL: Record<string, string> = { presencial: 'Presencial', online: 'Online' };
