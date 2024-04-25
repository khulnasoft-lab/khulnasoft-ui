describe('GlSorting', () => {
  function checkA11YSorting() {
    cy.visitStory('base/sorting');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YSorting,
    });
  });
});
