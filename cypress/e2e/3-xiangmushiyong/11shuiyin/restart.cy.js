export const restartWatermark = () => {
    // 结束活动/重开活动
    cy.wait(8000);

    // 进入水印活动列表页面
    cy.visit("https://meizhe.meideng.net/shuiyin-new/running");
    
    // 处理"多尺寸水印上线"弹窗
    cy.get('body').then($body => {
        if ($body.find(':contains("多尺寸水印上线啦")').length) {
            cy.contains('我知道了').click();
        }
    });

    // 点击新功能引导，我知道了
    cy.contains('我知道了').should('be.visible').click();
    let activityId;

    // 拦截接口请求
    cy.intercept('POST', 'https://meizhe.meideng.net/common/shuiyin2/proxy/api/act/list').as('getActList');

    // 点击结束水印活动
    cy.contains('结束水印').should('be.visible').eq(0).click();

    // 二次确认
    cy.contains('确认').should('be.visible').click();
    cy.wait(2000);


    // 等待接口请求完成
    cy.wait('@getActList').its('response').then((response) => {
        // 验证响应状态码
        expect(response.status).to.equal(200);
  
        // 验证响应体中是否包含活动 ID
        if (response.body.data && response.body.data.acts && response.body.data.acts.length > 0) {
          activityId = response.body.data.acts[0].id;
          cy.log('活动ID：', activityId);
        } else {
          cy.log('未找到活动 ID');
        }
    });

    // 进入已结束活动列表
    cy.contains('已结束列表').should('be.visible').click();
    cy.wait(5000);

    // 验证活动已经结束
    cy.get('.mzc-table-row').should('contain', activityId);
    
    // 验证未结束列表中不存在该活动
    cy.contains('未结束列表').click();
    cy.get('.mzc-table-row').should('not.contain', activityId);

    // 返回已结束列表
    cy.contains('已结束列表').click();
    cy.wait(2000);

    // 点击重开按钮
    cy.contains('重开水印').should('be.visible').eq(0).click();

    // 关闭引导
    cy.get('button.ant-tour-close').should('be.visible').click();

    // 下一步 发布
    cy.contains('下一步 发布').should('be.visible').click();

    // 点击确定发布  
    cy.contains('确认发布').should('be.visible').click();

    // 等待完成
    cy.wait(10000);

    // 提示发布成功点击查看任务详情
    cy.contains('查看任务详情').should('be.visible').click(); 
};