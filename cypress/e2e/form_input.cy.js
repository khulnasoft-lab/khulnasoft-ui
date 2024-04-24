describe('GlFormInput', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-input');
    cy.glCheckA11y();
  }

  function checkA11YFormDisabledState() {
    cy.visitStory('base/form/form-input', {
      args: {
        disabled: true,
      },
    });

    cy.glCheckA11y();
  }

  function checkA11YFormInputReadOnlyState() {
    cy.visitStory('base/form/form-input', {
      args: {
        readOnly: true,
      },
    });

    cy.glCheckA11y();
  }

  function checkA11YFormInputNumnerInput() {
    cy.visitStory('base/form/form-input', {
      args: {
        type: 'number',
      },
    });

    cy.glCheckA11y();
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

    cy.glCheckA11y();
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
