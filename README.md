<div align="center">

<img src="src/assets/images/empatictech_icon.png" alt="Desanuveador Tech Empático" width="120" />

# Desanuveador Tech Empático

<p>
  <img src="https://img.shields.io/badge/status-ativo-5A6E5F?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Status" />
  <img src="https://img.shields.io/badge/licen%C3%A7a-Apache%202.0-D4A373?style=for-the-badge&logo=apache&logoColor=white" alt="Licença" />
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/typescript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

<p>
  <img src="https://img.shields.io/badge/deploy-vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/LLM-Groq%20%7C%20Llama%203.3-F55036?style=for-the-badge&logo=meta&logoColor=white" alt="Groq" />
  <img src="https://img.shields.io/badge/idioma-pt--BR-009739?style=for-the-badge&logo=google-translate&logoColor=white" alt="PT-BR" />
</p>

<br />

> 🌿 Um assistente conversacional empático que ajuda pessoas a escolherem o computador ideal — sem jargões, com metáforas do dia a dia.

<br />

[🚀 Demo ao Vivo](#) · [📖 Documentação](#-como-funciona) · [🐛 Reportar Bug](https://github.com/catitodev/empatictech/issues)

</div>

---

## ✨ Funcionalidades

<table>
<tr>
<td width="50%">

### 💬 Chat Empático
Conversa natural com assistente que explica hardware usando **metáforas do cotidiano**:
- 🧠 RAM → "Mesa de Trabalho"
- 👨‍🍳 CPU → "Chef de Cozinha"
- 🗄️ SSD → "Armário Automatizado"
- 🎨 GPU → "Artista Pintor"

</td>
<td width="50%">

### 📊 Perfil Adaptativo
Painel inteligente que **detecta automaticamente** suas necessidades a partir da conversa:
- 📱 Mobilidade (Notebook / Desktop)
- ⚡ Nível de uso (Básico / Intermediário / Avançado)
- 💰 Orçamento
- ♻️ Reaproveitamento de periféricos

</td>
</tr>
<tr>
<td width="50%">

### 🛒 Simulação de Preços
Painel com **3 opções de computador** e busca de preços em **5 lojas brasileiras**:
- � KaBuM! (desconto PIX)
- 📦 Amazon Brasil (frete grátis Prime)
- 🤝 Mercado Livre (ofertas do dia)
- 🏬 Magazine Luiza (retirada na loja)
- 🧡 Shopee (cupons de desconto)

Classificação por: menor/maior preço, promoções, entrega.
Links diretos para conferir o preço real na loja.

</td>
<td width="50%">

### 📥 Exportar Resultados
Baixe a conversa e recomendações em múltiplos formatos:
- 📄 PDF
- 📝 Texto (.txt)
- 📋 Markdown (.md)
- 📎 Word (.docx)
- 📋 Copiar respostas individuais

</td>
</tr>
<tr>
<td colspan="2">

### 🌗 Modo Claro / Escuro
Toggle de fácil acesso no header — respeita a preferência do sistema e persiste no localStorage.

</td>
</tr>
<tr>
<td colspan="2">

### ❓ Pergunte Quase Tudo
Base de conhecimento integrada sobre **hardware livre, software livre, maker/DIY e commons digital**. Pergunte e receba respostas fundamentadas — se não encontrar, avisa honestamente.

</td>
</tr>
</table>

---

## 🎨 Tema Visual

<div align="center">

| Elemento | Cor | Hex |
|----------|-----|-----|
| 🌿 Primária (Sage) | ![#5A6E5F](https://via.placeholder.com/15/5A6E5F/5A6E5F.png) | `#5A6E5F` |
| 🌾 Secundária (Ochre) | ![#D4A373](https://via.placeholder.com/15/D4A373/D4A373.png) | `#D4A373` |
| 🤍 Fundo (Off-white) | ![#FDFCF8](https://via.placeholder.com/15/FDFCF8/FDFCF8.png) | `#FDFCF8` |
| 📜 Sidebar (Bege) | ![#F4F1EA](https://via.placeholder.com/15/F4F1EA/F4F1EA.png) | `#F4F1EA` |

</div>

---

## 🚀 Acesse Agora

<div align="center">

### 🌐 Use no navegador (webapp)
Acesse diretamente pelo link — sem instalar nada:

👉 **[empatictech.vercel.app](https://empatictech.vercel.app)** 👈

Funciona no celular, tablet e computador.

</div>

---

## 🛠️ Para Desenvolvedores

<details>
<summary><strong>📋 Como rodar localmente</strong></summary>

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- Chave gratuita da [Groq](https://console.groq.com/keys) (sem cartão de crédito)

### Instalação

```bash
git clone https://github.com/catitodev/empatictech.git
cd empatictech
npm install
cp .env.example .env
# Edite o .env e cole sua GROQ_API_KEY
```

### Execução

```bash
npm run dev        # http://localhost:3000
npm run build      # Build de produção
npm start          # Servir produção
```

</details>

---

## 🌐 Deploy na Vercel

<details>
<summary><strong>📋 Passo a passo</strong></summary>

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Na configuração do projeto, adicione a variável de ambiente:
   - `GROQ_API_KEY` = sua chave Groq
4. Clique em **Deploy**

A Vercel detecta automaticamente o Vite e configura o build. A API serverless em `api/chat.ts` é deployada como função Edge automaticamente.

</details>

---

## 🏗️ Arquitetura

```
empatictech/
├── api/
│   ├── chat.ts              # Serverless: chat com IA
│   └── ask.ts               # Serverless: pergunte quase tudo
├── src/
│   ├── components/
│   │   ├── ChatWindow.tsx       # Janela de conversa
│   │   ├── ProfileTracker.tsx   # Painel de perfil
│   │   ├── MetaphorDictionary.tsx # Dicionário de metáforas
│   │   ├── RecommendationCards.tsx # Recomendações + preços
│   │   ├── ExportActions.tsx    # Export PDF/TXT/MD/DOCX
│   │   ├── AskAnything.tsx      # Pergunte quase tudo
│   │   └── ThemeToggle.tsx      # Modo claro/escuro
│   ├── data/
│   │   └── knowledge-base.ts   # Base de conhecimento
│   ├── App.tsx              # Coordenador de estado
│   ├── types.ts             # Interfaces TypeScript
│   └── index.css            # Tema Natural Tones + Dark Mode
├── server.ts                # Express (dev local)
├── vercel.json              # Config Vercel
├── SECURITY.md              # Política de segurança
├── LICENSE                  # Apache 2.0
└── package.json
```

---

## 🔒 Segurança

- ✅ **0 vulnerabilidades** (`npm audit` limpo)
- ✅ Rate limiting: 20 req/min por IP
- ✅ Payload limitado a 100KB, mensagens a 2000 chars
- ✅ Security headers: X-Frame-Options, HSTS, nosniff, Referrer-Policy
- ✅ Chaves via variáveis de ambiente (nunca no código)
- ✅ `.env` no `.gitignore`, sem secrets versionados
- ✅ Sem `eval()`, `innerHTML` ou vetores de XSS
- ✅ Links externos com `rel="noopener noreferrer"`
- ✅ Erros não expõem internals ou stack traces
- ✅ Política de divulgação responsável ([SECURITY.md](./SECURITY.md))

---

## 🛠️ Stack Tecnológica

<div align="center">

| Camada | Tecnologia | Propósito |
|--------|-----------|-----------|
| Frontend | React 19 + TypeScript | Interface reativa |
| Estilo | Tailwind CSS 4 | Tema customizado |
| Build | Vite 6 | Dev server + bundler |
| Backend | Express / Vercel Functions | API proxy |
| LLM | Groq (Llama 3.3 70B) | Respostas empáticas |
| Export | jsPDF, docx, file-saver | Download de resultados |
| Ícones | Lucide React | Ícones consistentes |
| Tema | Tailwind Dark Mode | Claro / Escuro com toggle |
| Deploy | Vercel | Hosting serverless |

</div>

---

## 📱 Responsividade

A aplicação é totalmente responsiva com layout adaptativo:
- **Desktop**: Layout em 2 colunas (sidebar + chat)
- **Tablet**: Colunas empilhadas com espaçamento ajustado
- **Mobile**: Layout vertical com componentes otimizados para toque

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha nova feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença **Apache 2.0**. Veja [`LICENSE`](./LICENSE) para mais informações.

---

<div align="center">

<br />

🌿 **recurso abundante feito com empatia e afeto** 🌿

<br />

<sub>Feito com 💚 por <a href="https://github.com/catitodev">@catitodev</a></sub>

</div>
