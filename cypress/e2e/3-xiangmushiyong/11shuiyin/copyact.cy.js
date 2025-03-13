export const copyactivity= () => {
    
  cy.wait(8000);
      // 确认当前所在页面是水印活动列表页面
    cy.visit("https://meizhe.meideng.net/shuiyin-new/running");

    //点击新功能引导，我知道了
    cy.contains('我知道了').should('be.visible').click();

    //点击更多按钮 
    cy.contains('更多').should('be.visible').click();

    //点击复制活动
    cy.contains('复制任务(含多尺寸)').should('be.visible').click();

    //点击1:1主图水印
    cy.contains('1:1主图水印').should('be.visible').click();

    // 检查是否成功进入编辑器页面
    cy.url().should('include', 'shuiyin-new/create').wait(2000);
    // 重复点击下一步按钮 5 次
    for (let i = 0; i < 5; i++) {
      cy.get('button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid.ant-btn-sm.ant-tour-next-btn')
        .should('be.visible')
        .click();
     }

    // 点击左侧导航栏文本
    cy.contains('文本').should('be.visible').click();

    //点击统一描述
    cy.contains('统一描述').should('be.visible').click();

    //右侧修改文字内容
    cy.contains('textarea', '双击输入主利益点').type('自动化测试');
    cy.wait(3000);
    
    //移动位置
    cy.get('div.index_settingButton__1DxAS._1RoRMXu4.mzc-row-container').eq(1).click();

    //点击放置下方
    cy.get('div.CommonSetting_positionSettingBox__1Hx9U').should('be.visible').eq(7).click();

    //点击智能价
    cy.contains('智能价').should('be.visible').click();

    //移动位置
    cy.get('div.index_settingButton__1DxAS._1RoRMXu4.mzc-row-container').should('be.visible').eq(1).click();

    //点击右下角
    cy.get('div.CommonSetting_positionSettingBox__1Hx9U').should('be.visible').eq(8).click();
    
    //点击下一步发布
    cy.contains('下一步 发布').should('be.visible').click();

    //点击确定发布
    cy.contains('确认发布').should('be.visible').click();

    //等待发布完成出现弹层
    cy.wait(13000);

    //点击查看任务详情
    cy.contains('查看任务详情').should('be.visible').click();


}