describe('GlSearchBoxByType', () => {
  const stories = ['default', 'borderless'];
  const setStoryOptions = (story, args = {}) => ({
    args: {
      ...args,
    },
    story,
  });

  function checkA11ySearchBoxFilledIn(story) {
    cy.visitStory('base/search-box-by-type', setStoryOptions(story));
    cy.get('input[type=search]').click();
    cy.get('input[type=search').type('search text');
  }

  function checkA11ySearchBoxLoading(story) {
    const options = setStoryOptions(story, { isLoading: true });
    cy.visitStory('base/search-box-by-type', options);
  }

  function checkA11ySearchBoxDisabled(story) {
    const options = setStoryOptions(story, { disabled: true });
    cy.visitStory('base/search-box-by-type', options);
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    stories.forEach((story) => {
      cy.glRunA11yTests({
        [`checkA11ySearchBoxFilledIn-${story}`]: () => checkA11ySearchBoxFilledIn(story),
        [`checkA11ySearchBoxLoading-${story}`]: () => checkA11ySearchBoxLoading(story),
        [`checkA11ySearchBoxDisabled-${story}`]: () => checkA11ySearchBoxDisabled(story),
      });
    });
  });
});
