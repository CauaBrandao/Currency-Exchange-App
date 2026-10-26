# Especificação de Requisitos e Escopo
## Projeto: Currency Exchange App (Fintech SPA)

---

### 1. Visão Geral do Produto
O **Currency Exchange App** é uma Single Page Application (SPA) desenvolvida em React para cotação, conversão e análise analítica de pares de moedas em tempo real e de séries históricas. A aplicação utiliza dados oficiais fornecidos pela **API Frankfurter** (mantida com dados públicos do Banco Central Europeu).

O objetivo central é substituir processos manuais e planilhas desconexas por uma interface moderna, intuitiva, acessível e de alta performance, projetada para investidores, viajantes, analistas financeiros e estudantes de economia.

---

### 2. Personas e Histórias de Usuário (User Stories)

| Persona | Perfil | Necessidade Principal |
| :--- | :--- | :--- |
| **Ana Carolina, 28 anos** | Analista de Investimentos Internacionais | Analisar a volatilidade do Dólar (USD) e Euro (EUR) frente ao Real (BRL) nos últimos 30 a 90 dias, exportando dados para auditoria. |
| **Lucas Mendes, 34 anos** | Viajante e Profissional Remoto | Converter rapidamente orçamentos em moeda estrangeira, salvando conversões frequentes e acompanhando o melhor dia de taxa. |
| **Renato Souza, 45 anos** | Gestor de Comércio Exterior | Visualizar médias, máximas e mínimas de pares cambiais em gráficos interativos e ordenar históricos por valor. |

#### Histórias de Usuário:
1. **US-01**: *Como usuário*, quero selecionar a moeda de origem e destino a partir de uma lista padronizada, *para que* eu saiba exatamente quais cotações estão disponíveis.
2. **US-02**: *Como usuário*, quero digitar um valor monetário e obter a conversão instantânea, *para que* eu conheça o valor final com base na cotação oficial mais recente.
3. **US-03**: *Como usuário*, quero inverter as moedas com um único clique (Swap), *para que* eu visualize a taxa inversa imediatamente sem ter que reconfigurar os seletores.
4. **US-04**: *Como analista*, quero escolher períodos pré-definidos (7D, 15D, 30D, 90D, 1 Ano) ou personalizados, *para que* eu possa estudar tendências do mercado.
5. **US-05**: *Como analista*, quero visualizar um gráfico interativo com pontos e métricas resumidas (mínima, máxima, média e variação percentual), *para que* eu tome decisões assertivas.
6. **US-06**: *Como usuário*, quero consultar uma tabela com todas as cotações do período, com ordenação por data e valor, *para que* eu encontre datas específicas com facilidade.
7. **US-07**: *Como usuário*, quero exportar a listagem histórica para um arquivo CSV estruturado, *para que* eu possa abrir os dados no Excel ou Google Sheets.
8. **US-08**: *Como usuário*, quero salvar pares favoritos e consultar meu histórico de conversões recentes localmente, *para que* eu não precise redigitar tudo ao recarregar a página.

---

### 3. Requisitos Funcionais (RF)

- **RF-01 (Seleção de Moedas)**: A aplicação deve listar dinamicamente todas as moedas suportadas pela API Frankfurter, exibindo código ISO (ex: USD), nome por extenso (ex: United States Dollar) e respectivo indicador visual.
- **RF-02 (Inversão Rápida / Swap)**: O usuário pode alternar instantaneamente a moeda de origem e destino clicando no botão de swap.
- **RF-03 (Entrada Numérica e Validação)**: O campo de valor aceita apenas números válidos maiores que zero, formatados visualmente com suporte a casas decimais.
- **RF-04 (Cálculo e Exibição de Cotação)**: O sistema deve exibir o valor convertido, a taxa cambial unitária aplicada (ex: 1 USD = 5.5884 BRL) e a data da cotação retornada pela API.
- **RF-05 (Consulta de Dados Históricos)**: O sistema deve buscar dados históricos do par selecionado para intervalos de 7 dias, 15 dias, 30 dias, 90 dias ou 1 ano.
- **RF-06 (Gráfico Interativo de Tendência)**: Renderização de gráfico vetorial responsivo com eixo temporal, linha de cotação, pontos interativos, tooltips com taxa exata e linha média de referência.
- **RF-07 (Métricas Analíticas)**: Exibição de cards de resumo com Menor Taxa, Maior Taxa, Taxa Média e Variação Percentual do período selecionado.
- **RF-08 (Tabela de Registros com Ordenação)**: Listagem de todas as cotações diárias do período, permitindo ordenação ascendente e descendente por Data e por Taxa de Câmbio.
- **RF-09 (Filtros de Tabela)**: Possibilidade de filtrar os registros históricos por busca textual de data e intervalo de taxas.
- **RF-10 (Exportação CSV)**: Botão de download de arquivo `.csv` codificado em UTF-8 com cabeçalho padronizado: `Data, Moeda Origem, Moeda Destino, Taxa, Valor Base, Valor Convertido`.
- **RF-11 (Favoritos e Recentes)**: Armazenamento no `localStorage` das últimas 10 conversões realizadas e dos pares favoritos marcados com estrela.
- **RF-12 (Tratamento de Estados de Interface)**: Exibição visual de:
  - *Loading*: Indicadores visuais pulsantes e skeletons durante as chamadas assíncronas.
  - *Error*: Mensagens amigáveis caso a API esteja indisponível ou ocorra falha de rede, com botão de repetição (Retry).
  - *Empty*: Telas informativas e ilustrativas para buscas sem resultados ou tabelas sem registros.
- **RF-13 (Tema Visual Claro / Escuro)**: Alternador de tema (Light Mode / Dark Mode) persistido na sessão do navegador.

---

### 4. Requisitos Não Funcionais (RNF)

- **RNF-01 (Tecnologia Base)**: Desenvolvido em **React** (v18+) utilizando **Vite** para build veloz e ecossistema moderno.
- **RNF-02 (Estilização)**: Vanilla CSS / CSS Moderno com design tokens (Custom Properties), componentes isolados e sem dependências pesadas de frameworks utilitários externos.
- **RNF-03 (Responsividade)**: Layout fluido adaptável de 320px (smartphones compactos) até telas Ultra-Wide 4K.
- **RNF-04 (Acessibilidade)**: Conformidade com diretrizes WCAG 2.1 nível AA, incluindo contraste de cores, labels semânticos em formulários e suporte a navegação por teclado (`Tab`, `Enter`).
- **RNF-05 (Performance e Otimização)**: Uso de debouncing em entradas, memoização com `useMemo`/`useCallback` quando pertinente, e cache em memória para requisições idênticas recentes.
- **RNF-06 (Resiliência de Rede)**: Timeout configurável de 10 segundos nas requisições fetch e fallback caso a Frankfurter API primária apresente indisponibilidade transitória.

---

### 5. Regras de Negócio (RN)

- **RN-01**: A moeda de origem e a moeda de destino não podem ser idênticas para requisição à API. Se o usuário selecionar a mesma moeda, o sistema deve apresentar taxa 1.0000 e alertar que o câmbio é unitário sem disparar chamada desnecessária.
- **RN-02**: Valores informados para conversão devem ser estritamente superiores a zero (`valor > 0`). Valores nulos ou negativos exibem aviso de validação imediato.
- **RN-03**: Finais de semana e feriados bancários internacionais não possuem cotações emitidas pelo BCE; o sistema deve tratar descontinuidades de datas com graciosidade no gráfico e na tabela.
- **RN-04**: Todo arquivo CSV exportado deve utilizar separador vírgula ou ponto-e-vírgula padronizado com BOM UTF-8 para correta abertura no Microsoft Excel sem erros de acentuação.

---

### 6. Critérios de Aceite (Formato Gherkin)

#### Cenário 1: Conversão padrão bem-sucedida
- **Dado** que o usuário está na página inicial com USD selecionado na origem e BRL no destino;
- **Quando** ele digita o valor "150.00";
- **Então** o sistema exibe o valor convertido correspondente (ex: "R$ 838,26"), a taxa unitária atual e a data da cotação.

#### Cenário 2: Inversão de Moedas (Swap)
- **Dado** que o par atual é EUR $\rightarrow$ JPY com taxa calculada;
- **Quando** o usuário clica no botão "Inverter Moedas";
- **Então** o par torna-se JPY $\rightarrow$ EUR, a taxa inversa é recalculada e o histórico é atualizado para a nova direção.

#### Cenário 3: Exportação de CSV
- **Dado** que existem 30 registros históricos carregados na tabela;
- **Quando** o usuário clica em "Exportar CSV";
- **Então** um download do arquivo `historico_cambio_USD_BRL.csv` é disparado contendo as 30 linhas formatadas.
