var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  $("h1").text("level " + level);
  userClickedPattern = [];
  level++;
  var rng = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[rng];
  gamePattern.push(randomChosenColour);
  console.log("gm " + gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log("user" + userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer((userClickedPattern.length) - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"), 100;
  })
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    $("body").addClass("game-over");
    setTimeout(function() {

      $("body").removeClass("game-over"), 300;
      $("h1").text("Game Over, Press Any Key to Restart");
      var over = new Audio("sounds/wrong.mp3");
      startOver();
    })
  }
}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
