const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"399b46bc-3718-40bb-969f-7aa85ee39366",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});