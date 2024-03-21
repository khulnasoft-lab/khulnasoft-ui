describe('GlLink', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/link');
    cy.glCheckA11y();
  }

  function checkA11YLinkHasHref() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').should('have.attr', 'href');
    cy.glCheckA11y();
  }

  function checkA11YLinkHoverState() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').realHover();
    cy.glCheckA11y();
  }

  function checkA11YLinkFocusState() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').focus();
    cy.glCheckA11y();
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
