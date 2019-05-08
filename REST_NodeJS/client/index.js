const express = require('express');
const app = express();
const port = 3030;
const proxyClient = require("./public/js/proxyClient.js")

app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public')); // to get static pages

app.get('/', function(req, res){
    console.log("Bang!");
    res.render('client',{title:'hey'});
  }
);

app.get('/getAllTasks',function(req,res){
    proxyClient.getAllTasks();
});

app.listen(port, (err,data) => {
    console.log(`Example app listening on port ${port}! ${err}`);
  });
