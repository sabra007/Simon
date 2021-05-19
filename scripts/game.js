var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

// Start the game when a key was pressed
$(document).keypress(function (event) {
	if (!gameStarted) {
		$("#level-title").text("Level 0");
		nextSequence();
		gameStarted = true;
	}
});

// Detect what button was clicked
// Add the color to the array
// play sound
$(".btn").click(function () {
	userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSonud(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	level++;
	$("#level-title").text(`Level ${level}`);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor)
		.fadeOut(100)
		.fadeIn(100);
	playSonud(randomChosenColor);
}

function playSonud(name) {
	let sound = new Audio("sounds\\" + name + ".mp3");
	sound.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		//check if user finished the game
		if (userClickedPattern.length === gamePattern.length) {
			// delay 1000ms
			// go to next level
			setTimeout(function () {
				//your code to be executed after 1 second
				userClickedPattern = [];
				nextSequence();
			}, 1000);
		}
	} else {
		playSonud("wrong");
		$("body").addClass("game-over");

		setTimeout(function () {
			//your code to be executed after 1 second
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
	gameStarted = false;
}
