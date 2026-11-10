/**
 * Filtro genérico para diretórios (iniciativas, profissionais).
 * Marcação esperada dentro de [data-directory]:
 *  - botões [data-cat] (categoria) com aria-pressed
 *  - selects [data-filter="<atributo>"] que comparam com data-<atributo> de cada item
 *  - itens [data-item] com data-category e demais data-*
 *  - [data-count] (texto de resultados) e [data-empty] (estado vazio)
 */
export function initDirectory(root: HTMLElement, noun: [string, string]) {
  const chips = root.querySelectorAll<HTMLButtonElement>('[data-cat]');
  const selects = root.querySelectorAll<HTMLSelectElement>('[data-filter]');
  const items = root.querySelectorAll<HTMLElement>('[data-item]');
  const count = root.querySelector<HTMLElement>('[data-count]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  let cat = new URLSearchParams(location.search).get('categoria') ?? '';
  if (![...chips].some((c) => c.dataset.cat === cat)) cat = '';

  const apply = () => {
    let n = 0;
    items.forEach((item) => {
      let ok = !cat || item.dataset.category === cat;
      selects.forEach((s) => {
        if (!s.value) return;
        const val = item.dataset[s.dataset.filter!] ?? '';
        const match = s.dataset.match === 'contains' ? val.split(' ').includes(s.value) : val === s.value;
        if (!match) ok = false;
      });
      item.hidden = !ok;
      if (ok) n++;
    });
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === cat)));
    if (count) count.textContent = `${n} ${n === 1 ? noun[0] : noun[1]}`;
    if (empty && items.length) empty.hidden = n > 0;
    const q = new URLSearchParams(location.search);
    cat ? q.set('categoria', cat) : q.delete('categoria');
    history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
  };

  chips.forEach((c) => c.addEventListener('click', () => { cat = c.dataset.cat ?? ''; apply(); }));
  selects.forEach((s) => s.addEventListener('change', apply));
  apply();
}
