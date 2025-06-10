import { setupTest } from './common.js';
import { BaseWatermarkTest } from './common/baseWatermark.js';

describe('水印功能测试套件', () => {
  beforeEach(() => {
    setupTest();
  });

  it.only('运行1:1水印测试', () => {
    cy.log('测试开始');
    const watermarkTest = new BaseWatermarkTest('1:1');
    watermarkTest.createWatermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
    watermarkTest.copyactivity();
    watermarkTest.otheroperations();
    cy.log('测试结束');
  });

  it('运行3:4水印测试', () => {
    const watermarkTest = new BaseWatermarkTest('3:4');
    watermarkTest.createWatermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
    watermarkTest.copyactivity();
    watermarkTest.otheroperations();
  });

  it('运行2:3水印测试', () => {
    const watermarkTest = new BaseWatermarkTest('2:3');
    watermarkTest.createWatermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
    watermarkTest.copyactivity();
    watermarkTest.otheroperations();
  });

  it('运行多尺寸水印测试', () => {
    const watermarkTest = new BaseWatermarkTest('1:1,2:3,3:4');
    watermarkTest.createWatermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
    watermarkTest.copyactivity();
    watermarkTest.otheroperations();
  });
  
}); 