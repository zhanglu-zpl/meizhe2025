export const restartWatermark = () => {

      cy.wait(8000);

        // "结束并重开水印"
        //进入水印活动列表页面
        cy.visit("https://meizhe.meideng.net/shuiyin-new/running");

        //点击新功能引导，我知道了
        cy.contains('我知道了').should('be.visible').click();

        //点击结束水印活动
        cy.contains('结束水印').should('be.visible').eq(0).click();

        //二次确认
        cy.contains('确认').should('be.visible').click();

        //页面等待
        cy.wait(2000);

        //进入已结束活动列表
        cy.contains('已结束列表').should('be.visible').click();

        //点击重开按钮
        cy.contains('重开水印').should('be.visible').eq(0).click();

        //关闭引导
        cy.get('button.ant-tour-close').should('be.visible').click();

        //下一步 发布
        cy.contains('下一步 发布').should('be.visible').click();

        //点击确定发布  
        cy.contains('确认发布').should('be.visible').click();

        //等待完成
        cy.wait(10000);

        //提示发布成功点击查看任务详情
        cy.contains('查看任务详情').should('be.visible').click(); 
  };