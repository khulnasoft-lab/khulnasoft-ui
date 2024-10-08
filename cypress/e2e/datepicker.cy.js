describe('GlDatepicker', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/datepicker', 'default');
  }

  function checkA11YCustomTrigger() {
    cy.visitStory('base/datepicker', {
      story: 'custom-trigger',
    });
  }

  function checkA11YWithClearButton() {
    cy.visitStory('base/datepicker', {
      story: 'with-clear-button',
    });
  }

  function checkA11YWidths() {
    cy.visitStory('base/datepicker', {
      story: 'widths',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YCustomTrigger,
      checkA11YWithClearButton,
      checkA11YWidths,
    });
  });
});
