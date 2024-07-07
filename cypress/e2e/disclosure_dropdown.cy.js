const testId = (id) => `[data-testid="${id}"]`;

describe('Disclosure dropdown', () => {
  describe('stories', () => {
    it(
      'closes dropdown when trigger text is dynamically updated on item click',
      // Real events are not supported on firefox
      { browser: '!firefox' },
      () => {
        cy.visitStory('base/dropdown/disclosure-dropdown', {
          story: 'with-dynamic-wrapper-text',
        });

        cy.get(testId('base-dropdown-toggle')).should('have.attr', 'aria-expanded', 'true');
        cy.get(`${testId('disclosure-dropdown-item')}:first button`).realClick();
        cy.get(testId('base-dropdown-toggle')).should('have.attr', 'aria-expanded', 'false');
      }
    );

    function checkA11yDropdownWithGroupsOpened() {
      cy.visitStory('base/dropdown/disclosure-dropdown', {
        story: 'groups',
      });
    }

    function checkA11yDropdownWithGroupsClosed() {
      cy.visitStory('base/dropdown/disclosure-dropdown', {
        story: 'groups',
        args: {
          startOpened: false,
        },
      });
    }

    function checkA11yDropdownWithCustomGroupItemsAndToggle() {
      cy.visitStory('base/dropdown/disclosure-dropdown', {
        story: 'custom-groups-items-and-toggle',
      });
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
