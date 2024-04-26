// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Visit a story.
 *
 * @param {string} title Title property of default export of component stories, e.g., 'base/alert'.
 * @param {Object} [options]
 * @param {string} [options.story] The name of the particular story to visit.
 * @param {Object} [options.args] Story args to configure the story.
 */
Cypress.Commands.add('visitStory', (title, { story = 'default', args = null } = {}) => {
  const query = {
    id: `${title.replace(/\//g, '-')}--${story}`,
    viewMode: 'story',
  };

  if (args) {
    query.args = Object.entries(args)
      .map((entry) => entry.join(':'))
      .join(';');
  }

  cy.visit('iframe.html', { qs: query });
  cy.injectAxe();
  cy.get('.vue-component-mounted').should('exist');
});

Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    const callback = () => {
      resolve($iframe.contents().find('body'));
    };

    if ($iframe[0]?.contentWindow?.document?.readyState === 'complete') {
      callback();
    } else {
      $iframe.on('load', callback);
    }
  });
});

Cypress.Commands.add('getStoryPreviewIframe', () => {
  return cy.get('iframe[title="storybook-preview-iframe"]').iframe();
});

const terminalLog = (violations) => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
      violations.length === 1 ? 'was' : 'were'
    } detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(({ id, impact, description, nodes }) => ({
    id,
    impact,
    description,
    nodes: nodes.length,
  }));

  cy.task('table', violationData);
};

Cypress.Commands.add('glCheckA11y', (context = {}) => {
  cy.checkA11y({ include: ['#storybook-root'], ...context }, null, terminalLog);
});

Cypress.Commands.add('glRunA11yTests', (tests) => {
  Object.entries(tests).forEach(([name, fn]) => {
    cy.task('log', `start a11y test: ${name} -----------`);

    fn();

    cy.configureAxe({
      rules: [{ id: 'aria-progressbar-name', enabled: false }],
    });

    cy.glCheckA11y();
  });
});
