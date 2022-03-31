describe('GlFilteredSearch', () => {
  const clearButton = 'filtered-search-clear-button';
  const filteredTokenSegment = 'filtered-search-token-segment';
  const suggestion = 'filtered-search-suggestion';

  const typeInInput = (text) => cy.get('.gl-filtered-search-term-input').click().type(text);
  const findTokenSegment = (text) => cy.contains(`[data-testid="${filteredTokenSegment}"]`, text);
  const clickSuggestion = (text) => cy.contains(`[data-testid="${suggestion}"]`, text).click();

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

  // Regression test for https://gitlab.com/gitlab-org/gitlab-ui/-/issues/1761.
  it('handles token destruction with consecutive tokens of the same type', () => {
    typeInInput('label');
    clickSuggestion('Label');
    clickSuggestion('=');
    clickSuggestion('Feature');

    clickSuggestion('Label');
    clickSuggestion('=');
    clickSuggestion('Bug');

    findTokenSegment('Feature').find('.gl-token-close').click();

    findTokenSegment('Feature').should('not.exist');
    findTokenSegment('Bug').should('be.visible');
  });
});
