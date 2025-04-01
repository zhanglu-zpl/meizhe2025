const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"9fbd39ef-2f2f-4e6f-9b80-3152014afdad",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});