export const createSkuWatermark = () => {
    // 创建水印活动
    cy.contains('主图水印').should('be.visible').click();
    cy.wait(7000);
    cy.url().should('include', 'shuiyin-new/template');
    
    // 选择水印类型
    cy.contains('高级版').should('be.visible').click();
    cy.get('div.nVWvCqpy').eq(0).realHover();
    cy.get('div.nVWvCqpy').should('be.visible');

    // 选择SKU水印
    cy.get('div.OrDuyDN3._3WEGmgu3.TeWGv5Dl.mzc-row-container.mzc-margin.mzc-margin-small')
        .should('be.visible')
        .eq(4)
        .click({force: true});
    cy.wait(2000);

    // 创建活动
    cy.get('button.DnvwO91p._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert')
        .should('be.visible')
        .eq(0)
        .click();

    // 进入编辑器页面
    cy.url().should('include', 'shuiyin-new/create').wait(2000);

    // 处理引导步骤
    for (let i = 0; i < 5; i++) {
        cy.get('button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-sm.ant-tour-next-btn')
            .should('be.visible')
            .click();
    }

    // 添加商品
    cy.get('div.v_xfjJRN._3WEGmgu3.TeWGv5Dl.mzc-column-container.mzc-margin.mzc-margin-small')
        .should('be.visible')
        .click();
    cy.contains('选择商品').eq(0).click();

    // 处理可能出现的弹窗
    cy.get('body').then($body => {
        if ($body.find(':contains("商品已参加其他同类水印计划")').length) {
            cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert')
                .click();
        } else {
            cy.log('弹窗未出现，继续执行后续操作');
        }
    });

    // 确认商品选择
    cy.get('button.dplCurFj._10FPpG77._1O3lqufx._2NB3rG9u._1_W4UU-M.mzc-margin.mzc-margin-large')
        .should('be.visible')
        .click();

    // 选择模板
    cy.contains('高级版').click();
    cy.get('div.Q8_T2tj0._3WEGmgu3.TeWGv5Dl.mzc-row-container')
        .should('be.visible')
        .eq(0)
        .click()
        .wait(2000);

    // 确认应用模板
    cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert')
        .should('be.visible')
        .click();

    // 发布流程
    cy.contains('下一步 发布').should('be.visible').click();
    cy.contains('确认发布').should('be.visible').click();
    cy.wait(15000);
    cy.contains('查看任务详情').should('be.visible').click();
    cy.wait(10000);
};