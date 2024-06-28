describe('GlFormInput', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-input');
  }

  function checkA11YFormDisabledState() {
    cy.visitStory('base/form/form-input', {
      args: {
        disabled: true,
      },
    });
  }

  function checkA11YFormInputReadOnlyState() {
    cy.visitStory('base/form/form-input', {
      args: {
        readOnly: true,
      },
    });
  }

  function checkA11YFormInputNumnerInput() {
    cy.visitStory('base/form/form-input', {
      args: {
        type: 'number',
      },
    });
  }

  function checkA11YFormInputResponsiveWidth() {
    cy.visitStory('base/form/form-input', {
      args: {
        width: 'default',
      },
    });

    cy.visitStory('base/form/form-input', {
      args: {
        width: 'md',
      },
    });

    cy.visitStory('base/form/form-input', {
      args: {
        width: 'lg',
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YFormDisabledState,
      checkA11YFormInputReadOnlyState,
      checkA11YFormInputNumnerInput,
      checkA11YFormInputResponsiveWidth,
    });
  });
});
