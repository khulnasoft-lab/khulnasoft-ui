describe('GlToken', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/token');
    cy.glCheckA11y();
  }
  function checkA11yWithViewOnly() {
    cy.visitStory('base/token', {
      story: 'view-only',
    });
    cy.glCheckA11y();
  }
  function checkA11yWithAvatar() {
    cy.visitStory('base/token', {
      story: 'with-avatar',
    });
    cy.glCheckA11y();
  }
  it('passes axe accessibility checks', () => {
    checkA11yDefaultState();
    checkA11yWithViewOnly();
    checkA11yWithAvatar();
  });
});
