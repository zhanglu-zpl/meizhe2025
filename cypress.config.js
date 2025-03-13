const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 在这里配置文件下载路径
      config.downloadsFolder = 'cypress/downloads';
      return config;
    },
    baseUrl: 'https://meizhe.meideng.net',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
