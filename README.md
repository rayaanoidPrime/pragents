# 🤖 Data Engineering Agents Platform

<div align="center">
  <img src="https://img.shields.io/badge/Status-Alpha-yellow" alt="Alpha Status" />
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-✓-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/UI-Shadcn%20+%20Tailwind-purple" alt="UI" />
</div>

<br />


https://github.com/user-attachments/assets/01bd162a-c5f6-48de-af43-8c11b378b609


<div align="center">
  <h3>💬 DataEngineering AI Agents, Really!</h3>
  <p>Building a Practical Assistant that empowers Data Engineers to deliver results with speed and efficiency.</p>
</div>

## ✨ Features

- 🤖 **Multi-agent collaboration** - Engage with specialized data engineering agents
- 🔄 **Multiple backend support** - Connect to OpenAI, Claude, or Ollama for private deployments
- 🔗 **n8n integration** - Use n8n workflows for agent orchestration
- 🎯 **Strategy-based approach** - Different strategies for various data engineering tasks
- 🌙 **Modern dark UI** - Beautiful, responsive interface inspired by LobeChat
- 🚀 **Docker ready** - Easy deployment with Docker Compose

## 🚀 Quick Start

The fastest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/yourusername/data-engineering-agents.git
cd data-engineering-agents

# Start the application
docker-compose up -d
```

### 🔧 Setup Steps

1. Once the containers are running, go to n8n at http://localhost:5678
2. Upload the workflow from the `agents/n8n/conversations` directory
3. Configure your API keys:
   - In Docker Compose: update OpenAI/Claude key
   - In n8n workflow: click on OpenAI/Claude model block and add your key
   - See [n8n documentation](https://docs.n8n.io/integrations/builtin/credentials/openai/#using-api-key) for more details

4. Visit http://localhost:3000 and start interacting with your agents!

## 🧠 Available Agents

- **Data Architect** - Designs data infrastructure and systems
- **Pipeline Engineer** - Builds efficient data pipelines
- **Data Analyst** - Analyzes and interprets complex data
- **Data Scientist** - Applies statistical models and machine learning
- **Governance Specialist** - Ensures data quality and compliance

## 🎯 Strategy Types


## 🔮 Coming Soon

We're actively working on the following features:

- 🎯 **Strategy Types** - More Strategy Types backend for debate and Continous Discussion
- 📝 **Code Execution** - Run and test code snippets directly in the chat
- 🔄 **Workflow Builder** - Create custom agent workflows with a visual editor
- 🌐 **Multi-source Data Connectors** - Connect to various data sources


## 🧩 Architecture

The application is built with a modern stack:

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS, Shadcn UI
- **State Management**: Zustand for global state
- **Orchestration**: n8n for workflow management
- **AI Integration**: OpenAI, Claude, and Ollama support

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit them: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

### 🐛 Bug Reports

If you encounter any issues, please help us improve by [creating a bug report](https://github.com/yourusername/data-engineering-agents/issues/new?template=bug_report.md).

Include as much information as possible:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
