describe('GlBreadcrumb', () => {
  describe('on a wide screen', () => {
    beforeEach(() => {
      cy.viewport(2000, 600);
      cy.visitStory('base/breadcrumb');
    });

    it('shows all breadcrumb items', () => {
      cy.contains('First item');
      cy.contains('Fourth item');
    });

    it('does not show the dropdown toggle', () => {
      cy.get('[data-testid="base-dropdown-toggle"]').should('not.exist');
    });
  });

  describe('on a small screen', () => {
    beforeEach(() => {
      cy.viewport(300, 600);
      cy.visitStory('base/breadcrumb');
    });

    it('moves overflowing breadcrumbs into a dropdown', () => {
      cy.contains('Fourth item').should('be.visible');
      cy.contains('First item').should('not.be.visible');
      cy.get('[data-testid="base-dropdown-toggle"]').click();
      cy.contains('First item').should('be.visible');
    });
  });
});
