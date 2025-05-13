const axios = require('axios');

async function sendFeishuMessage(webhook, message) {
    try {
        await axios.post(webhook, {
            msg_type: "text",
            content: {
                text: message
            }
        });
    } catch (error) {
        console.error('发送飞书消息失败:', error);
    }
}

module.exports = { sendFeishuMessage };