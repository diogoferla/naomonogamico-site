---
# ARQUIVO-MODELO — arquivos que começam com "_" são ignorados pelo site.
# Para criar um evento: copie este arquivo, renomeie (o nome vira a URL:
# "roda-de-conversa-sp.md" → /eventos/roda-de-conversa-sp) e preencha.
title: Nome do evento
start: 2026-12-01T19:00:00-03:00      # data e hora de início (com fuso -03:00)
end: 2026-12-01T22:00:00-03:00        # opcional
category: encontros                    # festas | encontros | palestras | workshops | outros
city: São Paulo
state: SP                              # opcional (2 letras)
venue: Nome do local                   # opcional
address: Rua Exemplo, 123 — Bairro     # opcional
online: false                          # true para eventos online (city pode ser "Online")
organizer: Nome de quem organiza
summary: Uma frase curta (até 220 caracteres) que aparece nos cards.
url: https://site-do-evento.com        # opcional — link para ingressos/inscrição
instagram: https://instagram.com/perfil # opcional
price: Gratuito                        # opcional, texto livre
image: /images/eventos/capa.jpg        # opcional — coloque o arquivo em public/images/eventos/
imageAlt: Descrição da imagem          # obrigatório se houver imagem
example: false
draft: false                           # true = não aparece no site
---

Descrição completa do evento, em Markdown. Pode ter parágrafos, listas e links.
