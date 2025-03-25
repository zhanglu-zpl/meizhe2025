const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"76752b54-fdbf-4b1e-aa11-1711ceabe770",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});