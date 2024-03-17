describe('GlButton', () => {
  const buttonVariants = [
    { variant: 'default', category: 'primary' },
    { variant: 'default', category: 'secondary' },
    { variant: 'default', category: 'tertiary' },
    { variant: 'confirm', category: 'primary' },
    { variant: 'confirm', category: 'secondary' },
    { variant: 'confirm', category: 'tertiary' },
    { variant: 'success', category: 'primary' },
    { variant: 'success', category: 'secondary' },
    { variant: 'success', category: 'tertiary' },
    { variant: 'danger', category: 'primary' },
    { variant: 'danger', category: 'secondary' },
    { variant: 'danger', category: 'tertiary' },
    { variant: 'dashed' },
    { variant: 'link' },
  ];

  function checkA11YButtonState(isDisabled) {
    if (isDisabled) {
      // No focus or click present when disabled.
      cy.get('button.gl-button').should('have.attr', 'disabled', 'disabled');
    } else {
      cy.get('button.gl-button').focus();
      cy.get('button.gl-button').realHover();
      cy.get('button.gl-button').click();
    }
  }

  function checkA11YButton(variant, category, state, story) {
    const argsObject = { args: { variant } };
    if (category) argsObject.args.category = category;
    if (state) argsObject.args[state] = true;
    if (story) argsObject.story = story;

    cy.visitStory('base/button', argsObject);
    if (!story) checkA11YButtonState(state === 'disabled');
  }

  function checkA11YDropdownButton() {
    checkA11YButton('default', null, null, 'dropdown');

    cy.get('button[aria-haspopup="menu"]').focus();
    cy.get('button[aria-haspopup="menu"]').realHover();
    cy.get('button[aria-haspopup="menu"]').click();
    cy.get('button[aria-haspopup="menu"]').should('have.attr', 'aria-expanded', 'true');
    cy.get('ul[role="menu"]').should('have.class', 'show');
  }

  function checkA11YDropdownButtonDisabledState() {
    checkA11YButton('default', null, 'disabled', 'dropdown');
    // No focus or click present when disabled.
    cy.get('button[aria-haspopup="menu"]').should('have.attr', 'disabled', 'disabled');
  }

  function checkA11YIconButton() {
    checkA11YButton('default', null, null, 'icon');

    cy.get('button.gl-button').first().focus();
    cy.get('button.gl-button').first().realHover();
    cy.get('button.gl-button').first().click();
  }

  function checkA11YIconButtonDisabledState() {
    checkA11YButton('default', null, 'disabled', 'icon');
    // No focus or click present when disabled.
    cy.get('button.gl-button').first().should('have.attr', 'disabled', 'disabled');
  }

  buttonVariants.forEach(({ variant, category }) => {
    it(
      `${variant} ${category ?? ''} button pass axe accessibility audits`,
      { tags: '@a11y' },
      () => {
        cy.glRunA11yTests({
          checkButton: () => {
            checkA11YButton(variant, category);
            checkA11YButton(variant, category, 'disabled');
            checkA11YButton(variant, category, 'selected');
          },
        });
      }
    );
  });

  it('dropdown button passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDropdownButton,
      checkA11YDropdownButtonDisabledState,
    });
  });

  it('icon button passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YIconButton,
      checkA11YIconButtonDisabledState,
    });
  });
});
