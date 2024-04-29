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

    function checkA11yDropdownWithCustomGroupItemsAndToggle() {
      cy.visitStory('base/dropdown/disclosure-dropdown', {
        story: 'custom-groups-items-and-toggle',
      });

      cy.glCheckA11y();
    }

    it('passes axe accessbility audits', { tags: '@a11y' }, () => {
      cy.glRunA11yTests({
        checkA11yDropdownWithGroupsOpened,
        checkA11yDropdownWithGroupsClosed,
        checkA11yDropdownWithCustomGroupItemsAndToggle,
      });
    });
  });
});
