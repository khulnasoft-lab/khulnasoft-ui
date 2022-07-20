describe('GlModal', () => {
  it('Modal title should be visible using a scoped slot', () => {
    cy.visit('iframe.html?id=base-modal--with-a-header&viewMode=story');

    cy.get('#test-modal-id H4').should('be.visible').contains('A custom header');
  });

  it('Modal footer should not be visible using a scoped slot', () => {
    cy.visit('iframe.html?id=base-modal--without-a-footer&viewMode=story');

    cy.get('#test-modal-id').should('not.have.class', 'modal-footer');
  });

  it('focused first focusable element by default', () => {
    cy.visit('iframe.html?id=base-modal--default');

    cy.contains('button', 'Cancel').should('be.focused');
  });

  it('does not focus first focusable element when noFocusOnShow prop is true', () => {
    cy.visit('iframe.html?id=base-modal--without-focus');

    cy.contains('button', 'Cancel').should('not.be.focused');
  });
});
