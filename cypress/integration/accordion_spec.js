describe('GlAccordion', () => {
  before(() => {
    cy.visitStory('accordion');
  });

  const accordionContentId = 'accordion-item-collapse-accordion-item-2';

  it('clicking on collapsed chevron icon expands accordion item then collapses when clicked again', () => {
    cy.findByTestId(accordionContentId).should('not.be.visible');
    cy.contains('Item 1').click();
    cy.findByTestId(accordionContentId).should('be.visible');
  });

  it('clicking on expanded chevron icon collapses accordion item', () => {
    cy.findByTestId(accordionContentId).should('be.visible');
    cy.contains('Item 1').click();
    cy.findByTestId(accordionContentId).should('not.be.visible');
  });
});
