export class BaseWatermarkTest {

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

  create34Watermark() {
    return require('../34shuiyin/create34.cy.js').create34Watermark();
  }

  create23Watermark() {
    return require('../23shuiyin/create23.cy.js').create23Watermark();
  }

  create112334Watermark() {
    return require('../112334shuiyin/create112334.cy.js').create112334Watermark();
  }

  


}