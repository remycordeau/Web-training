const Todo = require("./Todo.js");
const data = require("./data.json");


class Todos{
  constructor(){
    this.todos = new Map();
    data.forEach((item, index, array) => {
      let newTodo = new Todo(item);
      this.todos.set(newTodo.id,newTodo);
    });
  }
  get size(){
    return this.todos.size;
  }
  addTodo(todo){
    let newTodo = new Todo(todo);
    console.log("addTodo :"+JSON.stringify(newTodo));
    this.todos.set(newTodo.id,newTodo);
    return this.getTodo(newTodo.id);
  }
  getTodo(id){
    this.todos.forEach(logMapElements);
    console.log(typeof id);
    console.log("getting todo with id "+id+" : "+JSON.stringify(this.todos.get(id)));
    return this.todos.get(id);
  }
  deleteTodo(id){
    this.todos.forEach(logMapElements);
    let todo = this.todos.get(id);
	console.log("todo :"+JSON.stringify(todo));
    if(undefined!=todo){
      this.todos.delete(id);
      return id;
    } else {
      return undefined;
    }
  }
  updateTodo(updatedTodo){
    const hasTodo = this.todos.has(updatedTodo.id);
    if(hasTodo){
      this.todos.set(updatedTodo.id,updatedTodo);
      return updatedTodo;
    } else {
      return undefined;
    }
  }
  getTodos(){
    let tabTodos = [];
    for (const v of this.todos.values()) {
      tabTodos.push(v);
    }
    return tabTodos;
  }
  deleteTodos(){
    this.todos.clear();
  }

}

function logMapElements(value, key, map) {
  console.log("m["+key+"] = "+JSON.stringify(value));
}


module.exports = Todos;
