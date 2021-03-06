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
const express = require('express') //use express
const app = express();
const port = 3000;
require("./User")
const User = mongoose.model('User'); //use database model User
require("./Admin")
const Admin = mongoose.model('Admin'); //use database model Admin
var bodyParser = require("body-parser");
var session = require('express-session');


const server = app.listen(3000, () => { //run server
  console.log(`Express is running on port ${server.address().port}`);
});


app.use(session({  //to use express-session
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
function that compare score between two players
*/
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

/**
renders login page
*/
app.get('/', function(req, res){
  req.body.error = "";
  res.render("login",{error: req.body.error});
});

/**
signup page
*/

/**
prevents user to access the page if he is not logged in
*/
app.get("/signup", function (req,res) {
  if(!checkAuth(req, res)){ //if checkout returns false, that means the user is trying to access the page from the outside
    req.body.error=""; // thus we redirect him to the login page
    res.render("login",{error: req.body.error});
    }
    else{
        res.render("signup",{});
    }
})

/**
renders sign up page afer a user clicked the "Sign Up" button
*/
app.post("/signup", (req,res)=>{
  req.body.error = "";
  res.render("signup",{error: req.body.error});
});

/**
function that either renders the chooseGame page or displays error message if the username already exists
*/
app.post("/chooseGame",function(req,res){
  User.findOne({
              login: req.body.name // returns a set containing a user having req.body.name as a login
          }, function(err, user) {
              if (!user) { // if no such user exists
                  const user = new User(req.body); // create a new user having req.body.name as login (req.body.name is the content of the textfield in the form)
                  user.login = req.body.name;
                  user.score = 0; //by default, he has score equal to zero
                  console.log("User " + user + " registered.");
                  user.save() //register that new user in the database
                      .then(() => {res.render('./chooseGame',{username: user.login, score: user.score});}) // renders the chooseGame page with the username and the score
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

  /**
  prevents user to access the page if he is not logged in
  */
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

/**
this post has to check whether or not the user is an admin, if it is not, it checks if it is a regular user
*/
app.post('/chooseGameLogged', function(req, res) {
  req.session.username = req.body.name;
  console.log("username"+req.session.username);
  Admin.findOne({ // if the user is an admin
              login: req.body.name
          }, function(err, admin) {
              if (admin) {
                User.find() // he has to access the whole users list
                  .then((users) => {res.render("admin",{username: admin.login, usersList: users})}) //renders the admin page, with the admin name and the whole users list
                }else {
                    User.findOne({ //if the user is not registered in the admin table, we check if he is registered in the users table
                                login: req.body.name
                            }, function(err, user) {
                                if (user) { //if a user with the name given exists in the database, render the game selection page
                                      res.render("chooseGame",{username: user.login, score: user.score})
                                    }
                                    else { // if not, we display a error message
                                      req.body.error = "User does not exist ! Please sign up !";
                                      res.render('login', {error: req.body.error});
                                }});
              }});
      });

/**
    prevents user to access the page if he is not logged in
*/
app.get("/backMenu", function (req,res) {
        if(!checkAuth(req, res)){
          req.body.error="";
          res.render("login",{error: req.body.error});
          }
          else{
              res.render("backMenu",{});
          }
      })

/**
called when the
*/
app.post("/backMenu", function(req,res){
  req.session.username = req.body.name;
  req.session.score = req.body.score;
  User.updateOne({login: req.body.name}, {score: req.session.score},
  ()=>{res.render('chooseGame', {username: req.body.name,score: req.session.score})});
})

/**
called when the user clicks disconnect button
*/
app.get( "/disconnect", (req,res) =>{ //disconnect button, the req.session.username field is deleted
  req.session = null; //destroys session
  req.body.error=""
  res.render("login",{error: req.body.error}); // renders login page
});

/**
game1 page
*/

/**
prevents user to access the page if he is not logged in
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

/**
called when the user clicks "play game 1"
*/
app.post('/game1', function(req, res) {
  User.find() //gets all the users from the database
    .then((users) => {
      users.sort(compareScore) // sort them according to their score
      for(i = 0; i< users.length; i++){
        users[i].rank = i+1;
      }
      req.session.username = req.body.name;
      req.session.score = req.body.score;
      console.log("username :"+req.body.name+" userscore : "+req.session.score);
      res.render('game1',{username: req.body.name,score: req.session.score,usersList: users}); //renders game1 page with passing username,score and users list in body
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });

});

/**
gameNotAvailable page
*/

/**
prevents user to access the page if he is not logged in
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

/**
called when the user clicks game2 or game3 button, render gameNotAvailable page
*/
app.post("/gameNotAvailable", function(req,res){
  req.session.username = req.body.name;
  req.session.score = req.body.score;
  res.render('gameNotAvailable', {username: req.body.name,score: req.session.score})
});


/**
admin page
*/

/**
prevents user to access the page if he is not logged in
*/
app.get("/admin", function (req,res) {
  if(!checkAuth(req, res)){
    req.body.error="";
    res.render("login",{error: req.body.error});
    }
    else{
        res.render("admin",{});
    }
})

/**
called when the admin clicks "delete user" button, deletes the user from the database and refreshes the users table
*/
app.post("/admin", function (req,res) {
  User.deleteOne({login: req.body.name}, function(err){ //delete user from database
    if(err){
      console.log("Can not delete user ! Error : "+err.stack);
    }else{
      User.find() // update of the users table after deletion
        .then((users) => {res.render("admin",{username: req.body.name, usersList: users})}) // re-renders admin page
    }
  })
})

module.exports = app;
