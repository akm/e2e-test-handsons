/// <reference types="cypress" />

const loginURL = Cypress.env("LOGIN_URL")
const loginEmail = Cypress.env("LOGIN_EMAIL")
const loginPassword = Cypress.env("LOGIN_PASSWORD")
const expectedURL = Cypress.env("EXPECTED_URL")

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

    cy.get('.header__Items > :nth-child(1) > .material-icons').click()
    cy.get('#global-menu-bigdata > .menu2__item > .menu2__item--text > .main').click()

    cy.get(".header__Items").contains("フローデザイナー").should('be.visible')

    // cy.get(".boardList2__name > a.linkTo").its("href").should("equal", expectedURL)
    cy.get(".boardList2__name > a.linkTo").then(($elements) => {
      expect($elements).to.have.length(1)
      expect($elements[0].href).to.equal(expectedURL)
    })

    // cy.get(".boardList2__name > a.linkTo").click()
  });
});
