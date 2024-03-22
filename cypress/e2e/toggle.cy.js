describe('GlToggle', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/toggle');
  }

  function checkA11yToggleWithDescription() {
    cy.visitStory('base/toggle', {
      story: 'with-description',
    });
  }

  function checkA11yToggleWithHiddenLabel() {
    cy.visitStory('base/toggle', {
      story: 'label-position-left',
      args: {
        labelPosition: 'hidden',
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11yToggleWithDescription,
      checkA11yToggleWithHiddenLabel,
    });
  });
});
