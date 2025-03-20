import "cypress-real-events";
import { setupTest } from '../common.js';
import { BaseWatermarkTest } from '../common/baseWatermark.js';
import { create23Watermark } from './create112334.cy.js';

const watermarkTest = new BaseWatermarkTest('2:3');

describe("多尺寸水印功能完整流程测试", () => {
  beforeEach(() => {
    setupTest();
  });

  it("1. 创建水印", () => {
    create23Watermark();
  });

  it("2. 修改活动信息", () => {
    watermarkTest.modifyact();
  });
  
  it("3. 修改水印", () => {
    watermarkTest.modifyWatermark();
  });
  
  it("4. 结束并重开水印", () => {
    watermarkTest.restartWatermark();
  });

  it("5. 添加删除商品", () => {
    watermarkTest.addproducts();
  });


});