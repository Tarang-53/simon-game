var userClickedPattern = [];
var gamePattern = [];

var buttonColor = ["red","blue","yellow","green"];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(started ==  false)
        nextSequence();
    started = true;
})

$(".btn").click(function() {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    animatePress(userChoosenColor);
    playSound(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    randomNumber = Math.floor(Math.random()*4);
    randomChoosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}



function playSound(colour) {
    var sound = new Audio("sounds/"+colour+".mp3");
    sound.play();
}

function animatePress(colour) {
    $("#"+colour).addClass("pressed");
    setTimeout(function() {
        $("#"+colour).removeClass("pressed");
    },100);
}





