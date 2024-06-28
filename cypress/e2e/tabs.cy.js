describe('GlTabs', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/tabs');
  }

  function checkA11YFocusedTabState() {
    cy.visitStory('base/tabs');

    cy.get('.gl-tab-nav-item').first().focus();
  }

  function checkA11YActiveTabState() {
    cy.visitStory('base/tabs');

    cy.get('.gl-tab-nav-item').first().click();
  }

  function checkA11YHoverState() {
    cy.visitStory('base/tabs');

    cy.get('.gl-tab-nav-item').first().realHover();
  }

  function checkA11YTabWithCounterBadgers() {
    cy.visitStory('base/tabs', {
      story: 'with-counter-badges',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YFocusedTabState,
      checkA11YHoverState,
      checkA11YActiveTabState,
      checkA11YTabWithCounterBadgers,
    });
  });
});
