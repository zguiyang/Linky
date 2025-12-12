import pino from 'pino';

// 直接使用类型推断，减少接口定义
const loggerConfig = {
  level: 'info' as const,
  logFile: './logs/app.log',
  maxSize: '10M' as const,
  maxFiles: 14,
  useColors: process.env.NODE_ENV === 'development',
};

// Pino会自动推断类型
const logger = pino(
  loggerConfig.useColors
    ? {
        level: loggerConfig.level,
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {},
      }
    : {
        level: loggerConfig.level,
        timestamp: pino.stdTimeFunctions.isoTime,
      },
  pino.transport({
    target: 'pino/file',
    options: {
      destination: loggerConfig.logFile,
      sync: false,
      size: loggerConfig.maxSize,
      limit: { count: loggerConfig.maxFiles },
      mkdir: true,
    },
  })
);

export default logger;
