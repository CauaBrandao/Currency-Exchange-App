/**
 * Serviço de Integração com a API Frankfurter (Dados do BCE)
 * Com timeout adequado e fallback resiliente
 */

const PRIMARY_API = 'https://api.frankfurter.app';
const FALLBACK_API = 'https://api.frankfurter.dev/v1';

export async function fetchWithFallback(endpoint) {
  // Aumentado timeout para 25 segundos para suportar consultas históricas longas de 1A e 5A sem dar timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(`${PRIMARY_API}${endpoint}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`Erro na API (${res.status}): ${res.statusText}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    try {
      const fb = new AbortController();
      const fbId = setTimeout(() => fb.abort(), 25000);
      const fbRes = await fetch(`${FALLBACK_API}${endpoint}`, { signal: fb.signal });
      clearTimeout(fbId);
      if (!fbRes.ok) throw new Error(`Erro na API Fallback (${fbRes.status})`);
      return await fbRes.json();
    } catch {
      throw new Error(`Não foi possível conectar à API de câmbio. Verifique sua conexão à internet.`);
    }
  }
}

/**
 * Busca a lista de todas as moedas suportadas
 */
export async function getCurrencies() {
  return await fetchWithFallback('/currencies');
}

/**
 * Consulta a taxa mais recente entre duas moedas com montante especificado
 */
export async function getLatestRate(from, to, amount = 1) {
  if (from === to) {
    return {
      amount: Number(amount) || 1,
      base: from,
      date: new Date().toISOString().split('T')[0],
      rates: { [to]: 1 }
    };
  }
  return await fetchWithFallback(`/latest?amount=${amount}&from=${from}&to=${to}`);
}

/**
 * Busca taxas para lista múltipla de moedas
 */
export async function getMultiRates(from, toCurrencies) {
  const filtered = toCurrencies.filter(c => c !== from);
  if (!filtered.length) return { rates: {} };
  const toList = filtered.join(',');
  return await fetchWithFallback(`/latest?from=${from}&to=${toList}`);
}

/**
 * Busca dados históricos entre duas datas
 */
export async function getHistoricalRates(from, to, startDate, endDate) {
  if (from === to) {
    return {
      amount: 1,
      base: from,
      start_date: startDate,
      end_date: endDate,
      rates: {}
    };
  }
  return await fetchWithFallback(`/${startDate}..${endDate}?from=${from}&to=${to}`);
}
