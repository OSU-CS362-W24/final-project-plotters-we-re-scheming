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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('testTemplateValues', function() {
    cy.findByLabelText("X label").should("have.value", "Wookies")
  cy.findByLabelText("Y label").should("have.value", "Porgs")
  cy.findAllByLabelText("X").eq(0).should("have.value", "0")
  cy.findAllByLabelText("Y").eq(0).should("have.value", "500")
  cy.findAllByLabelText("X").eq(1).should("have.value", "2")
  cy.findAllByLabelText("Y").eq(1).should("have.value", "413")
  cy.findAllByLabelText("X").eq(2).should("have.value", "3")
  cy.findAllByLabelText("Y").eq(2).should("have.value", "274")
  cy.findAllByLabelText("X").eq(3).should("have.value", "6")
  cy.findAllByLabelText("Y").eq(3).should("have.value", "196")
  cy.findAllByLabelText("X").eq(4).should("have.value", "9")
  cy.findAllByLabelText("Y").eq(4).should("have.value", "48")
  })