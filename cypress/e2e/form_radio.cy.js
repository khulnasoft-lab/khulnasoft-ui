describe('GlFormRadio', () => {
  const radioSelector = '[type="radio"]';
  const labelSelector = 'label.custom-control-label';

  before(() => {
    cy.visitStory('base/form/form-radio');
  });

  function checkA11yDefaultState() {
    cy.get(radioSelector).first().should('not.be.checked');
    cy.get(labelSelector).first().click();
    cy.get(radioSelector).first().should('be.checked');
  }

  function checkA11yWithHelpText() {
    cy.visitStory('base/form/form-radio');
    const getRadioWithHelpText = () => cy.get(radioSelector).eq(1);
    const getRadioWithCheckedOption = () => cy.get(radioSelector).eq(2);

    getRadioWithCheckedOption().should('be.checked');
    getRadioWithHelpText().should('not.be.checked');
    cy.get(labelSelector).eq(1).click();
    getRadioWithHelpText().should('be.checked');
    getRadioWithHelpText().next().contains('help');
    cy.get(radioSelector).eq(0).should('not.be.checked');
    getRadioWithCheckedOption().should('not.be.checked');
  }

  function checkA11yDisabledState() {
    const disabledOption = 'input[value="Disabled option"]';
    const disabledOptionLabel = 'input[value="Disabled option"] + label';

    cy.get(disabledOption).should('not.be.checked');
    cy.get(disabledOption).should('be.disabled');
    cy.get(disabledOptionLabel).click();
    cy.get(disabledOption).should('not.be.checked');
  }

  function checkA11yCheckedAndDisabled() {
    const checkedAndDisabledOption = 'input[value="Checked disabled option"]';
    const checkedAndDisabledLabel = 'input[value="Checked disabled option"] + label';

    cy.get(checkedAndDisabledOption).should('be.checked');
    cy.get(checkedAndDisabledOption).should('be.disabled');
    cy.get(checkedAndDisabledLabel).click();
    cy.get(checkedAndDisabledOption).should('be.checked');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11yWithHelpText,
      checkA11yDisabledState,
      checkA11yCheckedAndDisabled,
    });
  });
});
