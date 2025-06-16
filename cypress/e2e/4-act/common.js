
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "2ac1f73a-6bd5-4b5e-8202-9723cbe52c9");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/home");
  cy.wait(3000);

  //检测是否存在引导弹窗
  // cy.get('body').then($body => {
  //   // 检查是否存在广告弹窗,如果存在则关闭
  //   if ($body.find('#mz-global-adv-img').length || $body.find(':contains("全局弹层_")').length) {
  //       cy.get('.mz-modal-adv-close-button.mz-icon.icon-shanchuquan').click();
  //   }
  // })
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}