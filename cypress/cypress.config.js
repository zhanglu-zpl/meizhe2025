const { defineConfig } = require("cypress");
const fs = require('fs');
const { flushCompileCache } = require("module");
const path = require('path');

module.exports = defineConfig({
  e2e: {
    env:{
      session:"f660df20-5b41-4ed2-8f3e-d5623b408f32",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch',(browser={},launchOptions)=>{
        if(browser.name == 'chrome'){
          launchOptions.preferences.default.download.default_directory=`${__dirname}/downloads`;
        }
        return launchOptions;
      }),
      on('task',{
        deleteFolder(folderPath){
          if(fs.existsSync(folderPath)){
            fs.rmdirSync(folderPath,{recursive:true});
          }
          return null;
        }
      }),
      on('task', {
        // 读取目录内容
        readFolder(folderPath) {
          return fs.readdirSync(folderPath)
        }
      })
  }
  }
});

