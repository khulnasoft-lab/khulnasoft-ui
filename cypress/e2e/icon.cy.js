describe('GlIcon', () => {
  function checkA11YWithAriaLabel() {
    cy.visitStory('base/icon');

    cy.glCheckA11y();
  }

  function checkA11YWithoutAriaLabel() {
    cy.visitStory('base/icon', {
      args: {
        ariaLabel: '',
      },
    });

    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    checkA11YWithAriaLabel();
    checkA11YWithoutAriaLabel();
  });
});
