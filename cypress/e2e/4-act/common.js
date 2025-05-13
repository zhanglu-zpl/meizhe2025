
export function setupTest() {
  // 通过设置 cookie 来模拟已登录状态
  cy.setCookie("session", "03f0ce35-c943-4059-9d09-cc06e12f2a7b");
  
  // 访问美折网站首页
  cy.visit("https://meizhe.meideng.net/");
  
  // 禁用谷歌分析追踪功能
  cy.window().then((win) => {
    win.ga = () => {};
  });
}