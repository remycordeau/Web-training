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

/**
imports and global definitions
*/

const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
var session = require('express-session');


const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});


app.use(session({  //to use cookies
  secret: 'secret text',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.set('view engine', 'ejs'); //to use ejs

/**
  function that checks whether a user is associated with the current session through the username field
*/
function checkAuth(req, res) {
  if (req.session.username == null) {
    console.log("User not logged in");
    return false;
  }
  return true;
}


/**
Routes
*/

//login page

app.get('/', function(req, res){
  res.render("login");
});

//chooseGame page

app.get('/chooseGame', function(req,res){ // if the user is not logged in, he can't directly access the chooseGame page, he will be redirected to the login page
    if(!checkAuth(req, res)){
      res.render("login",{});
    }
    else{
    res.render("chooseGame",{});
  }
  });

app.post('/chooseGame', function(req, res) {
  req.session.username = req.body.name;
  //console.log(req.session.username);
  res.render('chooseGame',{username: req.body.name})
});

app.get( "/disconnect", (req,res) =>{ //disconnect button, the req.session.username field is deleted
  req.session = null; //destroy session
  res.render("login",{});
});

// game1 page

app.get('/game1', function(req, res) {
  console.log(checkAuth(req,res));
  if(!checkAuth(req, res)){
    res.render("login",{});
    }
    else{
      res.render('game1',{});
    }
});

app.post('/game1', function(req, res) {
  req.session.username = req.body.name;
  console.log("username :"+req.body.name+" userscore : "+req.body.score);
  res.render('game1',{username: req.body.name,userscore: req.body.score})
});

//gameNotAvailable page

app.get("/gameNotAvailable", function (req,res) {
  if(!checkAuth(req, res)){
    res.render("login",{});
    }
    else{
        res.render("gameNotAvailable",{});
    }
})

app.post("/gameNotAvailable", function(req,res){
  req.session.username = req.body.name;
  //console.log(req.session.username);
  res.render('gameNotAvailable', {username: req.body.name})
});
