"""Gera uma página única (preview navegável) a partir de dist-preview/.
Uso: PREVIEW_BUNDLE=1 npx astro build && python3 scripts-preview.py saida.html
"""
import re, os, sys, json, base64, glob
ROOT = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(ROOT, 'dist-preview')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'preview.html')

def b64(path, mime):
    return f"data:{mime};base64," + base64.b64encode(open(path, 'rb').read()).decode()

# --- chunks JS (ESM -> IIFE) ---
chunks = {}
for f in glob.glob(os.path.join(D, '_astro', '*.js')):
    chunks[os.path.basename(f)] = open(f).read()

def inline_js(code):
    def rep(m):
        names, file = m.group(1), m.group(2)
        src = chunks[file]
        ex = re.search(r'export\{([^}]*)\};?\s*$', src)
        body = src[:ex.start()]
        exports = {}
        for part in ex.group(1).split(','):
            part = part.strip()
            if ' as ' in part: local, pub = part.split(' as ')
            else: local = pub = part
            exports[pub.strip()] = local.strip()
        obj = '{' + ','.join(f'{k}:{v}' for k, v in exports.items()) + '}'
        binds = []
        for part in names.split(','):
            part = part.strip()
            pub, local = (part.split(' as ') + [part])[:2] if ' as ' in part else (part, part)
            binds.append(f'{local.strip()}=__m.{pub.strip()}')
        return f'var __m=(function(){{{inline_js(body)};return {obj}}})();var {",".join(binds)};'
    return re.sub(r'import\{([^}]*)\}from"\./([^"]+)";', rep, code)

# --- fontes (apenas subconjunto latin) ---
F = os.path.join(ROOT, 'node_modules', '@fontsource-variable')
fonts_css = (
    "@font-face{font-family:'Montserrat Variable';font-style:normal;font-display:swap;font-weight:100 900;src:url(%s) format('woff2')}"
    "@font-face{font-family:'Inter Variable';font-style:normal;font-display:swap;font-weight:100 900;src:url(%s) format('woff2')}"
) % (b64(f'{F}/montserrat/files/montserrat-latin-wght-normal.woff2', 'font/woff2'),
     b64(f'{F}/inter/files/inter-latin-wght-normal.woff2', 'font/woff2'))

assets = {
    '/brand/logo-badge.webp': b64(os.path.join(D, 'brand/logo-badge.webp'), 'image/webp'),
    '/brand/symbol.png': b64(os.path.join(D, 'brand/symbol.png'), 'image/png'),
}

pages = {}
for f in glob.glob(os.path.join(D, '**', '*.html'), recursive=True):
    rel = os.path.relpath(f, D)[:-5]
    if rel.startswith('admin'):
        continue
    route = '/' if rel == 'index' else '/' + rel
    html = open(f).read()
    html = re.sub(r'@font-face\{[^}]*\}', '', html)
    html = re.sub(r'<script type="module" src="/_astro/([^"]+)"></script>',
                  lambda m: '<script type="module">' + inline_js(chunks[m.group(1)]) + '</script>', html)
    html = re.sub(r'<script type="module">(.*?)</script>',
                  lambda m: '<script type="module">' + inline_js(m.group(1)) + '</script>', html, flags=re.S)
    html = re.sub(r'<link rel="(icon|apple-touch-icon|manifest|sitemap)"[^>]*>', '', html)
    # downloads não funcionam na prévia hospedada
    html = re.sub(r'<a [^>]*href="/eventos/[^"]+\.ics"[^>]*>.*?</a>', '', html, flags=re.S)
    for k in assets:
        html = html.replace(f'"{k}"', f'"%%{k}%%"')
    html = html.replace('</head>', '<style>%%FONTS%%</style>%%ROUTER%%</head>', 1)
    pages[route] = html

assert not any('/_astro/' in h for h in pages.values()), 'ainda há referências a /_astro/'

router = ''

shell = r'''<title>Não Monogâmico</title>
<style>html,body{background:#0b0b0f;color:#f5f4f8;margin:0}</style>
<p style="font:16px system-ui;padding:24px">Carregando a prévia…</p>
<script>
(function(){
  var PAGES = %s;
  var ASSETS = %s;
  var FONTS = %s;
  var ROUTER = %s;
  function render(route){
    var html = PAGES[route] || PAGES['/404'];
    html = html.replace('%%%%FONTS%%%%', FONTS).replace('%%%%ROUTER%%%%', ROUTER);
    for (var k in ASSETS) html = html.split('%%%%' + k + '%%%%').join(ASSETS[k]);
    return html;
  }
  function attach(path){
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) !== '/' || href.slice(-4) === '.ics') return;
      e.preventDefault();
      window.__nmGo(href);
    });
    var bar = document.createElement('div');
    bar.setAttribute('role', 'note');
    bar.style.cssText = 'position:fixed;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:999;background:#15151c;color:#c9c7d3;border:1px solid #2c2b36;border-radius:999px;padding:6px 12px;font:600 12px/1.2 system-ui,sans-serif;pointer-events:none';
    bar.textContent = 'Prévia de teste · ' + path;
    (document.body || document.documentElement).appendChild(bar);
  }
  window.__nmGo = function(href){
    var m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
    var path = (m[1] || '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    var qs = m[2] || '', hash = m[3] || '';
    try { history.replaceState(null, '', location.pathname + qs); } catch (e) {}
    window.__nmRoute = path;
    var doc = render(path);
    document.open(); document.write(doc); document.close();
    attach(path);
    setTimeout(function(){
      var t = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
      if (t) { if (t.tagName === 'DETAILS') t.open = true; t.scrollIntoView(); } else window.scrollTo(0, 0);
    }, 60);
  };
  if (document.readyState === 'complete') window.__nmGo('/'); else window.addEventListener('load', function(){ window.__nmGo('/'); });
})();
</script>'''
out = shell % (json.dumps(pages), json.dumps(assets), json.dumps(fonts_css), json.dumps(router))
out = out.replace('</script>\n<script', '</script>\n<script')
# evita que "</script>" dentro das strings JSON feche o script do shell
head, rest = out.split('<script>\n(function(){\n  var PAGES', 1)
rest = rest.replace('</script>', '<\\/script>')
rest = rest[: rest.rfind('<\\/script>')] + '</script>'
out = head + '<script>\n(function(){\n  var PAGES' + rest
open(OUT, 'w').write(out)
print(OUT, round(len(out) / 1e6, 2), 'MB', len(pages), 'páginas')
