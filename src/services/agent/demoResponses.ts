// src/services/agent/demoResponses.ts
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types';

/**
 * Generates demo agent responses for testing when n8n is unavailable
 */
export async function getDemoResponse(
  selectedAgentIds: string[],
  strategyId: string,
  query: string
): Promise<{
  success: boolean;
  messages: Message[];
  status: 'in_progress' | 'completed';
}> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate demo responses based on selected agents
  const messages: Message[] = [];
  const now = new Date();
  
  const agentResponses: Record<string, { name: string, response: string }> = {
    "data-architect": {
      name: "Data Architect",
      response: `As a Data Architect, I recommend approaching ${query.toLowerCase()} with a clear focus on structure and scalability. Consider using a layered architecture with appropriate technologies for each layer: ingestion, processing, storage, and analytics. This ensures flexibility and maintainability as your requirements evolve.`
    },
    "pipeline-engineer": {
      name: "Pipeline Engineer",
      response: `For ${query.toLowerCase()}, I would design pipelines with both batch and streaming capabilities. Use Apache Airflow for orchestration, implement thorough monitoring with Prometheus, and ensure error handling with retry mechanisms and dead-letter queues. Well-designed pipelines should be idempotent, allowing for safe replays and recovery.`
    },
    "data-analyst": {
      name: "Data Analyst",
      response: `Looking at ${query.toLowerCase()} from an analysis perspective, we should consider the end-user needs. Make sure the data model is intuitive and well-documented. Include common aggregations in your design, implement caching for frequently accessed metrics, and optimize for query performance. Also, consider implementing self-service analytics tools.`
    },
    "data-scientist": {
      name: "Data Scientist",
      response: `The approach to ${query.toLowerCase()} should include considerations for ML workflows. Ensure feature extraction is modular, data lineage is tracked, and model training can be reproduced. Consider implementing a feature store and setting up A/B testing infrastructure to validate improvements in production.`
    },
    "data-governance": {
      name: "Governance Specialist",
      response: `When addressing ${query.toLowerCase()}, don't overlook governance aspects. Implement comprehensive data cataloging, data quality checks at each pipeline stage, access controls based on classification, and audit logging for compliance. Consider tools like Apache Atlas or other metadata management solutions.`
    },
    "data-engineer": {
      name: "Data Engineer",
      response: `From an implementation perspective, ${query.toLowerCase()} would benefit from containerized microservices, CI/CD pipelines, and robust error handling. I suggest using technologies like Apache Kafka, Spark Streaming, and cloud-native services to ensure optimal performance and reliability.`
    }
  };
  
  for (const agentId of selectedAgentIds) {
    if (agentResponses[agentId]) {
      messages.push({
        id: uuidv4(),
        agentId,
        agentName: agentResponses[agentId].name,
        content: agentResponses[agentId].response,
        role: "assistant",
        createdAt: new Date(now.getTime() + messages.length * 100)
      });
    }
  }
  
  // Add a summary message if multiple agents were involved
  if (selectedAgentIds.length > 1) {
    messages.push({
      id: uuidv4(),
      content: `The agents discussed approaches to ${query.toLowerCase()}, highlighting architectural considerations, implementation specifics, and integration points. Key takeaways include the importance of scalability, maintainability, and the selection of appropriate technologies for each layer of the solution.`,
      role: "system",
      type: "summary",
      createdAt: new Date(now.getTime() + messages.length * 100)
    });
  }
  
  return {
    success: true,
    messages,
    status: 'completed'
  };
}