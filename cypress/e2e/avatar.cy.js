describe('GlAvatar', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/avatar', {
      story: 'image',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
    });
  });
});

describe('GlAvatarLabeled', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/avatar/labeled');
  }

  function checkA11yWithLinks() {
    cy.visitStory('base/avatar/labeled', {
      story: 'with-links',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11yWithLinks,
    });
  });
});

describe('GlAvatarLink', () => {
  function checkA11yWithLinks() {
    cy.visitStory('base/avatar/avatar-link', {
      story: 'with-labeled-avatar',
    });
  }

  function checkA11yWithLinksHoverState() {
    cy.visitStory('base/avatar/avatar-link', {
      story: 'with-labeled-avatar',
    });
    cy.get('.gl-avatar-link').realHover();
  }

  function checkA11yWithLinksFocusState() {
    cy.visitStory('base/avatar/avatar-link', {
      story: 'with-labeled-avatar',
    });
    cy.get('.gl-avatar-link').focus();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yWithLinks,
      checkA11yWithLinksHoverState,
      checkA11yWithLinksFocusState,
    });
  });
});

describe('GlAvatarsInline', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/avatar/avatars-inline');
  }

  function checkA11yAvatarsInlineHoverState() {
    cy.visitStory('base/avatar/avatars-inline');

    cy.get('.gl-avatars-inline-child:first').realHover();
  }

  function checkA11yAvatarsInlineFocusState() {
    cy.visitStory('base/avatar/avatars-inline', {
      story: 'with-links-and-tooltips',
    });

    cy.get('.gl-avatar-link:first').focus();
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11yAvatarsInlineHoverState,
      checkA11yAvatarsInlineFocusState,
    });
  });
});
