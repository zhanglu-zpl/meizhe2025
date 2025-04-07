Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('未捕获的异常:', err);
    // 返回 false 可以阻止 Cypress 因为未捕获的异常而失败
    return false;
});

describe('满减/满包邮活动主流程',()=>{
    beforeEach(()=>{
        cy.viewport(1280,1280);
        cy.setCookie('session',Cypress.env('session'));
        cy.window().then((win) =>{
            win.ga = () =>{};
        });
    });
    it('点击跳转创建满减/满包邮活动',()=>{
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
        cy.contains('满减/满就包邮').click();
        cy.url().should('contain','/huodong/mjs-create');
    })
    it('成功创建满减/满包邮活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/mjs-create').wait(2000);
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
        cy.get('button').contains('下一步 选择活动商品').click().wait(1000);
        //在页面上搜索带有“测试”两个字的商品，并选择其中第一个
        cy.get('input[placeholder="关键字、商品ID、商品链接、商家编码"]').click().type('测试');
        cy.contains('搜索商品').click().wait(1000);
        cy.get('button').contains('选择商品').eq(0).click().wait(1000);
        //切换到仓库中tab，选择全选本页商品，验证按钮文案变化
        cy.contains('仓库中').click().wait(1000);
        cy.get('button').contains('全选本页').eq(0).click().wait(1000);
        cy.contains('取消全选').should('be.visible');
        //点击下一步进入设置折扣页面
        cy.contains('下一步').click().wait(2000);
        //输入满500元减40元，勾选上不封顶、包邮以及送测试礼物
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
        //选择活动橙横幅
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
        // 移除 target 属性并点击链接
        cy.get('a').contains('详细说明').parent().invoke('attr','href','https://www.yuque.com/meizhe/iyh31w/ix3i1iml5225vxf1')
        .invoke('removeAttr', 'target').click();
        // 验证新页面内容
        cy.origin('https://www.yuque.com/',()=>{
            cy.contains('旺铺插件投放下线通知').should('be.visible');
        });
        //跳转回原页面
        cy.origin('https://www.yuque.com/',()=>{
            cy.go('back');
        });
        // // 移除 target 属性并点击链接
        // cy.get('a').contains('点击了解详情').parent().invoke('attr','href','https://www.yuque.com/meizhe/iyh31w/ilp0cc?')
        // .invoke('removeAttr', 'target').click();
        // // 验证新页面内容
        // cy.origin('https://www.yuque.com/',()=>{
        //     cy.contains('如何将满减横幅同步到手机详情').should('be.visible');
        // });
        // //跳转回原页面
        // cy.origin('https://www.yuque.com/',()=>{
        //     cy.go('back');
        // });
        cy.contains('添加多级优惠').click();
        cy.contains('优惠 2').should('be.visible');
        cy.contains('添加多级优惠').click();
        cy.contains('优惠 3').should('be.visible');
        cy.get("i.icon-close2").click();
        cy.contains('优惠3').should('not.exist');
        //输入满500元减40元，勾选上不封顶、包邮以及送测试礼物
        cy.contains('条件2').parent().parent().next().children().eq(1).within(()=>{
            cy.get('input').eq(1).clear().type('3');
        });
        cy.contains('内容2').parent().parent().next().children().then(($neirong2)=>{
            cy.get($neirong2).eq(1).within(()=>{
                cy.get('input').eq(1).clear().type('8').wait(500);
            })
        });
        cy.get('@hengfuyulan').within(()=>{
            cy.contains('3').should('be.visible');
            cy.contains('8').should('be.visible');
        })
        cy.get('textarea[placeholder="补充您想让买家了解的其他活动信息"]').click()
        .type('这是测试活动').wait(1000);
        cy.contains('完成并提交').click();
        cy.contains('活动创建成功').should('be.visible');
        cy.contains('查看活动详情').should('be.visible');
        cy.contains('返回活动列表').should('be.visible');
        cy.contains('查看活动详情').click();
        cy.url().should('contain','/huodong/mjs-detail-v2');
        cy.go('back').wait(1000);
        cy.contains('返回活动列表').click();
        cy.url().should('contain','/huodong/list-v2');
    })
    it('添加活动页推广跳转正确',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
          });
        //点击活动页推广的添加按钮
        cy.get('div.activity-body').eq(0).within(()=>{
            cy.get('span').contains('活动页推广').next().click().wait(500);
        })
        //断言弹窗正确打开
        cy.contains('发布活动页').should('be.visible');
    })
    it('添加关联水印跳转正确',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
          });
        //点击关联水印的添加按钮
        cy.get('div.activity-body').eq(0).within(()=>{
            cy.get('span').contains('关联水印').next().click();
        })
        //断言跳转页面的url正确
        cy.url().should('contain','shuiyin-new/create');
    })
    it('添加短信营销跳转正确',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
          });
        //点击短信营销的添加按钮
        cy.get('div.activity-body').eq(0).within(()=>{
            cy.get('span').contains('短信营销').next().click();
        })
        //断言跳转页面的url正确
        cy.url().should('contain','sms/create');
    })
    it('成功修改活动信息',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
        });
        //点击修改信息按钮
        cy.contains('修改信息').eq(0).click().wait(2000);
        //修改huodong标签为其他
        cy.get('#update-settings>div').eq(0).within(()=>{
            cy.contains('自定义').click().wait(500);
        })
        cy.contains('满就送礼').click().wait(500);
        cy.get('#update-settings>div').eq(0).within(()=>{
            cy.get('a').contains('点这里自定义').click();
        })
        cy.get('input[value="新春好礼"]').clear().type('春节好礼');
        //修改开始时间为当前时间晚一天
        cy.get('#update-settings>div').eq(1).within(()=>{
            cy.get('input').click().wait(500);
        })
        cy.get('div').contains('今天').parent().parent().then(($today)=>{
            cy.log($today[0].outerHTML);
            if($today[0].nextElementSibling!== null){
                //元素存在时的操作
                cy.log('elements exist');
                cy.get($today).next().click();
            }else{
                //元素不存在时的操作
                cy.get($today).parent().next().as('nextday');
                cy.get('@nextday').children().eq(0).click().wait(1000);
            }
        })
        cy.get('button').contains('今天').next().click().wait(1000);
        //修改结束时间为比开始时间晚两天
        cy.get('#update-settings>div').eq(2).within(()=>{
            cy.get('input').click().wait(500);
        })
        cy.get('button').contains('今天').click().wait(1000);
        cy.contains('活动结束时间不能早于或等于开始时间').should('be.visible');
        cy.get('div').contains('今天').parent().parent().then(($tomorrow)=>{
            if($tomorrow[0].nextElementSibling.nextElementSibling!== null){
                //元素存在时的操作
                cy.log('elements exist');
                cy.get($tomorrow).next().next().click();
            }else{
                //元素不存在时的操作
                cy.get($tomorrow).parent().next().as('nextday');
                cy.get('@nextday').children().eq(0).click().wait(1000);
            }
        })
        cy.get('button').contains('今天').next().click().wait(1000);
        //点击确定按钮，完成修改
        cy.get('button.mz-btn.btn-success').trigger('click').wait(500);
        cy.contains('修改成功').should('be.visible');
    })
    it('成功添加商品',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
          });
        //打开添加商品页面并断言跳转页面url正确
        cy.contains('添加商品').eq(0).click();
        cy.url().should('contain','huodong/mjs-add-item');
        //断言第一个商品已参加活动，并添加第二个商品
        cy.get('button').contains('选择商品').parent().parent().prev().within(()=>{
            cy.get('span').contains('已参加').should('be.visible');
        });
        cy.get('button').contains('选择商品').eq(0).click().wait(1000);
        cy.contains('仓库中').click().wait(500);
        cy.get('i.icon-xiayiye').eq(0).parent().click().wait(1000);
        cy.get('button').contains('全选本页').eq(0).click().wait(1000);
        cy.contains('取消全选').should('be.visible');
        cy.contains('加入此活动').click();
        cy.contains('成功加入活动').should('be.visible');
        cy.contains('查看活动详情').should('be.visible');
        cy.contains('返回活动列表').should('be.visible');
        cy.contains('添加更多商品').should('be.visible');
        cy.contains('查看活动详情').click();
        cy.url().should('contain','/huodong/mjs-detail-v2');
        cy.go('back').wait(1000);
        cy.contains('返回活动列表').click();
        cy.url().should('contain','/huodong/list-v2');
        cy.go('back').wait(1000);
        cy.contains('添加更多商品').click();
        cy.url().should('contain','/huodong/mjs-add-item');
    })
    it('成功修改优惠',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
        });
        cy.contains('修改优惠').eq(0).click();
        cy.contains('条件1').parent().parent().next().children().eq(2).within(()=>{
            cy.get('input').eq(1).clear().type('600');
            cy.get('input').eq(2).clear().type('10')
        });
        cy.contains('内容1').parent().parent().next().within(()=>{
            cy.contains('上不封顶').should('not.exist');
        });
        cy.contains('内容1').parent().parent().next().children().then(($neirong1)=>{
            cy.get($neirong1).eq(0).within(()=>{
                cy.get('input').eq(1).clear().type('44').wait(500);
            })
        });
        cy.contains('送礼物').next().as('giftsrk');
        cy.get('@giftsrk').within(()=>{
            cy.get('input').click().clear().type('测试礼物修改');
        })
        cy.contains('节日红').click();
        cy.contains('不显示横幅').parent().parent().parent().parent().next().as('hengfuyulan');
        cy.get('@hengfuyulan').within(()=>{
            cy.contains('600').should('be.visible');
            cy.contains('元且满').should('be.visible');
            cy.contains('10').should('be.visible');
            cy.contains('测试礼物修改').should('be.visible');
        })
        cy.contains('完成修改并提交').click();
        cy.get('div.mzc-column-container').contains('该功能为尊享版可用，您当前为旗舰版，请切换活动类型')
        .should('be.visible')
        cy.get('div.mzc-column-container').contains('该功能为尊享版可用，您当前为旗舰版，请切换活动类型')
        .parent().parent().as('sjtc')
        cy.get('@sjtc').within(()=>{
            cy.contains('选择尊享版').click();
        })
        cy.contains('已成功切换').should('be.visible');
        cy.contains('完成修改并提交').click().wait(5000);
        function handleDialogs($body) {
            const xiugaizhong1 = $body.find('[id^="dialog"][id$="-msg"]');
            if (xiugaizhong1.length > 0) {
                cy.get('a').contains('好的').click().wait(500);
                cy.contains('完成修改并提交').click().wait(5000);
                // 递归调用处理下一个对话框
                cy.get('body').then(($newBody) => {
                    handleDialogs($newBody);
                })
            }
            else{
                cy.get('p').contains('活动还在创建或修改中，请稍后再进行操作').should('not.exist')
                .then(()=>{
                    cy.contains('活动修改成功').should('be.visible');
                    cy.contains('查看活动详情').should('be.visible');
                    cy.contains('返回活动列表').should('be.visible');
                    cy.contains('查看活动详情').click().wait(1000);
                    cy.url().should('contain','/huodong/mjsv1-detail-v2');
                    cy.go('back').wait(1000);
                    cy.contains('返回活动列表').click();
                    cy.url().should('contain','/huodong/list-v2');
                })
            }
        }
        cy.get('body').then(($body) => {
            handleDialogs($body);
        });
    })
    it('成功删除商品',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
          });
        cy.contains('删除商品').eq(0).click();
        cy.contains('确认删除').click();
        cy.contains('至少选择一个商品').should('be.visible');
        cy.get('div').contains('至少选择一个商品').next().within(()=>{
            cy.get('button').click();
        })
        cy.contains('选择商品').eq(0).click().wait(1000);
        cy.contains('已选择').should('be.visible');
        cy.get('i.icon-xiayiye').eq(0).parent().click();
        cy.contains('全选本页').click().wait(500);
        cy.contains('已选择').should('be.visible');
        cy.intercept('POST', 'https://meizhe.meideng.net/common/mj_v2/item/remove').as('removeitemRequest'); 
        cy.contains('确认删除').click().wait(10000);
        function handleDialogs($body) {
            const xiugaizhong1 = $body.find('[id^="dialog"][id$="-msg"]');
            if (xiugaizhong1.length > 0) {
                cy.get('a').contains('好的').click().wait(500);
                cy.contains('确认删除').click().wait(5000);
                // 递归调用处理下一个对话框
                cy.get('body').then(($newBody) => {
                    handleDialogs($newBody);
                })
            }
            else{
                cy.get('p').contains('活动还在创建或修改中，请稍后再进行操作').should('not.exist')
                .then(()=>{
                    cy.wait('@removeitemRequest').then((interception) => {
                        // 验证请求是否成功
                        expect(interception.response.statusCode).to.eq(200); 
                    });
                    cy.url().should('contain','/huodong/mjsv1-detail-v2');
                })
            }
        }
        cy.get('body').then(($body) => {
            handleDialogs($body);
        });
    })
    it('成功复制活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
          });
        cy.contains('更多').eq(0).trigger('mouseover');
        cy.contains('复制活动').click();
        cy.url().should('contain','/huodong/mjsv1-copy-act');
    })
    it('成功暂停活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
        });
        //点击暂停活动按钮后，等待2秒
        cy.contains('更多').eq(0).trigger('mouseover');
        cy.contains('暂停活动').click();
        cy.get('div.activity-body').eq(0).within(()=>{
            cy.get('a').contains('修改信息').should('not.exist');
            cy.get('a').contains('修改优惠').should('not.exist');
            cy.get('a').contains('添加商品').should('not.exist');
            cy.get('a').contains('暂停活动').should('not.exist');
            cy.get('a').contains('重启活动').should('be.visible');
            cy.contains('关联水印').should('not.exist');
            cy.contains('更多').should('not.exist');
          });
        cy.get('span.activity-status').eq(0).within(()=>{
            cy.contains('已暂停').should('be.visible');
          });
    })
    it('成功重启活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
        });  
        //点击重启活动按钮后，等待2秒
        cy.contains('重启活动').eq(0).click().wait(2000);
        cy.get('div.activity-body').eq(0).within(()=>{
            cy.get('a').contains('修改信息').should('be.visible');
            cy.get('a').contains('修改优惠').should('be.visible');
            cy.get('a').contains('删除商品').should('be.visible');
            cy.get('a').contains('添加商品').should('be.visible');
            cy.get('a').contains('重启活动').should('not.exist');
            cy.contains('关联水印').should('be.visible');
            cy.contains('更多').should('be.visible');
        });
        cy.get('span.activity-status').eq(0).within(()=>{
            cy.contains('未开始').should('be.visible');
        });
    })
    it('成功跳转自定义导出页面',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
          });
        cy.contains('更多').eq(0).trigger('mouseover');
        cy.contains('自定义导出').click();
        cy.url().should('contain','/excel_export/commodity_information');
        cy.contains('春节好礼 - 满减').should('be.visible');
    })
    it('成功导入文件选择商品',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
          const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
          const global_tip1_close = $body.find('button.ant-tour-close:visible');
          if (global_popwin_close.length !== 0) {
            cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
          }
          if (global_tip1_close.length !== 0){
            cy.wrap(global_tip1_close).click();
          }
        });
        cy.contains('更多').eq(0).trigger('mouseover');
        cy.contains('导入 Excel').click();
        cy.contains('导入 Excel 文件').click();
        cy.contains('满减-尊享版').should('be.visible');
        cy.get('input[type="file"]').should('exist');
        cy.intercept('POST', 'https://meizhe.meideng.net/common/import/excel?act_type=mjsv1&is_multi_custom=false')
        .as('importmanjian');
        cy.get('input[type="file"]').selectFile('cypress/fixtures/manjianbaoyou.xls',{force:true});
        cy.url().should('contain','/huodong/mjsv1-add-item');
        cy.wait('@importmanjian').then((interception) => {
            // 验证请求是否成功
            expect(interception.response.statusCode).to.eq(200); 
            expect(interception.response.body).to.have.property('success',1);
            expect(interception.response.body.pairs.length).to.equal(6);
          });
        cy.contains('加入此活动').click();
        cy.contains('成功加入活动').should('be.visible');
    })
    it('成功导出活动表格',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
          const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
          const global_tip1_close = $body.find('button.ant-tour-close:visible');
          if (global_popwin_close.length !== 0) {
            cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
          }
          if (global_tip1_close.length !== 0){
            cy.wrap(global_tip1_close).click();
          }
        });
        cy.contains('更多').eq(0).trigger('mouseover');
        cy.intercept('POST', 'https://meizhe.meideng.net/common/get_export_token').as('exportmanjian');
        cy.contains('导出 Excel').click();
        cy.wait(3000);
        cy.wait('@exportmanjian').then((interception) => {
          // 验证请求是否成功
          expect(interception.response.statusCode).to.eq(200); 
          expect(interception.response.body).to.have.property('success',1);

        });
    })
    it('成功结束活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            const global_tip1_close = $body.find('button.ant-tour-close:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
            if (global_tip1_close.length !== 0){
              cy.wrap(global_tip1_close).click();
            }
        });
        cy.get('i.icon-shanchu').eq(0).parent().within(()=>{
          cy.get('i.icon-shanchu').click();
        });
        cy.get('button').contains('不结束').click();
        cy.get('i.icon-shanchu').eq(0).parent().within(()=>{
          cy.get('i.icon-shanchu').click();
        });
        //获取结束活动的接口请求
        cy.intercept('POST', 'https://meizhe.meideng.net/common/mj_v2/stop').as('endActivityRequest'); 
        cy.get('button').contains('不结束').next().click();
        cy.wait('@endActivityRequest').then((interception) => {
          // 验证请求是否成功
          expect(interception.response.statusCode).to.eq(200); 
          expect(interception.response.body).to.have.property('success',1);

        });
        //结束活动需要一段时间，给出20s的等待时间
        cy.wait(34000);
    })
    it('成功重开活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-stopped-v2').wait(5000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
        });
        cy.get('i.icon-chongkai').eq(0).click();
        cy.contains('点此完整重开').click();
        cy.url().should('contain','/huodong/mjsv1-restart-act');
        cy.go('back');
        cy.get('i.icon-chongkai').eq(0).click();
        cy.contains('确认重开').click();
        cy.contains('重开完成').should('be.visible');
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        cy.get('body').then(($body) => {
          const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
          const global_tip1_close = $body.find('button.ant-tour-close:visible');
          if (global_popwin_close.length !== 0) {
            cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
          }
          if (global_tip1_close.length !== 0){
            cy.wrap(global_tip1_close).click();
          }
        });
        cy.get('i.icon-shanchu').eq(0).parent().within(()=>{
          cy.get('i.icon-shanchu').click();
        });
        cy.get('button').contains('不结束').next().click().wait(10000);
        function handleDialogs($body) {
            const xiugaizhong2 = $body.find('[id^="dialog"][id$="-msg"]');
            if (xiugaizhong2.length > 0) {
                cy.get('a').contains('好的').click().wait(500);
                cy.get('i.icon-shanchu').eq(0).parent().within(()=>{
                    cy.get('i.icon-shanchu').click();
                  });
                cy.get('button').contains('不结束').next().click().wait(5000);
                // 递归调用处理下一个对话框
                cy.get('body').then(($newBody) => {
                    handleDialogs($newBody);
                })
            }
        }
        cy.get('body').then(($body) => {
            handleDialogs($body);
        });
        cy.wait(60000);
    })
    it('成功在已结束活动列表导出Excel',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-stopped-v2').wait(2000);
        cy.get('body').then(($body) => {
          const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
          if (global_popwin_close.length !== 0) {
            cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
          }
        });
        cy.intercept('POST', 'https://meizhe.meideng.net/common/get_export_token').as('exportmanjian');
        cy.contains('导出 Excel').eq(0).click();
        cy.wait(3000);
        cy.wait('@exportmanjian').then((interception) => {
          // 验证请求是否成功
          expect(interception.response.statusCode).to.eq(200); 
          expect(interception.response.body).to.have.property('success',1);
        });
    })
    it('成功跳转清理活动横幅页',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-stopped-v2').wait(2000);
        cy.get('body').then(($body) => {
          const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
          if (global_popwin_close.length !== 0) {
            cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
          }
        });
        cy.contains(' 清理横幅').eq(0).click();
        cy.url().should('contain',"/toolbox/clean-poster");
    })
    it('成功彻底删除折扣活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-stopped-v2').wait(2000);
        cy.get('body').then(($body) => {
          const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
          if (global_popwin_close.length !== 0) {
            cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
          }
        });
        cy.get('i.icon-yongjiushanchu').eq(0).click();
        cy.contains('不删除').click();
        cy.get('i.icon-yongjiushanchu').eq(0).click();
        cy.intercept('post','https://meizhe.meideng.net/common/mj_v2/hide').as('yongjiushanchu');
        cy.contains('不删除').next().click();
        cy.wait('@yongjiushanchu').then((interception)=>{
          expect(interception.response.statusCode).to.eq(200);
          expect(interception.response.body).to.have.property('success',1);
        });
    })
})