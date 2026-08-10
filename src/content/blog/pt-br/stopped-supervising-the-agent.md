---
title: "Parei de supervisionar o agente"
description: "Uso agentes de IA todos os dias. Neste blog, defini os limites e deixei um agente cuidar de quase toda a implementação."
pubDate: "2026-08-10"
locale: "pt-br"
translationKey: "stopped-supervising-the-agent"
---

Construí este blog em umas quatro horas, basicamente conversando com um agente.

Eu tinha uma ideia solta do design e o primeiro artigo já estava pronto. Escolhi Astro, decidi hospedar no Cloudflare e tentei não dizer ao agente como implementar tudo.

Não é minha primeira vez construindo com agentes. Trabalho com eles todos os dias, mas normalmente com muito mais supervisão.

Nos últimos dois anos, venho construindo a <a href="https://laiki.co" target="_blank" rel="noopener">Laiki</a>, um SaaS que lida com dados de usuários e PII. Levo isso a sério. Durante mais ou menos 60% desse tempo, agentes fazem parte do meu trabalho diário. Eu planejo, acompanho de perto, reviso o resultado e muitas vezes coloco outro agente para revisar.

Também sou sócio e CTO da <a href="https://lab1095.com.br/" target="_blank" rel="noopener">LAB1095</a>, que ajuda empresas a adotar IA generativa com segurança e governança. Então usar agentes não é novidade para mim. A novidade aqui é deixar um deles trabalhar com pouquíssima supervisão.

## O problema é que eu tenho opinião sobre tudo

Posso dizer quais arquivos criar, como organizar os componentes e exatamente como quero o CSS. Em um primeiro momento, parece mais rápido do que explicar o resultado que quero.

Mas aí eu continuaria desenhando a implementação. O agente só digitaria por mim. Isso eu já sei fazer.

Neste blog, quero ver o que acontece se eu fizer menos.

## Falando em vez de programar

Ativei o microfone e comecei a conversar com o agente.

Eu falo o que quero, olho o resultado e digo o que precisa mudar. Às vezes o agente faz coisas que não fazem sentido e eu fico puto. Outras vezes, quando tento explicar por que algo está errado, percebo que a instrução original não foi clara o suficiente.

A primeira versão quebrou no mobile, e a navegação gerou layout shift demais. Então não tem mágica. Continua sendo trabalho de frontend, só que comigo reclamando no microfone.

Essa é provavelmente a parte mais difícil. Preciso separar o que está quebrado do que simplesmente não é como eu faria.

Também olhei a arquitetura. Não porque precisava revisar, mas porque fiquei curioso para ver o que o agente decidiu. Não mudei muita coisa e tentei não reorganizar tudo só porque eu faria diferente.

## Não parou no código

A parte do Cloudflare é provavelmente a mais impressionante. Quando conectei o MCP, o agente passou a trabalhar fora do repositório também. Ele configurou o domínio, cuidou dos redirecionamentos e das URLs, criou o sitemap e me disse o que adicionar no Google Search Console para o site ser indexado.

A autonomia foi impressionante até ele criar um Worker na conta errada do Cloudflare. GitHub e Cloudflare já estavam conectados, mas, em vez de fazer push, o agente usou a CLI do Cloudflare para subir o site manualmente.

Mesmo assim, foram só umas três ou quatro horas entre a conversa sobre o design e o site publicado no meu domínio. Quase não digitei.

Eu não trabalharia assim na Laiki. O app tem usuários reais, dados reais e erros que custam mais caro do que um layout quebrado no blog. Lá, vou continuar supervisionando tudo de perto.

Este blog é um bom lugar para tentar o contrário. Se o agente fizer uma bagunça, posso corrigir ou começar de novo. Eu escolhi a stack, defini os limites e decidi se o resultado estava bom. Só tentei não dizer como ele deveria construir tudo.

Não sei até onde vou levar esse jeito de trabalhar. Por enquanto, o blog funciona, eu não desenhei a arquitetura e consegui deixar um agente fazer uma coisa simples sem ficar em cima dele o tempo todo.
