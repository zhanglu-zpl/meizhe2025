const axios = require('axios');
module.exports.sendFeishuMessage = async (webhook, message) => {
  try {
    await axios.post(webhook, {
      msg_type: "text",
      content: { text: message }
    });
    return true;
  } catch (e) {
    throw new Error(`飞书发送失败: ${e.message}`);
  }
}