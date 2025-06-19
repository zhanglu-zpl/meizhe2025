
import { setupTest } from './common.js';
import { BaseWatermarkTest } from './common/baseWatermark.js';
import 'cypress-real-events/support';


describe('水印功能测试套件', () => {
  beforeEach(() => {
    setupTest();
  });

  it('运行1:1水印测试', () => {
    cy.log('测试开始');
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
    watermarkTest.create34Watermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
    watermarkTest.copyactivity();
    watermarkTest.otheroperations();
  });

  it('运行2:3水印测试', () => {
    const watermarkTest = new BaseWatermarkTest('2:3');
    watermarkTest.create23Watermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
    watermarkTest.copyactivity();
    watermarkTest.otheroperations();
  });

  it('运行多尺寸水印测试', () => {
    const watermarkTest = new BaseWatermarkTest('1:1,2:3,3:4');
    watermarkTest.create112334Watermark();
    watermarkTest.modifyact();
    watermarkTest.modifyWatermark();
    watermarkTest.restartWatermark();
    watermarkTest.addproducts();
  });

  Cypress.on('fail', (error) => {
    if (error.message.includes('after all hook')) {
      cy.task('sendFeishuMessage', {
        webhook: 'your_webhook',
        message: `⚠️ 测试后处理出错！原始错误: ${error.message}`
      });
      return false; // 阻止Cypress停止并标记测试失败
    }
    throw error; // 其他错误正常抛出
  });

  // 测试套件结束后生成报告并发送到飞书
  after(() => {
    cy.task('generateReport').then((result) => {
      if (result.success) {
        cy.log('测试报告生成成功');
      }
    })
     
  });
});

