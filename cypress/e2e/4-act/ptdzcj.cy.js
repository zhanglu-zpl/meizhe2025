

describe("创建折扣", () => {
    beforeEach(() => {
      // 通过设置 cookie 来模拟已登录状态
      cy.setCookie("session", "dc431306-7e7f-4a98-bc2e-65d86043caa9");
      
      // 访问美折网站首页
      cy.visit("https://meizhe.meideng.net/");
      
      // 禁用谷歌分析追踪功能
      cy.window().then((win) => {
        win.ga = () => {};
      });
    });
  
  
    /*it("创建折扣 - 点击按钮并验证跳转", () => {
      // 检查页面上是否存在"创建折扣"按钮
      cy.contains('创建折扣')
        .should('be.visible');
  
      // 点击"创建折扣"按钮
      cy.contains('创建折扣').click();
  
      // 检查是否成功跳转到折扣创建页面
      cy.url().should('include', '/huodong/zhekou-create');
      
      // 验证折扣创建页面的关键元素是否显示
      cy.contains('活动类型').should('be.visible');
      cy.contains('下一步 选择活动商品').should('be.visible');
  
      // 进入商品选择步骤
      cy.contains('下一步 选择活动商品').click();
  
      // 再次确认URL是否正确
      cy.url().should('include', '/huodong/zhekou-create'); 
  
      // 打开商品选择面板
      cy.contains('选择商品').click();
  
      // 切换到仓库中的商品列表
      cy.contains('仓库中').click();
  
      // 选择当前页面的所有商品
      cy.contains('全选本页').click();
  
      // 进入折扣设置步骤
      cy.contains('下一步 设置商品折扣').click();
  
      // 确认批量打折选项可见
      cy.contains('批量打折').should('be.visible');
      
      // 选择批量打折复选框 并填写9折
      cy.get('input.ZeIlywCF.Ns1bnhKQ[precision="2"][value=""]').eq(0).click().type('9');
      
      // 确认折扣设置
      cy.contains('确定').should('be.visible').click();
  
      // 提交创建折扣申请
      cy.contains('下一步 完成并提交').click();
  
      // 确认创建成功
      cy.contains('活动创建成功').should('be.visible');
      
  
    })
      */
  
    it("查看活动信息 - 修改信息",{ tags: ['2']} ,() => {
      //进入活动列表页面
      cy.visit("https://meizhe.meideng.net/huodong/list-v2");
  
      // 点击第一个活动卡片的修改信息按钮
      cy.get('a.mz-btn.btn-primary').eq(0).click();
  
      // 弹窗出现 下拉选择框切换价格标签
      cy.get('.icon.icon-shangxia._1gtuj15A.mzc-margin.mzc-margin-xs._31h4mzq8').should('be.visible').click();
      
      // 选择价格标签
      cy.contains('优惠价').should('be.visible').click();
  
      //修改开始时间为未来时间
      cy.get('.icon.icon-rili.mzc-margin.mzc-margin-xs._2qi1lOc-._31h4mzq8').eq(0).click()
      // 选择未来时间
      cy.get('.icon.icon-xiayiye.mzc-margin.mzc-margin-xs.HRUNDkK3').click()
      // 点击确定按钮
      cy.get('.button._10FPpG77._1O3lqufx._2NB3rG9u._3PMLNtoR.mzc-margin.mzc-margin-small-horz.mzc-margin-xs-vert').click();
  
      //修改结束时间为比开始时间晚一天
      cy.get('.icon.icon-rili.mzc-margin.mzc-margin-xs._2qi1lOc-._31h4mzq8').eq(1).click()
      // 选择未来时间
      cy.get('.icon.icon-xiayiye.mzc-margin.mzc-margin-xs.HRUNDkK3').click()
      // 点击确定按钮
      cy.contains('确定').eq(0).click();
  
      // 点击确定按钮
      cy.contains('确定').click();
  
      // 确认修改成功
      cy.contains('修改成功').should('be.visible');
  
      
  
  
    })
  });