describe('GlSearchBoxByClick', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/search-box-by-click');
  }

  function checkA11YRecentSearch() {
    cy.visitStory('base/search-box-by-click', {
      story: 'history',
      args: {
        historyItems: ['foo', 'bar', 'baz'],
      },
    });

    cy.get('.gl-search-box-by-click-history').click();
  }

  function checkA11YNoRecentSearches() {
    cy.visitStory('base/search-box-by-click', {
      story: 'history',
      args: {
        historyItems: [],
      },
    });

    cy.get('.gl-search-box-by-click-history').click();
  }

  function checkA11YDisabled() {
    cy.visitStory('base/search-box-by-click', {
      args: {
        disabled: true,
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YRecentSearch,
      checkA11YNoRecentSearches,
      checkA11YDisabled,
    });
  });
});
