describe('GlProgressBar', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/progress-bar');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
    });
  });
});
