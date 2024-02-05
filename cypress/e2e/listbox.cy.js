describe('GlCollapsibleListbox', () => {
  const toggleSelector = 'button[aria-haspopup="listbox"]';
  const dropdownMenuSelector = '[role="listbox"]';
  const listItemSelector = '[role="option"]';
  const searchInputSelector = '[data-testid="listbox-search-input"] input';
  const topScrimSelector = '[data-testid="top-scrim"]';
  const bottomScrimSelector = '[data-testid="bottom-scrim"]';

  const toggleBtn = () => cy.get(toggleSelector);
  const dropdownMenu = () => cy.get(dropdownMenuSelector);
  const searchInput = () => cy.get(searchInputSelector);
  const getDropdownItem = (text) => cy.contains(listItemSelector, text);
  const ensureMenuIsClosed = () => cy.get('body').click(0, 0);
  const topScrim = () => cy.get(topScrimSelector);
  const bottomScrim = () => cy.get(bottomScrimSelector);

  const elementDoesNotOverflowVertically = (element, viewportHeight) => {
    const elementRect = element.getBoundingClientRect();
    expect(elementRect.bottom).to.be.lessThan(viewportHeight);
  };

  describe('flat items', () => {
    beforeEach(() => {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        args: {
          startOpened: false,
        },
      });
    });

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
    beforeEach(() => {
      cy.visitStory('base/dropdown/collapsible-listbox', {
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
    beforeEach(() => {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        story: 'searchable',
        args: {
          startOpened: false,
        },
      });
    });

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

    it('does NOT navigate from the search input on Home and End', () => {
      toggleBtn().click();
      dropdownMenu().should('be.visible');
      toggleBtn().should('not.be.focused');
      searchInput().should('be.focused').type('{end}');
      searchInput().should('be.focused').type('{home}');
      searchInput().should('be.focused');
    });
  });

  describe('overflow scrim', () => {
    it('should display overflow scrim when content is overflowing', () => {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        args: {
          startOpened: true,
        },
      });

      topScrim().should('have.css', 'opacity', '0');
      bottomScrim().should('have.css', 'opacity', '1');
      dropdownMenu().scrollTo('bottom');
      topScrim().should('have.css', 'opacity', '1');
      bottomScrim().should('have.css', 'opacity', '0');
      dropdownMenu().scrollTo('top');
      topScrim().should('have.css', 'opacity', '0');
      bottomScrim().should('have.css', 'opacity', '1');
    });

    it('should not display overflow scrim when content is not overflowing', () => {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        story: 'custom-list-item',
        args: {
          startOpened: true,
        },
      });
      dropdownMenu().should('be.visible');
      topScrim().should('have.css', 'opacity', '0');
      bottomScrim().should('have.css', 'opacity', '0');
      dropdownMenu().scrollTo('bottom', { ensureScrollable: false });
      topScrim().should('have.css', 'opacity', '0');
      bottomScrim().should('have.css', 'opacity', '0');
      dropdownMenu().scrollTo('top', { ensureScrollable: false });
      topScrim().should('have.css', 'opacity', '0');
      bottomScrim().should('have.css', 'opacity', '0');
    });
  });

  describe(
    'content height',
    {
      viewportHeight: 400,
    },
    () => {
      before(() => {
        cy.visitStory('base/dropdown/collapsible-listbox', {
          story: 'header-and-footer',
          args: {
            startOpened: true,
          },
        });
      });

      it('sets the content height dynamically to avoid viewport overflow', () => {
        const { viewportHeight, viewportWidth } = Cypress.config();

        cy.get('[data-testid="base-dropdown-menu"]').should(($el) => {
          elementDoesNotOverflowVertically($el[0], viewportHeight);
        });

        const newHeight = 200;
        cy.viewport(viewportWidth, newHeight);

        cy.get('[data-testid="base-dropdown-menu"]').should(($el) => {
          elementDoesNotOverflowVertically($el[0], newHeight);
        });
      });
    }
  );

  describe('stories', () => {
    function checkA11ySearchableListboxOpened() {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        story: 'searchable',
      });
    }

    function checkA11ySearchableListboxClosed() {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        story: 'searchable',
        args: {
          startOpened: false,
        },
      });
    }

    function checkA11yListboxFocusSearchBox() {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        story: 'searchable',
        args: {
          startOpened: true,
        },
      });

      cy.get('.gl-listbox-search-input').eq(0).focus();
    }

    function checkA11yFocusedItemState() {
      cy.visitStory('base/dropdown/collapsible-listbox');

      cy.get('.gl-new-dropdown-item').eq(0).focus();
    }

    function checkA11yListboxHeaderFooter() {
      cy.visitStory('base/dropdown/collapsible-listbox', {
        story: 'header-and-footer',
      });
    }

    function checkA11yHoverItemState() {
      cy.visitStory('base/dropdown/collapsible-listbox');

      cy.get('.gl-new-dropdown-item').realHover();
    }

    it('passes axe accessbility audits', { tags: '@a11y' }, () => {
      cy.glRunA11yTests({
        checkA11ySearchableListboxOpened,
        checkA11yListboxFocusSearchBox,
        checkA11ySearchableListboxClosed,
        checkA11yFocusedItemState,
        checkA11yListboxHeaderFooter,
        checkA11yHoverItemState,
      });
    });
  });
});
