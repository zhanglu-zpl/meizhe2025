
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "278a88d1-3fda-4b13-a25f-216dfc69f8d3");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/home");
  cy.wait(3000);

  //检测是否存在引导弹窗
   cy.get('body').then($body => {
    // 当不存在广告弹窗,则继续执行
    if (!$body.find('#mz-global-adv-img').length || !$body.find(':contains("全局弹层_")').length) {
      // 存在新功能引导弹窗,则关闭
      if ($body.find(':contains("新功能引导")').length) {
        cy.contains('我知道了').click();
      }
    
    }
 })
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}