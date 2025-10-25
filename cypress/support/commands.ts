/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      seedFromFixture(fixture: string): Chainable<void>;
      resetFromFixture(fixture?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("seedFromFixture", (fixture) => {
  cy.readFile(`cypress/fixtures/${fixture}`, "utf-8").then((json) => {
    cy.task("seedSubmissions", { items: JSON.parse(json) });
  });
});

Cypress.Commands.add(
  "resetFromFixture",
  (fixture = "empty-submissions.json") => {
    cy.readFile(`cypress/fixtures/${fixture}`, "utf-8").then((json) => {
      cy.task("seedSubmissions", { items: JSON.parse(json) });
    });
  },
);

export {};
