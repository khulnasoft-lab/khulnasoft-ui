describe('GlPaginatedList', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/paginated-list');
  }

  function checkA11YNoFilter() {
    cy.visitStory('base/paginated-list', {
      story: 'no-filter',
    });
  }

  function checkA11YWithEmptyList() {
    cy.visitStory('base/paginated-list', {
      story: 'with-empty-list',
    });
  }

  function checkA11YWithHeaderSlot() {
    cy.visitStory('base/paginated-list', {
      story: 'with-header-slot',
    });
  }

  function checkA11YWithSubHeaderSlot() {
    cy.visitStory('base/paginated-list', {
      story: 'with-subheader-slot',
    });
  }

  function checkA11YWithRowSlot() {
    cy.visitStory('base/paginated-list', {
      story: 'with-row-slot',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YNoFilter,
      checkA11YWithEmptyList,
      checkA11YWithHeaderSlot,
      checkA11YWithSubHeaderSlot,
      checkA11YWithRowSlot,
    });
  });
});
