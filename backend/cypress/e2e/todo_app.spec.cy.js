/* describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
    cy.url().should('include', '/commands/actions')

    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
}) 

import { signJwtAccess } from '../../src/utils/jwt.utils'
 
describe('post user request', () => {
  let accessToken: any
  let refreshToken: any
  let cookie: any
  let randomText = ''
  let testEmail = ''
  it.only('create user test', () => {
    var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (var i = 0; i < 10; i++)
      randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
    testEmail = randomText + '@gmail.com'

    cy.fixture('createuser').then((payload) => {
      //1. create user (POST)
      cy.request({
        method: 'POST',
        url: 'http://localhost:1337/api/users',
        headers: {
          Authorization: 'Bearer ' + JSON.stringify(accessToken),
        },
        body: {
          lastName: payload.lastName,
          firstName: payload.firstName,
          password: payload.password,
          email: payload.email,
          passwordConfirmation: payload.passwordConfirmation,
        },
      }).then((res) => {
        // cy.log(JSON.stringify(res))

        cy.log('accessToken ', accessToken)

        expect(res.status).to.eq(200)
        expect(res.body).has.property('email', payload.email)
        expect(res.body).has.property('firstName', payload.firstName)

        expect(res.body).has.property('lastName', payload.lastName)
      })
      cy.request({
        method: 'POST',
        url: 'http://localhost:1337/api/sessions',
        headers: {
          Authorization: 'Bearer ' + JSON.stringify(accessToken),
        },
        body: {
          password: payload.password,
          email: payload.email,
        },
      }).then((res) => {
        // cy.log(JSON.stringify(res))
        expect(res.status).to.eq(200)
        expect(res.body).has.property('accessToken')
        expect(res.body).has.property('refreshToken')

        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken

        cy.setCookie('jwt', JSON.stringify(refreshToken))

        cy.getCookie('jwt').should(
          'have.property',
          'value',
          JSON.stringify(refreshToken)
        )

        cy.request({
          method: 'GET',
          url: 'http://localhost:1337/api/sessions',
          headers: {
            Authorization: 'Bearer ' + res.body.accessToken,
          },
        }).then((res) => {
          expect(res.status).to.eq(200)
        })
      })
      //const userId = res.body._id
      // cy.log('user id is: ' + userId)
      //2. get user (GET)

      cy.request({
        method: 'DELETE',
        url: 'http://localhost:1337/api/sessions',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }).then((res) => {
        expect(res.status).to.eq(200)
      })
    })
  })
})
*/
describe('post product request', () => {
  it.only('create product test', () => {
    cy.fixture('createpost').then((payload) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:1337/api/products',

        body: {
          title: payload.title,
          description: payload.description,
          price: payload.price,
          image: payload.image,
        },
      }).then((res) => {
        //cy.log(JSON.stringify(res))
        expect(res.status).to.eq(200)

        expect(res.body).has.property(
          'title',
          'Canon EOS 1500D DSLR Camera with 18-55mm Lens'
        )
        expect(res.body).has.property('description', payload.description)
        expect(res.body).has.property('price', payload.price)

        expect(res.body).has.property('image', payload.image)
      })

      /* cy
          .request({
            method: 'GET',
            url: 'http://localhost:1337/api/products',
          })
          .then((res) => {
            expect(res.status).to.eq(200)
          })
      
      cy.request({
      method: 'DELETE',
      url: 'http://localhost:1337/api/products',
    }).then((res) => {
      expect(res.status).to.eq(200)
    })*/
    })
  })
})
