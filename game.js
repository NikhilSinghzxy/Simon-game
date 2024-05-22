var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    document.querySelector("h1").innerHTML = ("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    document.querySelector("#" + randomChosenColor).style.backgroundColor = "grey" ;
    setTimeout(function(){
        document.querySelector("#" + randomChosenColor).style.backgroundColor = randomChosenColor;
    }, 100);
    playSound(randomChosenColor);
}

function animatePress(currentColor){
    document.querySelector("#" + currentColor).classList.add("pressed");
    setTimeout(function(){
        document.querySelector("#" + currentColor).classList.remove("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            //console.log("success");
            setTimeout(nextSequence, 1000);
        }
    }      
    else{
        //console.log("wrong");
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

for(var i=0 ; i<document.querySelectorAll(".btn").length ;i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        var userChosenColor = this.getAttribute("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        //console.log(userClickedPattern);                     
        checkAnswer(userClickedPattern.length - 1);
    });
}

document.addEventListener("keydown", function(){
    if(!started){
        document.querySelector("h1").innerHTML = "Level" + level;
        nextSequence();
        started = true;
    }
});