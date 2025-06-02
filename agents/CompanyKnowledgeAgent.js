// agents/CompanyKnowledgeAgent.js
// Next.js-compatible agent: fetches company info from ChatGPT (OpenAI API), saves in /ehb_company_info, and provides info to other agents

const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

class CompanyKnowledgeAgent {
  constructor(projectRoot, infoFolder = 'ehb_company_info') {
    this.projectRoot = projectRoot;
    this.infoFolder = path.join(projectRoot, infoFolder);
    this.openai = null;
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

  async fetchAndSaveInfo(prompt, filename) {
    if (!this.openai) throw new Error('OpenAI API key not set.');
    const response = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    const info = response.data.choices[0].message.content;
    const savePath = path.join(this.infoFolder, filename);
    fs.writeFileSync(savePath, info);
    return info;
  }

  async fetchCompanyOverview() {
    return this.fetchAndSaveInfo('What is the EHB company mission, services, and roadmap? Give details for documentation.', 'company_overview.txt');
  }

  async fetchModuleInfo(moduleName) {
    return this.fetchAndSaveInfo(`Explain the purpose, business logic, and APIs of the EHB module: ${moduleName}.`, `${moduleName}_info.txt`);
  }

  // More methods can be added for other info types
}

module.exports = CompanyKnowledgeAgent; 