<div align="center">

# 🌐 Brand Finance
### Plataforma Global de Câmbio Comercial, Análise Financeira & Conta Internacional

![React](https://img.shields.io/badge/React-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Figma](https://www.figma.com/design/w0ePjIE5JBdAbL1tt0W4wL/Brand-Finace?node-id=0-1&p=f&t=Zqh1r6bwYSs40adH-0)
![Status](https://img.shields.io/badge/Status-Concluído%20&%20Apresentável-10B981?style=for-the-badge)

<br/>

> **Brand Finance** é uma aplicação web financeira de alta performance projetada para oferecer cotações em tempo real com spread comercial reduzido, análise gráfica histórica, notícias do mercado financeiro e experiência de conta global inspirada nos maiores ecossistemas fintech do mundo.

<br/>

[![Figma Prototype](https://www.figma.com/design/w0ePjIE5JBdAbL1tt0W4wL/Brand-Finace?node-id=0-1&p=f&t=Zqh1r6bwYSs40adH-0)


</div>

---

## 🎨 Protótipo e Design System no Figma

Todo o projeto foi estruturado seguindo padrões de design de ponta (*Glassmorphism*, paleta fintech escura e tipografia geométrica moderna):

- 🔗 **Link do Protótipo no Figma:** [Clique aqui para abrir o Figma do Projeto](https://www.figma.com/design/w0ePjIE5JBdAbL1tt0W4wL/Brand-Finace?node-id=0-1&p=f&t=Zqh1r6bwYSs40adH-0)
- 📐 **Guia Completo de Criação para Figma / pen.dev:** Acesse a documentação de tokens, medidas, cores e fontes em [`docs/FIGMA_GUIDE.md`](./docs/FIGMA_GUIDE.md).

---

## 🚀 Funcionalidades Principais

### 1. 🌟 Landing Page Institucional
- **Hero Section:** Apresentação da conta global com cartão de débito internacional virtual Titanium e comparador de taxas comerciais vs. bancos tradicionais (economia de IOF).
- **Bento Grid:** Destaques sobre aceitação em mais de 180 países, segurança bancária e spread comercial reduzido.
- **Como Funciona:** Guia interativo em 3 passos simples para abertura de conta e conversão de moedas.

### 2. 💱 Conversor de Câmbio em Tempo Real
- Cotações oficiais alimentadas diretamente pela **Frankfurter API** (dados do Banco Central Europeu).
- **Moedas Favoritas:** Opção de salvar/marcar moedas preferidas através de estrela interativa com atalhos rápidos de 1 clique.
- **Seletores Otimizados:** Layout responsivo com nomes completos das moedas sem truncamento ou falha de renderização.
- **Histórico Recente:** Registro automático e persistente das últimas conversões efetuadas pelo usuário.

### 3. 🌍 Relógios Mundiais de Praças Financeiras
- Barra de fuso horário interativa com atualização a cada segundo.
- Acompanhamento em tempo real dos mercados de **São Paulo (BRL)**, **Nova York (USD)**, **Londres (GBP)**, **Frankfurt/Berlim (EUR)**, **Tóquio (JPY)** e outras capitais mundiais.
- Modal configurador para selecionar os relógios de qualquer moeda desejada.

### 4. 📰 Notícias & Mercado Financeiro
- Feed completo com notícias em tempo real sobre Câmbio, Bancos Centrais (BCE / Fed), Criptomoedas, Viagens e Macroeconomia.
- Filtros rápidos por categoria e tempo estimado de leitura.

### 5. 🎨 Sistema Multi-Temas e Paletas
- Alternador de paletas visual no Header com suporte a 5 temas:
  - 🌙 **Dark Modern** (Azul Profundo / Ciano)
  - ☀️ **Light Clean** (Branco / Azul Real)
  - 👑 **Gold Edition** (Preto Ônix / Ouro)
  - 🌲 **Emerald Pro** (Verde Esmeralda Fintech)
  - 🔮 **Cyberpunk Violet** (Roxo Futurista / Neon)

### 6. 💳 Modal de Autenticação & Pagamentos
- Telas integradas de **Login**, **Cadastro de Usuário** e **Planos de Pagamento Internacional** (*Global Free* e *Brand Black Global* com cartão de crédito).

### 7. 📊 Analytics, Gráficos & Calculadora de Viagem
- Gráfico histórico interativo em SVG com timeframes selecionáveis (`7D`, `15D`, `30D`, `90D`, `1A`).
- Tabela de câmbio completa com filtros de busca, ordenação dinâmica e exportação em formato `.CSV`.
- Calculadora de viagem com estimativa de diária média e dicas para economizar em compras no exterior.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Estilização:** CSS3 puro moderno com Variáveis CSS (`CSS Custom Properties`) e suporte nativo a múltiplos temas
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Provedor de Dados Financeiros:** [Frankfurter API](https://api.frankfurter.app/) (Banco Central Europeu) com camada de resiliência e fallback
- **Persistência:** `localStorage` nativo do navegador para estados de temas, relógios, conversões recentes e moedas favoritas
- **Design & Prototipagem:** [Figma](https://www.figma.com/) & [pen.dev](https://pen.dev/)

---

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado na máquina (versão 18 ou superior).

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/CauaBrandao/Currency-Exchange-App.git
   cd Currency-Exchange-App
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no seu navegador:**
   - **Local:** `http://localhost:5173/` (ou porta informada no terminal)

---

## 📂 Estrutura de Pastas

```
Currency-Exchange-App/
├── docs/
│   ├── FIGMA_GUIDE.md          # Guia passo a passo de telas e tokens para o Figma
│   └── REQUIREMENTS.md         # Requisitos funcionais da aplicação
├── src/
│   ├── assets/                 # Imagens e assets estáticos
│   ├── components/
│   │   ├── Alerts/             # Alertas de câmbio programados
│   │   ├── Analytics/          # Gráficos SVG, métricas e tabela
│   │   ├── Converter/          # Card do conversor, inputs e selects
│   │   ├── Footer/             # Rodapé institucional
│   │   ├── Header/             # Header, logo, temas, relógios e login
│   │   ├── Landing/            # Landing page institucional
│   │   ├── MultiConverter/     # Conversão simultânea de até 20 moedas
│   │   ├── News/               # Feed de notícias financeiras ao vivo
│   │   └── Travel/             # Calculadora de gastos de viagem
│   ├── data/                   # Dados mockados, fusos, temas e notícias
│   ├── hooks/                  # Custom React Hooks
│   ├── services/               # Consumo de APIs e estratégias de fallback
│   ├── utils/                  # Exportação CSV e utilitários
│   ├── App.jsx                 # Componente raiz e orquestrador de abas
│   ├── App.css                 # Estilos específicos da aplicação
│   └── index.css               # Design system global e tokens de temas
├── package.json
└── README.md
```

---

<div align="center">
Desenvolvido por <strong>Cauã Brandão</strong> &bull; Projeto de Avaliação Senac SP 2026
</div>
