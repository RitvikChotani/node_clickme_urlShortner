const log = require("./log");

const reqLogger = (req, res, next) => {
	const request = `${req.method}:localhost${req.url} - ${res.statusCode}, ${req.ip}`;
	log.info(request);

	next();
};

module.exports = reqLogger;
