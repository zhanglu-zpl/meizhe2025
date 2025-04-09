export const addproducts = () => {

    cy.wait(8000);
    // 添加商品
    // 确认当前所在页面是水印活动列表页面
    cy.visit("https://meizhe.meideng.net/shuiyin-new/running");
    

     // 处理"多尺寸水印上线"弹窗
     cy.get('body').then($body => {
        if ($body.find(':contains("多尺寸水印上线啦")').length) {
            cy.contains('我知道了').click();
        }
    });


    //点击新功能引导，我知道了
    cy.contains('我知道了').should('be.visible').click();

    // 点击添加商品按钮
    cy.contains('添加商品').eq(0).click();

    // 点击第一个选择商品s
    cy.contains('选择商品').eq(0).click();

    // 点击仓库中
    cy.contains('仓库中').click();

    // 点击全选本页
    cy.contains('全选本页').click().wait(2000);

    // 点击立即发布
    cy.contains('立即发布').click();
    // 确认商品添加成功弹窗出现
    cy.contains('商品添加成功').should('be.visible');
    // 点击确定
    cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert').should('be.visible').click();

    // 验证回到活动列表页面
    cy.url().should('include', '/shuiyin-new/running');

    //等待30秒
    cy.wait(30000);
    
    
    // 删除商品
    // 点击商品列表中的删除按钮
    cy.contains('更多').first().click();

    // 点击删除商品按钮
    cy.contains('删除商品').should('be.visible').click();

    // 等待 
    cy.wait(2000);

    // 记录当前投放中商品数量
    let count1;
    cy.get('div._2RnPVa7h',{ timeout: 10000 }).invoke('text').then((text) => {
        
        if (text) {
            count1 = parseInt(text.match(/\d+/)[0]);
            cy.log('当前投放中商品数量：', count1);
        } else {
            cy.log('元素文本为空');
        }
    });

    //点击撤出水印按钮
    cy.contains('撤出水印').should('be.visible').eq(0).click();

    // 勾选全部商品
    cy.get('i.icon.icon-duoxuan.mzc-margin.mzc-margin-xs._2aYi6dY5').first().click();

    // 取消第一个商品的勾选
    cy.get('i.icon.icon-duoxuanfill.mzc-margin.mzc-margin-xs._2aYi6dY5.SsK0ay5X').eq(1).click();

    // 点击批量撤出水印按钮
    cy.contains('批量撤出水印').should('be.visible').click();

    //二次确认
    cy.contains('确认').should('be.visible').click();
    cy.wait(8000);


    // 再次验证投放数量，存为删除后数量，删除后数量小于删除前数量
    let count2;
    cy.get('div._2RnPVa7h').invoke('text').then((text) => {
        if (text) {
            count2 = parseInt(text.match(/\d+/)[0]);
            cy.log('当前投放中商品数量：', count2);

            // 验证删除后投放数量小于删除前投放数量
            expect(count2).to.be.lessThan(count1);
        } else {
            cy.log('元素文本为空');}
         
    });



};

