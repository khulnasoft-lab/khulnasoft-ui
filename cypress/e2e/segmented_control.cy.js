describe('GlSegmentedControl', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/segmented-control');
  }

  function checkA11YWithButtonContentSlotState() {
    cy.visitStory('base/segmented-control', {
      story: 'with-button-content-slot',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YWithButtonContentSlotState,
    });
  });
});
