// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
<<<<<<< HEAD

Cypress.on('uncaught:exception', (e, runnable) => {
    console.log('捕获到异常:', e.message);
    return false; // 防止 Cypress 将此异常记录为测试失败
  });
=======
//全局的最好别用
// Cypress.on('uncaught:exception', (err, runnable) => {
//     // 返回 false 可以阻止 Cypress 因为未捕获的异常而失败
//     return false;
// });
>>>>>>> minemeizhe/main
