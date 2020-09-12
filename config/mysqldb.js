const mysql = require('mysql');
//create database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'urlshortner'
  });
  
  // open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});
  
module.exports = connection;