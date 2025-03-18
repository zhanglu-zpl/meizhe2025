
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "3e4bbafb-e0fc-4f3f-8c1a-6061fb8a50af");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/");
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}