describe('GlFilteredSearch', () => {
  before(() => {
    cy.visitStory('filtered-search');
  });

  const filteredSearchInput = '[data-testid="filtered-search-input"]';
  const filteredTokenSegment = '[data-testid="filtered-search-token-segment"]';
  const clearButton = '[data-testid="filtered-search-clear-button"]';

  it('typing Colon when suggestion is active selects suggestion', () => {
    cy.get(filteredSearchInput)
      .last()
      .within(() => {
        cy.get(clearButton).click();
        cy.get(filteredTokenSegment).contains('Label').should('not.exist');
        cy.get('.gl-filtered-search-term-input').click().type('label:');
        cy.get(filteredTokenSegment).contains('Label').should('exist');
      });
  });

  it('typing Colon when no suggestion is active types Colon', () => {
    cy.get(filteredSearchInput)
      .last()
      .within(() => {
        cy.get(clearButton).click();
        cy.get('.gl-filtered-search-term-input').click().type('foo:').blur();
        cy.contains('foo:').should('be.visible');
      });
  });
});
