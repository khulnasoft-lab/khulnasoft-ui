describe('GlIcon', () => {
  function checkA11YWithAriaLabel() {
    cy.visitStory('base/icon');
  }

  function checkA11YWithoutAriaLabel() {
    cy.visitStory('base/icon', {
      args: {
        ariaLabel: '',
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YWithAriaLabel,
      checkA11YWithoutAriaLabel,
    });
  });
});
