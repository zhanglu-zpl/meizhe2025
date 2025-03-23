const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"3127ca44-365b-4845-81cc-bd0b213bc28f",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});