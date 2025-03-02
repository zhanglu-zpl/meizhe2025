
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "911a6c23-70ce-4b9a-9d6b-49d7ec9580e1");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/");
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}