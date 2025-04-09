describe('普通折扣主流程', () =>{
    beforeEach(() =>{
        //设置视窗大小
        cy.viewport(1280,1280);
        //通过设置cookie来模拟登录，需要每次手动更新
        cy.setCookie('session',Cypress.env('session'));
        //访问美折首页
        //cy.visit('https://meizhe.meideng.net/home');
        //禁用谷歌分析追踪功能
        cy.window().then((win) =>{
            win.ga = () =>{};
        });
    });

    it('点击跳转创建折扣页面', ()=>{
        cy.visit('https://meizhe.meideng.net/home').wait(2000);
        //关闭目前存在的全局弹窗
        // cy.get('button.mz-modal-adv-close-button').then(($cls_popwin)=>{
        //     if($cls_popwin!== null){
        //         //元素存在时的操作
        //         cy.log('elements exist');
        //         cy.get($cls_popwin).click();
        //     }
        // })
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
          });
        //获取到美折首页上方促销按钮,并保持悬浮
        cy.get('ul>li').eq(0).trigger('mouseover').wait(1000);
        //点击‘折扣/减价’
        cy.contains('折扣/减价').click().wait(1000);
        //验证是否成功跳转
        cy.url().should('contain','huodong/zhekou-create');
    })
    it('成功创建普通折扣活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/zhekou-create').wait(2000);
        cy.get('body').then(($body) => {
            const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
            if (global_popwin_close.length !== 0) {
              cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
            }
          });
        //切换价格标签为‘热卖促销’
        cy.get('input[value="优惠促销"]').click({force:true}).wait(1000);
        cy.contains('热卖促销').click().wait(1000);
        //验证页面关键元素存在
        cy.contains('开始时间').should('be.visible');
        cy.contains('结束时间').should('be.visible');
        cy.contains('结束提醒').should('be.visible');
        //切换至首件优惠--限购2件--再切换回不限购
        cy.get('i.icon-danxuan').eq(0).click().wait(1000);
        cy.get('i.icon-danxuan').eq(1).click().wait(1000);
        //使用selector定位元素
        //cy.get("#main-content > div > div.mzc-column-container.mzc-margin.mzc-margin-small > div > div:nth-child(5) > div.BYLQkoJX.kfmTPc9a._1RoRMXu4.mzc-row-container > div._3vjyxRQZ._1RoRMXu4.mzc-row-container.mzc-margin.mzc-margin-small > div > div > label._1pBIOq_D.DamWxi8E._3GrHH1De.mzc-margin.mzc-margin-large > div > div > input").clear().type('2');
        cy.get('span').filter(':contains("件")').eq(2).prev().as('yhxgfj');
        cy.get('@yhxgfj').clear().wait(500).type('2');
        cy.get('i.icon-danxuan').eq(0).click().wait(500);
        //切换到指定客户，检测价格标签是否改变，再切换回不限，检测价格标签是否改变
        cy.get('i.icon-danxuan').eq(2).click().wait(500);
        cy.get('input[value="粉丝专享"]').should('be.visible');
        cy.get('i.icon-danxuan').eq(2).click().wait(500);
        //修改活动备注，在末尾新添加一个1之后，点击下一步按钮进入第二步
        cy.get('div').contains('活动备注').parent().as('hdbzfj');
        cy.get('@hdbzfj').within(()=>{
            cy.get('input').type('1');
        }).wait(1000);
        cy.get('button').contains('下一步').click().wait(2000);

        // cy.window().then((win) => {
        //     win.localStorage.setItem('myVar', cy.url());
        //   });
        
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
        //批量设置商品折扣为8折,取消后再次点击，设置折扣为9折
        cy.get('span').contains('批量打折').parent().parent().next().as('pldzsrk');
        cy.get('@pldzsrk').click().type('8').wait(1000);
        cy.contains('取消').click().wait(1000);
        cy.get('@pldzsrk').within(()=>{
            cy.get('input').clear().type('9');
        }).wait(1000);
        cy.contains('确定').click().wait(2000);
        cy.contains('下一步').click().wait(2000);
        cy.contains('活动创建成功').should('be.visible');
        cy.contains('查看活动详情').should('be.visible');
        cy.contains('返回活动列表').should('be.visible');
        cy.contains('查看活动详情').click();
        cy.url().should('contain','/huodong/zhekou-detail-v2');
        cy.go('back').wait(1000);
        cy.contains('返回活动列表').click();
        cy.url().should('contain','/huodong/list-v2');
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

        //打开修改信息弹窗
        cy.contains('修改信息').eq(0).click().wait(2000);
        //修改价格标签为其他
        cy.get('#update-settings>div').eq(0).within(()=>{
            cy.get('input').click().wait(500);
        })
        cy.contains('热卖促销').click().wait(1000);
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
    it('添加活动页推广正常打开',()=>{
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
    it('成功添加商品',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-v2').wait(5000);
        // const global_popwin=document.querySelector('button.mz-modal-adv-close-button');
        // if(global_popwin.style.display!=='none'){
        //     cy.log('elements exist');
        //     cy.wrap('button.mz-modal-adv-close-button').click();
        // }
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
        cy.url().should('contain','huodong/zhekou-add-item');
        //断言第一个商品已参加活动，并添加第二个商品
        cy.get('button').contains('选择商品').parent().parent().prev().within(()=>{
            cy.get('span').contains('已参加').should('be.visible');
        });
        cy.get('button').contains('选择商品').eq(0).click().wait(1000);
        cy.contains('仓库中').click().wait(500);
        cy.get('i.icon-xiayiye').eq(0).parent().click().wait(1000);
        cy.get('button').contains('全选本页').eq(0).click().wait(1000);
        cy.contains('取消全选').should('be.visible');
        cy.contains('加入此活动并设置折扣').click().wait(2000);
        cy.get('span').contains('批量减价').parent().parent().next().as('pljjsrk');
        cy.get('@pljjsrk').click().type('100').wait(1000);
        cy.get('@pljjsrk').next().within(()=>{
            cy.get('button').contains('取消').click();
        })
        cy.get('@pljjsrk').within(()=>{
            cy.get('input').clear().type('200');
        }).wait(1000);
        cy.get('@pljjsrk').next().within(()=>{
            cy.get('button').contains('确定').click();
        })
        cy.contains('完成设置并提交').click().wait(500);
        cy.contains('成功加入活动').should('be.visible');
        cy.contains('查看活动详情').should('be.visible');
        cy.contains('返回活动列表').should('be.visible');
        cy.contains('添加更多商品').should('be.visible');
        cy.contains('查看活动详情').click();
        cy.url().should('contain','/huodong/zhekou-detail-v2');
        cy.go('back').wait(1000);
        cy.contains('返回活动列表').click();
        cy.url().should('contain','/huodong/list-v2');
        cy.go('back').wait(1000);
        cy.contains('添加更多商品').click();
        cy.url().should('contain','/huodong/zhekou-add-item');
    })
    it('成功修改折扣',()=>{
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
        cy.contains('修改折扣').eq(0).click();
        cy.url().should('contain','/huodong/zhekou-edit-promo');
        cy.get('span').contains('批量打折').parent().parent().next().as('pldzsrk');
        cy.get('@pldzsrk').click().type('9.5').wait(1000);
        cy.contains('确定').click().wait(1000);
        cy.contains('完成修改并提交').click().wait(2000);
        cy.contains('活动修改成功').should('be.visible');
        cy.contains('查看活动详情').click();
        cy.url().should('contain','/huodong/zhekou-detail-v2');
        cy.go('back').wait(1000);
        cy.contains('返回活动列表').click();
        cy.url().should('contain','/huodong/list-v2');  
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
        cy.intercept('POST', 'https://meizhe.meideng.net/common/zk/item/remove').as('removeitemRequest'); 
        cy.contains('确认删除').click();
        cy.wait('@removeitemRequest').then((interception) => {
          // 验证请求是否成功
          expect(interception.response.statusCode).to.eq(200); 
        });
        cy.url().should('contain','/huodong/zhekou-detail-v2');
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
        cy.url().should('contain','/huodong/zhekou-copy-act');
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
        cy.get('input[type="file"]').should('exist');
        cy.get('input[type="file"]').selectFile('cypress/fixtures/putongzhekou.xls',{force:true});
        cy.url().should('contain','/huodong/zhekou-add-item');
        cy.contains('导入成功').should('be.visible');
        cy.contains('完成设置并提交').click();
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
        cy.intercept('POST', 'https://meizhe.meideng.net/common/get_export_token').as('exportzhekou');
        cy.contains('导出 Excel').click();
        cy.wait(3000);
        cy.wait('@exportzhekou').then((interception) => {
          // 验证请求是否成功
          expect(interception.response.statusCode).to.eq(200); 
          expect(interception.response.body).to.have.property('success',1);

        });
    })
    it('成功跳转创建折上折页面',()=>{
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
        cy.get('div.activity-body').eq(0).within(()=>{
          cy.contains('定时折上折').click();
        })
        cy.url().should('contain','/huodong/zszhekou-create');
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
        cy.intercept('POST', 'https://meizhe.meideng.net/common/zk/stop').as('endActivityRequest'); 
        cy.get('button').contains('不结束').next().click();
        cy.wait('@endActivityRequest').then((interception) => {
          // 验证请求是否成功
          expect(interception.response.statusCode).to.eq(200); 
          expect(interception.response.body).to.have.property('success',1);

        });
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
        cy.url().should('contain','/huodong/zhekou-restart-act');
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
        cy.get('button').contains('不结束').next().click();
    })
    it('成功在已结束活动列表导出Excel',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/list-stopped-v2').wait(2000);
        cy.get('body').then(($body) => {
          const global_popwin_close = $body.find('button.mz-modal-adv-close-button:visible');
          if (global_popwin_close.length !== 0) {
            cy.wrap(global_popwin_close).click(); // 使用 cy.wrap 包装 jQuery 对象
          }
        });
        cy.intercept('POST', 'https://meizhe.meideng.net/common/get_export_token').as('exportzhekou');
        cy.contains('导出 Excel').click();
        cy.wait(3000);
        cy.wait('@exportzhekou').then((interception) => {
          // 验证请求是否成功
          expect(interception.response.statusCode).to.eq(200); 
          expect(interception.response.body).to.have.property('success',1);
        });
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
        cy.intercept('post','https://meizhe.meideng.net/common/zk/hide').as('yongjiushanchu');
        cy.contains('不删除').next().click();
        cy.wait('@yongjiushanchu').then((interception)=>{
          expect(interception.response.statusCode).to.eq(200);
          expect(interception.response.body).to.have.property('success',1);
        });
    })
})
