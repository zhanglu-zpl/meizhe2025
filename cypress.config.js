const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"e12f313f-2efa-4b6d-9151-ab0168a5ed30",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});