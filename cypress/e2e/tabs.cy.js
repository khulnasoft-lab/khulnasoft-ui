describe('GlTabs', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/tabs');

    cy.glCheckA11y();
  }

  function checkA11YFocusedTabState() {
    cy.visitStory('base/tabs');

    cy.get('.gl-tab-nav-item').first().focus();

    cy.glCheckA11y();
  }

  function checkA11YActiveTabState() {
    cy.visitStory('base/tabs');

    cy.get('.gl-tab-nav-item').first().click();

    cy.glCheckA11y();
  }

  function checkA11YHoverState() {
    cy.visitStory('base/tabs');

    cy.get('.gl-tab-nav-item').first().realHover();

    cy.glCheckA11y();
  }

  function checkA11YTabWithCounterBadgers() {
    cy.visitStory('base/tabs', {
      story: 'with-counter-badges',
    });
    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    checkA11YDefaultState();
    checkA11YFocusedTabState();
    checkA11YHoverState();
    checkA11YActiveTabState();
    checkA11YTabWithCounterBadgers();
  });
});
