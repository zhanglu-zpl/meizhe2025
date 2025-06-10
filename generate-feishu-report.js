
const axios = require('axios');

// 发送飞书消息
function sendFeishuMessage() {
  const { passes, failures, tests } = report.stats;
  
  const message = {
    msg_type: "post",
    content: {
      post: {
        zh_cn: {
          title: "测试报告汇总",
          content: [
            [{ tag: "text", text: `总用例数: ${tests}` }],
            [{ tag: "text", text: `通过数: ${passes}` }],
            [{ tag: "text", text: `失败数: ${failures}` }]
          ]
        }
      }
    }
  };
  
  axios.post('https://open.feishu.cn/open-apis/bot/v2/hook/f131644d-a3a1-48d6-a96d-ccd87a72291b', message);
}

try {
  // 合并报告
  const jsonReport = require('mochawesome-merge').merge({
    files: ['./mochawesome-report/*.json']
  });
  
  // 发送飞书通知
sendFeishuMessage(jsonReport.stats);
} catch (error) {
  console.error('处理测试报告失败:', error.message);
  throw error; // 在Cypress中抛出错误而不是退出进程
}
module.exports = { sendFeishuMessage };