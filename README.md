# Data Engineering Agents Platform

A modern web UI for Data Engineering Agents that allows multiple specialized agents to interact with each other and execute various data engineering tasks.

## Features

- Dark theme UI inspired by LobeChat
- Support for multiple agent avatars based on data engineering specialties
- Different strategies for data engineering tasks (Build Infra, Data Pipeline, Data Analysis, etc.)
- Chat history saved in database
- Multiple agents can collaborate on complex tasks

## UI Design

The UI follows a clean, modern design with a focus on usability:

- **Left Sidebar**: Contains navigation and agents list, following the LobeChat design pattern. The sidebar can be collapsed for more space.
- **Top Tabs**: Strategy selection uses tabs for easy navigation between different data engineering approaches.
- **Main Content**: The chat interface where multiple agents collaborate to solve data engineering problems.

## Tech Stack

- Next.js with TypeScript
- Prisma ORM for database interactions**
- Tailwind CSS with Shadcn UI components
- Zustand for state management
- pnpm for package management

## Getting Started

### Prerequisites

- Node.js v18+ and pnpm installed
- PostgreSQL database

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data-engineering-agents.git
cd data-engineering-agents
```

2. Install dependencies:
```bash
pnpm install
```

3. Install Shadcn UI components:
```bash
npx shadcn-ui@latest add button avatar card dropdown-menu input textarea tabs tooltip scroll-area separator label switch
```

4. Set up environment variables:
```bash
cp .env.example .env
# Update the .env file with your configuration
```

5. Set up the database:
```bash
pnpm prisma:migrate
pnpm prisma:generate
pnpm prisma:seed
```

6. Start the development server:
```bash
pnpm dev
```

### Using Docker

Alternatively, you can use Docker Compose to run the entire stack:

```bash
docker-compose up -d --build
docker-compose down
```


## Key Components

### Sidebar with Agents

The left sidebar contains navigation and a collapsible list of agents. When viewing the Conversation page, it shows the available agents that can be selected for collaboration.

### Strategy Selection Tabs

The strategy tabs at the top allow users to quickly switch between different data engineering approaches:
- Build Infrastructure
- Data Pipeline
- Data Analysis
- Data Quality
- Data Governance

### Agent Collaboration

Multiple agents can collaborate on a task, each bringing their own expertise. The UI makes it clear which agent is responding at any given time.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.