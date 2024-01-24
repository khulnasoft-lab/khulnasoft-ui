describe('GlBadge', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/badge');
  }

  function checkA11yIconOnlyState() {
    cy.visitStory('base/badge', {
      story: 'icon-only',
    });
  }

  function checkA11yTextOnlyState() {
    cy.visitStory('base/badge', {
      story: 'sizes',
    });
  }

  function checkA11yBadgeHoverState() {
    cy.visitStory('base/badge', {
      story: 'actionable',
    });

    cy.get('.gl-badge:first').realHover();
  }

  function checkA11yBadgeSelectedState() {
    cy.visitStory('base/badge', {
      story: 'actionable',
    });

    cy.get('.gl-badge:first').click();
  }

  function checkA11yIconWithTextState() {
    cy.visitStory('base/badge', {
      story: 'badge-icon',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11yIconOnlyState,
      checkA11yTextOnlyState,
      checkA11yBadgeHoverState,
      checkA11yBadgeSelectedState,
      checkA11yIconWithTextState,
    });
  });
});
