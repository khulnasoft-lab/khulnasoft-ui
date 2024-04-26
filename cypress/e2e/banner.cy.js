describe('GlBanner', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/banner');
    cy.glCheckA11y();
  }

  function checkA11YBannerWithoutImage() {
    cy.visitStory('base/banner', {
      story: 'no-image',
    });
    cy.glCheckA11y();
  }

  function checkA11YIntroductionBanner() {
    cy.visitStory('base/banner', {
      story: 'introduction',
    });
    cy.glCheckA11y();
  }

  function checkA11YBannerWithActions() {
    cy.visitStory('base/banner', {
      story: 'with-actions',
    });
    cy.glCheckA11y();
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
