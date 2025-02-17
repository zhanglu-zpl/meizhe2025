beforeEach(() => {
    // 通过设置 cookie 来模拟已登录状态
    cy.setCookie("session", "94753efc-1804-40ee-a882-4952caf69374");
    
    // 访问美折网站首页
    cy.visit("https://meizhe.meideng.net/");
    
    // 禁用谷歌分析追踪功能
    cy.window().then((win) => {
      win.ga = () => {};
    }); 
});