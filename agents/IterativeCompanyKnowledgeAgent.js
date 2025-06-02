// agents/IterativeCompanyKnowledgeAgent.js
// Iteratively fetches EHB company info from ChatGPT (OpenAI API), asking follow-up questions until no new info is returned.
// Saves all responses in /ehb_company_info. Next.js-compatible backend use.

const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

class IterativeCompanyKnowledgeAgent {
  constructor(projectRoot, infoFolder = 'ehb_company_info') {
    this.projectRoot = projectRoot;
    this.infoFolder = path.join(projectRoot, infoFolder);
    this.openai = null;
    this.responses = [];
    this.ensureInfoFolder();
  }

  ensureInfoFolder() {
    if (!fs.existsSync(this.infoFolder)) {
      fs.mkdirSync(this.infoFolder, { recursive: true });
    }
  }

  setOpenAIKey(apiKey) {
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  async askChatGPT(prompt) {
    const response = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.data.choices[0].message.content;
  }

  generateFollowUpQuestion(lastResponse) {
    // Simple heuristic: look for TODOs, missing sections, or ask for more details
    if (lastResponse.includes('I don\'t know') || lastResponse.includes('No more information')) {
      return null;
    }
    // Example: always ask for more details until model says no more info
    return 'What more can you tell me about EHB company, its modules, or roadmap?';
  }

  async fetchAllInfo(initialPrompt = 'What is the EHB company? Mission, roadmap, modules, etc.') {
    let keepAsking = true;
    let lastPrompt = initialPrompt;
    this.responses = [];
    while (keepAsking) {
      const response = await this.askChatGPT(lastPrompt);
      this.responses.push({ prompt: lastPrompt, response });
      const nextQuestion = this.generateFollowUpQuestion(response);
      if (!nextQuestion) {
        keepAsking = false;
      } else {
        lastPrompt = nextQuestion;
      }
    }
    this.saveAllInfo();
    return this.responses;
  }

  saveAllInfo() {
    const savePath = path.join(this.infoFolder, 'ehb_company_full_info.json');
    fs.writeFileSync(savePath, JSON.stringify(this.responses, null, 2));
  }
}

module.exports = IterativeCompanyKnowledgeAgent; 