describe('GlToast', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/toast');
  }

  function checkA11YToastWithHoverAction() {
    cy.visitStory('base/toast', {
      story: 'with-actions',
    });

    cy.get('.gl-toast-close-button').realHover();
  }

  function checkA11YToastWithFocusAction() {
    cy.visitStory('base/toast', {
      story: 'with-actions',
    });

    cy.get('.gl-toast-close-button').focus();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YToastWithHoverAction,
      checkA11YToastWithFocusAction,
    });
  });
});
