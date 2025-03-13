const { defineConfig } = require("cypress");

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
