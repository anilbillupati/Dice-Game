"use strict";
//selecting the elements that needed to be manipulated
const player0el = document.querySelector(".player--0");
const player1el = document.querySelector(".player--1");
const score0element = document.querySelector("#score--0");
const score1element = document.getElementById("score--1");
const currentscore0el = document.getElementById("current--0");
const currentscore1el = document.getElementById("current--1");

const diceelement = document.querySelector(".dice");
const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");

// starting conditions
let scores, currentscore, activePlayer, playing;

const initialisation = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score0element.textContent = 0;
  score1element.textContent = 0;
  currentscore0el.textContent = 0;
  currentscore1el.textContent = 0;

  diceelement.classList.add("hidden");
  player0el.classList.remove("player--winner");
  player1el.classList.remove("player--winner");
  player0el.classList.add("player--active");
  player0el.classList.remove("player--active");
};
initialisation();
const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0el.classList.toggle("player--active");
  player1el.classList.toggle("player--active");
};
//rolling dice functionality
btnroll.addEventListener("click", function () {
  //1. generate a random dice numnber
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. show on the page
    diceelement.classList.remove("hidden");
    diceelement.src = `dice-${dice}.png`;

    // check for the value is one or not
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentscore;
    document.querySelector(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;

      diceelement.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchplayer();
    }
  }
});
btnnew.addEventListener("click", initialisation);
