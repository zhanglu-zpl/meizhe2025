
module.exports = (on, config) => {
    on('before:browser:launch', (browser, launchOptions) => {
      if (browser.name === 'chrome') {
        launchOptions.args.push('--disable-blink-features=AutomationControlled');
        launchOptions.args.push('--disable-web-security'); // 可选，解决跨域问题
      }
      return launchOptions;
    });
  };

  