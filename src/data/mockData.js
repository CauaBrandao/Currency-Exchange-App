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
  ARS: "Peso Argentino"
};

export const MOCK_POPULAR_PAIRS = [
  { from: "USD", to: "BRL", label: "USD / BRL" },
  { from: "EUR", to: "BRL", label: "EUR / BRL" },
  { from: "GBP", to: "BRL", label: "GBP / BRL" },
  { from: "EUR", to: "USD", label: "EUR / USD" },
  { from: "USD", to: "JPY", label: "USD / JPY" }
];

export const MOCK_LATEST_CONVERSION = {
  amount: 100,
  base: "USD",
  target: "BRL",
  rate: 5.5884,
  result: 558.84,
  date: "2026-10-26"
};

export const MOCK_HISTORICAL_DATA = [
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
