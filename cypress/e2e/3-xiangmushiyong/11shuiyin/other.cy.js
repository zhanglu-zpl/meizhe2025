export const otheroperations= () => {

    cy.wait(8000);

    // "修改1:1水印活动" 
    //进入水印活动列表页面
    cy.visit("https://meizhe.meideng.net/shuiyin-new/running");

    //点击新功能引导，我知道了
    cy.contains('我知道了').should('be.visible').click();

    //点击更多按钮
    cy.contains('更多').should('be.visible').eq(0).click();

    //点击保存模板按钮
    cy.contains('保存模板').should('be.visible').eq(0).click();
    cy.wait(2000);

    //确认保存成功
    cy.contains('保存成功').should('be.visible');
    //点击我的模板
    cy.contains('查看我的模板').should('be.visible').click();
    cy.wait(3000);

    //删除我的模板
    //hover模板
    cy.get('img.xI6jlWHP').eq(1).trigger('mouseover');

    //点击删除按钮
    cy.get('i.icon.icon-shanchuxiao._1gtuj15A.mzc-margin.mzc-margin-xs').should('be.visible').eq(1).click();
    
    //点击已结束列表
    cy.contains('已结束列表').should('be.visible').click();

    //点击永久删除
    cy.contains('永久删除').should('be.visible').eq(0).click();

    //点击确认
    cy.contains('确认').should('be.visible').click();


    //点击更多
    cy.contains('更多').should('be.visible').eq(0).click();

    //点击导出商品ID&价格
    cy.contains('导出商品ID&价格').should('be.visible').click();

    // 等待文件下载完成
    cy.wait(5000); // 等待 5 秒，确保文件下载完成

    // 验证文件是否存在
    cy.readFile('cypress/downloads/expected-file-name.xlsx').should('exist');











}
