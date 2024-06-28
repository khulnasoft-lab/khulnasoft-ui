describe('GlFormText', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-text');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
    });
  });
});
