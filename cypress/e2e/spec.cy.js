import "@testing-library/cypress/add-commands";

describe('template spec', () => {
    it('Generates a chart', () => {
    cy.visit('http://localhost:8080/')
    cy.contains("Line").click()
    cy.findByRole('img').should('not.exist')
    cy.findByLabelText("Chart title").type("Interstellar Predation: The Impact of Wookie Immigration on Porg Population Dynamics")
    cy.findByLabelText("X label").type("Wookies")
    cy.findByLabelText("Y label").type("Porgs")
    cy.findByLabelText("X").type("0")
    cy.findByLabelText("Y").type("500")
    cy.contains("+").click()
    cy.findAllByLabelText("X").last().type("2")
    cy.findAllByLabelText("Y").last().type("413")
    cy.contains("+").click()
    cy.findAllByLabelText("X").last().type("3")
    cy.findAllByLabelText("Y").last().type("274")
    cy.contains("+").click()
    cy.findAllByLabelText("X").last().type("6")
    cy.findAllByLabelText("Y").last().type("196")
    cy.contains("+").click()
    cy.findAllByLabelText("X").last().type("9")
    cy.findAllByLabelText("Y").last().type("48")
    cy.contains("Generate chart").click()
    cy.findByRole('img').should('exist')
  })
})

it('Preserves data between pages', () => {
  cy.visit('http://localhost:8080/')
  cy.contains("Line").click()
  cy.findByRole('img').should('not.exist')
  cy.findByLabelText("Chart title").type("Interstellar Predation: The Impact of Wookie Immigration on Porg Population Dynamics")
  cy.findByLabelText("X label").type("Wookies")
  cy.findByLabelText("Y label").type("Porgs")
  cy.findByLabelText("X").type("0")
  cy.findByLabelText("Y").type("500")
  cy.contains("+").click()
  cy.findAllByLabelText("X").last().type("2")
  cy.findAllByLabelText("Y").last().type("413")
  cy.contains("+").click()
  cy.findAllByLabelText("X").last().type("3")
  cy.findAllByLabelText("Y").last().type("274")
  cy.contains("+").click()
  cy.findAllByLabelText("X").last().type("6")
  cy.findAllByLabelText("Y").last().type("196")
  cy.contains("+").click()
  cy.findAllByLabelText("X").last().type("9")
  cy.findAllByLabelText("Y").last().type("48")
  cy.findByRole("link", { name: "Scatter" }).click()
  cy.findByLabelText("Chart title").should("have.value", "Interstellar Predation: The Impact of Wookie Immigration on Porg Population Dynamics")
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