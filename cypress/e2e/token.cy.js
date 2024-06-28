describe('GlToken', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/token');
  }

  function checkA11yWithViewOnly() {
    cy.visitStory('base/token', {
      story: 'view-only',
    });
  }

  function checkA11yWithAvatar() {
    cy.visitStory('base/token', {
      story: 'with-avatar',
    });
  }

  it('passes axe accessibility checks', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11yWithViewOnly,
      checkA11yWithAvatar,
    });
  });
});
