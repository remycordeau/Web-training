var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//var dao = require('dummyTodosDAO'); // in the node_modules directory

let Todo = require('./Todo.js');
let Todos = require('./Todos.js');


const todos = new Todos();

// Test
const todo = new Todo({"title":"Bonjour"});
todos.addTodo(todo);
//

var app = express();

//https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());
var corsOptions = {
  origin: 'http://localhost:3030',
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/todo', cors(corsOptions),function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json(todos.getTodos());
});

app.get('/todo/:id', cors(corsOptions),function(req, res) {

    let todo = todos.getTodo(parseInt(req.params.id));
    if(undefined!=todo)
    {
        res.setHeader('Content-Type', 'application/json');
		    res.json(todo);
    }
    else
    {
		    res.send(404, 'Page introuvable !');
	  }
});

app.post('/todo', cors(corsOptions), function(req, res) {

    if(req.is('json')) //on devrait toujours tester le type et aussi la taille!
    {
		    var todo = todos.addTodo(req.body);
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
        console.log("Done adding "+JSON.stringify(todo) );
	  }else{
      res.send(400, 'Bad Request !');
    }

});
app.put('/todo/:id', cors(corsOptions), function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if(req.is('json')) //on devrait toujours tester le type et aussi la taille!
    {
		    var todo = todos.updateTodo(req.body);
        if(undefined==todo){
          res.send(404, 'Page introuvable !');
        }else{
        	res.json(todo);
        	console.log("Done updating "+JSON.stringify(todo) );
	}
    }else{
      res.send(400, 'Bad Request !');
    }

});

app.delete('/todo/:id', cors(corsOptions),function(req, res) {
    let id = todos.deleteTodo(parseInt(req.params.id));
	console.log("delete "+id+" "+req.params.id+" hop");
    if(undefined!=id){
        res.setHeader('Content-Type', 'text/plain');
	res.send(200,'OK');
    }else{
	res.send(404, 'Page introuvable !');
	}
});




app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8081);
