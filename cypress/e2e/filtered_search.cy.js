describe('GlFilteredSearch', () => {
  const clearButton = 'filtered-search-clear-button';
  const filteredTokenSegment = 'filtered-search-token-segment';
  const suggestion = 'filtered-search-suggestion';
  const filterSearchTerm = 'filtered-search-term';

  const testId = (id) => `[data-testid="${id}"]`;
  const typeInInput = (text) => {
    // We type into a different input than the one we click on since activating
    // a segment creates a different input element.
    cy.get('input').click();
    return cy.get('input').type(text);
  };
  const getTokenSegment = (text) => cy.contains(testId(filteredTokenSegment), text);
  const getSearchTerm = (text) => cy.contains(testId(filterSearchTerm), text);
  const getSuggestion = (text) => cy.contains(testId(suggestion), text);
  const clickSuggestion = (text) => getSuggestion(text).click();

  beforeEach(() => {
    cy.visitStory('base/filtered-search');
    cy.getByTestId(clearButton).click();
  });

  it('typing Colon when suggestion is active selects suggestion', () => {
    getTokenSegment('Label').should('not.exist');
    typeInInput('label:');
    getTokenSegment('Label').should('exist');
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

    getTokenSegment('Feature').find('.gl-token-close').click();

    getTokenSegment('Feature').should('not.exist');
    getTokenSegment('Bug').should('be.visible');
  });

  it('allows navigation between tokens using left and right arrows', () => {
    const words = ['aardvark', 'bee'];

    typeInInput('label');
    clickSuggestion('Label');
    clickSuggestion('=');
    clickSuggestion('Feature');

    typeInInput(words.join(' '));
    getTokenSegment('Label').should('be.visible');
    getTokenSegment('=').should('be.visible');
    getTokenSegment('Feature').should('be.visible');
    getSearchTerm(words[0]).should('be.visible');
    cy.get('input').should('have.value', words[1]);

    typeInInput('{leftArrow}'.repeat(words[1].length + 1));
    getTokenSegment('Label').should('be.visible');
    getTokenSegment('=').should('be.visible');
    getTokenSegment('Feature').should('be.visible');
    cy.get('input').should('have.value', words[0]);
    getSearchTerm(words[1]).should('be.visible');

    typeInInput('{leftArrow}'.repeat(words[0].length + 1));
    getTokenSegment('Label').should('be.visible');
    getTokenSegment('=').should('be.visible');
    cy.get('input').should('have.value', 'Feature');
    getSearchTerm(words[0]).should('be.visible');
    getSearchTerm(words[1]).should('be.visible');

    typeInInput('{rightArrow}'.repeat(words[0].length + words[1].length + 3));
    getTokenSegment('Label').should('be.visible');
    getTokenSegment('=').should('be.visible');
    getTokenSegment('Feature').should('be.visible');
    getSearchTerm(words[0]).should('be.visible');
    getSearchTerm(words[1]).should('be.visible');
  });
});
