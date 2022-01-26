describe('GlPopover', () => {
  it('popover title should be visible when using props', () => {
    cy.visitStory('popover');

    cy.findByTestId('popover-with-props').contains('Popover');
  });

  it('popover title should be visible when using scoped slot', () => {
    cy.visit('iframe.html?id=base-popover--on-click&viewMode=story');

    cy.findByTestId('popover-button-click').click();

    cy.findByTestId('popover-title').should('be.visible').contains('Popover title');
  });
});
