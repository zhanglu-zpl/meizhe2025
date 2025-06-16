const axios = require('axios');
const fs = require('fs');

function sendFeishuMessage(report) {
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
						[{tag: "text",text: `总用例数: ${tests}`}],
						[{tag: "text",text: `通过数: ${passes}`}],
						[{tag: "text",text: `失败数: ${failures}`}],
						[{tag: "text",text: `用时: ${duration / 1000} 秒`}]
					]
				}
			}
		}
	};

	axios.post('https://open.feishu.cn/open-apis/bot/v2/hook/f131644d-a3a1-48d6-a96d-ccd87a72291b', message);
}



module.exports = {
	sendFeishuMessage
};
