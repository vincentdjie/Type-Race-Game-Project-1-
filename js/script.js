// console.log("Loaded!"); //debug

//Global Variables
var sentence = [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus aperiam, nostrum eos dolorum recusandae repellendus quisquam possimus ex maiores corporis excepturi amet, unde suscipit dolore quo quae voluptas accusantium corrupti.",
    "Success is most often achieved by those who do not know that failure is inevitable. Things work out best for those who make the best of how things work out. Learn from yesterday, live for today, hope for tomorrow. Don't stop questioning.",
    "Every one suspects himself of at least one of the cardinal virtues, and this is mine: I am one of the few honest people that I have ever known. Shoot all the bluejays you want, if you can hit them, but remember it’s a sin to kill a mockingbird.",
    "The Ministry of Peace, which concerned itself with war. The Ministry of Love, which maintained law and order. And the Ministry of Plenty, which was responsible for economic affairs. Their names, in Newspeak: Minitrue, Minipax, Miniluv and Miniplenty.",
    "This paragraph was a waste of time and space. If you had not read this and I had not typed this you and I could have done something more productive than reading this mindlessly and carelessly as if you did not have anything else to do in life.",
    "Life is so precious because it is short and you are being so careless that you do not realize it until now since this void paragraph mentions that you are doing something so mindless, so stupid, so careless that you realize that you are not using your time wisely.",
    "You want to read this barren paragraph and expect something marvelous and terrific at the end. But since you still do not realize that you are wasting precious time, you still continue to read the null paragraph. Imagine the things you could’ve accomplished."
];
var gameOver = false;
const STARTING_TIME = 6;
var remainingTime = 0;
var delayHandle = null;
var timerHandle = null;
var tempSpan;
var letterCounter = 0;
var max = 6;
var min = 0; 
var int; //random number to choose the sentence from sentence array

//DOM References
var resetButton;
var timerText;
var typeBox;
var sentenceBox;
var sentenceEl;
var h2El;
var pEl;
var img = "img/nyancat.gif";
var audiostartrace;
var audio1 = new Audio();
var audio1 = new Audio();
var audio1 = new Audio();

//Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    h2El = document.getElementById("result");
    resetButton = document.getElementById("reset");
    timerText = document.getElementById("timer");
    typeBox = document.getElementById("typebox");
    sentenceBox = document.getElementById("sentencebox");
    sentenceEl = document.querySelector("#sentencebox #highlight");
    pEl = document.getElementById("highlight");
    img = document.getElementById("nyancat");
    audiostartrace = document.getElementById("startrace");
    // int = Math.floor(Math.random() * (max - min + 1) + min);
    // console.log(int); //debug

    // makeElementsForSentence(sentence[int]);
    
    audiostartrace.play();
    initGame();
    
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
        if (charStr === sentence[int].charAt(letterCounter)) {
            // they got it right
            document.getElementById("l" + letterCounter).classList.add("correct");
            letterCounter++;    
            moveCat();
    }
    //Check for win
    if (letterCounter === sentence[int].length) {
        endGame(true);
    }
    })
}

//Additional Functions

function resetAudio() {
    this.pause();
    this.currentTime = 0;
    this.play();
}

function initGame() {
    letterCounter = 0;
    remainingTime = STARTING_TIME;
    timerText.textContent = remainingTime;
    resetButton.disabled = false;
    typeBox.disabled = true;
}

function updateClock() {
    remainingTime--;
    if (remainingTime <= 0) {
        endGame(false);
    }
    timerText.textContent = remainingTime;
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
    var i = sentence[int].length / letterCounter
    console.log(i);
    if (3.9 < i && i < 4.1) {
        img.classList.remove("nyancat1")
        img.classList.add("nyancat2");
    } else if (1.9 < i && i < 2.1) {
        img.classList.remove("nyancat2");
        img.classList.add("nyancat3");
    } else if (1.2 < i && i < 1.25) {
        img.classList.remove("nyancat3")
        img.classList.add("nyancat4");
    } else if (i === 1) {
        img.classList.remove("nyancat4")
        img.classList.add("nyancat5");
    }
}

function reset() {
    gameOver = false;
    h2El.textContent = "";
    clearTimeout(delayHandle);
    clearInterval(timerHandle);
    sentenceBox.innerHTML = "";

    //generate a random number for answer array
    int = Math.floor(Math.random() * (max - min + 1) + min); 
    console.log(int); //debug
    makeElementsForSentence(sentence[int]);

    initGame();
    typeBox.disabled = false;
    resetAudio();
}

