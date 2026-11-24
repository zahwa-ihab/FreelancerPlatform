var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelancer_platform",
});
con.connect(function (err) {
  if (err) console.error("Database connection failed:", err.message);
  else {
    console.log("Connected to DB successfully!");
  }
});
module.exports = con;
