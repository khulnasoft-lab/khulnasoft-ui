describe('GlAccordion', () => {
  before(() => {
    cy.visitStory('accordion');
  });

  const accordionContentId = '[data-testid^="accordion-item-collapse-accordion-item-"]';

  it('clicking on collapsed chevron icon expands accordion item then collapses when clicked again', () => {
    cy.get(accordionContentId).should('not.be.visible');
    cy.contains('Item 1').click();
    cy.get(accordionContentId).should('be.visible');
  });

  it('clicking on expanded chevron icon collapses accordion item', () => {
    cy.get(accordionContentId).should('be.visible');
    cy.contains('Item 1').click();
    cy.get(accordionContentId).should('not.be.visible');
  });
});
