const { defineConfig } = require("cypress");

<<<<<<< HEAD
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, options) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          options.preferences.default['download'] = { default_directory: 'cypress/downloads' };
          return options;
        }
        if (browser.family === 'firefox') {
          options.preferences['browser.download.dir'] = 'cypress/downloads';
          options.preferences['browser.download.folderList'] = 2;
          return options;
        }
      });
    },
    
  },
});
=======
module.exports =  defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true
  },
  
  e2e: {
    chromeWebSecurity: true,
    specPattern: 'cypress/e2e/1-myproject/meizhe2012/*.cy.{js,jsx,ts,tsx}',
    env:{
      session:"a4f93dc7-9ee7-4c4b-8ce6-f6ca26819515",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
>>>>>>> minemeizhe/main
