describe('GlFormGroup', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-group');
    cy.glCheckA11y();
  }

  function checkA11YWithDescription() {
    cy.visitStory('base/form/form-group', {
      story: 'with-label-description',
      args: {
        optional: true,
        labelDescription: 'form label description',
      },
    });
    cy.glCheckA11y();
  }

  function checkA11YDisabled() {
    cy.visitStory('base/form/form-group', {
      story: 'disabled',
    });
    cy.glCheckA11y();
  }

  function checkA11YWithValidations() {
    cy.visitStory('base/form/form-group', {
      story: 'with-validations',
      args: {
        label: 'Name',
        description: 'Enter a first and last name.',
      },
    });
    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YWithDescription,
      checkA11YDisabled,
      checkA11YWithValidations,
    });
  });
});
