describe('GlFormCharacterCount', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-character-count');
  }

  function checkA11YErrorState() {
    cy.visitStory('base/form/form-character-count', {
      args: {
        value: `${'a'.repeat(101)}`,
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YErrorState,
    });
  });
});
