var counter = 10;
var ladiv;
function init()
{
	ladiv = document.getElementById("div");
	initCounter();
}
	
initCounter = function()
{
	var intervalID = setInterval(printCounter,1000);
}

printCounter = function()
{
	if(this.counter == 0)
	{
		clearInterval(intervalID);
	}
	this.counter--;
	ladiv.innerHTML = counter;
}
