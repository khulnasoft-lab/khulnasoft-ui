describe('GlFilteredSearch', () => {
  const clearButton = 'filtered-search-clear-button';
  const filteredTokenSegment = 'filtered-search-token-segment';

  const typeInInput = (text) => cy.get('.gl-filtered-search-term-input').click().type(text);
  const findTokenSegment = (text) => cy.contains(`[data-testid="${filteredTokenSegment}"]`, text);

  beforeEach(() => {
    cy.visitStory('filtered-search');
    cy.findByTestId(clearButton).click();
  });

  it('typing Colon when suggestion is active selects suggestion', () => {
    findTokenSegment('Label').should('not.exist');
    typeInInput('label:');
    findTokenSegment('Label').should('exist');
  });

  it('typing Colon when no suggestion is active types Colon', () => {
    typeInInput('foo:').blur();
    cy.contains('foo:').should('be.visible');
  });
});
