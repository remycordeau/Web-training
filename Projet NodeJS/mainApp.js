/**
DataBase connection
*/
var mongoose = require('mongoose');
const uri = "mongodb+srv://root:<password>@projetnodejs-gjsif.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
mongoose.connection
    .on('connected', () => {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`);
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });



const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require("body-parser");


const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

/**
Routes
*/

app.get('/', (req, res) => res.render('login',{}))

app.post('/chooseGame', function(req, res) {
  res.render('chooseGame',{username: req.body.name})
});

app.get('/game1', function(req, res) {
  res.render('game1',{})
});

app.post('/game1', function(req, res) {
  console.log("username :"+req.body.name+" userscore : "+req.body.score);
  res.render('game1',{username: req.body.name},{userscore: req.body.score})
});

app.post("/gameNotAvailable", function(req,res){
  res.render('gameNotAvailable', {username: req.body.name})
});
