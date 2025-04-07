const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true
  },
  
  e2e: {
    chromeWebSecurity: true,
    specPattern: 'cypress/e2e/1-myproject/meizhe2012/*.cy.{js,jsx,ts,tsx}',
    env:{
      session:"a4f93dc7-9ee7-4c4b-8ce6-f6ca26819515",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});