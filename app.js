const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

var db = mysql.createConnection({
    host: 'YOUR HOST',
    user: 'YOUR USER',
    password: 'YOUR PASSWORD',
    database: 'mysample',
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
