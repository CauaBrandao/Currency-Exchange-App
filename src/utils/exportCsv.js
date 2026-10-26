/**
 * Utilitário para exportação de dados cambiais em formato CSV
 * Inclui BOM UTF-8 para compatibilidade perfeita com Microsoft Excel
 */

export function exportHistoricalRatesToCsv({
  data = [],
  fromCurrency = 'USD',
  toCurrency = 'BRL',
  amount = 1
}) {
  if (!data || data.length === 0) {
    alert('Nenhum dado disponível para exportação.');
    return;
  }

  // Cabeçalho padronizado do CSV
  const headers = [
    'Data',
    'Moeda Origem',
    'Moeda Destino',
    'Taxa de Cambio',
    'Valor Base',
    'Valor Convertido'
  ];

  // Linhas formatadas
  const rows = data.map(item => {
    const convertedVal = (item.rate * (Number(amount) || 1)).toFixed(2);
    return [
      `"${item.date}"`,
      `"${fromCurrency}"`,
      `"${toCurrency}"`,
      item.rate.toFixed(4),
      (Number(amount) || 1).toFixed(2),
      convertedVal
    ].join(';');
  });

  // Juntar cabeçalho e linhas com quebra de linha padrão Windows/Unix
  const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');

  // Criar Blob e disparar download no navegador
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const todayStr = new Date().toISOString().split('T')[0];
  const filename = `cambio_${fromCurrency}_${toCurrency}_${todayStr}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
