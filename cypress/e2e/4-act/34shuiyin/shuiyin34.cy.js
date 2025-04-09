import "cypress-real-events";
import { setupTest } from '../common.js';
import { BaseWatermarkTest } from '../common/baseWatermark.js';
import { create34Watermark } from './create34.cy.js';

const watermarkTest = new BaseWatermarkTest('3:4');

describe("3:4水印功能完整流程测试", () => {
  beforeEach(() => {
    setupTest();
  });

  it.only("1. 创建水印", () => {
    create34Watermark();
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

  it("6. 复制活动", () => {
    watermarkTest.copyactivity();
  });

  it("7. 其他操作（保存模板/永久删除）", () => {
    watermarkTest.otheroperations();
  });

});