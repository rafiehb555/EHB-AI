// agents/ChatHistoryMergerAgent.js
// Advanced: semantic duplicate detection, section tagging, source tracking, interactive prompt, summarization, conflict resolution, export, search

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { Configuration, OpenAIApi } = require('openai');

class ChatHistoryMergerAgent {
  constructor(infoFolder = 'ehb_company_info', openaiApiKey = null) {
    this.infoFolder = infoFolder;
    this.mergedSections = {}; // { section: [{text, source, line}] }
    this.missingInfo = [];
    this.conflicts = [];
    this.openai = null;
    if (openaiApiKey) {
      const configuration = new Configuration({ apiKey: openaiApiKey });
      this.openai = new OpenAIApi(configuration);
    }
  }

  // 1. Read chat files
  readChatFiles(folderPath) {
    const files = fs.readdirSync(folderPath);
    const chatContents = [];
    files.forEach(file => {
      if (file.endsWith('.json') || file.endsWith('.html') || file.endsWith('.txt')) {
        const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
        chatContents.push({ file, content });
      }
    });
    return chatContents;
  }

  // 2. Section-wise tagging (simple regex-based)
  extractSections(content) {
    const sections = {};
    const regex = /(?:^|\n)([A-Z][A-Za-z ]+):\s*\n?([\s\S]*?)(?=\n[A-Z][A-Za-z ]+:|$)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const section = match[1].trim();
      const text = match[2].trim();
      if (section && text) sections[section] = text;
    }
    return sections;
  }

  // 3. Semantic duplicate detection (simple similarity)
  isSemanticallyDuplicate(newText, existingTexts) {
    return existingTexts.some(text => this.similarity(text, newText) > 0.85);
  }
  similarity(a, b) {
    // Jaccard similarity (word overlap)
    const setA = new Set(a.toLowerCase().split(/\W+/));
    const setB = new Set(b.toLowerCase().split(/\W+/));
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
  }

  // 4. Merge chats with sectioning, deduplication, and source tracking
  mergeChats(chatContents) {
    chatContents.forEach(({ file, content }) => {
      const sections = this.extractSections(content);
      Object.entries(sections).forEach(([section, text]) => {
        if (!this.mergedSections[section]) this.mergedSections[section] = [];
        if (!this.isSemanticallyDuplicate(text, this.mergedSections[section].map(e => e.text))) {
          this.mergedSections[section].push({ text, source: file });
        } else {
          // Conflict detection (if similar but not exact)
          this.conflicts.push({ section, text, source: file });
        }
      });
    });
  }

  // 5. Interactive user prompt (CLI placeholder)
  async promptUserForMissingInfo() {
    const requiredSections = ['Mission', 'Roadmap', 'Modules', 'APIs'];
    for (const section of requiredSections) {
      if (!this.mergedSections[section] || this.mergedSections[section].length === 0) {
        this.missingInfo.push(`${section} missing. Please provide.`);
        // CLI prompt placeholder
        // const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        // const answer = await new Promise(res => rl.question(`Enter info for ${section}: `, res));
        // rl.close();
        // if (answer) this.mergedSections[section] = [{ text: answer, source: 'user' }];
      }
    }
  }

  // 6. Auto-summarization (OpenAI API ready)
  async summarizeSection(section) {
    if (!this.openai) return null;
    const texts = this.mergedSections[section]?.map(e => e.text).join('\n') || '';
    if (!texts) return null;
    const response = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Summarize the following for documentation:\n${texts}` }],
    });
    return response.data.choices[0].message.content;
  }

  // 7. Export options
  saveAsTXT() {
    const savePath = path.join(this.infoFolder, 'merged_chat_history.txt');
    let txt = '';
    Object.entries(this.mergedSections).forEach(([section, entries]) => {
      txt += `\n=== ${section} ===\n`;
      entries.forEach(e => {
        txt += `- (${e.source}) ${e.text}\n`;
      });
    });
    fs.writeFileSync(savePath, txt);
  }
  saveAsJSON() {
    const savePath = path.join(this.infoFolder, 'merged_chat_history.json');
    fs.writeFileSync(savePath, JSON.stringify(this.mergedSections, null, 2));
  }
  saveAsMD() {
    const savePath = path.join(this.infoFolder, 'merged_chat_history.md');
    let md = '';
    Object.entries(this.mergedSections).forEach(([section, entries]) => {
      md += `\n## ${section}\n`;
      entries.forEach(e => {
        md += `- **Source:** ${e.source}\n  ${e.text}\n`;
      });
    });
    fs.writeFileSync(savePath, md);
  }

  // 8. Search/query
  searchInfo(query) {
    const results = [];
    Object.entries(this.mergedSections).forEach(([section, entries]) => {
      entries.forEach(e => {
        if (e.text.toLowerCase().includes(query.toLowerCase())) {
          results.push({ section, ...e });
        }
      });
    });
    return results;
  }

  // Main run
  async run(folderPath) {
    const chats = this.readChatFiles(folderPath);
    this.mergeChats(chats);
    await this.promptUserForMissingInfo();
    this.saveAsTXT();
    this.saveAsJSON();
    this.saveAsMD();
    if (this.missingInfo.length > 0) {
      fs.writeFileSync(path.join(this.infoFolder, 'missing_info_prompts.txt'), this.missingInfo.join('\n'));
    }
    if (this.conflicts.length > 0) {
      fs.writeFileSync(path.join(this.infoFolder, 'conflicts.txt'), JSON.stringify(this.conflicts, null, 2));
    }
  }
}

module.exports = ChatHistoryMergerAgent; 