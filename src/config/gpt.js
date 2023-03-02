// const { Configuration, OpenAIApi } = require('openai');

const config = require('./config');

// const configuration = new Configuration({
//   apiKey: config.openai.apiKey,
//   organization: 'org-B6iqGxLkGxXx9kew0EAWMdyf',
// });

class GPT {
  api = null;

  constructor() {
    this.init();
  }

  async init() {
    const { ChatGPTAPI } = await import('chatgpt');
    this.api = new ChatGPTAPI({ apiKey: config.openai.apiKey });
  }
}

module.exports = new GPT();
