const mysql = require('mysql');
const express = require('express');
var app = express();

var db = mysql.createConnection({
    host: 'YOUR HOST',
    user: 'YOUR USER',
    password: 'YOUR PASSWORD',
    database: 'YOUR DATABASENAME',
});

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL Connected...');
});


app.listen(3000, () =>
 console.log('Express server is running at port no : 3000')
);
