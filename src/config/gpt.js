const { Configuration, OpenAIApi } = require('openai');

const config = require('./config');

const configuration = new Configuration({
  apiKey: config.openai.apiKey,
  organization: 'org-B6iqGxLkGxXx9kew0EAWMdyf',
});
const openai = new OpenAIApi(configuration);

class GPT {
  constructor() {
    this.completion = this.completion.bind(this);
  }

  async completion(prompt) {
    return openai.createCompletion({
      prompt,
      model: 'gpt-3.5-turbo-0301',
    });
  }
}

module.exports = new GPT();
