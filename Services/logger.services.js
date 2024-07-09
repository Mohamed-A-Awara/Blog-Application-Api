const { createLogger, format, transports } = require("winston");
const { timestamp, combine, errors, json, printf } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    let logMessage = `${timestamp} | ${level.toLocaleUpperCase()} | ${
        stack || (typeof message == "object" ? JSON.stringify(message) : message)
    }`;
    return logMessage;
});

const getlogger = (filename) => {
    const logger = createLogger({
        format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        json(),
        logFormat
        ),
        transports: [
        new transports.File({ filename: `./logs/${filename}.log` }),
        new transports.File({ filename: `./logs/all.log` }),
        new transports.Console(),
        ],
    });
    return logger;
};

module.exports = getlogger;
