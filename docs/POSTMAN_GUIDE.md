# Guia de Testes de API com Postman
## Projeto: Currency Exchange App (API Frankfurter)

---

### 1. Visão Geral da Collection
O arquivo [`postman/Frankfurter_API.postman_collection.json`](../postman/Frankfurter_API.postman_collection.json) contém uma suite completa de requisições e asserções automatizadas para validar a integração com a **API Frankfurter**.

A Frankfurter API é um serviço aberto e de código aberto que disponibiliza dados cambiais publicados pelo Banco Central Europeu (BCE).

---

### 2. Instruções de Importação no Postman

1. Abra o **Postman** (Desktop ou Web);
2. Clique no botão **Import** (canto superior esquerdo);
3. Selecione a opção **File** e escolha o arquivo:
   `postman/Frankfurter_API.postman_collection.json`;
4. Confirme a importação. A collection `"Frankfurter Currency API - Senac Project"` estará disponível na sua aba de Collections;
5. Para executar todos os testes em lote, clique nos 3 pontinhos da Collection e selecione **Run Collection**.

---

### 3. Variáveis de Coleção Configuradas

| Variável | Valor Padrão | Descrição |
| :--- | :--- | :--- |
| `baseUrl` | `https://api.frankfurter.app` | Host principal da API |
| `baseCurrency` | `USD` | Moeda de referência |
| `targetCurrency` | `BRL` | Moeda alvo |

---

### 4. Endpoints Testados e Asserções

#### 1. `GET /currencies`
- **Finalidade**: Listar todas as moedas suportadas pelo BCE.
- **Asserções**:
  - `Status code é 200 OK`
  - `Resposta é um objeto contendo chaves ISO (USD, BRL, EUR)`

#### 2. `GET /latest`
- **Finalidade**: Obter últimas taxas publicadas com base EUR.
- **Asserções**:
  - `Status code é 200 OK`
  - `Presença de base, amount, date e rates`

#### 3. `GET /latest?from=USD&to=BRL`
- **Finalidade**: Taxa unitária atual entre o par USD e BRL.
- **Asserções**:
  - `Status code é 200 OK`
  - `Taxa de BRL é um número estritamente positivo`

#### 4. `GET /latest?amount=150&from=USD&to=BRL`
- **Finalidade**: Conversão de valor com montante especificado.
- **Asserções**:
  - `Status code é 200 OK`
  - `Campo amount corresponde exatamente a 150`

#### 5. `GET /latest?from=EUR&to=USD,GBP,JPY,BRL`
- **Finalidade**: Cotação para múltiplos destinos em uma única chamada.
- **Asserções**:
  - `Status code é 200 OK`
  - `Retorno contém as 4 moedas requisitadas`

#### 6. `GET /YYYY-MM-DD?from=USD&to=BRL`
- **Finalidade**: Cotação em data histórica específica.
- **Asserções**:
  - `Status code é 200 OK`
  - `Validação de formato de data ISO`

#### 7. `GET /YYYY-MM-DD..YYYY-MM-DD?from=USD&to=BRL`
- **Finalidade**: Série temporal histórica em intervalo de datas.
- **Asserções**:
  - `Status code é 200 OK`
  - `Objeto rates contém dias úteis no intervalo`
