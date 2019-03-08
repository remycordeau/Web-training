const express = require('express')
const app = express()
const port = 3000
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('login',{}))

app.post('/chooseGame', function(req, res) {
  res.render('chooseGame',{username: req.body.name})
});

app.get('/index', function(req, res) {
  res.render('index',{})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
