var aCanvas;
var context;
var x = 100;
var y =100;
var x2 = 100;
var y2 = 100;
var x3 = 100;
var y3 = 100;
var intervalID;
var interval1ID;
var interval2ID;
var fourseconds;
var fourseconds1;
var fourseconds2;

function init()
{
	aCanvas=document.getElementById('myCanvas');
	context = aCanvas.getContext("2d");
	context.fillStyle = "green";
	fourseconds = setInterval(wait,4000);
}

initCounter = function()
{
	intervalID = setInterval(printRect1,100);
}

printRect1 = function()
{
	context.clearRect(x,y,50,50);
	x+=10;
	context.fillRect(x,y,50,50);
	if(x == aCanvas.width)
	{
		clearInterval(intervalID);
	}
}

printRect2 = function()
{
	context.clearRect(x2,y2,50,50);
	x2+=10;
	context.fillRect(x2,y2,50,50);
	if(x2 == aCanvas.width)
	{
		clearInterval(interval1ID);
	}
}

printRect3 = function()
{
	context.clearRect(x3,y3,50,50);
	x3+=10;
	context.fillRect(x3,y3,50,50);
	if(x3 == aCanvas.width)
	{
		clearInterval(interval2ID);
	}
}


wait = function()
{
	clearInterval(fourseconds);
	initCounter();
	fourseconds1 = setInterval(wait2,1000);
}

wait2 = function()
{
	clearInterval(fourseconds1);
	interval1ID = setInterval(printRect2,100);
	fourseconds2 = setInterval(wait3,1000);
}

wait3 = function()
{
	clearInterval(fourseconds2);
	interval2ID = setInterval(printRect3,100);
}

