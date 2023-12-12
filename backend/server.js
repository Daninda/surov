const express = require("express");
const router = require("./route");

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(5000, (err) => {
	if (err) return console.log(err);
	console.log("Server on 5000");
});
