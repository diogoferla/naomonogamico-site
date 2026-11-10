# Guia do painel — Não Monogâmico

Endereço: **https://www.naomonogamico.com.br/admin/** (funciona no computador e no celular).

## Entrar

1. Abra o endereço acima e toque em **Entrar com GitHub**.
2. Use a sua conta GitHub (ela precisa ter acesso ao repositório do site).

## Como funciona

- Cada item (artigo, evento, profissional…) é uma "ficha". Preencha os campos e toque em **Salvar**.
- Depois de salvar, o site é atualizado sozinho em **1 a 2 minutos**.
- **Rascunho:** ligue essa opção para guardar sem publicar. Desligue quando quiser que apareça no site.
- **Pré-visualização:** enquanto escreve, o painel mostra uma prévia do texto ao lado (ou em uma aba, no celular).
- Para economizar publicações do mês, você pode salvar várias mudanças escolhendo **não publicar ainda** e fazer a última normalmente — tudo vai junto.

## O que dá para fazer

| Área no painel | O que você gerencia | Onde aparece |
|---|---|---|
| Artigos e entrevistas | Título, subtítulo, data, categoria, imagem, texto | /conteudos (entrevistas também em /conversas) |
| Guias (Entenda) | Os guias introdutórios | /entenda |
| Perguntas frequentes | Perguntas e respostas | /faq |
| Eventos | Agenda completa | /eventos e página de cada evento |
| Profissionais | Diretório | /profissionais e página de cada perfil |
| Iniciativas | Diretório | /iniciativas e página de cada iniciativa |
| Textos das páginas | Títulos, textos de apresentação, Sobre, Privacidade | Cada página |
| Configurações | Instagram, e-mail, WhatsApp, dados de privacidade, conteúdo de exemplo | Rodapé e Política de privacidade |

### Dicas de escrita

- **Destaque colorido nos títulos:** coloque o trecho entre asteriscos. Ex.: `Entenda a *não monogamia*`.
- **Texto:** use os botões do editor para subtítulos, negrito, listas e links.
- **Imagens:** envie pelo campo de imagem e sempre preencha a **descrição da imagem** (acessibilidade).
- **Links:** use o link completo, começando com `https://`.

### Eventos

- Preencha início (e término, se houver) no horário de Brasília.
- Cidades novas entram no filtro automaticamente. Para eventos online, marque **Evento online** e escreva "Online" na cidade.
- Depois da data, o evento vai sozinho para **Eventos passados**.

### Profissionais e iniciativas — cuidados

- Publique apenas **dados profissionais e públicos**, e somente com a concordância da pessoa ou da iniciativa.
- Em "Como o perfil chegou ao site", escolha **Por indicação de terceiros** quando for o caso: o perfil mostra o aviso
  "Perfil incluído a partir de indicação" — não é certificação nem recomendação.
- Em iniciativas, deixe **Informações confirmadas** desligado até conferir os dados com a própria iniciativa.

## Indicações recebidas pelos formulários

Ficam na Netlify: **app.netlify.com → projeto → Forms**. Você também recebe um aviso por e-mail.
Para publicar uma indicação, crie a ficha correspondente no painel. **Depois de analisar, apague o envio** na Netlify
(é o que a política de privacidade promete).

## Antes do lançamento

Em **Configurações**, desligue **Mostrar conteúdo de exemplo** (ou exclua os itens marcados como exemplo).

## Se algo der errado

- **A alteração não apareceu:** aguarde 2 minutos e recarregue a página. Se continuar, verifique em Netlify → Deploys se a última publicação falhou; a mensagem indica qual campo corrigir.
- **Errei e salvei:** todo salvamento fica no histórico do GitHub e pode ser revertido por quem cuida do site.
