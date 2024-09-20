describe('GlProgressBar', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/progress-bar');
  }

  function checkA11yVariants() {
    cy.visitStory('base/progress-bar', {
      story: 'variants',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11yVariants,
    });
  });
});
