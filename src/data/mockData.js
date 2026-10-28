export const MOCK_CURRENCIES = {
  USD: "Dólar Americano",
  BRL: "Real Brasileiro",
  EUR: "Euro",
  GBP: "Libra Esterlina",
  JPY: "Iene Japonês",
  CAD: "Dólar Canadense",
  CHF: "Franco Suíço",
  AUD: "Dólar Australiano",
  CNY: "Yuan Chinês",
  ARS: "Peso Argentino",
  SEK: "Coroa Sueca",
  NZD: "Dólar Neozelandês",
  MXN: "Peso Mexicano",
  SGD: "Dólar de Cingapura",
  HKD: "Dólar de Hong Kong",
  NOK: "Coroa Norueguesa",
  KRW: "Won Sul-Coreano",
  TRY: "Lira Turca",
  INR: "Rúpia Indiana",
  ZAR: "Rand Sul-Africano"
};

export const CURRENCY_METADATA = {
  USD: { flag: "🇺🇸", timezone: "America/New_York", city: "Nova York" },
  BRL: { flag: "🇧🇷", timezone: "America/Sao_Paulo", city: "São Paulo" },
  EUR: { flag: "🇪🇺", timezone: "Europe/Berlin", city: "Frankfurt / Berlim" },
  GBP: { flag: "🇬🇧", timezone: "Europe/London", city: "Londres" },
  JPY: { flag: "🇯🇵", timezone: "Asia/Tokyo", city: "Tóquio" },
  CAD: { flag: "🇨🇦", timezone: "America/Toronto", city: "Toronto" },
  CHF: { flag: "🇨🇭", timezone: "Europe/Zurich", city: "Zurique" },
  AUD: { flag: "🇦🇺", timezone: "Australia/Sydney", city: "Sydney" },
  CNY: { flag: "🇨🇳", timezone: "Asia/Shanghai", city: "Xangai" },
  ARS: { flag: "🇦🇷", timezone: "America/Argentina/Buenos_Aires", city: "Buenos Aires" },
  SEK: { flag: "🇸🇪", timezone: "Europe/Stockholm", city: "Estocolmo" },
  NZD: { flag: "🇳🇿", timezone: "Pacific/Auckland", city: "Auckland" },
  MXN: { flag: "🇲🇽", timezone: "America/Mexico_City", city: "Cidade do México" },
  SGD: { flag: "🇸🇬", timezone: "Asia/Singapore", city: "Singapura" },
  HKD: { flag: "🇭🇰", timezone: "Asia/Hong_Kong", city: "Hong Kong" },
  NOK: { flag: "🇳🇴", timezone: "Europe/Oslo", city: "Oslo" },
  KRW: { flag: "🇰🇷", timezone: "Asia/Seoul", city: "Seul" },
  TRY: { flag: "🇹🇷", timezone: "Europe/Istanbul", city: "Istambul" },
  INR: { flag: "🇮🇳", timezone: "Asia/Kolkata", city: "Mumbai" },
  ZAR: { flag: "🇿🇦", timezone: "Africa/Johannesburg", city: "Joanesburgo" }
};

export const MOCK_POPULAR_PAIRS = [
  { from: "USD", to: "BRL", label: "USD / BRL" },
  { from: "EUR", to: "BRL", label: "EUR / BRL" },
  { from: "GBP", to: "BRL", label: "GBP / BRL" },
  { from: "EUR", to: "USD", label: "EUR / USD" },
  { from: "USD", to: "JPY", label: "USD / JPY" },
  { from: "USD", to: "CAD", label: "USD / CAD" },
  { from: "AUD", to: "USD", label: "AUD / USD" },
  { from: "GBP", to: "EUR", label: "GBP / EUR" }
];

export const MOCK_CONVERSION_USD_BRL = {
  amount: 100,
  base: "USD",
  target: "BRL",
  rate: 5.5884,
  result: 558.84,
  date: "2026-10-26"
};

export const MOCK_HISTORICAL_SERIES = [
  { date: "2026-10-14", rate: 5.4610 },
  { date: "2026-10-15", rate: 5.4780 },
  { date: "2026-10-16", rate: 5.4920 },
  { date: "2026-10-17", rate: 5.4850 },
  { date: "2026-10-18", rate: 5.4820 },
  { date: "2026-10-19", rate: 5.5010 },
  { date: "2026-10-20", rate: 5.5240 },
  { date: "2026-10-21", rate: 5.4950 },
  { date: "2026-10-22", rate: 5.5320 },
  { date: "2026-10-23", rate: 5.5680 },
  { date: "2026-10-24", rate: 5.5710 },
  { date: "2026-10-25", rate: 5.5800 },
  { date: "2026-10-26", rate: 5.5884 }
];

export const MOCK_FINANCIAL_NEWS = [
  {
    id: 1,
    category: "Câmbio",
    title: "Dólar opera em queda de 0,85% com fluxo de investimentos externos",
    excerpt: "Mercado reage com otimismo aos dados fiscais e à atração de capital estrangeiro para ativos de renda fixa e bolsas locais.",
    source: "Bloomberg Brasil",
    date: "Hoje às 15:42",
    tagColor: "cyan"
  },
  {
    id: 2,
    category: "Bancos Centrais",
    title: "Banco Central Europeu sinaliza estabilidade nas taxas de juros no curto prazo",
    excerpt: "Presidente do BCE enfatiza que o controle da inflação na zona do euro permanece no centro das decisões de política monetária.",
    source: "Reuters Financial",
    date: "Hoje às 13:15",
    tagColor: "violet"
  },
  {
    id: 3,
    category: "Mercado Global",
    title: "Iene japonês ganha força após novas intervenções cambiais em Tóquio",
    excerpt: "Autoridades financeiras do Japão reforçam vigilância sobre a volatilidade excessiva da moeda nos mercados asiáticos.",
    source: "Financial Times",
    date: "Ontem às 21:00",
    tagColor: "amber"
  },
  {
    id: 4,
    category: "Viagens & Pagamentos",
    title: "Contas internacionais batem recorde de adesão entre viajantes brasileiros",
    excerpt: "Economia de até 10% em relação ao cartão de crédito tradicional impulsiona adoção de serviços globais como Brand Finance.",
    source: "Valor Econômico",
    date: "Ontem às 18:30",
    tagColor: "green"
  },
  {
    id: 5,
    category: "Câmbio",
    title: "Libra esterlina registra maior valorização trimestral em relação ao euro",
    excerpt: "Dados de atividade manufatureira e varejo no Reino Unido impulsionam a moeda britânica nas principais praças europeias.",
    source: "CNBC International",
    date: "27 de Outubro",
    tagColor: "cyan"
  },
  {
    id: 6,
    category: "Economia",
    title: "Comércio bilateral entre Brasil e Ásia supera US$ 120 bilhões em 2026",
    excerpt: "Aumento das exportações agrícolas e industriais fortalece reservas cambiais e sustentação do Real.",
    source: "Exame Negócios",
    date: "26 de Outubro",
    tagColor: "green"
  }
];

export const THEME_PRESETS = [
  { id: "dark", name: "Dark Modern", preview: "#080c14", accent: "#38bdf8", border: "#1e3a5f" },
  { id: "light", name: "Light Clean", preview: "#f0f4f8", accent: "#2563eb", border: "#cbd5e1" },
  { id: "nomad", name: "Gold Edition", preview: "#0b0f14", accent: "#eab308", border: "#3f3612" },
  { id: "emerald", name: "Emerald Pro", preview: "#04160f", accent: "#10b981", border: "#064e3b" },
  { id: "cyber", name: "Cyberpunk Violet", preview: "#0d091a", accent: "#c084fc", border: "#581c87" }
];
