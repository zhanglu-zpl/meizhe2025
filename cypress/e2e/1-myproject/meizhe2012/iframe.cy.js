
describe('登录美折', () => {
    beforeEach(() => {
        cy.visit('https://meizhe.meideng.net/user/login?next=/?')
        cy.window().then((win) => {
            win.ga = () => { };
        });
        cy.contains('立即使用美折').click()
    })
    it('处理单层iframe',function(){
        cy.origin('https://oauth.taobao.com/authorize',()=>{

            // const dom = document.querySelector("#fm-login-id")
            // console.log(dom);
            
            cy.get('iframe#J_loginIframe').then($iframe=>{
                cy.wrap($iframe.contents().find('#fm-login-id')).then($user=>{
                    cy.wrap($user).type('杭州美登科技')
                })
            })
        })
        

    })
})