
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "7d4c9c10-7b12-44c9-a3b2-57492b3a7e9a");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/");
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}