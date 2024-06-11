describe('OutsideDirective', () => {
  describe('Default', () => {
    beforeEach(() => {
      cy.visitStory('directives/outside-directive');
    });

    it('increments clicks count when clicking outside the button', () => {
      cy.contains('Clicks outside me: 0');

      cy.get('body').click(0, 0);

      cy.contains('Clicks outside me: 1');
    });

    it('does not increment clicks count when clicking the button', () => {
      cy.contains('Clicks outside me: 0');

      cy.contains('Clicks outside me: 0').click();

      cy.contains('Clicks outside me: 0');
    });
  });

  describe('ConditionalVisiblity', () => {
    beforeEach(() => {
      cy.visitStory('directives/outside-directive', {
        story: 'conditional-visibility',
      });
    });

    it('starts with "0" clicks when the counter gets visible after a specific click or action', () => {
      cy.contains('Clicks outside me: 0').should('not.exist');

      cy.get('body').click(0, 0);

      cy.contains('Show Button').click();

      cy.contains('Clicks outside me: 0').should('exist');
    });
  });
});
