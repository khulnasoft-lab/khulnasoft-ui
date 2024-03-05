describe('GlLink', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/link');
  }

  function checkA11YLinkHoverState() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').realHover();
  }

  function checkA11YLinkClickState() {
    cy.visitStory('base/link');
    cy.get('a.gl-link').click();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YLinkHoverState,
      checkA11YLinkClickState,
    });
  });
});
