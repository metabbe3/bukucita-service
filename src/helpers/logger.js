// src/helpers/logger.js
const winston = require('winston');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

// Create logs directory if not exists
const logsDir = path.join(__dirname, '../../logs');
mkdirp.sync(logsDir);

// Create a Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDir, `log_${new Date().toISOString().slice(0, 10)}.log`),
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
  ),
});

module.exports = logger;
