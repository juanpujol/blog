---
title: "Internacionalizei meu app porque os agentes de IA não paravam de escrever em português"
description: "Como uma migração de i18n em 785 arquivos tirou o português do código quando as regras para agentes não deram conta."
pubDate: "2026-08-09"
locale: "pt-br"
translationKey: "codebase-is-the-prompt"
---

Não foi pelos usuários. Não foi por uma "expansão global". Ninguém pediu inglês.

## As regras diziam uma coisa, o código dizia outra

A <a href="https://laiki.co" target="_blank" rel="noopener">Laiki</a> é uma plataforma de marketing analytics para o mercado brasileiro. A UI sempre foi em pt-BR porque os usuários falam pt-BR. Por isso, labels, mensagens de validação, erros e emails acabaram escritos direto nos componentes.

Quando comecei a usar agentes de IA no dia a dia, eles seguiram o padrão que já estava ali. O português começou a aparecer fora da UI, em comentários, documentação e até uma migração de banco de dados. A UI já não era mais o limite.

Então escrevi regras. `AGENTS.md`, instruções, memórias, o pacote todo:

> "PT-BR é SÓ para textos da interface. Nunca use em SQL, migrações de banco de dados ou código de backend."

Os agentes liam a regra, concordavam, abriam um componente com 40 strings em português e escreviam mais português. Show de bola!

Não era burrice. Era imitação. Os agentes tinham uma linha no `AGENTS.md` dizendo "não escreva em português" e milhares de linhas de código mostrando o contrário. Sem chance essa regrinha fazer alguma diferença.

Pensei em resolver isso com lint. Seria determinístico e não dependeria do agente seguir uma instrução. Só que a UI precisava continuar em português, e os textos ainda estavam nos componentes. Se eu ativasse a regra naquele momento, quebraria tudo!

Precisei mover os textos dos componentes para arquivos de tradução. Só depois consegui deixar o código em inglês e bloquear português no resto do repositório.

O app falar dois idiomas foi um efeito colateral. Fica ótimo na demo.

## "É só extrair as strings"

O plano parecia simples. Escolher uma biblioteca, extrair as strings e terminar. Escolhi Paraglide JS. Foi uma boa escolha. A estimativa estava completamente errada.

A migração levou 43 commits, mexeu em 785 arquivos e gerou 3.237 chaves de mensagem. A conta cresceu por três motivos que a estimativa ingênua ignorou.

**Primeiro, eu também estava trocando o idioma base do produto.** O app tinha pt-BR como idioma base e passou a ter en-US. Isso transformou a extração em um trabalho de tradução de tudo.

**Segundo, a UI era só metade do trabalho.** Ainda havia texto em validações, emails, prompts de IA etc. Você entendeu.

**Terceiro, compilar em inglês não significava que a migração estava pronta.** Uma auditoria completa ainda encontrou uns 70 problemas reais.

## Os agentes fizeram a migração

Eu não digitei nenhum daqueles 43 commits. Orquestrei os agentes em cada fase, coloquei outros para revisar o trabalho e botei o chapéu de gerente chato. As revisões encontraram bugs reais, inclusive um script que terminava como se estivesse tudo certo enquanto o próprio resultado dizia "not ready".

Os agentes causaram o problema, fizeram a migração e agora três regras de lint vigiam eles. As máquinas quebraram, as máquinas consertaram e agora as máquinas vigiam as máquinas. Eu basicamente supervisiono e pago a conta dos tokens.

## Valeu a pena?

Não sei, mano. Foram quatro dias puxados e uma bela conta de tokens para resolver o que, no fundo, é um problema de disciplina. Talvez modelos melhores nem precisem disso no ano que vem.

Mas hoje o código está em inglês. Os agentes escrevem em inglês porque é isso que encontram. Se português voltar para o código, o CI falha antes de virar discussão no code review.

Se um agente ignora uma convenção do repositório, vale olhar para os exemplos que ele encontra antes de escrever mais uma regra. Se o repositório está cheio do padrão errado, o `AGENTS.md` vai perder. Corrija o padrão, isole as exceções e deixe o lint bloquear o resto.

Quase sem querer, o app também passou a falar dois idiomas. O que eu queria mesmo era parar de corrigir português escrito por agente.
