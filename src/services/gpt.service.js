const gpt = require('../config/gpt');

const sendPrompt = (prompt) => {
  return gpt.completion(prompt);
};

module.exports = {
  sendPrompt,
};
