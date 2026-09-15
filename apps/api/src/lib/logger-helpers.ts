import { logger } from './logger';

/**
 * Metadata object for structured logging
 */
export interface LogMetadata {
  module?: string;
  method?: string;
  [key: string]: any;
}

/**
 * Helper function to create consistent error context for logging
 * @param error - The error to log
 * @param context - Additional context metadata
 * @returns Formatted error with context
 */
export function createErrorContext(
  error: Error | unknown,
  context?: LogMetadata,
): LogMetadata {
  return {
    ...context,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    } : error,
  };
}

/**
 * Helper to log with automatic module and method context
 */
export class ContextLogger {
  constructor(
    private module: string,
    private method?: string,
  ) {}

  error(message: string, metadata?: LogMetadata): void {
    logger.error(message, {
      ...metadata,
      module: this.module,
      method: this.method,
    });
  }

  warn(message: string, metadata?: LogMetadata): void {
    logger.warn(message, {
      ...metadata,
      module: this.module,
      method: this.method,
    });
  }

  info(message: string, metadata?: LogMetadata): void {
    logger.info(message, {
      ...metadata,
      module: this.module,
      method: this.method,
    });
  }

  debug(message: string, metadata?: LogMetadata): void {
    logger.debug(message, {
      ...metadata,
      module: this.module,
      method: this.method,
    });
  }
}
