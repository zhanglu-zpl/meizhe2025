const { defineConfig } = require('cypress');
const timersPath = require.resolve('timers-browserify');
const fs = require('fs');
const path = require('path') ;


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
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--disable-web-security');
        }
        return launchOptions;
      });

      on('task', {
        // 等待文件生成的自定义任务
        waitForFile: async ({ path: filePath, timeout = 15000 }) => {
          const absolutePath = path.resolve(filePath);
          const startTime = Date.now();
          const interval = 1000;

          while (Date.now() - startTime < timeout) {
            try {
              await fs.promises.access(absolutePath, fs.constants.F_OK);
              return absolutePath;
            } catch (err) {
              await new Promise(resolve => setTimeout(resolve, interval));
            }
          }
          return new Error(`文件未找到: ${absolutePath} (超时 ${timeout}ms)`);
        },
        
        // 安全读取报告文件
        getMochawesomeReport: (reportPath) => {
          const path = require('path');
          const absPath = path.resolve(__dirname, reportPath);
          if (!fs.existsSync(absPath)) {
            throw new Error(`报告文件不存在: ${absPath}`);
          }
          return require(absPath);
        },
        
        sendDetailedFeishuReport(reportPath) {
          const { sendFeishuMessage } = require('../../generate-feishu-report');
          return sendFeishuMessage(reportPath);
        },
        
        checkFileExists(filePath) {
          return fs.existsSync(filePath);
        },
        sendFeishuMessage({ webhook, message }) {
          const absPath = path.resolve(__dirname, 'utils/feishu.js');
          // 确保缓存清除，防止热更新问题
          console.log('[调试] 飞书模块路径:', absPath);
          delete require.cache[absPath];
          const { sendFeishuMessage } = require(absPath);
          console.log('[调试] 消息内容:', { webhook, message });
          
          // 直接返回 Promise，让错误向上抛出
          return sendFeishuMessage(webhook, message);
        }
      });
      return require("cypress-fs/plugins")(on, config);
    },

  },
  reporter: 'mochawesome',
  reporterOptions: {
    output: path.resolve(__dirname, 'mochawesome-report'),
    overwrite: false,
    html: false,
    json: true
  }
});
