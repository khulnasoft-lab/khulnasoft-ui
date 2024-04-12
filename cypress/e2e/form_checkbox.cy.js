describe('GlFormCheckbox', () => {
  const checkboxSelector = 'input.custom-control-input';
  const labelSelector = 'label.custom-control-label';

  before(() => {
    cy.visitStory('base/form/form-checkbox');
  });

  function checkA11yDefaultState() {
    const getCheckbox = () => cy.get(checkboxSelector).first();
    const getLabel = () => cy.get(labelSelector).first();

    getCheckbox().focus();
    getCheckbox().should('not.be.checked');
    getLabel().click();
    getCheckbox().should('be.checked');
  }

  function checkA11yWithHelpText() {
    const getCheckbox = () => cy.get(checkboxSelector).eq(2);
    const getLabel = () => cy.get(labelSelector).eq(2);

    getCheckbox().focus();
    getCheckbox().should('not.be.checked');
    getLabel().click();
    getCheckbox().should('be.checked');
    getCheckbox().next().contains('help');
  }

  function checkA11yCheckedState() {
    const checkedOption = 'input[value="checked-option"]';
    const checkedOptionLabel = 'input[value="checked-option"] + label';

    cy.get(checkedOption).should('be.checked');
    cy.get(checkedOption).focus();
    cy.get(checkedOptionLabel).click();
    cy.get(checkedOption).should('not.be.checked');
  }

  function checkA11yDisabledState() {
    const disabledOption = 'input[value="disabled-option"]';
    const disabledOptionLabel = 'input[value="disabled-option"] + label';

    cy.get(disabledOption).should('not.be.checked');
    cy.get(disabledOption).should('be.disabled');
    cy.get(disabledOptionLabel).click();
    cy.get(disabledOption).should('not.be.checked');
  }

  function checkA11yCheckedAndDisabled() {
    const checkedAndDisabledOption = 'input[value="checked-disabled-option"]';
    const checkedAndDisabledOptionLabel = 'input[value="checked-disabled-option"] + label';

    cy.get(checkedAndDisabledOption).should('be.checked');
    cy.get(checkedAndDisabledOption).should('be.disabled');
    cy.get(checkedAndDisabledOptionLabel).click();
    cy.get(checkedAndDisabledOption).should('be.checked');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11yWithHelpText,
      checkA11yCheckedState,
      checkA11yDisabledState,
      checkA11yCheckedAndDisabled,
    });
  });
});
