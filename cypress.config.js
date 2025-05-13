const { defineConfig } = require("cypress");
const { generateReport } = require('./generate-report');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true
  },
  
  e2e: {
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

      // 修改测试完成后的回调
      on('after:run', async (results) => {
        if (results && results.totalTests > 0) {  // 确保有测试运行完成
          await generateReport();
        }
      });
    },
  },
});
