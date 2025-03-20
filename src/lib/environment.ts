/**
 * Environment configuration utilities
 */

/**
 * Get environment variable with fallback
 * @param key - Environment variable name
 * @param defaultValue - Default value if not found
 * @returns The environment variable value or default
 */
export const getEnv = (key: string, defaultValue: string = ''): string => {
    // For client-side, use only NEXT_PUBLIC_ variables
    if (typeof window !== 'undefined') {
      // @ts-ignore - Access environment variables
      const value = process.env[`NEXT_PUBLIC_${key}`];
      return value || defaultValue;
    }
    
    // For server-side, can access any env var
    return process.env[key] || process.env[`NEXT_PUBLIC_${key}`] || defaultValue;
  };
  
  /**
   * Environment configuration
   */
  export const environment = {
    // N8N configuration
    n8n: {
      url: getEnv('N8N_URL', 'http://localhost:5678'),
      webhookPath: getEnv('N8N_WEBHOOK_PATH', '/webhook/data-engineering-agent'),
    },
    
    // Application configuration
    app: {
      name: getEnv('APP_NAME', 'Data Engineering Agent'),
      version: getEnv('APP_VERSION', '1.0.0'),
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
    },
  };
  
  /**
   * Get the full n8n webhook URL
   */
  export const getN8nWebhookUrl = (): string => {
    return `${environment.n8n.url}${environment.n8n.webhookPath}`;
  };