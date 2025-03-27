const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"1d661064-c236-4845-b0c0-329503df149b",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});