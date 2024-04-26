describe('GlSegmentedControl', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/segmented-control');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
    });
  });
});
