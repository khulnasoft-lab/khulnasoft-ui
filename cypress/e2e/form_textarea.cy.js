describe('GlFormTextarea', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-textarea');
  }

  function checkA11YFocusState() {
    cy.visitStory('base/form/form-textarea');
    cy.get('textarea').focus();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YFocusState,
    });
  });
});
