/// <reference types="cypress" />

// 欢迎使用 Cypress！
//
// 这个测试文件包含了一系列待办事项应用的示例测试
// 这些测试用例旨在展示 Cypress 强大的测试功能
//
// 要了解更多关于 Cypress 的工作原理
// 以及它为什么是一个出色的测试工具，
// 请阅读我们的入门指南：
// https://on.cypress.io/introduction-to-cypress

describe('示例待办事项应用', () => {
  beforeEach(() => {
    // Cypress 每次测试都会从空白状态开始
    // 所以我们需要使用 `cy.visit()` 命令来访问我们的网站
    // 由于我们希望在每个测试开始时访问相同的 URL
    // 我们将其放在 beforeEach 函数中，这样它会在每个测试之前运行
    cy.visit('https://example.cypress.io')
  })

  it('默认显示两个待办事项', () => {
    // 我们使用 `cy.get()` 命令获取所有匹配选择器的元素
    // 然后使用 `should` 断言有两个匹配项
    // 这两个就是默认的待办事项
    cy.get('.todo-list li').should('have.length', 2)

    // 我们可以更进一步，检查默认的待办事项是否包含正确的文本
    // 我们使用 `first` 和 `last` 函数分别获取第一个和最后一个匹配的元素
    // 然后使用 `should` 进行断言
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })

  it('可以添加新的待办事项', () => {
    // 我们将待办事项文本存储在变量中以便重复使用
    const newItem = 'Feed the cat'

    // 获取输入框元素并使用 `type` 命令输入新的待办事项
    // 输入内容后，我们还需要输入回车键来提交
    // 这个输入框有一个 data-test 属性，所以我们将使用它来选择元素
    // 这符合最佳实践：https://on.cypress.io/selecting-elements
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // 现在我们已经输入了新项目，让我们检查它是否真的被添加到列表中
    // 作为最新项目，它应该存在于列表的最后一个位置
    // 加上两个默认项目，我们应该总共有3个元素
    // 由于断言会返回被断言的元素，我们可以将这两个断言链接在一起
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })

  it('可以将待办事项标记为已完成', () => {
    // 除了使用 `get` 命令通过选择器获取元素外
    // 我们还可以使用 `contains` 命令通过内容获取元素
    // 但这会得到包含文本的最低层级元素，即 <label>
    // 为了选中复选框，我们需要找到这个 <label> 的 <input> 元素
    // 通过向上遍历 DOM 树到父元素，然后找到子复选框 <input> 元素
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check()

    // 现在我们已经选中了复选框，可以验证
    // 列表项是否被标记为已完成
    // 我们再次使用 `contains` 找到 <label> 元素
    // 然后使用 `parents` 命令向上遍历多个层级直到找到对应的 <li> 元素
    // 然后断言它是否有 completed 类
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed')
  })

  context('已有一个已完成的任务时', () => {
    beforeEach(() => {
      // 我们将使用上面用过的命令来选中一个元素
      // 因为我们要进行多个以选中一个元素开始的测试
      // 所以我们把它放在 beforeEach 钩子中
      // 这样它会在每个测试开始时运行
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('可以筛选未完成的任务', () => {
      // 我们点击"活动"按钮来
      // 只显示未完成的项目
      cy.contains('Active').click()

      // 筛选后，我们可以断言列表中只有一个
      // 未完成的项目
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog')

      // 为了更严谨，我们还要断言已完成的任务
      // 在页面上不存在
      cy.contains('Pay electric bill').should('not.exist')
    })

    it('可以筛选已完成的任务', () => {
      // 我们可以执行与上面测试类似的步骤
      // 来确保只显示已完成的任务
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog').should('not.exist')
    })

    it('可以删除所有已完成的任务', () => {
      // 首先，点击"清除已完成"按钮
      // `contains` 在这里实际上有两个作用
      // 首先，它确保按钮存在于 DOM 中
      // 这个按钮只在至少有一个任务被选中时才出现
      // 所以这个命令隐含地验证了按钮确实存在
      // 其次，它选中按钮以便我们点击
      cy.contains('Clear completed').click()

      // 然后我们可以确保列表中只剩下一个元素
      // 且我们的元素不存在
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      // 最后，确保清除按钮不再存在
      cy.contains('Clear completed').should('not.exist')
    })
  })
})
