import { setupTest } from './common.js';
import { BaseWatermarkTest } from './common/baseWatermark.js';
const path = require('path');

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

// 测试套件结束后生成报告并发送到飞书
after(() => {
  // 生成测试报告
  const reportPath = path.join(__dirname, '../../mochawesome-report/mochawesome.html');
  
  // 发送飞书通知
  const { sendFeishuMessage } = require('../../../utils/feishu');
  const webhook = 'YOUR_FEISHU_WEBHOOK_URL';
  const message = '水印功能测试已完成，请查看测试报告';
  
  sendFeishuMessage(webhook, message)
    .then(() => console.log('飞书通知发送成功'))
    .catch(err => console.error('飞书通知发送失败:', err));
});
  
});
