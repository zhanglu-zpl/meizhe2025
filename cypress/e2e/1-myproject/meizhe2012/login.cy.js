//<reference types='cypress-iframe' />

describe('登录美折', () => {
    beforeEach(() => {
        cy.visit('https://meizhe.meideng.net/user/login?next=/?')
        cy.window().then((win) => {
            win.ga = () => { };
        });
    })

    it('登录成功', () => {
        //检查页面上是否有"立即使用美折"按钮并点击
        cy.contains('立即使用美折').click()
        //输入账号以及密码
        cy.origin('https://oauth.taobao.com',()=>{
            cy.get('账号名/邮箱/手机号').click().type('杭州美登科技')
            cy.get('请输入登录密码').click().type('hzmd11496')
        })


        // cy.origin('https://oauth.taobao.com', () => {
        //     it('处理单层iframe',function(){
        //         cy.get('iframe#J_loginIframe').then($iframe=>{
        //             cy.wrap($iframe.contents().find('#fm-login-id')).then($user=>{
        //                 cy.wrap($user).type('杭州美登科技')
        //             })
        //         })
        //     })
        //cy.get("#fm-login-id").type('杭州美登科技', { delay: 100 })
    })


        // cy.origin('https://oauth.taobao.com', () => {
        //     cy.get('#fm-login-password').type('hzmd11496', { delay: 100 })
        // })
        // cy.origin('https://oauth.taobao.com', () => {
        //     cy.contains('授权并登录').click()
        // })
})
