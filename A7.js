var mid=document.querySelector("#colorCode");
var newB=document.querySelector("#newB");
var easyB=document.querySelector("#easyB");
var hardB=document.querySelector("#hardB");
var tryAgain=document.querySelector("#ta");
var mode="easy";
var color;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRGB() {
	var r=getRandomInt(0,255);
	var g=getRandomInt(0,255);
	var b=getRandomInt(0,255);

	//return an object
	var color = {
		red: r,
		green: g,
		blue: b
	};

	//return the color
	return color;
}

function updateColor() {
	color=getRGB();
	mid.textContent="("+color.red+", "+color.green+", "+color.blue+")";
}

function refresh(){
	updateColor();
	tryAgain.textContent="";

	for (var i = 1; i <= 6; i++) {
		var div=document.querySelector("#sq"+i);
		if (div.classList.contains("square")) {
			div.classList.remove("square");
		}
	}

	var blocks;
	var ans;
	if (mode==="easy") {
		blocks=3;
	}
	else {
		blocks=6;
	}
	ans=getRandomInt(1,blocks);

	for (var i = 1; i <= blocks; i++) {
		
		var div=document.querySelector("#sq"+i);
		var squareColor=getRGB();

		div.classList.add("square");
		div.style.background="rgb"+"("+squareColor.red+", "+
								  squareColor.green+", "+squareColor.blue+")";
	}

	var ansBlock=document.querySelector("#sq"+ans);
	ansBlock.style.background="rgb"+mid.textContent;
}

//Picking the initial value of color...
updateColor();

//Create the first game...
refresh();

//Creating the button effect...
var buttons=[newB,easyB,hardB];
for (var i = 0; i <3; i++) {
	buttons[i].addEventListener("mouseover",function () {
		this.classList.toggle("buttonEffect");
	})
	buttons[i].addEventListener("mouseout",function () {
		this.classList.toggle("buttonEffect");
	})
}

//Handling Clicks...
easyB.addEventListener("click",function () {
	mode="easy";
	refresh();
})
hardB.addEventListener("click",function () {
	mode="hard";
	refresh();
})
newB.addEventListener("click",function () {
	refresh();
})

//Checking user input...
var options=[];
for (var i = 1; i <= 6; i++) {
	options.push(document.querySelector("#sq"+i));
	options[i-1].addEventListener("click",function () {
		if(this.style.backgroundColor !== "rgb"+mid.textContent){
			tryAgain.textContent="Try Again!";
			this.style.backgroundColor=document.body.style.backgroundColor;
		}
		else{
			tryAgain.textContent="You did it!";
			for (var j = 0; j < options.length; j++) {
				options[j].style.background="rgb"+mid.textContent;
			}
		}
	})
}