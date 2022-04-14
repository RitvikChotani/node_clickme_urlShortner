const { createLogger, format, transports } = require("winston");
const { timestamp } = format;

const logFormat = format.combine(
	timestamp(),
	format.printf((info) => {
		return `[${info.level.toUpperCase().padEnd(7)}] - ${info.timestamp}: ${info.stack || info.message}`;
	}),
);

const prodLogger = createLogger({
	level: "info",
	format: logFormat,
	transports: [new transports.Console(), new transports.File({ filename: "app.log", level: "info" })],
});

module.exports = prodLogger;
