const mongoose = require("mongoose");
const log = require("../util/log");
require("dotenv").config();
const URL = process.env.MONGO_URL;
const connectDB = async () => {
	try {
		const client = await mongoose.connect(URL, { useNewUrlParser: true });
		log.info(`Connected to Database on ${client.connection.host}`);
	} catch (err) {
		log.error(err);
	}
};

module.exports = connectDB;
