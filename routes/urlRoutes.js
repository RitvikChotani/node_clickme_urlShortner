const express = require("express");

const urlCon = require("../controller/urlController");

const router = express.Router();

router.post("/create", urlCon.createNanoURL);
router.get("/:urlID", urlCon.redirectToURL);

module.exports = router;
