// 将测试用例导出为函数
export const create23Watermark = () => {

    // 创建水印活动
    // 检查页面是否有主图水印按钮并点击
    cy.contains('主图水印').should('be.visible').click();
    cy.wait(7000);

    // 等待页面跳转跳到指定 URL
    cy.url().should('include', 'shuiyin-new/template');
    
    // 点击创建2:3 长图水印
    cy.contains('创建 2:3 长图水印').should('be.visible').click();

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

     //点击隐藏无长图的商品
     cy.contains('隐藏无长图的商品').should('be.visible').click();
     
     //点击第一个选择商品
     cy.contains('选择商品').eq(0).click();

     // 处理可能出现的弹窗
     cy.get('body').then($body => {
      if ($body.find(':contains("商品已参加其他同类水印计划")').length > 0) {
        cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert')
          .click();
      } else {
        cy.log('弹窗未出现，继续执行后续操作');
      }
    });

     //点击仓库中
     cy.contains('仓库中').click();

     //点击第一个选择商品
     cy.contains('选择商品').eq(0).click();

     // 处理可能出现的弹窗
     cy.get('body').then($body => {
      if ($body.find(':contains("商品已参加其他同类水印计划")').length > 0) {
        cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert')
          .click();
      } else {
        cy.log('弹窗未出现，继续执行后续操作');
      }
    });

     //点击仓库中
     cy.contains('仓库中').click();

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
     cy.wait(15000);
     //点击查看任务详情
     cy.contains('查看任务详情').should('be.visible').click();

     cy.wait(10000);

};