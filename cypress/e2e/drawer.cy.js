describe('GlDrawer', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/drawer');
  }

  function checkA11YWithActions() {
    cy.visitStory('base/drawer', {
      story: 'with-actions',
    });
  }

  function checkA11YWithStickyFooterShortContent() {
    cy.visitStory('base/drawer', {
      story: 'with-sticky-footer-short-content',
    });
  }

  function checkA11YWithStickyFooter() {
    cy.visitStory('base/drawer', {
      story: 'with-sticky-footer',
    });
  }

  function checkA11YWithScrimAndStaticContent() {
    cy.visitStory('base/drawer', {
      story: 'with-scrim-and-static-content',
    });
  }

  function checkA11YSidebarVariant() {
    cy.visitStory('base/drawer', {
      story: 'sidebar-variant',
    });
  }

  function checkA11YStickyHeaderFooter() {
    cy.visitStory('base/drawer', {
      story: 'sticky-header-footer',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YWithActions,
      checkA11YWithStickyFooterShortContent,
      checkA11YWithStickyFooter,
      checkA11YWithScrimAndStaticContent,
      checkA11YSidebarVariant,
      checkA11YStickyHeaderFooter,
    });
  });

  describe('stories', () => {
    it('emits "opened" event after opening transition', () => {
      cy.visitStory('base/drawer');

      cy.contains('Toggle Drawer').click(); // to close it
      cy.contains('Toggle Drawer').click(); // to open it
      cy.get('[data-opened-count="0"'); // transition not finished. event not fired yet.
      cy.get('[data-opened-count="1"');
    });
  });
});
