var aCanvas;
var context;
var x = 100;
var y =100;
var intervalID;
var twoseconds;

function init()
{
	aCanvas=document.getElementById('myCanvas');
	context = aCanvas.getContext("2d");
	context.fillStyle = "green";
	twoseconds = setInterval(wait,2000);
}

initCounter = function()
{
	intervalID = setInterval(printRect,100);
}

printRect = function()
{
	context.clearRect(x,y,50,50);
	x+=10;
	context.fillRect(x,y,50,50);
	if(x == aCanvas.width)
	{
		clearInterval(intervalID);
		intervalID = setInterval(printRectOtherWay,100);
	}
	this.counter--;
	
}

printRectOtherWay = function()
{
	context.clearRect(x,y,50,50);
	x-=10;
	context.fillRect(x,y,50,50);
	if(x == 100)
	{
		clearInterval(intervalID);
		initCounter();
	}
	this.counter--;
}

wait = function()
{
	clearInterval(twoseconds);
	initCounter();
}
