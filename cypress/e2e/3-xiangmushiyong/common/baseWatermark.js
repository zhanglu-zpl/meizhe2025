export class BaseWatermarkTest {
  constructor(ratio) {
    this.ratio = ratio;
    this.entryPath = ratio === '3:4' ? '/watermark-34' : '/watermark-11';
  }

  createWatermark() {
    // 后续的创建步骤都一样，直接调用原有的方法
    return require('../11shuiyin/create.cy.js').createWatermark();
  }

  modifyact() {
    return require('../11shuiyin/acttime.cy.js').modifyact();
  }

  modifyWatermark() {
    return require('../11shuiyin/modify.cy.js').modifyWatermark();
  }

  restartWatermark() {
    return require('../11shuiyin/restart.cy.js').restartWatermark();
  }

  addproducts() {
    return require('../11shuiyin/product.cy.js').addproducts();
  }

  copyactivity() {
    return require('../11shuiyin/copyact.cy.js').copyactivity();
  }

  otheroperations() {
    return require('../11shuiyin/other.cy.js').otheroperations();
  }
}