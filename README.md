# Prova Técnica - Analista de Qualidade (QA)

## Sobre o projeto

Este repositório contém as respostas conceituais e os testes automatizados desenvolvidos para a prova técnica. As respostas estão no arquivo [RESPOSTAS.md](./RESPOSTAS.md).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (com npm)

## Instalação do projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/fabiosodre/Prova-QA.git
   ```

2. Acesse a pasta:

   ```bash
   cd Prova-QA
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Instale o executável do Cypress:

   ```bash
   npx cypress install
   ```

## Configuração do Mock - Questão 4

Para o teste de API da Questão 4, foi criado um servidor local com Node.js que simula o endpoint de consulta de estoque. Como não foi disponibilizada uma API real para integração, o mock retorna dados controlados do produto, cor, tamanho e quantidade disponível.

**Antes de executar o teste da Questão 4:**

1. Abra um terminal na pasta raiz do projeto.
2. Inicie o servidor mock:

   ```bash
   node mock-api.js
   ```

3. Mantenha esse terminal aberto durante a execução dos testes.

O servidor ficará disponível em `http://localhost:3000`.

## Execução dos testes

Com as dependências instaladas e, para a Questão 4, o servidor mock iniciado, abra um **segundo terminal** na pasta raiz do projeto.

Para abrir a interface do Cypress:

```bash
npx cypress open
```

Para executar os testes pelo terminal:

```bash
npx cypress run
```

**Observação:** o servidor mock é necessário apenas para a execução do teste de API da Questão 4. Os demais testes não dependem dele.

## Estrutura do projeto


```text
Prova-QA/
├── cypress/
│   └── e2e/
│       └── spec.cy.js
│   └── fixtures/
│       └── example.json
│   └── support/
│       └── commands.js
│       └── e2e.js
├── cypress.config.js
├── mock-api.js
├── package-lock.json
├── package.json
├── README.md
└── RESPOSTAS.md
```
