describe('GlLabel', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/label');
  }

  function checkA11YFocusedLabelState() {
    cy.visitStory('base/label');

    cy.get('.gl-label a').focus();
  }

  function checkA11YDarkBackgroundColors() {
    cy.visitStory('base/label', {
      args: {
        backgroundColor: '!hex(785d5d)',
      },
    });
  }

  function checkA11YLightBackgroundColors() {
    cy.visitStory('base/label', {
      args: {
        backgroundColor: '!hex(e8d8d8)',
      },
    });
  }

  function checkA11YScopedLabel() {
    cy.visitStory('base/label', {
      story: 'scoped',
    });
  }

  function checkA11YLabelWithCloseButton() {
    cy.visitStory('base/label', {
      story: 'with-close-button',
    });
  }

  function checkA11YLabelHoverState() {
    cy.visitStory('base/label');

    cy.get('.gl-label a').realHover();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YLabelHoverState,
      checkA11YDefaultState,
      checkA11YFocusedLabelState,
      checkA11YDarkBackgroundColors,
      checkA11YLightBackgroundColors,
      checkA11YScopedLabel,
      checkA11YLabelWithCloseButton,
    });
  });
});
