// console.log("Loaded!"); //debug

//Global Variables
var sentence = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus aperiam, nostrum eos dolorum recusandae repellendus quisquam possimus ex maiores corporis excepturi amet, unde suscipit dolore quo quae voluptas accusantium corrupti."
var gameOver = false;
const STARTING_TIME = 40;
var remainingTime = 0;
var delayHandle = null;
var timerHandle = null;
var tempSpan;
var letterCounter = 0;

//DOM References
var resetButton;
var timerText;
var typeBox;
var sentenceBox;
var sentenceEl;
var h2El;
var pEl;
var img;

//Event Listeners
// document.addEventListener("DOMContentLoaded", function() {
    h2El = document.getElementById("result");
    resetButton = document.getElementById("reset");
    timerText = document.getElementById("timer");
    typeBox = document.getElementById("typebox");
    sentenceBox = document.getElementById("sentencebox");
    sentenceEl = document.querySelector("#sentencebox #highlight");
    pEl = document.getElementById("highlight");
    img = document.getElementById("nyancat1");

    makeElementsForSentence(sentence);
    
    initGame();
    moveCat();
    
    resetButton.addEventListener("click", function(e) {
        console.log("Clicked reset button!") //debug
        reset();
        timerHandle = setInterval(updateClock, 1000);
    });

// })

//makes span for each letter
function makeElementsForSentence(s) {
    for (let i = 0; i < s.length; i++) {
      tempSpan = document.createElement('span');
      tempSpan.id = "l" + i;
      tempSpan.textContent = s.charAt(i);
      sentenceBox.appendChild(tempSpan);
    }
  }

typeBox.addEventListener("keypress", function(e) {
    // console.log("On keypress event works!") //debug
    // This line looks in the event to read the code for the character
    var charCode = e.keyCode || e.which;
    // This line actually makes a string out of that code
    var charStr = String.fromCharCode(charCode);
    // clear the box
    this.value = '';
    // Check to see if the key was correct
    if (charStr === sentence.charAt(letterCounter)) {
        // they got it right
        document.getElementById("l" + letterCounter).classList.add("correct");
        letterCounter++;    
    }

    //for nyan cat progress bar
    return letterCounter;

    //Check for win
    if (letterCounter === sentence.length) {
        endGame(true);
    }
})

//Additional Functions

function initGame() {
    letterCounter = 0;
    remainingTime = STARTING_TIME;
    timerText.textContent = "0: " + remainingTime;
    resetButton.disabled = false;
    typeBox.disabled = true;
}

function updateClock() {
    remainingTime--;
    if (remainingTime <= 0) {
        endGame(false);
    }
    timerText.textContent = "0: " + remainingTime;
}

// uses true or false(win) value from checkLetter(), if all sentence are typed correctly, game ends
function endGame(win) {
    clearTimeout(delayHandle);
    clearInterval(timerHandle);
    gameOver = true;
    //if resetButton is enabled
    resetButton.disabled = true;
    if(win) { 
        console.log('You won!');
        h2El.textContent = "Congratulations, you won!"
        initGame();
    } else {
        console.log("You lose, type faster slowpoke!")
        h2El.textContent = "You LOSE, type faster slowpoke!"
        typeBox.disabled = true;
        delayHandle = setTimeout(function() {
            initGame();
        }, 750);
    }
}

function moveCat() {
    var i = sentence.length / letterCounter
    
    switch(i)
    {
        case i = 4:
            img.classList.add("nyancat2");
            break;

        case i = 3:
            img.classList.add("nyancat3");
            break;

        case i = 2:
            img.classList.add("nyancat4");
            break;

        case i = 1:
            img.classList.add("nyancat5");
            break;
    }
}

function reset() {
    gameOver = false;
    h2El.textContent = "";
    clearTimeout(delayHandle);
    clearInterval(timerHandle);
    pEl.classList.add("reset");
    initGame();
    typeBox.disabled = false;
}

