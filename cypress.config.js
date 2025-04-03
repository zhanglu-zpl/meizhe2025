const { defineConfig } = require("cypress");

module.exports =  defineConfig({
  e2e: {chromeWebSecurity: true,
    env:{
      session:"d6e67b48-33f6-412c-835c-7f4855fb52fb",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});