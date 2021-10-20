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
  {
    src: "dice1.png",
    value: 1,
  },
  {
    src: "dice2.png",
    value: 2,
  },
  {
    src: "dice3.png",
    value: 3,
  },
  {
    src: "dice4.png",
    value: 4,
  },
  {
    src: "dice5.png",
    value: 5,
  },
  {
    src: "dice6.png",
    value: 6,
  },
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
  item.classList.add("boxShadow");
  setTimeout(() => {
    item.classList.remove("boxShadow");
  }, 600);
});

gameButton.addEventListener("click", () => {
  item.classList.remove("boxShadow");
});

function mainLoop() {
  function changeTime() {
    buttonStart = true;
    var setTimeoutTime;
    var counter = 3;
    setTimeout(() => {
      rollingdice.play();
    }, 1700);
    for (
      setTimeoutTime = 1000;
      setTimeoutTime <= 4000;
      setTimeoutTime += 1000
    ) {
      setTimeout(() => {
        loadText.innerText =
          "The Dice will shuffle in " + counter-- + " seconds";
        changeImg.setAttribute(
          "src",
          "https://cdn.dribbble.com/users/6059148/screenshots/14425859/media/3f67e0e620f3818a68a03fdb874b7a56.gif"
        );
      }, setTimeoutTime);
    }
    setTimeout(() => {
      loadText.innerText = "Get Ready for next round";
    }, 6000);
    funcCheck = true;
    return funcCheck;
  }
  setTimeout(changeTime, 2000);

  let value;

  function diceRoll() {
    let diceRollSrc = "";
    let randomNumber = Math.floor(
      Math.floor(Math.random() * Object.values(diceInfo).length)
    );
    let randomDiceRoll = Object.values(diceInfo)[randomNumber];
    throwDiceSound.play();
    changeImg.setAttribute("src", "images/" + randomDiceRoll.src);
    diceRollSrc += "images/" + randomDiceRoll.src;
    console.log(diceRollSrc);
    value = randomDiceRoll.value;
    return value;
  }

  function checkIfCompleted() {
    if (funcCheck) {
      diceRoll();
      allbtn.forEach((item) => {
        item.style.pointerEvents = "auto";
      });
    }
  }
  // 3000 + 6000 = 9000
  // run both changeTime and check function repeatedly through setTimout and increment the time after it's completed
  var seconds = 5000;

  function gameLoop() {
    function changeTimeLoop() {
      setInterval(() => {
        changeTime();
      }, seconds);
      changeTimeCheck = true;
    }
    changeTimeLoop();

    function checkLoop() {
      setInterval(() => {
        checkIfCompleted();
        checkWinner();
        setTimeout(() => {
          selectedVar.innerText = 0;
        }, 200);
      }, seconds);
    }
    if (changeTimeCheck) {
      checkLoop();
    }
  }
  setTimeout(gameLoop, 2000);

  function buttonWork() {
    if (buttonStart) {
      allbtn.forEach((item) => {
        item.addEventListener("click", () => {
          selectedVar.innerText = item.innerText;
          allbtn.forEach((item) => {
            item.style.pointerEvents = "none";

            setTimeout(() => {
              item.style.pointerEvents = "auto";
            }, 5000);
          });
        });
      });
    } else {
      allbtn.forEach((item) => {
        item.addEventListener("click", () => {
          allbtn.forEach((item) => {
            item.style.pointerEvents = "auto";
          });
        });
      });
    }

    return selectedVar.innerText;
  }
  setInterval(buttonWork, 2000);

  function checkWinner() {
    if (Number(buttonWork()) == value) {
      Score += 1;
      score.innerText = Score;
      DecideText.innerText = "Nice! You Won";
    } else if (selectedVar.innerText == 0) {
      DecideText.innerText = "You didn't choose anything!";
    } else {
      DecideText.innerText = "You Lost! The number was " + value;
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
