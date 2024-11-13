describe('GlSkeletonLoader', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/skeleton-loader');
  }

  function checkA11YWithCustomShapes() {
    cy.visitStory('base/skeleton-loader', {
      story: 'with-custom-shapes',
      args: {
        width: 327,
        height: 102,
      },
    });
  }

  function checkA11YWithCSSBasedAnimation() {
    cy.visitStory('base/skeleton-loader', {
      story: 'css-based-skeleton-loader',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YWithCustomShapes,
      checkA11YWithCSSBasedAnimation,
    });
  });
});
