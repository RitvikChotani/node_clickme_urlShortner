const { nanoid } = require("nanoid");
const { URL, parse } = require("url");

const URLS = require("../model/urlSchema");
const log = require("../util/log");

const createNanoURL = async (req, res) => {
	try {
		let { url } = req.body;

		const urlOb = parse(url);
		if (!urlOb.protocol) {
			url = "https://" + url;
		}

		const urlDB = await URLS.findOne({ url: url });
		if (urlDB !== null) {
			res
				.status(302)
				.json({ success: true, message: `The URL already has a shortened version as ${new URL(`/${urlDB.urlID}`, "http://localhost:4000/")}` });
		} else {
			const newURL = new URLS({
				url: url,
				urlID: nanoid(5),
			});

			res.status(200).json({ success: true, message: `URL Created for ${newURL.url} with ${new URL(`${newURL.urlID}`, "http://localhost:4000/")}` });
			await newURL.save();
		}
	} catch (err) {
		res.status(404).json({ success: false, message: `Something went wrong` });
		log.error(err);
	}
};

const redirectToURL = async (req, res) => {
	try {
		const { urlID } = req.params;

		let urls = await URLS.findOne({ urlID: urlID });
		if (urls) {
			let redirectURL = parse(urls.url);
			if (!redirectURL.protocol) {
				urls.url = new URL(`https://${urls.url}`);
			}
			res.redirect(urls.url);
		}
	} catch (err) {
		res.status(404).json({ success: false, message: `Something went wrong` });
		log.error(err);
	}
};

module.exports = { createNanoURL, redirectToURL };
