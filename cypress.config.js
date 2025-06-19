const { defineConfig } = require('cypress');
const path = require('path') ;


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
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--disable-web-security');
        }
        return launchOptions;
      });
      on('task', {
        generateReport: () => {
          try {
            return require('./utils/generate-feishu-report')();
          } catch (error) {
            console.error('生成报告失败:', error);
            throw new Error(`报告生成失败: ${error.message}`);
          }
        },
      });
    },

  },
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false, // 开启覆盖模式overwrite: false,
    html: false,
    json: true,
    reportDir: 'mochawesome-report',
    reportFilename: 'mochawesome',
    quiet: false,
    reportTitle: '测试报告',
    reportPageTitle: '测试报告页面'
  }
});
