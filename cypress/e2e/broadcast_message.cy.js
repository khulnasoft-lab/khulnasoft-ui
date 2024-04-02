describe('GlBroadcastMessage', () => {
  function checkA11yDefaultState() {
    cy.visitStory('base/broadcast-message');
  }

  function checkA11yBannerWithDismissibleState() {
    cy.visitStory('base/broadcast-message', {
      args: {
        type: 'banner',
        dismissible: true,
      },
    });
  }

  function checkA11yBannerWithNoDismissibleState() {
    cy.visitStory('base/broadcast-message', {
      args: {
        type: 'banner',
        dismissible: false,
      },
    });
  }

  function checkA11yBannerWithLightTheme() {
    cy.visitStory('base/broadcast-message', {
      args: {
        type: 'banner',
        theme: 'light',
      },
    });
  }

  function checkA11yNotificationState() {
    cy.visitStory('base/broadcast-message', {
      story: 'notification',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDefaultState,
      checkA11yBannerWithDismissibleState,
      checkA11yBannerWithNoDismissibleState,
      checkA11yBannerWithLightTheme,
      checkA11yNotificationState,
    });
  });
});
