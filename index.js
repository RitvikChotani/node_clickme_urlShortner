//Module/Library imports
const express = require("express");
const helmet = require("helmet");
require("dotenv").config();

//Custom File imports
const connectDB = require("./db/db");
const log = require("./util/log");
const reqLogger = require("./util/reqLog");
const urlRoutes = require("./routes/urlRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ type: "application/json" }));
app.use(helmet());
app.use(reqLogger);

app.use(urlRoutes);

app.listen(PORT, () => {
	connectDB();
	log.info(`Server is up and listening on port ${PORT}`);
});
