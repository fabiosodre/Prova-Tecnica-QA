# Prova Técnica - Analista de Qualidade (QA)

## Questão 1 – Cenários de teste (Gherkin)

**Contexto:** o sistema possui produtos de vestuário com variações de tamanho (P, M, G e GG) e cor (Azul e Preto). Cada combinação possui seu próprio estoque. Uma variação sem estoque não pode ser vendida, mesmo que existam outras variações disponíveis.

**Premissas consideradas:**
- O estoque é controlado individualmente por combinação de produto, cor e tamanho.
- A baixa definitiva do estoque ocorre após a conclusão do pedido.
- A disponibilidade deve ser validada novamente no momento da conclusão da compra.
- Variações inativas não podem ser vendidas.

### Cenário 1 – Compra de diferentes variações com estoque disponível

```gherkin
Dado que o produto possui 10 unidades da cor Azul no tamanho P
E possui 8 unidades da cor Preto no tamanho M
Quando o cliente comprar 2 unidades da variação Azul P
E comprar 3 unidades da variação Preto M
E concluir o pedido
Então a compra deve ser concluída com sucesso
E o estoque da variação Azul P deve ser 8
E o estoque da variação Preto M deve ser 5
E os estoques das demais variações devem permanecer inalterados
```

### Cenário 2 – Compra de múltiplas unidades dentro do estoque disponível

```gherkin
Dado que o produto possui 10 unidades da cor Azul no tamanho M
Quando o cliente comprar 5 unidades dessa variação
E concluir o pedido
Então a compra deve ser concluída com sucesso
E o estoque da variação deve ser atualizado para 5 unidades
```

### Cenário 3 – Tentativa de compra acima do estoque disponível

```gherkin
Dado que o produto possui 3 unidades da cor Preto no tamanho G
Quando o cliente tentar comprar 5 unidades dessa variação
Então o sistema deve impedir a conclusão da compra
E deve informar que a quantidade solicitada não está disponível
E o estoque deve permanecer inalterado
```

### Cenário 4 – Tentativa de compra de variação sem estoque

```gherkin
Dado que o produto possui 0 unidades da cor Azul no tamanho GG
Quando o cliente tentar comprar essa variação
Então o sistema deve impedir a compra
E deve informar que a variação está sem estoque
```

### Cenário 5 – Tentativa de compra de variação inativa

```gherkin
Dado que a variação Preto GG está inativa
E possui 10 unidades em estoque
Quando o cliente tentar comprar essa variação
Então o sistema deve impedir a compra
E deve informar que a variação não está disponível para venda
```

### Cenário 6 – Compra de quantidade exatamente igual ao estoque disponível

```gherkin
Dado que o produto possui 5 unidades da cor Azul no tamanho G
Quando o cliente comprar exatamente 5 unidades dessa variação
E concluir o pedido
Então a compra deve ser concluída com sucesso
E o estoque da variação deve ser atualizado para 0
E novas compras dessa variação devem ser impedidas enquanto não houver reposição
```

### Cenário 7 – Tentativa de compra com quantidade negativa

```gherkin
Dado que o produto possui 10 unidades da cor Azul no tamanho M
Quando o cliente informar a quantidade -2
Então o sistema deve rejeitar a quantidade informada
E deve apresentar uma mensagem indicando que a quantidade é inválida
E o estoque deve permanecer inalterado
```

### Cenário 8 – Duas compras simultâneas disputando o mesmo estoque

```gherkin
Dado que o produto possui 5 unidades da cor Preto no tamanho G
E dois clientes tentam comprar 3 unidades dessa mesma variação simultaneamente
Quando os dois clientes tentarem concluir seus pedidos
Então no máximo um pedido deve ser concluído com sucesso
E o outro pedido deve ser impedido por falta de estoque
E o estoque final não deve ficar negativo
E o estoque restante deve ser de 2 unidades caso um dos pedidos seja concluído
```

Para esse cenário, sincronizaria as tentativas de conclusão para que ambas ocorram praticamente ao mesmo tempo, validando se o sistema evita a venda de uma quantidade maior do que o estoque disponível.

---

## Questão 2 – Registro de bug

### Bug: Preço zerado ao selecionar a variação Preto + GG do produto Camiseta Polo

**Descrição:**

Ao adicionar ao carrinho o produto Camiseta Polo, referência 100, selecionando a cor Preto e o tamanho GG, o preço apresentado no carrinho é alterado para R$ 0,00, embora o valor cadastrado para essa variação seja R$ 89,90.

Foi identificado que o problema ocorre especificamente nessa combinação de cor e tamanho. As demais variações do produto apresentam o preço corretamente.

**Pré-condições:**
- Produto Camiseta Polo cadastrado com referência 100.
- Variação Preto + GG disponível para venda.
- Preço cadastrado: R$ 89,90.

**Passos para reproduzir:**
1. Acessar a loja.
2. Localizar o produto Camiseta Polo, referência 100.
3. Selecionar a cor Preto.
4. Selecionar o tamanho GG.
5. Adicionar o produto ao carrinho.
6. Acessar o carrinho e verificar o preço apresentado.
7. Prosseguir com o checkout, se necessário, para reproduzir o comportamento observado.

**Resultado atual:**

O produto é apresentado no carrinho com o valor de R$ 0,00. O fluxo permite prosseguir com a finalização do pedido sem realizar o pagamento correspondente ao valor do produto.

**Resultado esperado:**

O produto deve ser apresentado com o preço cadastrado de R$ 89,90, e o sistema deve considerar esse valor no cálculo do carrinho e do pedido, impedindo a finalização sem o pagamento devido.

**Severidade:** Crítica, pois pode permitir a conclusão de pedidos sem a cobrança correta.

**Prioridade sugerida:** Alta, devido ao impacto financeiro e à possibilidade de exploração do problema.

**Evidência:** vídeo demonstrando a seleção da variação, a inclusão no carrinho e a apresentação do preço zerado. Recomenda-se anexar também o identificador do pedido, caso tenha sido gerado.

---

## Questão 3 – Automação de teste de interface (Cypress)

Foi desenvolvido um teste automatizado utilizando Cypress para validar o fluxo básico de compra na loja de demonstração Sauce Demo.

**Cenário automatizado:**
1. Acessar a página de login.
2. Informar o usuário `standard_user`.
3. Informar a senha `secret_sauce`.
4. Realizar o login.
5. Adicionar o produto Sauce Labs Backpack ao carrinho.
6. Acessar o carrinho.
7. Validar se o produto adicionado está sendo apresentado corretamente.

**Validações realizadas:**
- Login realizado com sucesso.
- Acesso à página de produtos.
- Produto correto adicionado ao carrinho.
- Produto apresentado no carrinho após a inclusão.

O objetivo é garantir que o fluxo principal de acesso e inclusão de produto no carrinho funcione conforme esperado.

---

## Questão 4 – Testes de API e Integração

**Endpoint:**

`GET /api/v1/produtos/{id}/estoque?cor={cor}&tamanho={tamanho}`

### 1. Validações que seriam realizadas na API

Para esse endpoint, realizaria validações de status HTTP, tipos de dados, regras de negócio e tratamento de exceções.

**Status Codes:**
- `200 OK`: verificar se a consulta foi realizada com sucesso.
- `400 Bad Request`: validar o comportamento quando os parâmetros são inválidos ou não informados.
- `404 Not Found`: verificar o retorno quando o produto ou a variação consultada não existir.
- `500 Internal Server Error`: validar o tratamento de possíveis falhas internas do servidor.

**Tipos de dados e conteúdo da resposta:**
- Verificar se o campo `quantidade_disponivel` existe e retorna um valor numérico.
- Garantir que a quantidade disponível não apresente valores negativos.
- Validar se o ID, a cor e o tamanho retornados correspondem aos parâmetros enviados na requisição.

**Regras de negócio:**
- Conferir se a quantidade retornada corresponde ao estoque da combinação específica de produto, cor e tamanho.
- Verificar se uma variação sem estoque retorna quantidade igual a zero.
- Garantir que o estoque de uma variação não seja confundido com o de outra.

**Caminhos de exceção:**
- Consultar um produto com ID inexistente ou inválido.
- Informar uma cor ou tamanho não cadastrados para o produto.
- Realizar a requisição sem informar os parâmetros obrigatórios.
- Simular uma falha interna do servidor e verificar se a API retorna o código de erro adequado.

Essas validações ajudam a garantir que a API retorne informações corretas, respeite as regras de negócio e trate adequadamente situações inesperadas.

### 2. Automação do teste de API

Foi desenvolvido um teste utilizando `cy.request()` do Cypress para consultar o estoque de um produto e validar o retorno da API.

Como não foi disponibilizada uma API real para integração, foi criado um servidor local de mock utilizando Node.js. Esse servidor simula o endpoint e retorna dados controlados para permitir a execução do teste.

O teste verifica:
- Se a requisição retorna o status HTTP `200`.
- Se o campo `quantidade_disponivel` está presente na resposta.
- Se a quantidade disponível é do tipo numérico.
- Se o valor retornado corresponde ao esperado.
- Se a cor e o tamanho retornados correspondem aos parâmetros enviados.

---

## Questão 5 – Estratégia de Testes para Inteligência Artificial (opcional)

Para testar um Agente de IA, considero importante validar não apenas as respostas apresentadas ao cliente, mas principalmente se ele consegue compreender as mensagens, cumprir o objetivo do atendimento e executar corretamente as ações esperadas.

Como a IA pode responder à mesma pergunta de maneiras diferentes, eu não validaria necessariamente o texto exato da resposta, mas sim se a intenção foi compreendida e se o fluxo seguiu corretamente.

### 1. Caminho Feliz (Happy Path)

Simularia uma conversa em que o cliente responde corretamente às perguntas realizadas pelo agente:

1. O cliente envia "Olá" pelo WhatsApp.
2. O agente solicita o nome do cliente.
3. O cliente informa "Fabio Sodre".
4. O agente pergunta qual é o interesse do cliente.
5. O cliente responde "Gostaria de saber sobre os produtos".
6. O agente registra corretamente o nome e o interesse no painel web.
7. O agente encaminha o atendimento para o setor responsável.

Durante esse fluxo, validaria:
- Se o agente realiza as perguntas necessárias na ordem esperada.
- Se consegue identificar corretamente o nome e o interesse do cliente, mesmo com diferentes formas de escrita.
- Se os dados são armazenados corretamente no painel web.
- Se não ocorrem duplicidades ou troca de informações entre clientes.
- Se o encaminhamento é realizado para o setor correspondente ao interesse informado.
- Se o cliente recebe uma confirmação do encaminhamento.

### 2. Fallback (tratamento de situações inesperadas)

Criaria cenários em que o cliente não responde conforme o esperado, verificando se o agente consegue contornar a situação sem comprometer o atendimento.

**Exemplos:**
- **Mensagem aleatória:** o cliente responde algo sem relação com a pergunta. O agente deve tentar direcionar a conversa novamente.
- **Apenas um emoji:** o cliente envia somente um emoji, como "😁" ou "😒". O agente não deve interpretar isso como uma informação válida.
- **Palavras ofensivas:** o cliente utiliza linguagem inadequada. O agente deve manter uma postura profissional, sem responder de maneira ofensiva, e seguir as regras de atendimento.
- **Resposta incompleta:** o cliente informa apenas o primeiro nome ou responde de forma vaga sobre seu interesse. O agente deve solicitar a informação que falta.
- **Ausência de resposta:** o cliente deixa de responder. O agente deve seguir a regra configurada para aguardar, enviar um lembrete ou encerrar o fluxo.

Nesses cenários, validaria:
- Se o agente identifica respostas inválidas ou fora do contexto.
- Se evita salvar informações incorretas no painel.
- Se mantém o contexto da conversa e não fica repetindo perguntas desnecessariamente.
- Se consegue recuperar a conversa ou encaminhar para um atendente humano quando necessário.
- Se não entra em um ciclo infinito de perguntas.

### 3. Validação da consistência da IA e integração

Como a IA pode utilizar palavras diferentes para transmitir a mesma informação, repetiria os cenários utilizando diferentes formas de escrita, abreviações e expressões com o mesmo significado, verificando se o agente continua compreendendo corretamente a intenção do cliente.

Também realizaria testes de integração para verificar se as informações identificadas pelo agente de IA são transmitidas e armazenadas corretamente no painel web, garantindo que o nome e o interesse do cliente sejam registrados sem alterações, duplicidades ou associação incorreta.

Além disso, verificaria se o encaminhamento do atendimento ocorre para o setor correspondente.

O principal objetivo seria garantir que, mesmo com respostas diferentes, o agente consiga conduzir o atendimento corretamente, armazenar informações confiáveis e encaminhar o cliente para o setor adequado.
