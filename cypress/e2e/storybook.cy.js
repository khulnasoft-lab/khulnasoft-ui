/**
 * This spec tests a few built-in and custom Storybook behaviors to make `@storybook/*` packages
 * upgrades smoother.
 */
describe('Storybook', () => {
  describe('location paths', () => {
    beforeEach(() => {
      cy.visit('/');

      // Loads whatever is the first story
      cy.url().should('include', '?path=/story');

      cy.get('button.sidebar-item').contains('alert').click();
    });

    it('sets the correct path for a default story', () => {
      cy.url().should('include', '?path=/story/base-alert--default');
    });

    it('sets the correct path for a non-default story', () => {
      cy.get('a').contains('Variants').click();

      cy.url().should('include', '?path=/story/base-alert--variants');
    });

    it('sets the correct path for a docs page', () => {
      cy.get('button').contains('Docs').click();

      cy.url().should('include', '?path=/docs/base-alert--default');
    });
  });

  describe('import info blocks', () => {
    beforeEach(() => {
      cy.visit('/?path=/docs/base-alert--default');
    });

    it('shows the import info block in the docs page', () => {
      cy.get('iframe[title="storybook-preview-iframe"]')
        .iframe()
        .find('[data-testid="import-info"]')
        .invoke('text')
        .should('equal', "import { GlAlert } from '@gitlab/ui';");
    });
  });

  describe('"View source" links', () => {
    beforeEach(() => {
      cy.visit('/?path=/docs/base-alert--default');
    });

    it('shows the import info block in the docs page', () => {
      cy.get('iframe[title="storybook-preview-iframe"]')
        .iframe()
        .find('[data-testid="link-to-source"]')
        .should('have.attr', 'href')
        .and('include', '/main/src/components/base/alert/alert.vue');
    });
  });

  describe('BootstrapVue component info', () => {
    beforeEach(() => {
      cy.visit('/?path=/docs/base-button--default');
    });

    it('shows the import info block in the docs page', () => {
      cy.get('iframe[title="storybook-preview-iframe"]')
        .iframe()
        .find('[data-testid="bv-component-link"]')
        .should('have.attr', 'href')
        .and('eq', 'https://bootstrap-vue.org/docs/components/button');
    });
  });
});
