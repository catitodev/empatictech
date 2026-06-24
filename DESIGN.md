---
name: Desanuveador Tech Empático
description: Assistente conversacional que ajuda pessoas leigas a escolherem o computador ideal
colors:
  sage: "#5A6E5F"
  ochre: "#D4A373"
  charcoal: "#4A4842"
  dark: "#3D3B36"
  taupe: "#8D7B68"
  bg: "#FDFCF8"
  sidebar: "#F4F1EA"
  border: "#E5E1D5"
  dark-surface: "#1e1e1e"
  dark-elevated: "#252525"
  dark-border: "#444444"
  dark-muted: "#999999"
  dark-text: "#e0ddd6"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, ui-serif, serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.sage}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.charcoal}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.sage}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  chip-default:
    backgroundColor: "#ffffff"
    textColor: "{colors.dark}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  chip-active:
    backgroundColor: "{colors.sage}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  card-container:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.dark}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input-default:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
---

# Design System: Desanuveador Tech Empático

## 1. Overview

**Creative North Star: "A Conversa na Varanda"**

A sensação de pedir conselho para alguém de confiança numa tarde tranquila. Sem pressa, cores naturais, tudo no tempo certo. O sistema visual do Desanuveador Tech Empático traduz empatia em interface: superfícies que respiram, tipografia que acolhe, interações que nunca apressam. É um produto que se recusa a parecer com o resto da internet de tecnologia — nada de dashboards frios, nada de marketplaces gritando, nada de comparadores impessoais.

A densidade é baixa por design. Cada componente tem espaço para existir sem competir por atenção. O layout prioriza legibilidade e progressão natural — o olho flui como uma conversa, não como um formulário. Quando há animação, é sutil como uma brisa; quando há cor, é quente como um entardecer.

**Key Characteristics:**
- Superfícies orgânicas com cantos arredondados generosos (24px em containers, 12px em controles)
- Paleta restrita a tons naturais: sage, ochre, off-white — sem cores sintéticas
- Tipografia em dois registros: Playfair Display (serifada, italic) para personalidade; Inter para clareza funcional
- Espaçamento generoso que transmite calma e acessibilidade
- Dark mode com tons terrosos suaves, nunca preto puro

## 2. Colors

Uma paleta restrita de tons naturais — verde-salva, ocre dourado, e neutros quentes — que evoca materiais orgânicos e ambientes acolhedores. Nenhuma cor é sintética ou vibrante demais; tudo parece ter vindo de pigmentos naturais.

### Primary
- **Sage (Verde-Salva)** (#5A6E5F): Cor de ação, progresso e confirmação. Usada em botões primários, badges de estado "definido", barra de progresso, links ativos e indicadores de presença. Transmite confiança sem agressividade.

### Secondary
- **Ochre (Ocre Dourado)** (#D4A373): Calor e destaque secundário. Usada para a seção "Uso Principal" do perfil, botões do "Pergunte Quase Tudo", badges de nível de esforço, e ícones de pergunta. Evoca acessibilidade e curiosidade.

### Neutral
- **Charcoal (Carvão Quente)** (#4A4842): Headings e texto de alto contraste. Nunca preto puro.
- **Dark (Escuro Terroso)** (#3D3B36): Texto body principal. Suavemente mais leve que Charcoal.
- **Taupe (Taupe Natural)** (#8D7B68): Texto secundário, timestamps, labels informativos. Tom que recua sem desaparecer.
- **Off-white (Algodão Cru)** (#FDFCF8): Fundo principal em light mode. Quase branco mas com calor perceptível.
- **Sidebar (Linho)** (#F4F1EA): Superfícies elevadas, headers, backgrounds secundários. Um degrau de profundidade.
- **Border (Fio de Palha)** (#E5E1D5): Bordas e divisores. Presentes mas nunca dominantes.

### Dark Mode
- **Dark Surface** (#1e1e1e): Fundo principal. Escuro com micro-calor.
- **Dark Elevated** (#252525): Superfícies elevadas (cards, headers). Um degrau acima.
- **Dark Border** (#444444): Divisores no escuro. Visíveis sem brilhar.
- **Dark Muted** (#999999): Texto terciário em dark mode.
- **Dark Text** (#e0ddd6): Texto principal em dark mode. Off-white quente, nunca branco puro.

### Named Rules
**The Natural Pigment Rule.** Toda cor no sistema deve parecer extraída de um material natural — madeira, folha, argila, linho. Se parece sintética, elétrica ou neon, não pertence aqui.

## 3. Typography

**Display Font:** Playfair Display (with Georgia, ui-serif, serif)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif)

**Character:** O contraste entre uma serifada editorial italiana (Playfair Display, sempre em italic) e uma sans-serif funcional de alta legibilidade (Inter) cria uma dualidade proposital: a voz empática e pessoal do assistente versus a clareza objetiva da informação técnica traduzida.

### Hierarchy
- **Display** (Bold Italic, 1.25rem/20px, line-height 1.3): Títulos de seção e headings de componentes. Sempre em Playfair Display italic. Tracking tight (-0.01em). Aparece em h3 dos painéis e chat header.
- **Body** (Regular 400, 0.75rem/12px, line-height 1.6): Texto de conteúdo, mensagens de chat, descrições explicativas. Inter sem decoração. Máximo 65ch em prosa.
- **Label** (Bold 700, 0.625rem/10px, line-height 1.4, tracking 0.05em): Kickers, badges, metadados. Uppercase quando indicando estado ("DEFINIDO"). Tamanho mínimo funcional — usado com parcimônia.
- **Mono** (font-mono, 9px): Apenas para timestamps de mensagens. Discreto e técnico.

### Named Rules
**The Italic Voice Rule.** Playfair Display aparece sempre em italic — nunca em roman. O italic é a voz do assistente: pessoal, calorosa, convidativa. Se o heading não é "a voz falando", use Inter.

## 4. Elevation

O sistema é fundamentalmente plano. A profundidade é comunicada por camadas tonais (off-white → sidebar → white) e backdropfilter (blur sutil), não por sombras pesadas. Sombras existem apenas como `shadow-xs` — mal perceptíveis, servindo como separador tonal.

### Shadow Vocabulary
- **xs** (`0 1px 2px rgba(0,0,0,0.05)`): Sombra padrão de containers e cards. Quase imperceptível — seu papel é tonal, não dramático. Presente em todos os painéis.
- **sm** (`0 1px 3px rgba(0,0,0,0.08)`): Usada apenas no GIF de boas-vindas no chat. Elevation sutil para destaque focal.
- **lg** (export dropdown: `0 10px 15px rgba(0,0,0,0.1)`): Menus flutuantes e dropdowns. A única sombra que "levanta" de verdade.

### Named Rules
**The Flat Ground Rule.** Superfícies são planas por padrão. Profundidade é comunicada por diferença tonal entre camadas (bg → sidebar → white), não por sombras. Sombras aparecem apenas como resposta a ação (dropdown aberto, hover).

## 5. Components

### Buttons
- **Shape:** Generosamente arredondados (12px radius). Padding confortável (10px 16px). Sem sombras de repouso.
- **Primary:** Background Sage (#5A6E5F), texto branco, 12px radius. Transição suave para Charcoal no hover.
- **Hover / Focus:** Background escurece para Charcoal (#4A4842). Transição `transition-colors` (150ms). Sem glow ou ring visível (a11y: precisa de focus-visible ring).
- **Disabled:** Opacidade 40%. Cursor default. Sem mudança de cor no hover.
- **Secondary (Ochre):** Background Ochre (#D4A373), texto branco. Usado apenas para ações do "Pergunte Quase Tudo". Hover escurece para #c4935f.
- **Ghost:** Background transparente, texto Sage, border border. Hover: bg Sage/10%. Usado para "Reiniciar" e ações terciárias.

### Chips (Seleção de Perfil)
- **Style:** Background branco, texto Dark, border Border (#E5E1D5), radius 8px. Fonte 10-11px bold.
- **Active:** Background Sage (mobilidade/orçamento/reaproveitamento) ou Ochre (nível de uso), texto branco, border transparente.
- **Hover (inactive):** Background slate-50. Sutil.

### Cards / Containers
- **Corner Style:** Generosamente curvados (24px radius). A curva é identidade — nunca reduzir abaixo de 16px.
- **Background:** Sidebar (#F4F1EA) com 80% opacidade + backdrop-blur-sm para o container principal. White com opacidade 60-80% para sub-cards internos.
- **Border:** 1px solid Border (#E5E1D5). Sempre presente, nunca ausente em containers.
- **Internal Padding:** 24px (p-6) para containers principais. 14px (p-3.5) para sub-items.
- **No nesting visible:** Cards internos são diferenciados por fundo (white/60% vs sidebar), nunca por sombra adicional.

### Inputs / Fields
- **Style:** Background Off-white (#FDFCF8), border Border (#E5E1D5), radius 12px. Texto 12px Inter.
- **Focus:** Border muda para Sage (#5A6E5F), background muda para branco puro. Sem outline — border é o indicador.
- **Disabled:** Opacidade 60%.
- **Placeholder:** Texto Taupe. Desaparece ao focar.

### Chat Bubbles
- **Assistant:** Background branco, border Border, rounded-2xl com corner-tl cortado (rounded-tl-none). Avatar GIF à esquerda. Shadow-xs.
- **User:** Background Sidebar, border Border, rounded-2xl com corner-tr cortado (rounded-tr-none). Avatar emoji à direita.
- **Timestamp:** Mono 9px, Taupe, abaixo da bubble.

### Navigation (Header)
- **Style:** Background Sidebar (#F4F1EA), border-bottom 1px Border, padding vertical 18px. Sticky top-0 z-10.
- **Logo:** 64x64px (w-16 h-16), rounded-xl, object-contain.
- **Title:** Playfair Display italic bold, 20px (text-xl).
- **Subtitle:** Inter 10px, Taupe. Hidden em mobile (hidden sm:block).
- **Right side:** ThemeToggle + ExportActions + badge empático. Flex gap-3.

### Progress Bar (Profile)
- **Track:** Background Border (#E5E1D5), height 8px, rounded-full.
- **Fill:** Background Sage (#5A6E5F), rounded-full, transition-all duration-500 ease-out.
- **Percentage:** Sage bold 14px ao lado do heading.

## 6. Do's and Don'ts

### Do:
- **Do** usar Playfair Display italic exclusivamente para headings de personalidade (títulos de seção, nomes de componentes). Nunca para labels, buttons ou dados.
- **Do** manter bordas em todos os containers — o sistema é definido por linhas suaves, não por sombras.
- **Do** usar backdrop-blur-sm com opacidade parcial para criar profundidade sutil sem peso visual.
- **Do** garantir contraste mínimo 4.5:1 entre texto body e fundo. O Taupe (#8D7B68) sobre Off-white (#FDFCF8) passa com 4.53:1 — é o limite. Nunca usar tom mais claro para texto funcional.
- **Do** usar as imagens/assets do projeto (GIF do mascote, favicon, ícone) consistentemente em todos os pontos de interação — avatar do chat, empty state, welcome screen.
- **Do** manter cantos com 24px em containers e 12px em controles. A generosidade do radius é identidade visual.
- **Do** testar cada interação com `prefers-reduced-motion` ativa. Alternativa: crossfade ou transição instantânea.

### Don't:
- **Don't** usar preto puro (#000000) ou branco puro (#ffffff) como fundo de superfícies. Sempre off-white quente ou dark com calor.
- **Don't** usar gradientes de qualquer tipo — nem em backgrounds, nem em texto, nem em botões. O sistema é flat com camadas tonais.
- **Don't** usar animate-bounce para loading dots — é motion datada. Preferir animate-pulse ou sequência de opacidade. (Nota: o código atual usa bounce — isso precisa ser corrigido.)
- **Don't** criar designs que pareçam saída genérica de IA: grids de cards idênticos com ícone+heading+texto, eyebrows uppercase em cada seção, gradientes roxo-azul, paletas cream/sand genéricas.
- **Don't** usar fontes além de Playfair Display e Inter. O sistema tem duas vozes e apenas duas.
- **Don't** aninhar cards dentro de cards com bordas visíveis. Sub-items usam diferença de fundo, não de borda adicional.
- **Don't** usar cores frias (azul, roxo, verde-limão) em nenhum contexto. A paleta é exclusivamente quente.
- **Don't** fazer o design parecer com sites de tech agressivos (TechPowerUp), comparadores frios (Versus.com) ou marketplaces confusos (AliExpress).
- **Don't** usar sombras maiores que shadow-xs em elementos de repouso. Sombras maiores são reservadas exclusivamente para menus flutuantes.
- **Don't** remover bordas de inputs no estado default — a borda Border é o affordance de "este é um campo editável".
