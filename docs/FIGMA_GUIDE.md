# 🌐 Brand Finance — Guia de Construção do Figma & Documentação de Design

Este documento contém o mapa de design, tokens, medidas, paleta e instruções detalhadas para você criar ou gerar automaticamente no **pen.dev / Figma** o layout 100% fiel ao código do **Brand Finance**.

---

## 🚀 Como Usar no pen.dev (IA Canvas) ou Figma AI

Copie e cole o prompt estruturado abaixo na caixa de criação do **pen.dev** (ou plugin do Figma):

```text
Design a high-end fintech responsive web app called "Brand Finance" with both a Landing Page and an App Platform Dashboard.
Aesthetic: Dark mode fintech, glassmorphism, similar to Nomad Global and Apple Finance.
Primary Accent: Electric Blue / Cyan (#38bdf8), Dark Slate Background (#080c14), Card Surfaces (rgba(15, 23, 42, 0.88)).
Typography: Plus Jakarta Sans for UI, JetBrains Mono for financial tickers and live clocks.

Key Screens & Sections to Generate:
1. Header Navbar:
   - Left: Brand Logo (stylized geometric 'BF' shield icon with cyan gradient) + "Brand Finance" title + "GLOBAL" pill badge + live market tagline.
   - Center: Nav pills [Início | Plataforma & Câmbio].
   - Right: Live API indicator dot, Theme Palette selector button, "Planos & Pagamento" button, "Entrar" button.
2. World Clocks Strip (Subheader):
   - Real-time timezones for São Paulo (BRL), New York (USD), Frankfurt (EUR), London (GBP), Tokyo (JPY) with a "Fuso de Moedas" dropdown toggle button.
3. Landing Page Hero:
   - Left side: Badge "Conta Global • Câmbio Comercial • IOF 1.1%", Large Headline "Sua vida financeira global, simples como deve ser.", Subtitle, CTAs: "Acessar Plataforma de Câmbio" (gradient button) & "Abrir Conta Grátis" (outlined), 5-star customer review rating proof.
   - Right side: 3D-angled Virtual Global Debit Card (dark titanium finish, gold chip, contactless wave, cardholder 'GLOBAL CITIZEN', Brand Finance logo) with an exchange savings comparison box below (Brand Finance commercial dollar vs traditional bank credit cards).
4. Bento Grid Benefits Section:
   - 4 glassmorphic feature cards: Câmbio Comercial Oficial, Aceito em 180+ Países, Garantia Bancária, Conversões Instantâneas.
5. Currency Exchange Dashboard (App View):
   - Left Column (480px width): Converter Card with Amount Input ($ 100), 'De' & 'Para' Currency Selectors with star icon for favorite currencies, Swap button in circle, estimated conversion result (R$ 532,71), Quick Favorites chips (USD, BRL, EUR, GBP), and recent conversions list.
   - Right Column: Analytics Section with historical line chart SVG, timeframe tabs (7D, 15D, 30D, 90D, 1A), metrics cards (Min, Max, Avg, % Change), and interactive exchange rates table.
6. Financial News Section:
   - Category filter pills (Todas, Câmbio, Bancos Centrais, Mercado Global, Viagens), 3-column card grid with live red flame badge "MERCADO AO VIVO", source logo, and reading time.
```

---

## 🎨 Design Tokens & Cores (Figma Styles)

### 1. Paleta de Cores (Cores Principais - Dark Mode)
| Nome no Figma | Hex / Valor | Uso |
|---|---|---|
| `Brand/Primary` | `#38BDF8` | Botões primários, destaques, bordas ativas |
| `Brand/Primary-Hover` | `#0284C7` | Estados de hover em botões |
| `Brand/Gradient` | `linear-gradient(135deg, #38BDF8 0%, #3B82F6 50%, #818CF8 100%)` | Títulos e logo |
| `Bg/App` | `#080C14` | Fundo principal da página |
| `Surface/Card` | `#0F172A` (opacidade 88%) + Blur 20px | Painéis, cards e conversor |
| `Surface/Inner` | `#131922` | Campos de input e select |
| `Border/Card` | `rgba(255, 255, 255, 0.12)` | Linhas de borda e divisores |
| `Status/Green` | `#10B981` | Lucro, variações positivas e status online |
| `Status/Red` | `#F43F5E` | Quedas cambiais e alertas |
| `Status/Amber` | `#F59E0B` | Estrela de favoritos e badge de planos |

### 2. Tipografia (Text Styles)
- **Família Principal:** `Plus Jakarta Sans`
  - `Hero Title`: 48px / Bold (800) / Tracking -0.03em
  - `Heading 2`: 28px / Bold (700)
  - `Card Title`: 18px / SemiBold (600)
  - `Body Text`: 14px / Regular (400) ou Medium (500)
  - `Micro / Labels`: 11px / Bold (700) / Uppercase
- **Família Monospaçada (Cotações & Relógios):** `JetBrains Mono`
  - `Clock Text`: 12px / Medium (500)
  - `Card Number`: 18px / Medium (500)

### 3. Efeitos e Sombras (Effects Styles)
- **Glass Card Shadow:** `0px 16px 40px rgba(0, 0, 0, 0.5)`
- **Cyan Glow:** `0px 0px 30px rgba(56, 189, 248, 0.25)`
- **Border Radius:**
  - Botões / Inputs: `12px` (`radius-md`)
  - Cards Principais: `16px` (`radius-lg`)
  - Cartão Nomad Virtual: `24px` (`radius-xl`)
  - Pills / Chips: `9999px` (`radius-full`)

---

## 📐 Estrutura de Telas do Protótipo (Frames para criar no Figma)

### Frame 1: `Desktop - 1440x1024` — Landing Page (Início)
1. **Header (1440 x 74px):**
   - Logo `BrandLogo` + Nome + Tagline.
   - Navegação: `Início` (ativo) / `Plataforma & Câmbio`.
   - Botões: `Status API`, `Temas`, `Planos & Pagamento` (dourado), `Entrar`.
2. **Subheader Relógios (1440 x 44px):**
   - Pills horizontais: São Paulo `17:00:23`, Nova York `16:00:23`, Berlim `21:00:23`, Tóquio `05:00:23`.
3. **Hero Section:**
   - 2 colunas: Texto institucional à esquerda com CTA; Cartão de crédito virtual Titanium à direita + card de cotação comparando spread.
4. **Bento Grid (4 colunas):**
   - Cards com ícones circulares destacados.
5. **Passo a Passo (3 colunas com números gigantes 01, 02, 03).**
6. **Footer institucional.**

### Frame 2: `Desktop - 1440x1024` — Plataforma de Câmbio (App)
1. **Header idêntico ao Frame 1**, com `Plataforma & Câmbio` ativo.
2. **Hero de Boas-Vindas:** "Câmbio Inteligente & Moedas do Mundo".
3. **Navegação de Abas:** `Conversor`, `Notícias & Mercado`, `Multi-Câmbio`, `Analytics`, `Calculadora de Viagem`, `Alertas`.
4. **Grid 2 Colunas:**
   - **Coluna Esquerda (480px):**
     - Card Conversor: Valor ($ 100), Seletores De/Para com estrela ⭐, resultado formatado em destaque, chips rápidos de moedas preferidas e histórico recente.
   - **Coluna Direita:**
     - Gráfico histórico SVG com abas de timeframe (1D, 7D, 15D, 30D, 1A) + tabela de cotações com pesquisa.

### Frame 3: `Modal - 480x560` — Login & Pagamentos
- Abas superiores: `Entrar`, `Criar Conta`, `Planos & Pagamentos`.
- Cards de planos (Global Free vs Brand Black Global) com formulário de pagamento simulado.

### Frame 4: `Aba Notícias - 1440x900`
- Feed em 3 colunas com artigos sobre o Banco Central Europeu, Dólar e Mercado Internacional.

