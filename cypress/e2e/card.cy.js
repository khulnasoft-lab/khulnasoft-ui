describe('GlCard', { testIsolation: false }, () => {
  before(() => {
    cy.visitStory('base/card');
  });

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glCheckA11y();
  });
});
