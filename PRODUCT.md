# Product

## Register

product

## Users

Qualquer pessoa que precise comprar ou entender um computador — sem exigência de conhecimento técnico prévio. Desde universitários comprando o primeiro notebook até pais escolhendo um PC para os filhos, passando por idosos que precisam de algo funcional e simples. O contexto é doméstico: alguém sozinho diante de uma decisão confusa, buscando clareza sem julgamento.

## Product Purpose

O Desanuveador Tech Empático é um assistente conversacional em português brasileiro que traduz jargões de hardware em linguagem acessível usando metáforas do cotidiano. Ele acompanha o perfil do usuário durante a conversa, entende o contexto de uso, orçamento e necessidades, e entrega recomendações concretas com links diretos para lojas brasileiras. Sucesso = pessoa leiga saindo com confiança para comprar, sem ter precisado aprender termos técnicos.

## Brand Personality

Empático, simples, empoderador. O tom é de um amigo paciente que sabe do assunto mas nunca faz o outro se sentir ignorante. Usa linguagem coloquial brasileira, evita formalidade excessiva, e celebra cada decisão do usuário como uma conquista. Não é condescendente — é solidário.

## Anti-references

- Sites de tech agressivos e densos (TechPowerUp, Tom's Hardware, AnandTech)
- Comparadores frios e impessoais (Versus.com, UserBenchmark)
- Marketplaces confusos e visualmente poluídos (AliExpress, Wish)
- Qualquer design que pareça saída genérica de IA: gradientes roxo-azul, cards idênticos em grid, kickers uppercase em toda seção, paletas cream/sand padrão
- Dashboards corporativos cinzentos e sem personalidade
- Interfaces gamificadas com badges/pontos desnecessários

## Design Principles

1. **Desanuvear, não complicar** — Cada elemento visual deve reduzir a carga cognitiva, nunca aumentar. Se o usuário precisa pensar sobre a interface em vez do conteúdo, falhamos.
2. **Presença sem pressão** — O assistente está ali, disponível, mas nunca apressando. A interface respira, sem urgência artificial ou CTAs agressivos.
3. **Metáforas tangíveis** — Assim como o conteúdo traduz RAM em "mesa de trabalho", o design deve evocar o familiar: materiais naturais, texturas orgânicas, formas suaves.
4. **Empoderamento visível** — Feedback constante de progresso. O usuário deve sentir que está avançando, entendendo, decidindo — não apenas consumindo informação passivamente.
5. **Inclusão radical** — Se uma pessoa com deficiência visual, daltonismo, ou pouca familiaridade digital não consegue usar, não está pronto.

## Accessibility & Inclusion

- WCAG AA como baseline em todas as superfícies; AAA onde possível (especialmente contraste de texto)
- Suporte completo a leitores de tela (aria-labels, roles semânticos, anúncios de estado)
- `prefers-reduced-motion`: todas as animações devem ter alternativa estática
- `prefers-color-scheme`: dark mode já implementado, manter paridade funcional
- Contraste de texto: mínimo 4.5:1 para body, 3:1 para large text
- Targets de toque: mínimo 44x44px em mobile
- Fontes legíveis em tamanhos acessíveis (nunca abaixo de 12px para conteúdo funcional)
- Daltonismo: não depender apenas de cor para comunicar estado (ícones + texto + cor)
