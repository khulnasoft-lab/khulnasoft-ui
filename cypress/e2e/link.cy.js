describe('GlLink', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/link');
  }

  function checkA11YLinkHasHref() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').should('have.attr', 'href');
  }

  function checkA11YLinkHoverState() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').realHover();
  }

  function checkA11YLinkFocusState() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').focus();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YLinkHasHref,
      checkA11YLinkHoverState,
      checkA11YLinkFocusState,
    });
  });
});
