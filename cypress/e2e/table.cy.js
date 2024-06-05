describe('GlTable', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/table/table');
  }

  function checkA11yHoveredRow() {
    cy.visitStory('base/table/table');
    cy.get('tr').last().realHover();
  }

  function checkA11ySelectedRow() {
    cy.visitStory('base/table/table');
    cy.get('tr').last().click();
  }

  function checkA11yStackedTable() {
    cy.visitStory('base/table/table', {
      args: {
        stacked: true,
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11yHoveredRow,
      checkA11ySelectedRow,
      checkA11yStackedTable,
    });
  });
});
