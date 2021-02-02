/// <reference types="cypress" />

const loginURL = Cypress.env("LOGIN_URL")
const loginEmail = Cypress.env("LOGIN_EMAIL")
const loginPassword = Cypress.env("LOGIN_PASSWORD")

context("Login test", () => {
  it("login", () => {
    cy.visit(loginURL);
    cy
      .get("#input-email")
      .type(loginEmail)
      .get("#input-password")
      .type(loginPassword)
      .get("#login-button")
      .click();
    cy.get(".header__Items").contains("ダッシュボード").should('be.visible')
  });
});
