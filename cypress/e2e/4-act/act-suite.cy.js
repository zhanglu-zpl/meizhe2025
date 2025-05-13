import { setupTest } from './common.js';
import { BaseWatermarkTest } from './common/baseWatermark.js';

describe('水印功能测试套件', () => {
  beforeEach(() => {
    setupTest();
  });

  it('运行1:1水印测试', () => {
    const watermarkTest = new BaseWatermarkTest('1:1');
    watermarkTest.createWatermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
    watermarkTest.copyactivity();
    watermarkTest.otheroperations();
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

  after(() => {
    // 所有测试完成后生成报告
    cy.exec('node generate-report.js', { failOnNonZeroExit: false });
  });
});