describe('GlDaterangePicker', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/daterange-picker');
  }

  function checkA11YWithDatesSelectedAndTooltip() {
    cy.visitStory('base/daterange-picker', {
      story: 'with-dates-selected-and-tooltip',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YWithDatesSelectedAndTooltip,
    });
  });
});
