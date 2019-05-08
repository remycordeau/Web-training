var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var exports = module.exports;
const getTasksURL="http://localhost:8081/todo";
const getTaskURL="http://localhost:8081/todo/1";
const postTasksURL="http://localhost:8081/todo";
const putTasksURL="http://localhost:8081/todo/1";
const deleteTasksURL="http://localhost:8081/todo/1";


let task = {
    id: 10,
    title: 'HOP HOP HOP',
    comment: 'CASCADE FUGGLE',
    tags: ["Vie Quotidienne"]
};

let updateTask = {
    id: 10,
    title: 'HOP HOP HOP',
    comment: 'CASCADE FUGGLE EastEnd',
    tags: ["Vie Quotidienne"]
};


const invocation = new XMLHttpRequest();

exports.getTask = function(){
  if(invocation){
    invocation.open('GET', getTaskURL, true);
    invocation.onreadystatechange = handler;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}


exports.getAllTasks = function(){
  if(invocation){
    invocation.open('GET', getTasksURL, false);
    invocation.onreadystatechange = handler;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.postTask = function(){
  if(invocation){
    invocation.open('POST', postTasksURL, true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = handler;
    invocation.send(JSON.stringify(task));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.putTask = function(){
  if(invocation){
    invocation.open('PUT', putTasksURL, true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = handler;
    invocation.send(JSON.stringify(updateTask));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.deleteTask = function(){
  if(invocation){
    invocation.open('DELETE', deleteTasksURL, true);
    invocation.onreadystatechange = handler;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

function handler(evtXHR){
  if (invocation.readyState == 4){
    if (invocation.status == 200){

	try{
      		let response = JSON.parse(invocation.responseText);
		console.log(response);
	}catch(err){
		console.log("invocation.responseText "+invocation.responseText);
	}

    }else{
      console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
    }
  }else{
    console.log("currently the application is at" + invocation.readyState);
  }
}

/*document.getElementById('div_get').addEventListener('click',getTask);
document.getElementById('div_getAll').addEventListener('click',getAllTasks);
document.getElementById('div_post').addEventListener('click',postTask);
document.getElementById('div_put').addEventListener('click',putTask);
document.getElementById('div_delete').addEventListener('click',deleteTask);*/
