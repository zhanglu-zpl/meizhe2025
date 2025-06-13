const axios = require('axios');

// 发送飞书消息
function sendFeishuMessage(report) {
	// 验证报告格式
	if (!report || !report.stats) {
		throw new Error('无效的报告格式: 缺少stats属性');
	}
	const {
		passes,
		failures,
		tests,
		duration
	} = report.stats;

	const message = {
		msg_type: "post",
		content: {
			post: {
				zh_cn: {
					title: "测试报告汇总",
					content: [
						[{
							tag: "text",
							text: `总用例数: ${tests}`
						}],
						[{
							tag: "text",
							text: `通过数: ${passes}`
						}],
						[{
							tag: "text",
							text: `失败数: ${failures}`
						}],
						[{
							tag: "text",
							text: `用时: ${duration / 1000} 秒`
						}]
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

	// 验证合并后的报告
	if (!jsonReport || !jsonReport.stats) {
		throw new Error('合并后的报告格式无效');
	}

	// 发送飞书通知
	sendFeishuMessage(jsonReport);
} catch (error) {
	console.error('处理测试报告失败:', error.message);
	throw error;
}
module.exports = {
	feishuMessage: '✅ 水印功能测试已完成'
  };