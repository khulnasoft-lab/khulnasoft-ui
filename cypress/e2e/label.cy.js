describe('GlLabel', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/label');

    cy.glCheckA11y();
  }

  function checkA11YFocusedLabelState() {
    cy.visitStory('base/label');

    cy.get('.gl-label a').focus();

    cy.glCheckA11y();
  }

  function checkA11YDarkBackgroundColors() {
    cy.visitStory('base/label', {
      args: {
        backgroundColor: '!hex(785d5d)',
      },
    });

    cy.glCheckA11y();
  }

  function checkA11YLightBackgroundColors() {
    cy.visitStory('base/label', {
      args: {
        backgroundColor: '!hex(e8d8d8)',
      },
    });

    cy.glCheckA11y();
  }

  function checkA11YScopedLabel() {
    cy.visitStory('base/label', {
      story: 'scoped',
    });

    cy.glCheckA11y();
  }

  function checkA11YLabelWithCloseButton() {
    cy.visitStory('base/label', {
      story: 'with-close-button',
    });

    cy.glCheckA11y();
  }

  function checkA11YLabelHoverState() {
    cy.visitStory('base/label');

    cy.get('.gl-label a').realHover();
    cy.glCheckA11y();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    checkA11YLabelHoverState();
    checkA11YDefaultState();
    checkA11YFocusedLabelState();
    checkA11YDarkBackgroundColors();
    checkA11YLightBackgroundColors();
    checkA11YScopedLabel();
    checkA11YLabelWithCloseButton();
  });
});
