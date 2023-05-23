describe('GlAreaChart', () => {
  beforeEach(() => {
    cy.visitStory('charts/area-chart');

    if (Cypress.browser.name === 'edge') {
      // cy edge environment, mousemove do not trigger zr.mousemove event
      // use click to mock the event
      cy.get('g').last().click();
    } else {
      cy.get('g').last().trigger('mousemove', 'center');
    }
  });

  it('tooltip title should render', () => {
    cy.get('.popover-header').should('be.visible').contains('Thu (Time)');
  });

  it('tooltip content should render', () => {
    cy.get('.popover-body').should('be.visible').contains('Value 934');
  });
});
