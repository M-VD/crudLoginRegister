import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    //automatically prefix cy.visit() and cy.request()
    // baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
