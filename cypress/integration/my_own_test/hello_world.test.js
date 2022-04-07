/// <reference types="cypress" />

describe("Empty test", () =>{
    it("test one", () =>{
        cy.visit("https://pt.siterecon.ai")

        //mocha library
        cy.contains("Log In to your account").should("exist")

        //cy.get
        cy.get('div')
    })
})