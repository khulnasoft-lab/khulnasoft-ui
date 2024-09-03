describe('GlFormGroup', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-group');
  }

  function checkA11YWithDescription() {
    cy.visitStory('base/form/form-group', {
      story: 'with-label-description',
      args: {
        optional: true,
        labelDescription: 'form label description',
      },
    });
  }

  function checkA11YDisabled() {
    cy.visitStory('base/form/form-group', {
      story: 'disabled',
    });
  }

  function checkA11YWithLabelSlot() {
    cy.visitStory('base/form/form-group', {
      story: 'with-label-slot',
      args: {
        optional: true,
      },
    });
  }

  function checkA11YWithDescriptionSlot() {
    cy.visitStory('base/form/form-group', {
      story: 'with-description-slot',
      args: {
        optional: true,
      },
    });
  }
  function checkA11YWithValidations() {
    cy.visitStory('base/form/form-group', {
      story: 'with-validations',
      args: {
        label: 'Name',
        description: 'Enter a first and last name.',
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YWithDescription,
      checkA11YDisabled,
      checkA11YWithLabelSlot,
      checkA11YWithDescriptionSlot,
      checkA11YWithValidations,
    });
  });
});
