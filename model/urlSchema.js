const mongoose = require("mongoose");

const urlSChema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
		trim: true,
	},
	urlID: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	click: {
		type: Number,
		default: 0,
	},
});

const URL = mongoose.model("URL", urlSChema);

module.exports = URL;
