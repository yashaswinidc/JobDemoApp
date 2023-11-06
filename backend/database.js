var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  // host: "TeBS-BDC-0023",
  database: "jobportal_demo",
  user: "root",
  password: "Gold@78990",
});

module.exports = connection;
