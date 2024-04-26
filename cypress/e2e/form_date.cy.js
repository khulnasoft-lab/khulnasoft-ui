describe('GlFormDate', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-date');

    cy.get('#input-id').focus();
  }

  function checkA11YFormDisabledState() {
    cy.visitStory('base/form/form-date', {
      story: 'disabled',
      args: {
        disabled: true,
      },
    });
  }

  function checkA11YFormDateDisabledValue() {
    cy.visitStory('base/form/form-date', {
      story: 'disabled-value',
      args: {
        disabled: true,
        value: '2020-01-19',
      },
    });
  }

  function checkA11YFormDateMinMaxDates() {
    cy.visitStory('base/form/form-date', {
      story: 'min-max-dates',
      args: {
        min: '2020-01-01',
        max: '2020-01-31',
        minInvalidFeedback: 'Must be after 2020-01-01',
        maxInvalidFeedback: 'Must be before 2020-01-31',
      },
    });
  }

  function checkA11YFormDateReadonlyState() {
    cy.visitStory('base/form/form-date', {
      story: 'readonly',
      args: {
        readonly: true,
        value: '2020-01-19',
      },
    });
  }

  function checkA11YFormDateInvalidDate() {
    cy.visitStory('base/form/form-date', {
      story: 'invalid-date',
      args: {
        min: '2020-01-01',
        max: '2020-01-31',
        minInvalidFeedback: 'Must be after 2020-01-01',
        maxInvalidFeedback: 'Must be before 2020-01-31',
        value: '2020-02-02',
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YFormDisabledState,
      checkA11YFormDateDisabledValue,
      checkA11YFormDateMinMaxDates,
      checkA11YFormDateReadonlyState,
      checkA11YFormDateInvalidDate,
    });
  });
});
