describe('GlListbox', () => {
  before(() => {
    cy.visit(
      'iframe.html?id=base-new-dropdowns-listbox--default&viewMode=story&args=startOpened:false'
    );
  });

  beforeEach(() => {
    // click outside the listbox to make sure menu is closed before each test
    cy.get('body').click(0, 0);
  });

  const toggleSelector = 'button[aria-haspopup="listbox"]';
  const dropdownMenuSelector = '[role="listbox"]';
  const listItemSelector = '[role="option"]';

  const toggleBtn = () => cy.get(toggleSelector);
  const dropdownMenu = () => cy.get(dropdownMenuSelector);
  const firstDropdownItem = () => cy.contains(listItemSelector, 'Product');
  const secondDropdownItem = () => cy.contains(listItemSelector, 'People');
  const thirdDropdownItem = () => cy.contains(listItemSelector, 'Finance');
  const lastDropdownItem = () => cy.contains(listItemSelector, 'Support');

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
    secondDropdownItem().should('be.focused').type('{downArrow}');
    thirdDropdownItem().should('be.focused').type('{upArrow}');
    secondDropdownItem().should('be.focused').type('{upArrow}');
    firstDropdownItem().should('be.focused').type('{upArrow}');
    firstDropdownItem().should('be.focused').type('{end}');
    lastDropdownItem().should('be.focused').type('{home}');
    firstDropdownItem().should('be.focused');
  });

  it('closes the dropdown on pressing Esc and sets focus on toggle button', () => {
    dropdownMenu().should('not.be.visible');
    toggleBtn().should('not.be.focused').click();
    secondDropdownItem().should('be.focused').type('{esc}');
    dropdownMenu().should('not.be.visible');
    toggleBtn().should('be.focused');
  });

  it('clicking outside should move focus away from the dropdown', () => {
    toggleBtn().should('not.be.focused').click();
    secondDropdownItem().should('be.focused');
    cy.get('body').click(0, 0);
    secondDropdownItem().should('not.be.focused');
    toggleBtn().should('not.be.focused');
  });
});
