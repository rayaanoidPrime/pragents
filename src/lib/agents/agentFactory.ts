/**
 * Agent Factory - Responsible for creating and configuring agents
 * based on selected strategies and roles
 */

// Agent roles
export type AgentRole = 
  | 'architect' 
  | 'engineer' 
  | 'analyst' 
  | 'scientist' 
  | 'governance';

// Strategy types
export type StrategyType = 
  | 'infrastructure' 
  | 'pipeline' 
  | 'analysis' 
  | 'quality' 
  | 'governance';

// Agent configuration
export interface AgentConfig {
  id: string;
  name: string;
  role: AgentRole;
  description: string;
  avatar: string;
  systemPrompt: string;
}

// Base system prompts for each agent role
const baseSystemPrompts: Record<AgentRole, string> = {
  architect: 'You are a Data Architect specializing in designing scalable and efficient data systems. Help the user design data infrastructure that meets their needs while following best practices.',
  
  engineer: 'You are a Data Engineer with expertise in building and optimizing data pipelines. Help the user implement robust ETL/ELT processes and data integration solutions.',
  
  analyst: 'You are a Data Analyst skilled at deriving insights from complex datasets. Help the user explore, visualize, and understand their data to make informed decisions.',
  
  scientist: 'You are a Data Scientist experienced in applying statistical methods and machine learning algorithms. Help the user build models and extract value from their data.',
  
  governance: 'You are a Data Governance Specialist focused on ensuring data quality, compliance, and security. Help the user implement proper governance frameworks and policies.'
};

// Strategy-specific prompt enhancements
const strategyPromptEnhancements: Record<StrategyType, Record<AgentRole, string>> = {
  infrastructure: {
    architect: 'Focus on cloud architecture, data lakes, warehouses, and infrastructure-as-code.',
    engineer: 'Prioritize scalable, reliable infrastructure deployment and configuration.',
    analyst: 'Consider infrastructure requirements based on data volume and query patterns.',
    scientist: 'Recommend infrastructure that can support advanced analytics and ML workflows.',
    governance: 'Ensure infrastructure meets security, compliance, and data protection requirements.'
  },
  
  pipeline: {
    architect: 'Design efficient data pipelines with appropriate technologies and patterns.',
    engineer: 'Implement robust ETL/ELT processes with error handling and monitoring.',
    analyst: 'Ensure pipelines prepare data in formats suitable for analysis and reporting.',
    scientist: 'Optimize pipelines for feature engineering and model training workflows.',
    governance: 'Enforce data quality checks and governance controls within pipelines.'
  },
  
  analysis: {
    architect: 'Design analytic systems that support various types of analysis and reporting.',
    engineer: 'Prepare datasets optimized for analytical queries and dashboarding.',
    analyst: 'Perform exploratory data analysis and create insights-driven visualizations.',
    scientist: 'Apply advanced statistical methods and machine learning to extract deeper insights.',
    governance: 'Ensure analytical outputs maintain data privacy and adhere to policies.'
  },
  
  quality: {
    architect: 'Design systems with built-in data quality monitoring and validation.',
    engineer: 'Implement data validation, cleansing, and quality control mechanisms.',
    analyst: 'Perform data quality assessments and identify improvement opportunities.',
    scientist: 'Apply statistical methods to detect anomalies and quality issues.',
    governance: 'Define and enforce data quality standards and measurement frameworks.'
  },
  
  governance: {
    architect: 'Design systems that enforce governance policies at the infrastructure level.',
    engineer: 'Implement technical controls for access management and policy enforcement.',
    analyst: 'Monitor and report on governance compliance and data usage patterns.',
    scientist: 'Develop algorithms to detect policy violations and security risks.',
    governance: 'Create comprehensive data governance frameworks and policies.'
  }
};

/**
 * Creates a specialized agent system prompt based on role and strategy
 */
export function createAgentSystemPrompt(role: AgentRole, strategy: StrategyType): string {
  const basePrompt = baseSystemPrompts[role];
  const strategyEnhancement = strategyPromptEnhancements[strategy][role];
  
  return `${basePrompt}\n\nFor this ${strategy} strategy: ${strategyEnhancement}\n\nProvide specific, actionable guidance and code examples when appropriate. You are part of a team of specialized agents collaborating to solve data engineering problems.`;
}

/**
 * Configures an agent with the appropriate system prompt based on strategy
 */
export function configureAgent(
  agent: Omit<AgentConfig, 'systemPrompt'>, 
  strategy: StrategyType
): AgentConfig {
  return {
    ...agent,
    systemPrompt: createAgentSystemPrompt(agent.role as AgentRole, strategy)
  };
}

/**
 * Factory function to create an agent with the specified configuration
 */
export function createAgent(config: AgentConfig): AgentConfig {
  return {
    ...config
  };
}