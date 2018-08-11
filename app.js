const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

var lemonjuice = 75;

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/index.html');
});

app.get('/Lemonjuice.jpg', (req, res) =>{
  res.sendFile(__dirname + '/Lemonjuice.jpg');
});

app.get('/seashore.jpg', (req, res) =>{
  res.sendFile(__dirname + '/seashore.jpg');
});
//READ
app.get('/records', (req, res) =>{
  let sql = 'SELECT * FROM details'
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Fetched');
    var a = result;
    res.send('table', {a});
  });
});
//INSERT
app.post('/index', urlencodedParser, (req, res) =>{
    
    if (req.body.name < 1 || req.body.quan < 1) {
    res.redirect('/');
    } else {
    var submit = req.body;
    var name = submit.name;
    var quan = parseInt(submit.quan);
    var amount = lemonjuice * quan;
    let post =  {name: name, quantity: quan, amount: amount};
    let sql = 'INSERT INTO details SET ?';
    let query = db.query(sql, post, (err, result) => {
      if (err)  throw err;
      console.log(result);
  //SEND requested parameter name to 'thanks'
  res.render('thanks', {person: req.body.name, quantity: req.body.quan});
});
}
});

//UPDATE DATA
app.post('/updatepost', urlencodedParser, (req, res) =>{
  if (req.body.id < 1 || req.body.name < 1 || req.body.quan < 1) {
    res.redirect('/records');
  } else {
  var newName = req.body.name;
  var newQuan = req.body.quan;
  var newAmount = lemonjuice * newQuan;
  let sql = `UPDATE details SET name = '${newName}', quantity = '${newQuan}', amount = '${newAmount}'  WHERE id = ${req.body.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect('/records');
  });
}
});

//DELETE DATA
app.post('/delete', urlencodedParser, (req, res) =>{
  if (req.body.id < 1) {
    res.redirect('/records');
  } else {
  let sql = `DELETE FROM details WHERE id = '${req.body.id}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect('/records');
  });
}
});

app.listen(4000, () =>
 console.log('Express server is running at port no : 4000')
);
