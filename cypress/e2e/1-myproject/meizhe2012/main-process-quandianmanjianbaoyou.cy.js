describe('全店满减/包邮主流程',()=>{
    beforeEach(()=>{
        cy.viewport(1280,1280);
        cy.setCookie('session',Cypress.env('session'));
        cy.window().then((win) =>{
            win.ga = () =>{};
        });
    })
    it('点击跳转创建全店满减/包邮',()=>{
        //跳转美折首页
        cy.visit('https://meizhe.meideng.net/home').wait(2000);
        //如果有全局弹窗，则关闭全局弹窗
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
          });
        //hover顶部导航栏，点击全店折扣/减价，验证跳转页面的url是否正确
        cy.get('ul>li').eq(0).trigger('mouseover').wait(1000);
        cy.contains('全店满减/包邮').click();
        cy.url().should('contain','/huodong/fmjs-create');
    })
    it.only('成功创建全店满减/包邮',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/fmjs-create').wait(2000);
        //如果有全局弹窗，则关闭全局弹窗
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            if (global_popwin_close.length !== 0) {
                cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            });
        //切换活动标签名为“优惠促销”，再点击自定义设置为“新春好礼”
        cy.get('div').contains('满减促销').click();
        cy.contains('优惠促销').click();
        cy.get('button').contains('点这里自定义').click();
        cy.get('input[value="满减促销"]').clear().type('新春好礼');
        //活动备注末尾添加一个1
        cy.get('div').contains('活动备注').parent().within(()=>{
            cy.get('input').type('1');
        });
        cy.get('button').contains('下一步 设置活动详情').click().wait(1000);
        // 移除 target 属性并点击链接
        cy.get('a').contains('查看帮助').parent().invoke('attr','href','https://www.yuque.com/docs/share/a8054386-5cc6-4200-bd25-72ccda891afe')
        .invoke('removeAttr', 'target').click();
        // 验证新页面内容
        cy.origin('https://www.yuque.com/',()=>{
            cy.contains('满减活动上不封顶什么意思').should('be.visible');
        });
        //跳转回原页面
        cy.origin('https://www.yuque.com/',()=>{
            cy.go('back');
        });
        cy.contains('条件1').parent().parent().next().children().eq(0).within(()=>{
            cy.get('input').eq(1).clear().type('500');
        });
        cy.contains('内容1').parent().parent().next().children().then(($neirong1)=>{
            cy.get($neirong1).eq(0).within(()=>{
                cy.get('input').eq(1).clear().type('40').wait(500);
            })
            cy.get('i.icon-duoxuan').eq(0).click().wait(500);
            cy.get('i.icon-duoxuan').eq(1).click().wait(500);
            cy.get('i.icon-duoxuan').eq(1).click().wait(500);
            cy.get('a').contains('设置包邮地区').click();
            cy.get('p').contains('设置包邮地区').should('exist');
            cy.get('p').contains('设置包邮地区').parent().next().next().within(()=>{
                cy.contains('确定').click();
            });
            cy.contains('送礼物').next().as('giftsrk');
            cy.get('@giftsrk').within(()=>{
                cy.get('input').click().clear().type('测试礼物');
            })
        });
        cy.contains('活动橙').click();
        cy.contains('不显示横幅').parent().parent().parent().parent().next().as('hengfuyulan');
        cy.get('@hengfuyulan').within(()=>{
            cy.contains('500').should('be.visible');
            cy.contains('40').should('be.visible');
            cy.contains('包邮').should('be.visible');
            cy.contains('上不封顶').should('be.visible');
            cy.contains('测试礼物').should('be.visible');
        })
        cy.contains('添加横幅到手机详情页').click();
        cy.contains('添加多级优惠').click();
        cy.contains('优惠 2').should('be.visible');
        cy.contains('添加多级优惠').click();
        cy.contains('优惠 3').should('be.visible');
        cy.get('textarea[placeholder="补充您想让买家了解的其他活动信息"]').click()
        .type('这是测试活动').wait(1000);
        cy.contains('完成并提交').click();
        cy.contains('活动创建成功').should('be.visible');
        cy.contains('查看活动详情').should('be.visible');
        cy.contains('返回活动列表').should('be.visible');
        cy.contains('查看活动详情').click();
        cy.url().should('contain','/huodong/fmjs-detail-v2');
        cy.go('back').wait(1000);
        cy.contains('返回活动列表').click();
        cy.url().should('contain','/huodong/list-v2');
    })    
})