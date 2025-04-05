describe('GlBarChart', () => {
  beforeEach(() => {
    cy.visitStory('charts/bar-chart');

    if (Cypress.browser.name === 'edge') {
      // cy edge environment, mousemove do not trigger zr.mousemove event
      // use click to mock the event
      cy.get('path').last().click();
    } else {
      cy.get('path').last().trigger('mousemove');
    }
  });

  it('tooltip title should render', () => {
    cy.get('.popover-header').should('be.visible').contains('Erin (User)');
  });

  it('tooltip content should render', () => {
    cy.get('.popover-body').should('be.visible').contains('Pushes per day 30');
  });
});
