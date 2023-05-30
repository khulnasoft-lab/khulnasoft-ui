describe('GlStackedColumnChart', () => {
  beforeEach(() => {
    cy.visitStory('charts/stacked-column-chart');

    if (Cypress.browser.name === 'edge') {
      // cy edge environment, mousemove do not trigger zr.mousemove event
      // use click to mock the event
      cy.get('path[fill^="rgb"]').last().click();
    } else {
      cy.get('path[fill^="rgb"]').last().trigger('mousemove');
    }
  });

  it('tooltip title should render', () => {
    cy.get('.popover-header').should('be.visible').contains('Dec (January - December 2018)');
  });

  it('tooltip content should render', () => {
    cy.get('.popover-body').should('be.visible').contains('Fun 1 31');
  });
});
