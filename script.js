// Global Variables
let selectedVar = document.querySelector(".userGuess");
let score = document.querySelector(".Score");
let changeImg = document.querySelector(".changeDiceImg");
let allbtn = document.querySelectorAll(".btn");
let loadText = document.querySelector(".startText");
let DecideText = document.querySelector(".winnerText");
let btnCont = document.querySelector(".btnCont");
let throwDiceSound = new Audio("./sounds/throwdice.mp3");
let rollingdice = new Audio("./sounds/rollingdice.mp3");
// modal initalization
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var gameButton = document.querySelector(".play");
// modal initalization ends
let funcCheck = false;
let buttonStart = false;
let loop = 0;
let changeTimeCheck = false;
let Score = 0;
throwDiceSound.volume = 0.2;
rollingdice.volume = 0.2;
const diceInfo = [
  "dice1.png",
  "dice2.png",
  "dice3.png",
  "dice4.png",
  "dice5.png",
  "dice6.png",
];

// modal functioning
function modalPopup() {
  modal.style.display = "block";
}

// Functions and Logic
gameButton.addEventListener("click", () => {
  modal.style.display = "none";
  mainLoop();
});

gameButton.addEventListener("mousedown", () => {
  gameButton.classList.add("boxShadow");
  setTimeout(() => {
    gameButton.classList.remove("boxShadow");
  }, 600);
});

gameButton.addEventListener("click", () => {
  gameButton.classList.remove("boxShadow");
});

function mainLoop() {
  function shuffleTime() {
    // Function Variables
    let counter = 3;
    let timing;

    // Function Logic -- Running interval again and again

    buttonCheck = true;

    function time() {
      rollingdice.play();
      changeImg.setAttribute(
        "src",
        "https://cdn.dribbble.com/users/6059148/screenshots/14425859/media/3f67e0e620f3818a68a03fdb874b7a56.gif%22"
      );

      // loadText === shuffling time
      loadText.innerText = "The dice will roll in " + counter-- + " seconds";

      // Specifying If Condition to run this interval again and again after some breakTime;
      if (counter < 0) {
        throwDiceSound.play();

        buttonCheck = false;
        //  Do the Dice Roll
        DiceRoll();

        // Interval Part

        clearInterval(timing); // Clearing Interval when counter is less than 0;
        counter = 3;

        // To get realisticness
        setTimeout(() => {
          loadText.innerText = "Loading for the next Round!";
        }, 1000);

        // Creating setTimeout for little break;

        setTimeout(() => {
          timing = setInterval(() => {
            buttonCheck = true;
            time();
          }, 1000);
        }, 3000);

        //  End of Interval Part

        // creating a setTimeout for selectedVar.innerText
        setTimeout(() => {
          selectedVar.innerText = 0;
        }, 1000);

        // Check winner
        checkWinner();
      }
      workOfBtn(); // Run the Btn Function
    }
    timing = setInterval(time, 1000);
  }

  setTimeout(shuffleTime, 1000);

  let randomNumber;

  function DiceRoll() {
    // Only for DiceRoll Purpose
    let randomNumber = Math.floor(Math.floor(Math.random() * diceInfo.length)); // Getting the Random Number from the img object
    let randomDiceRoll = diceInfo[randomNumber]; // Getting the whole object that is given by the Random Number
    changeImg.setAttribute("src", "images/" + randomDiceRoll); // Setting the DiceRoll object src into img src
    return randomNumber;
  }

  function workOfBtn() {
    if (buttonCheck == true) {
      // Check if the BtnCheck is true
      btnStyleNone("auto");
      allbtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedVar.innerText = btn.innerText;
        });

        if (selectedVar.innerText === btn.innerText) {
          btnStyleNone("none");
        }
      });
    } else if (!buttonCheck) {
      // Check if the BtnCheck is false
      btnStyleNone("none");
    }
    return selectedVar.innerText;
  }

  function btnStyleNone(type) {
    // Function to concise the code for BtnWork function
    allbtn.forEach((item) => {
      item.style.cursor = "pointer";
      item.style.pointerEvents = type;
      item.style.userSelect = type;
    });
  }

  function checkWinner() {
    let diceRollNumber = Number(DiceRoll()) + 1;
    if (Number(workOfBtn()) == diceRollNumber) {
      Score += 1;
      score.innerText = Score;
      DecideText.innerText = "Nice! You Won";
    } else if (selectedVar.innerText == 0) {
      DecideText.innerText =
        "You didn't choose anything! It was " + diceRollNumber;
    } else {
      DecideText.innerText = "You Lost! The Number was " + diceRollNumber;
    }
  }

  allbtn.forEach((item) => {
    item.addEventListener("mousedown", () => {
      item.classList.add("boxShadow");
    });

    item.addEventListener("click", () => {
      item.classList.remove("boxShadow");
    });
  });
}
