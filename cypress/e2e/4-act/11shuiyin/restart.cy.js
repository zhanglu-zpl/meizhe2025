export const restartWatermark = () => {
    // 结束活动/重开活动
    cy.wait(18000);

    // 进入水印活动列表页面
    cy.visit("https://meizhe.meideng.net/shuiyin-new/running");

    // 点击新功能引导，我知道了
    cy.contains('我知道了').should('be.visible').click();
    let activityId;
    
    // 处理"多尺寸水印上线"弹窗
    cy.get('body').then($body => {
        if ($body.find(':contains("多尺寸水印上线啦")').length) {
            cy.contains('我知道了').click();
        }
    });

    

    // 拦截接口请求
    cy.intercept({
        method: 'POST',
        url: '**/common/shuiyin2/proxy/api/act/list'
    }).as('getActList');

    // 点击结束水印活动
    cy.contains('结束水印').should('be.visible').eq(0).click();

    // 二次确认
    cy.contains('确认').should('be.visible').click();
    cy.wait(2000);

    // 等待接口请求完成并处理响应
    cy.wait('@getActList', { timeout: 10000 }).then((interception) => {
        if (interception && interception.response) {
            // 打印完整的接口返回数据，方便调试
            cy.log('完整的接口返回数据：', JSON.stringify(interception.response.body));
            
            // 验证响应体中是否包含活动 ID
            if (interception.response.body.data && 
                interception.response.body.data.acts && 
                interception.response.body.data.acts.length > 0) {
                activityId = interception.response.body.data.acts[0].id;
                cy.log('活动ID：', activityId);
            } else {
                cy.log('未找到活动 ID，接口返回数据结构：', JSON.stringify(interception.response.body));
            }
        } else {
            cy.log('接口响应异常');
        }
    });

    // 进入已结束活动列表
    cy.contains('已结束列表').should('be.visible').click();
    cy.wait(15000);


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

    // 进入未结束列表
    cy.contains('未结束列表').should('be.visible').click();

    // 检测重开活动是不是之前结束的活动
    cy.request({
        method: 'POST',
        url: 'https://meizhe.meideng.net/common/shuiyin2/proxy/api/act/list',
        body: {
            pageNum: 1,
            pageSize: 10,
            status: "running"  // 运行中的活动
        }
    }).then((response) => {
        // 获取第一个活动的ID并验证
        const firstActId = response.body.data.acts[0].id;
        cy.log('未结束列表第一个活动ID：', firstActId);
        cy.log('原活动ID：', activityId);
        
        // 验证是否匹配
        expect(firstActId).to.equal(activityId);
    });
};