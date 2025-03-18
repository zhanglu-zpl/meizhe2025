const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"3c8c681b-4016-471f-8157-fa2867428989",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});