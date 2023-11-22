import mysql from 'mysql2';

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database:'mini_project',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});