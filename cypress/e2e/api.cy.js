/// <reference types="cypress" />

describe('Automation API REST', () => {
  it('API Test - GET Request', () => {
    cy.request({ url: 'users/2', method: 'GET'}).as('user')
    cy.get('@user').then((res) =>{
      cy.readFile('data/dataUser.json').then((data) =>{
        cy.log(JSON.stringify(res.body))
        expect(res.body.data.id).equal(data.data.id)
        expect(res.body.data.email).contain(data.data.email)
        expect(res.body.data.first_name).equal(data.data.first_name)
        expect(res.body.data.last_name).contain(data.data.last_name)
        cy.get('@user').its('status').should('equal', 200)
      })
    })
  })

  it('API Test - POST Request', () => {
    cy.readFile('data/createUser.json').then((user) =>{
    cy.request({ 
      url: 'users', 
      method: 'POST', 
      body: {name: user.name, job: user.job}}).as('createUser')
        cy.get('@createUser').its('status').should('equal', 201)
        cy.get('@createUser').then((res) =>{
          expect(res.body.name).to.equal(user.name)
          expect(res.body.job).to.equal(user.job)
        })
      })
    })


    it('API Test - POST Request - ERROR', () => {
      cy.request({ 
        url: 'login', 
        method: 'POST',
        failOnStatusCode: false,
        body: {email: 'eve.holt@reqres.in'}}).as('loginRequest')
          cy.get('@loginRequest').its('status').should('equal', 400)
          cy.get('@loginRequest').then((res) =>{
            expect(res.body.error).to.equal('Missing password')
          })
        })

        it('API Test - DELETE Request', () => {
          cy.request({ 
            url: 'users/2', 
            method: 'DELETE'}).as('deleteUser')
              cy.get('@deleteUser').its('status').should('equal', 204)
            })

            it('API Test - PUT Request', () => {
              cy.request({ 
                url: 'users/2', 
                method: 'PUT',
              body: {name: 'name-update'}}).as('putUser')
                  cy.get('@putUser').its('status').should('equal', 200)
                  cy.get('@putUser').then((res) =>{
                    expect(res.body.name).to.equal('name-update')
                  })
                })
          })

      