import type { APIRoute } from 'astro';
import { getEvents, absoluteUrl } from '../../lib/content';

export async function getStaticPaths() {
  const events = await getEvents();
  return events.map((event) => ({ params: { slug: event.id }, props: { event } }));
}

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (s = '') => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

export const GET: APIRoute = ({ props }) => {
  const { event } = props as { event: Awaited<ReturnType<typeof getEvents>>[number] };
  const d = event.data;
  const url = absoluteUrl(`/eventos/${event.id}`);
  const location = d.online ? 'Online' : [d.venue, d.address, d.city, d.state].filter(Boolean).join(', ');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nao Monogamico//Agenda//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@naomonogamico.com.br`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(d.start)}`,
    `DTEND:${stamp(d.end ?? new Date(d.start.getTime() + 2 * 3600e3))}`,
    `SUMMARY:${esc(d.title)}`,
    `DESCRIPTION:${esc(`${d.summary}\n\n${url}`)}`,
    `LOCATION:${esc(location)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return new Response(ics, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
