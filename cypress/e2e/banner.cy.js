describe('GlBanner', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/banner');
  }

  function checkA11YBannerWithoutImage() {
    cy.visitStory('base/banner', {
      story: 'no-image',
    });
  }

  function checkA11YIntroductionBanner() {
    cy.visitStory('base/banner', {
      story: 'introduction',
    });
  }

  function checkA11YBannerWithActions() {
    cy.visitStory('base/banner', {
      story: 'with-actions',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YBannerWithoutImage,
      checkA11YIntroductionBanner,
      checkA11YBannerWithActions,
    });
  });
});
