describe('GlTooltip', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/tooltip', {
      story: 'top-default',
    });
    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
    });
  });
});
