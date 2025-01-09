describe('短授权登陆', function() {
    it('进入短授权登陆页面', function() {
        cy.visit('https://meizhe.meideng.net/user/r_hra')
    })
})

it('填写短授权登陆信息', function() {
    cy.get('账号名/邮箱/手机号').click().type('寒茜璐')
    cy.get('请输入登陆密码').click().type('23127zhanglu222')

}
)