describe('GlFormCheckbox', () => {
  before(() => {
    cy.visitStory('base/form/form-checkbox');
  });

  function checkA11yDefaultState(i) {
    const checkboxClass = 'input.custom-control-input';
    const checkboxLabelClass = 'label.custom-control-label';

    cy.get(checkboxClass).eq(i).focus();
    cy.get(checkboxClass).eq(i).should('be.not.checked');
    cy.get(checkboxLabelClass).eq(i).click();
    cy.get(checkboxClass).eq(i).should('be.checked');
  }

  function checkA11yCheckedState() {
    const checkedOption = 'input[value="checked-option"]';
    const checkedOptionLabel = 'input[value="checked-option"] + label';

    cy.get(checkedOption).should('be.checked');
    cy.get(checkedOption).focus();
    cy.get(checkedOptionLabel).click();
    cy.get(checkedOption).should('be.not.checked');
  }

  function checkA11yDisabledState() {
    const disabledOption = 'input[value="disabled-option"]';

    cy.get(disabledOption).should('be.not.checked');
    cy.get(disabledOption).should('be.disabled');
  }

  function checkA11yCheckedAndDisabled() {
    const checkedAndDisabledOption = 'input[value="checked-disabled-option"]';

    cy.get(checkedAndDisabledOption).should('be.checked');
    cy.get(checkedAndDisabledOption).should('be.disabled');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    for (let i = 0; i < 3; i += 1) {
      cy.glRunA11yTests({ defaultState: () => checkA11yDefaultState(i) });
    }

    cy.glRunA11yTests({
      checkA11yCheckedState,
      checkA11yDisabledState,
      checkA11yCheckedAndDisabled,
    });
  });
});
