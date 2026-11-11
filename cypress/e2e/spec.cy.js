describe('Questão 3 - Carrinho de Compras', () => {
  it('deve adicionar um produto ao carrinho com sucesso', () => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()

    cy.url().should('include', '/cart.html')
    cy.contains('Sauce Labs Backpack').should('be.visible')
  })
})


describe('Questão 4 - API de estoque', () => {

  it('Deve retornar a quantidade disponível do produto', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/produtos/10/estoque',
      qs: {
        cor: 'Preto',
        tamanho: 'M'
      }
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade_disponivel');
      expect(response.body.quantidade_disponivel).to.be.a('number');
      expect(response.body.quantidade_disponivel).to.eq(10);
      expect(response.body.cor).to.eq('Preto');
      expect(response.body.tamanho).to.eq('M');

    });

  });

});
