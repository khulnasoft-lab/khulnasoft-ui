describe('GlPagination', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/pagination');
  }

  function checkA11YCompact() {
    cy.visitStory('base/pagination', {
      story: 'compact',
    });
  }

  function checkA11YNextPageIsDisabled() {
    cy.visitStory('base/pagination', {
      args: {
        page: 3,
        perPage: 1,
        totalItems: 3,
      },
    });

    cy.get('[data-testid="page-item"]')
      .eq(-1)
      .should('have.class', 'disabled', 'true')
      .should('have.attr', 'aria-hidden', 'true');
  }

  function checkA11YHoveredState() {
    cy.visitStory('base/pagination');
    cy.get('[data-testid="page-link"]').eq(1).realHover();
  }

  function checkA11YActiveHoveredState() {
    cy.visitStory('base/pagination');
    cy.get('[data-testid="page-item"]').eq(1).realHover();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YCompact,
      checkA11YHoveredState,
      checkA11YActiveHoveredState,
      checkA11YNextPageIsDisabled,
    });
  });
});
