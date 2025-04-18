export const modifyact = () => {
    // 确认当前所在页面是水印活动列表页面
    cy.visit("https://meizhe.meideng.net/shuiyin-new/running");
    cy.wait(3000);

    // 点击新功能引导，我知道了
    cy.contains('我知道了').should('be.visible').click();

    // 处理"多尺寸水印上线"弹窗
    cy.get('body').then($body => {
        if ($body.find(':contains("多尺寸水印上线啦")').length) {
            cy.contains('我知道了').click();
        }
    });

    // hover悬停水印时间
    cy.get('div.uaxnSlQq._3WEGmgu3.mzc-row-container.mzc-margin.mzc-margin-small')
        .eq(0)
        .realHover();
    cy.wait(2000);

    // 点击修改水印活动时间icon
    cy.get('i.icon.icon-bianjiline._1gtuj15A.mzc-margin.mzc-margin-xs._2jWb2Uc6.T8kUm6T4')
        .eq(0)
        .click();

    // 点击定时结束
    cy.get('i.icon.icon-danxuan._1gtuj15A.mzc-margin.mzc-margin-xs._2ZmASxRn._3iFaH5yU')
        .should('be.visible')
        .eq(0)
        .click();
    cy.wait(2000);

    // 点击确定
    cy.get('button._10FPpG77._1O3lqufx._2NB3rG9u._1CC5_bmo.mzc-margin.mzc-margin-medium-horz.mzc-margin-small-vert')
        .should('be.visible')
        .eq(1)
        .click();
    cy.wait(2000);

    // 验证修改结果，输出水印活动时间
    cy.get('span._3LGKM2qI._1Zl0OFEp._3OHrno9B._2jWb2Uc6._3DXNfCAE.mzc-margin.mzc-margin-small-horz.mzc-margin-medium-vert')
        .should('be.visible')
        .eq(0)
        .then(($el) => {
            const text = $el.text();
            cy.log('水印活动时间：', text);
        });

    // 悬停水印活动名称
    cy.get('a._3LGKM2qI._19pDre2v._3OHrno9B._3ZumXtNi._3DXNfCAE.mzc-margin.mzc-margin-small-horz.mzc-margin-medium-vert')
        .should('be.visible')
        .eq(0)
        .realHover();
    cy.wait(2000);

    // 点击修改水印活动名称icon
    cy.get('i.icon.icon-bianjiline._1gtuj15A.mzc-margin.mzc-margin-xs._2jWb2Uc6.qJ1Pj6Ty')
        .should('be.visible')
        .eq(0)
        .click();

    // 填入'修改名称'
    cy.get('input.dRXgwD7V.Ns1bnhKQ')
        .eq(0)
        .type('修改名称');

    // 点击确定
    cy.contains('确定')
        .should('be.visible')
        .eq(0)
        .click();
    cy.wait(2000);

    // 验证修改结果，输出水印名称和水印活动时间
    cy.get('span._19pDre2v')
        .should('be.visible')
        .eq(0)
        .then(($el) => {
            const text = $el.text();
            cy.log('水印名称：', text);
        });
};