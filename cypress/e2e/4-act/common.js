
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "3106e105-4727-4e04-b9ce-5ebc2931928d");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/home");
  cy.wait(3000);

  //检测是否存在引导弹窗
  cy.get('body').then($body => {
    if ($body.find('#mz-global-adv-img').length || $body.find(':contains("全局弹层_")').length) {
        cy.get('.mz-modal-adv-close-button.mz-icon.icon-shanchuquan').click();
    }
  })
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}