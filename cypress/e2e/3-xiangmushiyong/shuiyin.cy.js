

describe("创建1:1水印", () => {
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


    it("创建1:1水印-进入素材首页" , ()=>{
        //检查页面是否有主图水印按钮
        cy.contains('主图水印').should('be.visible').click();

        //检查是否进入主图水印，进入编辑器
        cy.contains('创建 1:1 主图水印').should('be.visible').click();

        //检查是否进入编辑器
        cy.url().should('include', 'shuiyin-new/create');

        //引导点击下一步
         cy.get('button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-sm.ant-tour-next-btn').should('be.visible').click();

         //引导点击下一步
         cy.get('button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-sm.ant-tour-next-btn').should('be.visible').click();

         //引导点击下一步
         cy.get('button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-sm.ant-tour-next-btn').should('be.visible').click();

         //引导点击下一步
         cy.get('button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-sm.ant-tour-next-btn').should('be.visible').click();

         //结束引导
         cy.get('button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-sm.ant-tour-next-btn').should('be.visible').click();
         
         //点击添加商品
         cy.get('div.v_xfjJRN._3WEGmgu3.TeWGv5Dl.mzc-column-container.mzc-margin.mzc-margin-small').should('be.visible').click();

         //点击第一个选择商品
         cy.contains('选择商品').eq(0).click();

         //点击仓库中
         cy.contains('仓库中').click();

         //点击全选本页
         cy.contains('全选本页').click();

         //点击确定
         cy.get('button.dplCurFj._10FPpG77._1O3lqufx._2NB3rG9u._1_W4UU-M.mzc-margin.mzc-margin-large').should('be.visible').click();

         //选择模板
         cy.contains('高级版').click();
         cy.get('div.Q8_T2tj0._3WEGmgu3.TeWGv5Dl.mzc-row-container').should('be.visible').eq(0).click();

         //弹层提示确定应用
         cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert').should('be.visible').eq(1).click();

         //点击下一步发布
         cy.get('button.OhC9rdHE._10FPpG77._2HNw7_rq._1O3lqufx._3S4rs61U._1CC5_bmo.mzc-margin.mzc-margin-medium').should('be.visible').click();

         //点击确定发布
         cy.contains('确认发布').should('be.visible').click();



    }

    )

    it("修改1:1水印活动" , ()=>{
      //进入水印活动列表页面
      cy.visit("https://meizhe.meideng.net/shuiyin-new/running");





      } )

  
})  