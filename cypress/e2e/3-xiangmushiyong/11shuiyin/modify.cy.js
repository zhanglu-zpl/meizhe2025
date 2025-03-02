export const modifyWatermark = () => {

      // "修改1:1水印活动" 
      //进入水印活动列表页面
      cy.visit("https://meizhe.meideng.net/shuiyin-new/running");

      //点击新功能引导，我知道了
      cy.contains('我知道了').should('be.visible').click();

      //点击修改水印按钮
      cy.contains('修改水印').should('be.visible').eq(0).click();

      //关闭引导
      cy.get('button.ant-tour-close').should('be.visible').click();

      //等待页面加载完成
      cy.wait(2000);

      //点击高级版模板
      cy.contains('高级版').should('be.visible').eq(0).click().wait(2000);

      //点击第三个模板
      cy.get('div.Q8_T2tj0._3WEGmgu3.TeWGv5Dl.mzc-row-container').should('be.visible').eq(4).click().wait(2000);

      //弹层提示[确定]应用
      cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert').should('be.visible').eq(0).click();

      //找到水印模板中的到手价
      cy.contains('这是一行利益点文案').should('be.visible').click(); 

      //输入框内退格
      cy.get('textarea.BMwJojif.mzc-always-show-scroller').eq(0).type('{backspace}');

      //点击左侧导航栏素材按钮
      cy.contains('素材').should('be.visible').click();

      //添加标签素材
      cy.get('div.ImageGroupSelectorItem_imageContent__2h94t._3WEGmgu3.TeWGv5Dl.mzc-row-container.mzc-margin.mzc-margin-small').should('be.visible').eq(3).click();

      //点击确认修改
      cy.contains('确认修改').should('be.visible').click(); 

      //等待完成
      cy.wait(5000);

      //提示发布成功点击查看任务详情
      cy.contains('查看任务详情').should('be.visible').click();
  
};