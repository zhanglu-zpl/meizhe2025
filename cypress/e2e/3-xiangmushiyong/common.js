
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "4a8fa003-1c39-44f5-a218-7b1cbd1e7c10");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/");
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}