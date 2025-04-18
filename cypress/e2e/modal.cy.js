describe('GlModal', () => {
  it('Modal title should be visible using a scoped slot', () => {
    cy.visitStory('base/modal', { story: 'with-a-header' });

    cy.get('#test-modal-id H4').should('be.visible').contains('A custom header');
  });

  it('Modal footer should not be visible using a scoped slot', () => {
    cy.visitStory('base/modal', { story: 'without-a-footer' });

    cy.get('#test-modal-id').should('not.have.class', 'modal-footer');
  });

  it('focused first focusable element by default', () => {
    cy.visitStory('base/modal');

    cy.contains('button', 'Cancel').should('be.focused');
  });

  it('does not focus first focusable element when noFocusOnShow prop is true', () => {
    cy.visitStory('base/modal', { story: 'without-focus' });

    cy.contains('button', 'Cancel').should('not.be.focused');
  });
});
