const marge = require('mochawesome-report-generator');
const { merge } = require('mochawesome-merge');
const { sendFeishuMessage } = require('./utils/feishu');

const FEISHU_WEBHOOK = "https://open.feishu.cn/open-apis/bot/v2/hook/f131644d-a3a1-48d6-a96d-ccd87a72291b";

async function generateReport() {
    const jsonReport = await merge({
        files: ['cypress/reports/mochawesome/*.json']
    });
    
    const report = await marge.create(jsonReport, {
        reportDir: 'cypress/reports/html',
        charts: true,
        overwrite: true
    });

    // 构建测试结果消息
    const totalTests = jsonReport.stats.tests;
    const passedTests = jsonReport.stats.passes;
    const failedTests = jsonReport.stats.failures;
    
    const currentTime = new Date().toLocaleString('zh-CN', { 
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const message = `
测试报告:
测试时间: ${currentTime}
总用例数: ${totalTests}
通过数: ${passedTests}
失败数: ${failedTests}
通过率: ${((passedTests/totalTests) * 100).toFixed(2)}%
    `;

    // 发送到飞书
    await sendFeishuMessage(FEISHU_WEBHOOK, message);
}

generateReport();