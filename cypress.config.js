const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"bed208b4-16c3-49a3-84b9-bd5b0a1992f0",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});