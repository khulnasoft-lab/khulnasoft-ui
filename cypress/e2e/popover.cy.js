describe('GlPopover', () => {
  it('popover title should be visible when using props', () => {
    cy.visitStory('base/popover');

    cy.findByTestId('popover-with-props').contains('Popover');
  });

  it('popover title should be visible when using scoped slot', () => {
    cy.visitStory('base/popover', { story: 'on-click' });

    cy.findByTestId('popover-button-click').click();

    cy.findByTestId('popover-title').should('be.visible').contains('Popover title');
  });

  it('closes popover when clicking on close button', () => {
    cy.visitStory('base/popover', { story: 'with-close-button' });

    cy.findByTestId('popover-with-close-button').should('exist').should('be.visible');

    cy.findByTestId('close-button').click();

    cy.findByTestId('popover-with-close-button').should('not.exist');
  });
});
