// 将测试用例导出为函数
export const createWatermark = () => {
        // 创建水印活动
        // 检查页面是否有主图水印按钮并点击
        cy.contains('主图水印').should('be.visible').click();
        cy.wait(7000);
    
        // 等待页面跳转跳到指定 URL
        cy.url().should('include', 'shuiyin-new/template');
        
        // 检查是否进入主图水印并点击高级版
        cy.contains('高级版').should('be.visible').click();
  
        // 悬停在第一个水印模板上并点击1:1水印按钮
        cy.get('div.nVWvCqpy').eq(2).realHover();

        cy.get('div.nVWvCqpy').should('be.visible');

        //等待悬停操作完成
        cy.wait(3000);

        //点击1:1水印按钮
        cy.get('button.yN3J_7cK.OrDuyDN3._10FPpG77._2HNw7_rq._1O3lqufx._3S4rs61U._3PMLNtoR.mzc-margin.mzc-margin.mzc-margin-small-horz.mzc-margin-xs-vert').should('be.visible').eq(0).click();
  
        // 检查是否成功进入编辑器页面
        cy.url().should('include', 'shuiyin-new/create').wait(2000);
  
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
         cy.contains('全选本页').click().wait(2000);

         //点击弹窗中的确定
         cy.get('button.dplCurFj._10FPpG77._1O3lqufx._2NB3rG9u._1_W4UU-M.mzc-margin.mzc-margin-large').should('be.visible').click();

         //选择模板
         cy.contains('高级版').click();
         cy.get('div.Q8_T2tj0._3WEGmgu3.TeWGv5Dl.mzc-row-container').should('be.visible').eq(0).click().wait(2000);

         //弹层提示[确定]应用
         cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert').should('be.visible').click();

         //点击下一步发布
         cy.contains('下一步 发布').should('be.visible').click();

         //点击确定发布
         cy.contains('确认发布').should('be.visible').click();

         //等待发布完成出现弹层
         cy.wait(2000);
         //点击查看任务详情
         cy.contains('查看任务详情').should('be.visible').click();

};     