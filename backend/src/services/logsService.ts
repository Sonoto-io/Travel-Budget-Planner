/* eslint-disable  @typescript-eslint/no-explicit-any */

interface LogEntry {
    timestamp: string;
    level: 'info' | 'warning' | 'error';
    message: string;
    meta?: Record<string, any>;
}

export class LogsService {
    private logs: LogEntry[] = [];

    addLog(level: 'info' | 'warning' | 'error', message: string, meta?: Record<string, any>) {
        const logEntry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            meta,
        };
        this.logs.push(logEntry);
        console.log(level, JSON.stringify(logEntry));
    }

    info(message: string, meta?: Record<string, any>) {
        this.addLog('info', message, meta);
    }

    warning(message: string, meta?: Record<string, any>) {
        this.addLog('warning', message, meta);
    }

    error(message: string, meta?: Record<string, any>) {
        this.addLog('error', message, meta);
    }
}