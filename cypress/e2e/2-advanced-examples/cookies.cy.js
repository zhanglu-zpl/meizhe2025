/// <reference types="cypress" />

// 测试 Cookie 相关功能
context('Cookies', () => {
  beforeEach(() => {
    // 启用 Cookie 调试模式
    Cypress.Cookies.debug(true)

    // 访问测试页面
    cy.visit('https://example.cypress.io/commands/cookies')

    // 清除所有 cookie，包括第三方 cookie（如 cloudflare）
    cy.clearCookies()
  })

  it('cy.getCookie() - 获取单个浏览器 cookie', () => {
    // 文档链接：https://on.cypress.io/getcookie
    cy.get('#getCookie .set-a-cookie').click()

    // cy.getCookie() 返回一个 cookie 对象
    cy.getCookie('token').should('have.property', 'value', '123ABC')
  })

  it('cy.getCookies() - 获取当前域名下的所有浏览器 cookies', () => {
    // 文档链接：https://on.cypress.io/getcookies
    cy.getCookies().should('be.empty')

    cy.get('#getCookies .set-a-cookie').click()

    // cy.getCookies() 返回一个 cookie 数组
    cy.getCookies().should('have.length', 1).should((cookies) => {
      // 验证 cookie 的各个属性
      expect(cookies[0]).to.have.property('name', 'token')
      expect(cookies[0]).to.have.property('value', '123ABC')
      expect(cookies[0]).to.have.property('httpOnly', false)
      expect(cookies[0]).to.have.property('secure', false)
      expect(cookies[0]).to.have.property('domain')
      expect(cookies[0]).to.have.property('path')
    })
  })

  it('cy.getAllCookies() - 获取所有浏览器 cookies', () => {
    // 文档链接：https://on.cypress.io/getallcookies
    cy.getAllCookies().should('be.empty')

    // 设置两个不同域名的 cookie
    cy.setCookie('key', 'value')
    cy.setCookie('key', 'value', { domain: '.example.com' })

    // cy.getAllCookies() 返回一个包含所有 cookie 的数组
    cy.getAllCookies().should('have.length', 2).should((cookies) => {
      // 验证第一个 cookie 的属性
      expect(cookies[0]).to.have.property('name', 'key')
      expect(cookies[0]).to.have.property('value', 'value')
      expect(cookies[0]).to.have.property('httpOnly', false)
      expect(cookies[0]).to.have.property('secure', false)
      expect(cookies[0]).to.have.property('domain')
      expect(cookies[0]).to.have.property('path')

      // 验证第二个 cookie 的属性
      expect(cookies[1]).to.have.property('name', 'key')
      expect(cookies[1]).to.have.property('value', 'value')
      expect(cookies[1]).to.have.property('httpOnly', false)
      expect(cookies[1]).to.have.property('secure', false)
      expect(cookies[1]).to.have.property('domain', '.example.com')
      expect(cookies[1]).to.have.property('path')
    })
  })

  it('cy.setCookie() - 设置浏览器 cookie', () => {
    // 文档链接：https://on.cypress.io/setcookie
    cy.getCookies().should('be.empty')

    // 设置一个新的 cookie
    cy.setCookie('foo', 'bar')

    // 验证 cookie 是否设置成功
    cy.getCookie('foo').should('have.property', 'value', 'bar')
  })

  it('cy.clearCookie() - 清除单个浏览器 cookie', () => {
    // 文档链接：https://on.cypress.io/clearcookie
    cy.getCookie('token').should('be.null')

    cy.get('#clearCookie .set-a-cookie').click()

    cy.getCookie('token').should('have.property', 'value', '123ABC')

    // 清除指定的 cookie
    cy.clearCookie('token')

    // 验证 cookie 是否已被清除
    cy.getCookie('token').should('be.null')
  })

  it('cy.clearCookies() - 清除当前域名下的所有浏览器 cookies', () => {
    // 文档链接：https://on.cypress.io/clearcookies
    cy.getCookies().should('be.empty')

    cy.get('#clearCookies .set-a-cookie').click()

    cy.getCookies().should('have.length', 1)

    // 清除当前域名下的所有 cookies
    cy.clearCookies()

    // 验证所有 cookies 是否已被清除
    cy.getCookies().should('be.empty')
  })

  it('cy.clearAllCookies() - 清除所有浏览器 cookies', () => {
    // 文档链接：https://on.cypress.io/clearallcookies
    cy.getAllCookies().should('be.empty')

    // 设置两个不同域名的 cookies
    cy.setCookie('key', 'value')
    cy.setCookie('key', 'value', { domain: '.example.com' })

    cy.getAllCookies().should('have.length', 2)

    // 清除所有域名下的 cookies
    cy.clearAllCookies()

    // 验证所有 cookies 是否已被清除
    cy.getAllCookies().should('be.empty')
  })
})
