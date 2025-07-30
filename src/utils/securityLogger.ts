/**
 * Système de logging sécurisé pour l'application LYO
 * Remplace les console.log en production par un système contrôlé
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  source?: string;
}

class SecurityLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private isProduction = process.env.NODE_ENV === 'production';

  private sanitizeData(data: any): any {
    if (!data) return data;
    
    const sanitized = { ...data };
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth'];
    
    Object.keys(sanitized).forEach(key => {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }

  private createLogEntry(level: LogLevel, message: string, data?: any, source?: string): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data: this.sanitizeData(data),
      source
    };
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    
    // Maintenir la limite de logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  debug(message: string, data?: any, source?: string): void {
    const entry = this.createLogEntry('debug', message, data, source);
    this.addLog(entry);
    
    if (!this.isProduction) {
      console.debug(`[DEBUG] ${source ? `[${source}] ` : ''}${message}`, data || '');
    }
  }

  info(message: string, data?: any, source?: string): void {
    const entry = this.createLogEntry('info', message, data, source);
    this.addLog(entry);
    
    if (!this.isProduction) {
      console.info(`[INFO] ${source ? `[${source}] ` : ''}${message}`, data || '');
    }
  }

  warn(message: string, data?: any, source?: string): void {
    const entry = this.createLogEntry('warn', message, data, source);
    this.addLog(entry);
    
    console.warn(`[WARN] ${source ? `[${source}] ` : ''}${message}`, data || '');
  }

  error(message: string, data?: any, source?: string): void {
    const entry = this.createLogEntry('error', message, data, source);
    this.addLog(entry);
    
    console.error(`[ERROR] ${source ? `[${source}] ` : ''}${message}`, data || '');
  }

  // Méthodes utilitaires
  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  getLogsSummary(): { [key in LogLevel]: number } {
    return this.logs.reduce((summary, log) => {
      summary[log.level] = (summary[log.level] || 0) + 1;
      return summary;
    }, {} as { [key in LogLevel]: number });
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Instance globale
export const securityLogger = new SecurityLogger();

// Fonction de migration pour remplacer console.log
export const log = {
  debug: (message: string, data?: any, source?: string) => securityLogger.debug(message, data, source),
  info: (message: string, data?: any, source?: string) => securityLogger.info(message, data, source),
  warn: (message: string, data?: any, source?: string) => securityLogger.warn(message, data, source),
  error: (message: string, data?: any, source?: string) => securityLogger.error(message, data, source)
};

export default securityLogger;