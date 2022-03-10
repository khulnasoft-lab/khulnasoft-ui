describe('GlModal', () => {
  it('Modal title should be visible using a scoped slot', () => {
    cy.visit('iframe.html?id=base-modal--with-a-header&viewMode=story');

    cy.get('#test-modal-id H4').should('be.visible').contains('A custom header');
  });

  it('Modal footer should not be visible using a scoped slot', () => {
    cy.visit('iframe.html?id=base-modal--without-a-footer&viewMode=story');

    cy.get('#test-modal-id').should('not.have.class', 'modal-footer');
  });
});
