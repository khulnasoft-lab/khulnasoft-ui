describe('GlBadge', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/badge');

    cy.glCheckA11y();
  }

  function checkA11yIconOnlyState() {
    cy.visitStory('base/badge', {
      story: 'icon-only',
    });

    cy.glCheckA11y();
  }

  function checkA11yTextOnlyState() {
    cy.visitStory('base/badge', {
      story: 'sizes',
    });

    cy.glCheckA11y();
  }

  function checkA11yBadgeHoverState() {
    cy.visitStory('base/badge', {
      story: 'actionable',
    });

    cy.first('.gl-badge').realHover();

    cy.glCheckA11y();
  }

  function checkA11yBadgeSelectedState() {
    cy.visitStory('base/badge', {
      story: 'actionable',
    });

    cy.first('.gl-badge').click();

    cy.glCheckA11y();
  }

  function checkA11yIconWithTextState() {
    cy.visitStory('base/badge', {
      story: 'badge-icon',
    });

    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    checkA11YDefaultState();
    checkA11yIconOnlyState();
    checkA11yTextOnlyState();
    checkA11yBadgeHoverState();
    checkA11yBadgeSelectedState();
    checkA11yIconWithTextState();
  });
});
