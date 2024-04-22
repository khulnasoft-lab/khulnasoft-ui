describe('GlFormSelect', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/form/form-select');
  }

  function checkA11YDisabled() {
    cy.visitStory('base/form/form-select', {
      story: 'disabled',
    });
  }

  function checkA11YWithTruncation() {
    cy.visitStory('base/form/form-select', {
      story: 'with-truncation',
    });
  }

  function checkA11YValidState() {
    cy.visitStory('base/form/form-select', {
      story: 'valid-state',
    });
  }

  function checkA11YInvalidState() {
    cy.visitStory('base/form/form-select', {
      story: 'invalid-state',
    });
  }

  function checkA11YWidths() {
    cy.visitStory('base/form/form-select', {
      story: 'widths',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YDisabled,
      checkA11YWithTruncation,
      checkA11YValidState,
      checkA11YInvalidState,
      checkA11YWidths,
    });
  });
});
