describe('GlDatepicker', () => {
  before(() => {
    cy.visitStory('datepicker');
    cy.injectAxe();
  });

  describe('a11y', () => {
    it('has no detectable a11y violations', () => {
      cy.glCheckA11y();
    });
  });
});
