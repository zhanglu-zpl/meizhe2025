const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"4ee484b3-c88f-45fc-b78b-60981d24cd74",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});