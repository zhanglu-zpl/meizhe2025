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
      console.log('Setting up Node events');
      const options = {
        webpackOptions: {
          resolve: { 
            fallback: { 
              "fs": false, 
              "path": require.resolve("path-browserify"), 
              "util": require.resolve("util/"), 
              "stream": require.resolve("stream-browserify"), 
              "constants": require.resolve("constants-browserify"), 
              "assert": require.resolve("assert/"), 
              "string_decoder": require.resolve("string_decoder/"), 
              "url": require.resolve("url/"), 
              "events": require.resolve("events/"), 
              "module": false, 
              "timers": require.resolve("timers-browserify")
            }
          }
        }
      };
      on('file:preprocessor', webpackPreprocessor(options));
      return config;
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    output: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true
  }
});
