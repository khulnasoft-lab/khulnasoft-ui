describe('GlFilteredSearch', () => {
  before(() => {
    cy.visitStory('filtered-search');
  });

  const filteredSearchInput = 'filtered-search-input';
  const filteredTokenSegment = 'filtered-search-token-segment';
  const clearButton = 'filtered-search-clear-button';

  it('typing Colon when suggestion is active selects suggestion', () => {
    cy.findByTestId(filteredSearchInput)
      .last()
      .within(() => {
        cy.findByTestId(clearButton).click();
        cy.findByTestId(filteredTokenSegment).contains('Label').should('not.exist');
        cy.get('.gl-filtered-search-term-input').click().type('label:');
        cy.findByTestId(filteredTokenSegment).contains('Label').should('exist');
      });
  });

  it('typing Colon when no suggestion is active types Colon', () => {
    cy.findByTestId(filteredSearchInput)
      .last()
      .within(() => {
        cy.findByTestId(clearButton).click();
        cy.get('.gl-filtered-search-term-input').click().type('foo:').blur();
        cy.contains('foo:').should('be.visible');
      });
  });
});
