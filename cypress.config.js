const { defineConfig } = require('cypress');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const timersPath = require.resolve('timers-browserify');
console.log('Resolved timers path:', timersPath); // 确认路径解析正常

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://meizhe.meideng.net',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    videoUploadOnPasses: false,
    retries: 1, 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    output: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true
  }
});
