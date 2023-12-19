describe('GlAlert', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/alert');

    cy.glCheckA11y();
  }

  function checkA11YAllAlertVariants() {
    cy.visitStory('base/alert', {
      story: 'variants',
    });

    cy.glCheckA11y();
  }

  function checkA11YCustomActions() {
    cy.visitStory('base/alert', {
      story: 'custom-actions',
    });

    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    checkA11YDefaultState();
    checkA11YAllAlertVariants();
    checkA11YCustomActions();
  });
});
