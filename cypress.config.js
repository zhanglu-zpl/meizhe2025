const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  
  e2e: {
    reporter: 'spec',
    chromeWebSecurity: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    env: {
      session: "dacbfb8d-f043-4ea7-9ed8-2b285bf7458e",
    },
    setupNodeEvents(on, config) {
      // 设置下载目录
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
