/**
 * O site é estático: a separação "próximos / passados" é feita no build.
 * Este script reavalia no navegador, para que um evento que já passou
 * não continue aparecendo como "próximo" até o próximo deploy.
 */
export function isPast(el: HTMLElement, now = Date.now()) {
  const end = Date.parse(el.dataset.end ?? el.dataset.start ?? '');
  return Number.isFinite(end) && end < now;
}

export function markPast(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-event]').forEach((el) => {
    const past = isPast(el);
    el.classList.toggle('is-past', past);
    el.dataset.past = String(past);
    el.querySelector<HTMLElement>('.past-flag')?.toggleAttribute('hidden', !past);
  });
}
