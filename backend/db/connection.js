const monk = require("monk");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

const db = monk(dbUrl);

module.exports = db;
