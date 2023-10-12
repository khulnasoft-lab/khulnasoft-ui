describe('Disclosure dropdown', () => {
  describe('stories', () => {
    function checkA11yDropdownWithGroupsOpened() {
      cy.visitStory('base/dropdown/disclosure-dropdown', {
        story: 'groups',
      });

      cy.glCheckA11y();
    }

    function checkA11yDropdownWithGroupsClosed() {
      cy.visitStory('base/dropdown/disclosure-dropdown', {
        story: 'groups',
        args: {
          startOpened: false,
        },
      });

      cy.glCheckA11y();
    }

    it('passes axe accessbility audits', () => {
      checkA11yDropdownWithGroupsOpened();
      checkA11yDropdownWithGroupsClosed();
    });
  });
});
