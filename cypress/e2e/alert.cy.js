describe('GlAlert', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/alert');
  }

  function checkA11YAllAlertVariants() {
    cy.visitStory('base/alert', {
      story: 'variants',
    });
  }

  function checkA11YCustomActions() {
    cy.visitStory('base/alert', {
      story: 'custom-actions',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YAllAlertVariants,
      checkA11YCustomActions,
    });
  });
});
