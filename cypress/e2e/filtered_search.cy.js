describe('GlFilteredSearch', () => {
  const clearButton = 'filtered-search-clear-button';
  const filteredTokenSegment = 'filtered-search-token-segment';
  const suggestion = 'filtered-search-suggestion';
  const filteredToken = 'filtered-search-token';
  const filterSearchTerm = 'filtered-search-term';
  const activeClass = '.gl-filtered-search-token-segment-active';

  const testId = (id) => `[data-testid="${id}"]`;
  const typeInInput = (text) => {
    // We type into a different input than the one we click on since activating
    // a segment creates a different input element.
    cy.get(testId('filtered-search-term-input')).click();
    return cy.get(testId('filtered-search-token-segment-input')).type(text);
  };
  const findTokenSegment = (text) => cy.contains(testId(filteredTokenSegment), text);
  const clickSuggestion = (text) => cy.contains(testId(suggestion), text).click();
  const findActiveToken = () => cy.get(activeClass);

  beforeEach(() => {
    cy.visitStory('base/filtered-search');
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

  it('allows navigation between tokens using left and right arrows', () => {
    typeInInput('label');
    clickSuggestion('Label');
    clickSuggestion('=');
    clickSuggestion('Feature');

    cy.get('input').type('free text');

    // We cannot find input value within active segment so we test siblings of active element
    findActiveToken().parent().siblings(testId(filteredToken)).should('include.text', 'Label');
    findActiveToken().parent().siblings(testId(filteredToken)).should('include.text', 'Feature');
    findActiveToken().parent().siblings(testId(filterSearchTerm)).should('have.text', 'free');
    findActiveToken().parent().siblings(testId(filterSearchTerm)).should('not.have.text', 'text');

    cy.get('input').type('{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}');
    findActiveToken()
      .parent()
      .within(() => {
        cy.root().siblings(testId(filteredToken)).should('include.text', 'Label');
        cy.root().siblings(testId(filterSearchTerm)).should('have.text', 'text');
        cy.root().siblings(testId(filterSearchTerm)).should('not.have.text', 'free');
      });

    cy.get('input').type('{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}');
    findActiveToken().within(() => {
      cy.root()
        .siblings(`[data-testid="${filteredTokenSegment}"]`)
        .should('include.text', 'Label')
        .and('include.text', '=');
      cy.root()
        .siblings(`[data-testid="${filteredTokenSegment}"]`)
        .should('not.include.text', 'Feature');
    });

    cy.get('input').type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}');
    findActiveToken()
      .parent()
      .within(() => {
        cy.root().siblings(testId(filteredToken)).should('include.text', 'Label');
        cy.root().siblings(testId(filterSearchTerm)).should('have.text', 'text');
        cy.root().siblings(testId(filterSearchTerm)).should('not.have.text', 'free');
      });
  });
});
