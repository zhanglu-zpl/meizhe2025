describe('全店折扣/减价主流程',()=>{
    beforeEach(()=>{
        cy.viewport(1280,1280);
        cy.setCookie('session',Cypress.env('session'));
        cy.window().then((win) =>{
            win.ga = () =>{};
        });
    })
    it('点击跳转创建全店折扣/减价',()=>{
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
        cy.contains('全店折扣/减价').click();
        cy.url().should('contain','/huodong/fzhekou-create');
    })
    it('成功创建全店折扣/减价活动',()=>{
        cy.visit('https://meizhe.meideng.net/huodong/fzhekou-create').wait(2000);
        //如果有全局弹窗，则关闭全局弹窗
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
        cy.contains('全店优惠').should('be.visible');
        cy.contains('结束提醒').should('be.visible');
        //切换至减价模式，输入10，再切换回来，输入9
        cy.get('i.icon-danxuan').eq(0).click().wait(1000);
        cy.get('span').contains('减').parent().next().within(()=>{
          cy.get('input').click().clear().type('10').wait(1000);
        });
        cy.contains('全店宝贝同时减价 10 元（包括多SKU宝贝的所有SKU） 减价后小于0.01元或低于最低折扣的将不生效优惠').should('be.visible');
        cy.get('i.icon-danxuan').eq(0).click().wait(1000);
        cy.get('span').contains('打').parent().next().within(()=>{
          cy.get('input').click().clear().type('9');
        });
        cy.contains('全店宝贝同时打 9 折').should('be.visible');
        //切换至首件优惠--限购2件--再切换回不限购
        cy.get('i.icon-danxuan').eq(1).click().wait(1000);
        cy.get('i.icon-danxuan').eq(2).click().wait(1000);
        cy.get('span').filter(":contains('限购')").eq(2).next().within(()=>{
          cy.get('input').click().clear().type('2');
        });
        cy.get('i.icon-danxuan').eq(1).click().wait(1000);
        //活动备注末尾添加一个1
        cy.get('div').contains('活动备注').parent().within(()=>{
          cy.get('input').type('1');
        })
        //创建全店折扣活动，并且断言创建成功以及第四步页面按钮跳转正确
        cy.contains('直接创建全店折扣/减价活动').click().wait(2000);
        cy.contains('活动创建完成').should('be.visible');
        cy.contains('查看活动详情').should('be.visible');
        cy.contains('返回活动列表').should('be.visible');
        cy.contains('查看活动详情').click();
        cy.url().should('contain','/huodong/fzhekou-detail-v2');
        cy.go('back').wait(1000);
        cy.contains('返回活动列表').click();
        cy.url().should('contain','/huodong/list-v2');
    })
    it('添加主图水印跳转正确',()=>{
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
        //点击主图水印右侧添加按钮
        cy.get('div.activity-body').eq(0).within(()=>{
          cy.get('span').contains('主图水印').next().click();
        });
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
        //点击短信营销右侧添加按钮
        cy.get('div.activity-body').eq(0).within(()=>{
          cy.get('span').contains('短信营销').next().click();
        })
        //断言跳转页面的url正确
        cy.url().should('contain','sms/create');
    })
    it('成功修改活动信息以及优惠形式',()=>{
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
        //修改价格标签为其他
        cy.get('#update-settings>div').eq(0).within(()=>{
            cy.get('input').click().wait(500);
        })
        cy.contains('优惠促销').click().wait(1000);
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
        cy.get('#update-settings>div').eq(3).within(()=>{
            cy.get('span').contains('减').as('jjsrk');
            cy.get('@jjsrk').next().click().clear().type('10');
        });
        //点击确定按钮，完成修改
        cy.get('button.mz-btn.btn-success').trigger('click').wait(500);
        cy.contains('修改成功').should('be.visible');
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
      cy.contains('暂停活动').eq(0).click().wait(2000);
      cy.get('div.activity-body').eq(0).within(()=>{
          cy.get('a').contains('修改信息').should('not.exist');
          cy.get('a').contains('暂停活动').should('not.exist');
          cy.get('a').contains('重启活动').should('be.visible');
          cy.contains('主图水印').should('not.exist');
        });
      cy.get('span.activity-status').eq(0).within(()=>{
          cy.contains('已暂停').should('be.visible');
        });
    })
    it.only('成功重启活动',()=>{
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
          cy.get('a').contains('暂停活动').should('be.visible');
          cy.get('a').contains('重启活动').should('not.exist');
          cy.contains('主图水印').should('be.visible');
      });
      cy.get('span.activity-status').eq(0).within(()=>{
          cy.contains('进行中').should('be.visible');
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
      cy.intercept('POST', 'https://meizhe.meideng.net/common/fzk/stop').as('endActivityRequest'); 
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
      cy.url().should('contain','/huodong/fzhekou-restart-act');
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
      cy.intercept('post','https://meizhe.meideng.net/common/fzk/hide').as('yongjiushanchu');
      cy.contains('不删除').next().click();
      cy.wait('@yongjiushanchu').then((interception)=>{
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('success',1);
      });
  })
})