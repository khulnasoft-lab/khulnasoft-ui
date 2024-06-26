describe('GlFormCharacterCount', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-character-count');
    cy.glCheckA11y();
  }

  function checkA11YErrorState() {
    cy.visitStory('base/form/form-character-count', {
      args: {
        value: `${'a'.repeat(101)}`,
      },
    });
    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YErrorState,
    });
  });
});
