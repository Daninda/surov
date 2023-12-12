const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "LibSub",
	password: "!Stena123",
});
db.connect((err) => {
	if (err) return console.log(err);
	console.log("Database connected");
});

module.exports = db;
