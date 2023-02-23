describe('GlCollapsibleListbox', () => {
  const toggleSelector = 'button[aria-haspopup="listbox"]';
  const dropdownMenuSelector = '[role="listbox"]';
  const listItemSelector = '[role="option"]';
  const searchInputSelector = '[data-testid="listbox-search-input"] input';

  const toggleBtn = () => cy.get(toggleSelector);
  const dropdownMenu = () => cy.get(dropdownMenuSelector);
  const searchInput = () => cy.get(searchInputSelector);
  const getDropdownItem = (text) => cy.contains(listItemSelector, text);
  const ensureMenuIsClosed = () => cy.get('body').click(0, 0);

  describe('flat items', () => {
    before(() => {
      cy.visitStory('base/new-dropdowns/listbox', {
        args: {
          startOpened: false,
        },
      });
    });

    beforeEach(ensureMenuIsClosed);

    const dropdownItemAtIndex = (i) =>
      getDropdownItem(['Product', 'People', 'Finance', 'Support'][i]);

    it('clicking on the toggle shows the menu and hides on the next click', () => {
      dropdownMenu().should('not.be.visible');
      toggleBtn().should('not.be.focused').click();
      dropdownMenu().should('be.visible');
      toggleBtn().should('not.be.focused');
      toggleBtn().click();
      dropdownMenu().should('not.be.visible');
      toggleBtn().should('be.focused');
    });

    it('navigates through the options on arrow up, arrow down, Home and End', () => {
      toggleBtn().click();
      dropdownMenu().should('be.visible');
      toggleBtn().should('not.be.focused');
      dropdownItemAtIndex(1).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(2).should('be.focused').type('{upArrow}');
      dropdownItemAtIndex(1).should('be.focused').type('{upArrow}');
      dropdownItemAtIndex(0).should('be.focused').type('{upArrow}');
      dropdownItemAtIndex(0).should('be.focused').type('{end}');
      dropdownItemAtIndex(3).should('be.focused').type('{home}');
      dropdownItemAtIndex(0).should('be.focused');
    });

    it('closes the dropdown on pressing Esc and sets focus on toggle button', () => {
      dropdownMenu().should('not.be.visible');
      toggleBtn().should('not.be.focused').click();
      dropdownItemAtIndex(1).should('be.focused').type('{esc}');
      dropdownMenu().should('not.be.visible');
      toggleBtn().should('be.focused');
    });

    it('clicking outside should move focus away from the dropdown', () => {
      toggleBtn().should('not.be.focused').click();
      dropdownItemAtIndex(1).should('be.focused');
      cy.get('body').click(0, 0);
      dropdownItemAtIndex(1).should('not.be.focused');
      toggleBtn().should('not.be.focused');
    });
  });

  describe('groups', () => {
    before(() => {
      cy.visitStory('base/new-dropdowns/listbox', {
        story: 'groups',
        args: {
          startOpened: false,
        },
      });
    });

    beforeEach(ensureMenuIsClosed);

    const dropdownItemAtIndex = (i) =>
      getDropdownItem(['v1.0', 'main', 'feature-123', 'v2.0', 'v2.1'][i]);

    it('navigates through the options on arrow up, arrow down, Home and End', () => {
      toggleBtn().click();
      dropdownMenu().should('be.visible');
      toggleBtn().should('not.be.focused');
      dropdownItemAtIndex(0).should('be.focused').type('{upArrow}');
      dropdownItemAtIndex(0).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(1).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(2).should('be.focused').type('{upArrow}');
      dropdownItemAtIndex(1).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(2).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(3).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(4).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(4).should('be.focused').type('{home}');
      dropdownItemAtIndex(0).should('be.focused').type('{end}');
      dropdownItemAtIndex(4).should('be.focused');
    });
  });

  describe('search', () => {
    before(() => {
      cy.visitStory('base/new-dropdowns/listbox', {
        story: 'searchable',
        args: {
          startOpened: false,
        },
      });
    });

    beforeEach(ensureMenuIsClosed);

    const dropdownItemAtIndex = (i) =>
      getDropdownItem(['Product', 'People', 'Finance', 'Support'][i]);

    it('navigates from search input to options and back', () => {
      toggleBtn().click();
      dropdownMenu().should('be.visible');
      toggleBtn().should('not.be.focused');
      searchInput().should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(0).should('be.focused').type('{downArrow}');
      dropdownItemAtIndex(1).should('be.focused').type('{upArrow}');
      dropdownItemAtIndex(0).should('be.focused').type('{upArrow}');
      searchInput().should('be.focused').type('{upArrow}');
      searchInput().should('be.focused');
    });
  });
});
