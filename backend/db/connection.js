const monk = require("monk");
require("dotenv").config();

console.log("DB IS!!!", process.env.DB_URL);

const dbUrl = process.env.DB_URL;

const db = monk(dbUrl);

module.exports = db;
