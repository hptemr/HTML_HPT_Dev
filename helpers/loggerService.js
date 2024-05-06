const winston = require('winston');
require('winston-mongodb');
const { transports } = require("winston");
const { combine, timestamp, json } = winston.format;
require('dotenv').config();


// const errorFilter = winston.format((info, opts) => {
//     return info.level === 'error' ? info : false;
//   });
  
//   const infoFilter = winston.format((info, opts) => {
//     return info.level === 'info' ? info : false;
//   });
  
//   const logger = winston.createLogger({
//     level: 'info',
//     transports: [
//       new transports.MongoDB({
//         level: "error",
//         db: process.env.DATABASE,
//         options: { useUnifiedTopology: true },
//         collection: "errorLog",
//         format: combine(errorFilter()),
//       }),
//       new transports.MongoDB({
//         level: "info",
//         db: process.env.DATABASE,
//         options: { useUnifiedTopology: true },
//         collection: "infoLog",
//         format: combine(infoFilter()),
//       }),
//     ],
//   });




// const errorFilter = winston.format((info, opts) => {
//     if(info.level === 'error') {
//         winston.format.timestamp(),
//         winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }), // Store metadata
//         customFormat
//         return info
//     }else{
//         return false
//     }
//   });
  
//   const infoFilter = winston.format((info, opts) => {
//     if(info.level === 'info') {
//         winston.format.timestamp(),
//         winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }), // Store metadata
//         customFormat
//         return info
//     }else{
//         return false
//     }
//   });

// const customFormat = winston.format.printf(({ level, message, timestamp, metadata }) => {
//     let meta = metadata ? JSON.stringify(metadata) : '{}';
//     return `${timestamp} ${level}: ${message} - ${meta}`;
//   });

//   const logger = winston.createLogger({
//     level: 'info', // Set log level
//     // format: winston.format.combine(
//     //   winston.format.timestamp(), // Add timestamp
//     //   winston.format.json() // JSON format
//     // ),

//     // format: winston.format.combine(
//     //     winston.format.timestamp(),
//     //     winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }), // Store metadata
//     //     customFormat
//     //   ),
//     transports: [
//     //   new winston.transports.Console(), // Log to console for development
//       new winston.transports.MongoDB({
//         level: 'error', // Log level for MongoDB transport
//         db: process.env.DATABASE, // MongoDB connection URI
//         options: {
//           useNewUrlParser: true,
//           useUnifiedTopology: true
//         },
//         collection: 'errorLog', // Collection to save logs in
//         capped: true, // Create a capped collection (optional)
//         cappedMax: 1000000, // Max size of the capped collection in bytes (optional)
//         format: combine(errorFilter()),
//       }),
//       new winston.transports.MongoDB({
//         level: 'info', // Log level for MongoDB transport
//         db: process.env.DATABASE, // MongoDB connection URI
//         options: {
//           useNewUrlParser: true,
//           useUnifiedTopology: true
//         },
//         collection: 'infoLog', // Collection to save logs in
//         capped: true, // Create a capped collection (optional)
//         cappedMax: 1000000, // Max size of the capped collection in bytes (optional)
//         format: combine(infoFilter()),
//       })
//     ]
//   });

// Define a custom format for logging
const customFormat = winston.format.printf(({ level, message, timestamp, metadata }) => {
    let meta = metadata ? JSON.stringify(metadata) : '{}';
    return `${timestamp} ${level}: ${message} - ${meta}`;
  });

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Set default log level
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
      customFormat
    ),
    transports: [
    //   new winston.transports.Console(), // Log to console
      new winston.transports.MongoDB({
        level: 'error', // Log only errors to this transport
        db: process.env.DATABASE,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        collection: 'error_logs', // Collection for error logs
        // capped: true, // Enable capped collection
        // cappedMax: 1000000 // Maximum size in bytes (1 MB)
      }),
      new winston.transports.MongoDB({
        level: 'info', // Log only info messages to this transport
        db: process.env.DATABASE,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        collection: 'info_logs', // Collection for info logs
        // capped: true, // Enable capped collection
        // cappedMax: 1000000 // Maximum size in bytes (1 MB)
      })
    ]
  });
  
  // Custom function to log messages to both collections based on log level
  const dualLog = (message, metadata = {}) => {
    if (metadata.level && metadata.level === 'error') {
      // Log error message to 'error_logs' collection
      logger.error(message, metadata);
    } else {
      // Log info message to 'info_logs' collection
      logger.info(message, metadata);
    }
  };
  
  module.exports = {
    logger,
    dualLog
  };