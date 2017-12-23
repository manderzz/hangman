$(document).ready(function(){
	// Global variables
	var underscoresFromHTML = document.getElementById("underScores");
	var actualUnderscoresFromHTML = document.getElementById("actualUnderScores");
	var lives = 6; 
	var wrongGuesses = 0;
	var correctLetters = 0;
	var wordBank = ['water', 'wine', 'beer', 'redbull',
					'soda', 'pepsi', 'coke', 'coffee',
					'tea', 'milk', 'sprite', 'fanta'];
	var underScores = [];
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	function generatePlatform(){
		ctx.moveTo(15,185);
		ctx.lineTo(45,185);
		ctx.stroke();
		ctx.moveTo(30,185);
		ctx.lineTo(30,30);
		ctx.stroke();
		ctx.lineTo(100,30);
		ctx.stroke();
		ctx.lineTo(100,42.5);
		ctx.stroke();
	}


	function drawHangMan(number){
		if(number == 1){ 
			// Head
			ctx.beginPath();
			ctx.arc(100,67.5,24,0,2*Math.PI); //arc(x,y,r,startangle,endangle)
			ctx.stroke();
			// Draw the left eye
			ctx.beginPath();
			ctx.arc(87,60,3,0,2*Math.PI);
			ctx.stroke();
			// Draw the right eye
			ctx.beginPath();
			ctx.arc(113,60,3,0,2*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			// Draw a face
			ctx.moveTo(87,77);
			ctx.lineTo(113,77);
			ctx.stroke();
		}
		else if(number == 2){
			// Line down the body
			ctx.moveTo(100,91.5);
			ctx.lineTo(100,150);
			ctx.stroke();
		}
		else if(number == 3){
			// Left arm
			ctx.moveTo(70,90);
			ctx.lineTo(100,115.75);
			ctx.stroke();
		}
		else if(number == 4){
			// Right arm
			ctx.lineTo(130,90);
			ctx.stroke();
		}
		else if(number == 5){
			// Left leg
			ctx.moveTo(100,150);
			ctx.lineTo(70,180);
			ctx.stroke();
		}
		else{
			// Right leg
			ctx.moveTo(100,150);
			ctx.lineTo(130,180);
			ctx.stroke();
		}
	}

	// Randomly choose a word from the word bank above
	function chooseRandomWord(){
		var chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
		return chosenWord;
	}

	// Create underscores based on length of the word
	function generateUnderScores(){
		for(var i = 0; i < chosenWord.length; i++){
			underScores.push("_");
		}
		actualUnderScores = underScores.join(" ");
		actualUnderscoresFromHTML.innerHTML = actualUnderScores;
		//underscoresFromHTML.innerHTML = underScores;
	}

	function generateLetters(){
		var str = "";
		var a = 'A'.charCodeAt(0);
		for(var i = 0; i < 25; i++){
			var l = String.fromCharCode(a+i);
			str += "<h id=\"" + l + "\" href=\"#\">"+ l +"</h> \n";
		}
		document.getElementById("letters").innerHTML = str;
		return str;
	}

	// Checks if the letter is in the word
	function isCorrect(letter){
		var correct = false;
		var lowerCaseLetter = letter.toLowerCase();
		for(var i = 0; i < chosenWord.length; i++){
			if(lowerCaseLetter == chosenWord[i]){
				correctLetters++; // got 'em'
				correct = true; // correct letter
				underScores[i] = letter; // update the underscores
				actualUnderScores = underScores.join(" ");
				//underscoresFromHTML.innerHTML = underScores; 
				actualUnderscoresFromHTML.innerHTML = actualUnderScores;
			}
		}
		return correct; 
	}

	// Removes letter if present in the word
	function removeLetter(letter){
		var letterToBeRemoved = document.getElementById(letter);
		letterToBeRemoved.innerHTML = "";
	}

	// Checks if there are no more lives or the word is solved
	function isGameOver(){
		if(lives == 0){
			alert("Game over. The word was: " + chosenWord); // tell the user the correct word
			document.location.reload();
		}
		else if(correctLetters == chosenWord.length){
			alert("You win!");
			document.location.reload();
		}
		return;
	}

	// Initializes the game with 6 lives and 0 correct letters
	function initialize(){
		lives = 6;
		correctLetters = 0;
		chosenWord = chooseRandomWord();
		console.log(chosenWord);
		generateUnderScores();
		generateLetters();
		generatePlatform();

	}

	// Game start
	initialize();

	// Event management
	$("h").on("click",function(e){
		var letter = e.target.innerHTML;
		console.log(letter);
		removeLetter(letter); // remove it from the available letters

		var correct = isCorrect(letter); // true or false

		if(correct != true){
			lives--; // decrement if the letter is not in the word
			wrongGuesses++;
			drawHangMan(wrongGuesses);
			//console.log("lives is: ", lives); // make sure lives is decrementing properly
		}
		isGameOver();
	})
})