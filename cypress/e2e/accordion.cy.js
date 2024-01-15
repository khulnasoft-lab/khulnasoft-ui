describe('GlAccordion', { testIsolation: false }, () => {
  before(() => {
    cy.visitStory('base/accordion');
  });

  const accordionContentId = '[data-testid^="accordion-item-collapse-accordion-item-"]';
  const getFirstAccordionItemContent = () => cy.get(accordionContentId).first();

  function checkA11YClosedState() {
    cy.contains('Item 2').click();

    cy.glCheckA11y({ exclude: ['code'] });
  }

  function checkA11YWithOneOpenedState() {
    cy.glCheckA11y({ exclude: ['code'] });
  }

  function checkA11YWithMultipleOpenedState() {
    cy.contains('Item 1').click();

    cy.glCheckA11y({ exclude: ['code'] });
  }

  function checkA11YWithFocusedButtonState() {
    cy.get('.gl-button').eq(1).focus();

    cy.glCheckA11y({ exclude: ['code'] });
  }

  it('clicking on collapsed chevron icon expands accordion item then collapses when clicked again', () => {
    getFirstAccordionItemContent().should('not.be.visible');
    cy.contains('Item 1').click();
    getFirstAccordionItemContent().should('be.visible');
  });

  it('clicking on expanded chevron icon collapses accordion item', () => {
    getFirstAccordionItemContent().should('be.visible');
    cy.contains('Item 1').click();
    getFirstAccordionItemContent().should('not.be.visible');
  });

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    checkA11YClosedState();
    checkA11YWithOneOpenedState();
    checkA11YWithMultipleOpenedState();
    checkA11YWithFocusedButtonState();
  });
});
