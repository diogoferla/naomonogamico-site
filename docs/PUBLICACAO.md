# Publicação — passo a passo (Netlify + GitHub + domínio)

Este guia é para quem vai colocar o site no ar. Nada aqui é irreversível, mas os passos 4 e 5
(domínio) mexem no registro do domínio e devem ser feitos **junto com o Diogo**.

## Visão geral

```
Diogo edita no painel (/admin) ──► GitHub (repositório guarda os arquivos)
                                        │
                                        ▼
                          Netlify reconstrói o site (1–2 min)
                                        │
                                        ▼
                          www.naomonogamico.com.br atualizado
Formulários do site ──► Netlify Forms (painel da Netlify + aviso por e-mail)
```

Não há banco de dados: tudo o que o painel edita são os arquivos em `src/content/` e `src/data/`.

## 1. Repositório no GitHub

1. Crie uma conta GitHub para o projeto (ou use a do Diogo) e um repositório **privado** chamado `naomonogamico`.
2. Envie este projeto para o repositório (branch `main`).
3. Em `public/admin/config.yml`, `repo:` aponta para o repositório (hoje `diogoferla/naomonogamico-site`, branch `site-novo`). Se o repositório mudar de dono, atualize esse valor.
4. Se o Diogo usar outra conta GitHub, adicione-a como colaboradora do repositório (Settings → Collaborators).

## 2. Site na Netlify

1. Netlify → **Add new project → Import an existing project → GitHub** → escolha o repositório.
2. As configurações de build já vêm do `netlify.toml` (comando `npm run build`, pasta `dist`, Node 22).
3. Depois do primeiro deploy, confira o site no endereço provisório `*.netlify.app`.

## 3. Login do painel (GitHub via Netlify)

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: `https://www.naomonogamico.com.br`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Copie o **Client ID** e gere um **Client secret**.
3. Netlify → projeto → **Project configuration → Access & security → OAuth → Install provider → GitHub** e cole os dois valores.
4. Acesse `https://SEU-SITE/admin/` e clique em **Entrar com GitHub**.

> A Netlify Identity / Git Gateway **não** são usados (o Git Gateway foi descontinuado pela Netlify).

## 4. Domínio `www.naomonogamico.com.br`

1. Netlify → **Domain management → Add a domain** → `www.naomonogamico.com.br` e defina como **primary domain**.
   A Netlify adiciona `naomonogamico.com.br` (sem www) e redireciona para o www automaticamente.
2. No Registro.br, escolha **uma** opção:
   - **DNS da Netlify (mais simples):** troque os servidores DNS do domínio pelos que a Netlify mostrar; ou
   - **Manter o DNS atual:** crie os registros que a Netlify indicar na tela (normalmente um `A`/`ALIAS` para o domínio sem www e um `CNAME` de `www` para o endereço `*.netlify.app`).
3. Antes de trocar, anote os registros existentes (especialmente **MX**, se houver e-mail no domínio) para não interromper outros serviços.

## 5. HTTPS

Depois que o DNS propagar, a Netlify emite o certificado (Let's Encrypt) automaticamente.
Em **Domain management → HTTPS**, confirme "Certificate active" e mantenha **Force HTTPS** ligado.

## 6. Formulários (Netlify Forms)

1. Netlify → **Forms → Enable form detection** e faça um novo deploy. Devem aparecer 4 formulários:
   `indicacao-evento`, `indicacao-profissional`, `sugestao-iniciativa`, `contribuicao-conteudo`.
2. **Forms → Form notifications → Add notification → Email notification** com o e-mail que vai receber as indicações.
3. Teste um envio de cada formulário no site publicado e apague os testes.
4. Rotina combinada na política de privacidade: **apagar os envios depois de analisados** (Forms → selecionar → Delete).

## 7. Antes de anunciar o site

- [ ] Painel: cadastrar dados reais e, em **Configurações**, desligar "Mostrar conteúdo de exemplo" (ou excluir os itens de exemplo).
- [ ] Configurações: preencher contatos autorizados (rodapé) e o responsável + e-mail de privacidade.
- [ ] Completar Plural, Snomono e Anam com informações confirmadas (ou despublicar).
- [ ] Google Search Console: adicionar a propriedade do domínio e enviar `https://www.naomonogamico.com.br/sitemap-index.xml`.
- [ ] Revisão jurídica da política de privacidade (recomendada).

## Custos e limites (plano gratuito da Netlify)

Os valores abaixo são da tabela da Netlify em novembro/2026 — confira na conta, pois podem mudar.

- 300 créditos/mês; cada publicação (deploy de produção) usa 15 créditos e o tráfego também consome créditos.
- Na prática, cabem **cerca de 20 publicações por mês** com pouco tráfego. Envios de formulário não consomem créditos.
- No plano gratuito há limite rígido: ao acabar os créditos, novas publicações param até o mês seguinte.
- Para economizar: ao salvar no painel, use a opção de **não publicar ainda** e publique várias mudanças de uma vez.
  Se o uso crescer, o plano pago resolve.
