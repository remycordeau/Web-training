/**
DataBase connection
*/
var mongoose = require('mongoose');
const uri = "mongodb+srv://remy:remy@cluster0-gjsif.azure.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, {useNewUrlParser: true})
  .then(() => {
      console.log("Connection to database successful");
       return;
   })
   .catch(err => {
       console.error('App starting error:', err.stack);
      return;
   });

/**
imports and global definitions
*/
const express = require('express')
const app = express();
const port = 3000;
require("./User")
const User = mongoose.model('User');
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

function compareScore(userA,userB){
  if(userA.score < userB.score){
      return 1;
  }
  if(userA.score > userB.score){
      return -1;
  }
  return 0;
}

/**
Routes
*/

/**
login page
*/

app.get('/', function(req, res){
  req.body.error = "";
  res.render("login",{error: req.body.error});
});

/**
signup page
*/

app.get("/signup", function (req,res) {
  if(!checkAuth(req, res)){
    req.body.error="";
    res.render("login",{error: req.body.error});
    }
    else{
        res.render("signup",{});
    }
})

app.post("/signup", (req,res)=>{
  req.body.error = "";
  res.render("signup",{error: req.body.error});
});

app.post("/chooseGame",function(req,res){
  User.findOne({
              login: req.body.name
          }, function(err, user) {
              if (!user) {
                  const user = new User(req.body);
                  user.login = req.body.name;
                  user.score = 0;
                  console.log("User " + user + " registered.");
                  user.save()
                      .then(() => {res.render('./chooseGame',{username: user.login, score: user.score});})
                      .catch(() => {console.log("Can't add new user to database");});
                  }
                  else {
                    req.body.error = "User already exists ! Please choose another username";
                    res.render('signup', {error: req.body.error});
              }});
      });

/**
chooseGame page
*/

app.get('/chooseGame', function(req,res){ // if the user is not logged in, he can't directly access the chooseGame page
    if(!checkAuth(req, res)){ //he will be redirected to the login page
      req.body.error="";
      res.render("login",{error: req.body.error});
    }
    else{
    res.render("chooseGame",{});
  }
  });

  app.get('/chooseGameLogged', function(req, res) {
    console.log(checkAuth(req,res));
    if(!checkAuth(req, res)){
      req.body.error="";
      res.render("login",{error: req.body.error});
      }
      else{
        res.render('game1',{});
      }
  });

app.post('/chooseGameLogged', function(req, res) {
  req.session.username = req.body.name;
  console.log("username"+req.session.username);
  User.findOne({
              login: req.body.name
          }, function(err, user) {
              if (user) {
                    res.render("chooseGame",{username: user.login, score: user.score})
                  }
                  else {
                    req.body.error = "User does not exist ! Please sign up !";
                    res.render('login', {error: req.body.error});
              }});
      });

app.get("/backMenu", function (req,res) {
        if(!checkAuth(req, res)){
          req.body.error="";
          res.render("login",{error: req.body.error});
          }
          else{
              res.render("backMenu",{});
          }
      })

app.post("/backMenu", function(req,res){
  req.session.username = req.body.name;
  req.session.score = req.body.score;
  User.updateOne({login: req.body.name}, {score: req.session.score},
  ()=>{res.render('chooseGame', {username: req.body.name,score: req.session.score})});
})


app.get( "/disconnect", (req,res) =>{ //disconnect button, the req.session.username field is deleted
  req.session = null; //destroy session
  req.body.error=""
  res.render("login",{error: req.body.error});
});

/**
game1 page
*/

app.get('/game1', function(req, res) {
  console.log(checkAuth(req,res));
  if(!checkAuth(req, res)){
    req.body.error="";
    res.render("login",{error: req.body.error});
    }
    else{
      res.render('game1',{});
    }
});

app.post('/game1', function(req, res) {
  User.find()
    .then((users) => {
      users.sort(compareScore)
      for(i = 0; i< users.length; i++){
        users[i].rank = i+1;
      }
      req.session.username = req.body.name;
      req.session.score = req.body.score;
      console.log("username :"+req.body.name+" userscore : "+req.session.score);
      res.render('game1',{username: req.body.name,score: req.session.score,usersList: users});
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });

});

/**
gameNotAvailable page
*/

app.get("/gameNotAvailable", function (req,res) {
  if(!checkAuth(req, res)){
    req.body.error="";
    res.render("login",{error: req.body.error});
    }
    else{
        res.render("gameNotAvailable",{});
    }
})

app.post("/gameNotAvailable", function(req,res){
  req.session.username = req.body.name;
  req.session.score = req.body.score;
  res.render('gameNotAvailable', {username: req.body.name,score: req.session.score})
});


module.exports = app;
