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
  cy.log('[调试] 进入全局 after 钩子');

  const reportPath = 'mochawesome-report/mochawesome.json';

  // 使用自定义任务等待报告文件生成，设置更长的超时时间
  cy.task('waitForFile', { path: reportPath, timeout: 30000 }).then(
    waitResult => {
      if (waitResult instanceof Error)  { // 主动检查错误返回
        cy.log(`[错误] 等待报告文件失败: ${waitResult.message}`);
        return;
      }

      cy.log(`[调试] 报告文件 ${reportPath} 已生成。`);
      // 使用自定义任务安全读取报告数据
      cy.task('getMochawesomeReport', reportPath).then(
          report => {
            // 2. 在浏览器环境中构造消息
            if (!report || !report.stats) {
              return;
            }
            const duration = report.stats.duration;
            const passes = report.stats.passes;
            const failures = report.stats.failures;
            const tests = report.stats.tests;
            
            const feishuMessageContent = `✅ 水印功能测试已完成
总耗时: ${duration}ms
通过: ${passes}
失败: ${failures}
总测试数: ${tests}
报告路径: ${reportPath}`;

            cy.task('sendFeishuMessage', {
              webhook: 'https://open.feishu.cn/open-apis/bot/v2/hook/f131644d-a3a1-48d6-a96d-ccd87a72291b',
              message: feishuMessageContent
            }).then(result => {
              cy.log(result.success ? '通知发送成功' : '通知发送失败');
            });
          },
          error => {
            cy.log(`[错误] 读取报告失败: ${error.message}`);
          }
        );
    },
    error => {
      cy.log(`[错误] 等待报告文件失败: ${error.message}`);
    }
  )
})
})

