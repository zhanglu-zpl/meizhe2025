const axios = require('axios');
const { merge } = require('mochawesome-merge');
const { glob } = require('glob');
const generator = require('mochawesome-report-generator');
const fs = require('fs');
const path = require('path');

// ================= 配置常量 =================
const CONFIG = {
  REPORT_DIR: 'C:\\Users\\zhanglu\\meizhe2025\\mochawesome-report',
  REPORT_PATTERN: 'mochawesome.json',
  FEISHU_WEBHOOK: 'https://open.feishu.cn/open-apis/bot/v2/hook/f131644d-a3a1-48d6-a96d-ccd87a72291b'
};


// ================= 核心功能 =================
async function generateReport() {
  try {
    console.log('开始生成测试报告...');
  
    
    // 1. 确保目录存在
    if (!fs.existsSync(CONFIG.REPORT_DIR)) {
      console.log(`报告目录不存在，将创建: ${CONFIG.REPORT_DIR}`);
      fs.mkdirSync(CONFIG.REPORT_DIR, { recursive: true });
    }
    
// 2. 查找所有测试结果文件
const jsonFiles = await glob(path.join(CONFIG.REPORT_DIR, CONFIG.REPORT_PATTERN));
if (jsonFiles.length === 0) {
  console.error('未找到任何测试结果文件，请检查配置路径和模式。');
  throw new Error('未找到测试结果文件');
}

// 3. 合并所有测试结果文件
console.log('正在合并测试结果文件...');
const mergedReport = await merge({
  files: ['mochawesome-report/*.json'],  // 确保使用通配符匹配子目录
  output: 'mochawesome-report/mochawesome.json'
});

// 4. 生成 HTML 报告
console.log('正在生成 HTML 报告...');
await generator.create(mergedReport, {
  reportDir: CONFIG.REPORT_DIR,
  overwrite: true
});

// 提取报告关键信息
const { stats } = mergedReport;
const { tests, passes, failures, duration } = stats;
const passRate = ((passes / tests) * 100).toFixed(2);
        // 5. 准备飞书消息
    const message = {
      msg_type: "post",
      content: {
        post: {
          zh_cn: {
            title: `${failures > 0 ? '❌' : '✅'}美折水印测试报告汇总`,
            content: [
              [{tag: "text",text: `总用例数: ${tests}`}],
              [{tag: "text",text: `通过数: ${passes}`}],
              [{tag: "text",text: `失败数: ${failures}`}],
              [{tag: "text",text: `通过率: ${passRate}%`}],
              [{tag: "text",text: `用时: ${(duration / 1000).toFixed(2)} 秒`}],
              [{tag: "text",text: `测试时间: ${new Date().toLocaleString()}`}],
              [{tag: "text",text: `报告路径: ${path.join(CONFIG.REPORT_DIR, 'mochawesome.html')}`}]
            ]
          }
        }
      }
    };

    // 6. 发送飞书消息
    console.log('正在发送飞书报告...');
    await axios.post(CONFIG.FEISHU_WEBHOOK, message);
    console.log('飞书报告已发送');
    
    return { success: true, message: '测试报告已生成并发送' };
  } catch (error) {
    console.error('生成或发送报告失败:', error);
    console.error('完整错误堆栈:', error);  // 新增错误堆栈打印
    return { 
      error: error.message,
      stack: error.stack // 包含错误堆栈信息
    };
  }
}

// 直接导出函数

module.exports = generateReport;
