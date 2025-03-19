/**
 * Strategy Definitions - Defines the available data engineering strategies
 * and their capabilities
 */

import { StrategyType } from './agentFactory';

export interface Strategy {
  id: StrategyType;
  name: string;
  description: string;
  icon: string;
  capabilities: string[];
  recommendedAgents: string[];
}

export const strategies: Strategy[] = [
  {
    id: 'infrastructure',
    name: 'Build Infrastructure',
    description: 'Set up and configure data engineering infrastructure',
    icon: 'server',
    capabilities: [
      'Cloud infrastructure design and deployment',
      'Data lakes and data warehouses',
      'Infrastructure as code (Terraform, CloudFormation)',
      'Compute resource optimization',
      'Storage solutions configuration'
    ],
    recommendedAgents: ['architect', 'engineer', 'governance']
  },
  {
    id: 'pipeline',
    name: 'Data Pipeline',
    description: 'Create and optimize ETL/ELT data pipelines',
    icon: 'git-branch',
    capabilities: [
      'Batch and streaming data processing',
      'ETL/ELT workflow design',
      'Data integration and transformation',
      'Pipeline monitoring and error handling',
      'Workflow orchestration (Airflow, Prefect, etc.)'
    ],
    recommendedAgents: ['engineer', 'architect', 'analyst']
  },
  {
    id: 'analysis',
    name: 'Data Analysis',
    description: 'Analyze and derive insights from your data',
    icon: 'bar-chart',
    capabilities: [
      'Exploratory data analysis',
      'Statistical analysis and hypothesis testing',
      'Dashboard creation and reporting',
      'Data visualization and interpretation',
      'Business intelligence solutions'
    ],
    recommendedAgents: ['analyst', 'scientist', 'engineer']
  },
  {
    id: 'quality',
    name: 'Data Quality',
    description: 'Implement data quality checks and monitoring',
    icon: 'shield',
    capabilities: [
      'Data validation and verification',
      'Quality monitoring frameworks',
      'Anomaly detection',
      'Data cleansing and standardization',
      'Quality metrics and reporting'
    ],
    recommendedAgents: ['governance', 'engineer', 'analyst']
  },
  {
    id: 'governance',
    name: 'Data Governance',
    description: 'Establish data governance policies and practices',
    icon: 'landmark',
    capabilities: [
      'Data catalogs and metadata management',
      'Access control and security policies',
      'Compliance with regulations (GDPR, CCPA, etc.)',
      'Data lineage tracking',
      'Master data management'
    ],
    recommendedAgents: ['governance', 'architect', 'analyst']
  }
];

/**
 * Get a strategy by ID
 */
export function getStrategyById(id: StrategyType): Strategy | undefined {
  return strategies.find(strategy => strategy.id === id);
}

/**
 * Get recommended agents for a strategy
 */
export function getRecommendedAgents(strategyId: StrategyType): string[] {
  const strategy = getStrategyById(strategyId);
  return strategy ? strategy.recommendedAgents : [];
}