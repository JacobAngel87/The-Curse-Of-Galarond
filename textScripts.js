/*
  Author: Jacob Angel
  Date: 10/13/2020
  Project: Mid-Term, (Curse of Galarond)
  Instructor: Kirsten Markley
  File: battleScripts.js
  Overview: This file is responsible for handling all of the text in the game. 
    Mainly the individual char draw function.
*/

// Game Logic Variables
var count = 0;
var notDrawing = true;
var currentText;

// Audio Files Variables
var normalTextSound = "Audio/typeBlipNormal.wav";
var lowTextSound = "Audio/typeBlipLow.wav";
var highTextSound = "Audio/typeBlipHigh.wav";

// Element Variables
// Element Button Variables
var buttons = document.getElementById("buttons");
var progressBtn = document.getElementById("progress");
var clearBtn = document.getElementById("clear");
var goToStoreBtn = document.getElementById("goEquipStore");
var goToInnBtn = document.getElementById("goInn");
var leaveStoreBtn = document.getElementById("leaveStore");
var leaveInnBtn = document.getElementById("leaveInn");
var sleepBtn = document.getElementById("sleep");
var weaponsBtn = document.getElementById("weapons");
var armorsBtn = document.getElementById("armors");
var buyBtn = document.getElementById("buy");
var meleeAtkBtn = document.getElementById("melee");
var fleeBtn = document.getElementById("flee");
var huntBtn = document.getElementById("hunt");
var continueHuntBtn = document.getElementById("continueHunt");
var returnToTownBtn = document.getElementById("returnToTown");
var searchForGalarondBtn = document.getElementById("searchForGalarond");
var endBtn = document.getElementById("end");
// Other Element Buttons
var main = document.getElementById("main");
var area = document.getElementById("area");
var textContEl = document.getElementById("text");
var weaponCatalog = document.getElementById("weaponCatalog");
var armorCatalog = document.getElementById("armorCatalog");
var weaponList = document.getElementById("weaponList");
var armorList = document.getElementById("armorList");
var hpEl = document.getElementById("hp");
var gpEl = document.getElementById("gp");
var strEl = document.getElementById("str");
var xpEl = document.getElementById("xp");
var lvlEl = document.getElementById("lvl");
var currentWeaponEl = document.getElementById("currentWeapon");
var currentArmorEl = document.getElementById("currentArmor");
var mainImageEl = document.getElementById("mainImage");
var logEl = document.getElementById("logTab");
var inventoryEl = document.getElementById("inventoryTab");

// Keeps Track of everything the game has logged to the screen
var log = [];

// Adding text to the screen
function addText(text, sound) {
  // Checks to see text is currently being displayed
  if (notDrawing) {
    // If not display the text
    count = 0;
    notDrawing = false;
    log.push(text);
    // Add text to the screen char by char
    textContEl.innerHTML += "<br>";
    interval = setInterval(function () {
      drawText(text, sound);
    }, 25);
  }
  // If the clear button is hidden, make it visable
  if (clearBtn.hidden) {
    clearBtn.hidden = false;
  }
}

// Drawing each char to the screen individually
function drawText(text, sound) {
  // Checks to see if the char is out of bounds
  if (count >= text.length) {
    notDrawing = true;
    textContEl.innerHTML += "<br>";
    buttons.hidden = false;
    clearInterval(interval);
  } else {
    // If not add it to the screen and make a sound
    textContEl.innerHTML += text[count];
    // Creates a new instance of a audio object with the current sound byte attatched
    let s = new Audio(sound);
    // Play that audio byte
    s.play();
    count++;
  }
}

// Clearing the text to the screen
function requestClear() {
  // Making sure text isnt being drawn
  if (notDrawing) {
    // If not clear the screen
    count = 0;
    notDrawing = false;
    currentText = document.getElementById("text").innerHTML;
    // Clear the screen char by char but backwards
    interval = setInterval(function () {
      clearText();
    }, 1);
  }
}

// Clearing the screen from the bottom up
function clearText() {
  // Once the screen is done clearing
  if (count > currentText.length) {
    buttons.hidden = false;
    notDrawing = true;
    // Put that last thing that was drawn to the screen on the screen
    document.getElementById("text").innerHTML = log.pop() + "<br>";
    clearInterval(interval);
    clearBtn.hidden = true;
  } else {
    // Clears the last char of the 'text' element
    let sub = document
      .getElementById("text")
      .innerHTML.substring(0, currentText.length - count);
    document.getElementById("text").innerHTML = sub;
    count++;
  }
}

// Main Drawing Function
function draw(text, sound) {
  textCheck = setInterval(() => {
    checkDraw(text, sound);
  }, 1);
}

// Main Clearing Function
function clear() {
  buttons.hidden = true;
  requestClear();
}

// Checks to make sure nothing else is being drawn to the screen
function checkDraw(text, sound) {
  if (notDrawing) {
    addText(text, sound);
    clearInterval(textCheck);
  }
}

// Game Text Variables
// Intro Prompt Text
var introPrompt = [
  "Narrator: Long ago, in a far off land. There was a great city name Mysidia.",
  "Narrator: It was a vibrant city with lots of people. There were farmers, vendors, and travelers from all the lands.",
  "Narrator: They came to sell their goods and to barter, but the main attraction was the valiant king of the city, Galarond.",
  "Narrator: He held massive festiavals and feasts to show his greeting to all the travelers.",
  "Narrator: But one day the king left his great city and retreated into the mountains.",
  "Narrator: Now, without thier hero the city is in shackels.",
  "Narrator: It's up to you to find Galaraond and restore peace to this once greate city. Good Luck!",
];
// Town Prompt Text
var townPrompt = [
  "Narrator: You arriave upon the gates of Mysida.",
  "Narrator: You here a voice shout down to you from behind the gate.",
  "Local: Hold on a second let me get the gate.",
  "Narrator: The massive gates open. And you are greeted by a small man.",
  "Local: Welcome to the great city of Mysidida! We are in a little bit of trouble right now but we are always welcoming new visitors.",
  "Local: Take a look around if you want. You may want to check out the Equipment store first! Goodbye!",
];
