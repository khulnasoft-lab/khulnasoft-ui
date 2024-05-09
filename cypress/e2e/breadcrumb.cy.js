describe('GlBreadcrumb', () => {
  const navSelector = 'nav.gl-breadcrumbs';

  describe('on a wide screen', () => {
    beforeEach(() => {
      cy.viewport(2000, 600);
      cy.visitStory('base/breadcrumb');
    });

    it('shows all breadcrumb items', () => {
      cy.contains('First item');
      cy.contains('Fourth item');
    });

    it('does not show the dropdown toggle', () => {
      cy.get('[data-testid="base-dropdown-toggle"]').should('not.exist');
    });
  });

  describe('on a small screen', () => {
    beforeEach(() => {
      cy.viewport(300, 600);
      cy.visitStory('base/breadcrumb');
    });

    it('moves overflowing breadcrumbs into a dropdown', () => {
      cy.contains('Fourth item').should('be.visible');
      cy.contains('First item').should('not.be.visible');
      cy.get('[data-testid="base-dropdown-toggle"]').click();
      cy.contains('First item').should('be.visible');
    });
  });

  function checkA11yWithAvatar() {
    cy.visitStory('base/breadcrumb');
  }

  function checkA11yWithoutAvatar() {
    cy.visitStory('base/breadcrumb', {
      story: 'collapsed-items',
    });
  }

  function checkA11yWithAriaLabel() {
    cy.visitStory('base/breadcrumb', {
      args: {
        ariaLabel: 'a11y-aria-label',
      },
    });

    cy.get(navSelector).should('have.attr', 'aria-label', 'a11y-aria-label');
  }

  function checkA11yWithoutAriaLabel() {
    cy.visitStory('base/breadcrumb', {
      args: {},
    });

    cy.get(navSelector).should('have.attr', 'aria-label', 'Breadcrumb');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yWithAvatar,
      checkA11yWithoutAvatar,
      checkA11yWithAriaLabel,
      checkA11yWithoutAriaLabel,
    });
  });
});
