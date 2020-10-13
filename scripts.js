/*
  Author: Jacob Angel
  Date: 10/13/2020
  Project: Mid-Term, (Curse of Galarond)
  Instructor: Kirsten Markley
  File: scripts.js
  Overview: This file is used for handling all of the logic in the game, 
    such as buttons, prompts, shops, inns, and the end quest. 
*/

/* 
  Some Notes:
  # Alot of this code, to me, feels like it was not done in the best most effiecnt way.
  # I think I tried to add too many features for how little time I had.
  # Next time I get a big project I will focus my ideas down a little smaller
     so that there isn't so much spagetti code.
  # Also i'm sorry if this is nightmare to grade I know it's alot of code to seep through.
*/

// Game Logic Variables
var currentArea = "";
var firstTimeInTown = true;
var promptCount = 0;
var towerCount = 0;
var player;
var preLog = "";

// Gets called when the game starts
function startGame() {
  document.getElementById("startButton").hidden = true;
  main.hidden = false;
  // Sets up the intro for the game
  area.innerHTML = "Introduction";
  currentArea = "Introduction";
  buttons.hidden = false;
  mainImageEl.hidden = false;
  mainImageEl.src = "Images/introImage.jpg";

  // Creates the weapons in the shop
  for (let i = 0; i < weapons.length; i++) {
    let opt = document.createElement("option");
    opt.innerHTML = weapons[i][0];
    opt.value = i;
    weaponList.appendChild(opt);
  }
  // Creates the armors in the shop
  for (let i = 0; i < armors.length; i++) {
    let opt = document.createElement("option");
    opt.innerHTML = armors[i][0];
    opt.value = i;
    armorList.appendChild(opt);
  }
  // Create a new player
  player = new Player();

  // Progress the game
  progress();
}

// Game Loop Functions
function progress() {
  buttons.hidden = true;
  // Figure out which state of the game the game is in
  switch (currentArea) {
    // The Inroduction of the game
    case "Introduction":
      if (promptCount >= introPrompt.length) {
        currentArea = "Town";
        area.innerHTML = "Mysidia";
        promptCount = 0;
        mainImageEl.src = "Images/gates.png";
        // Progressess the game into the town state
        progress();
      } else {
        // Draws out each part of the intro
        draw(introPrompt[promptCount], normalTextSound);
        promptCount++;
      }
      break;
    // The Town of the game
    case "Town":
      // If it is the players first time in the town
      if (firstTimeInTown) {
        if (promptCount >= townPrompt.length) {
          draw("What do you want to do?", normalTextSound);
          mainImageEl.src = "Images/insideTheCity.jpg";
          progressBtn.hidden = true;
          goToStoreBtn.hidden = false;
          goToInnBtn.hidden = false;
          firstTimeInTown = false;
          preLog = "";
        } else {
          // Draw out each part of the intro
          draw(townPrompt[promptCount], normalTextSound);
          promptCount++;
        }
      } 
      // If the player has already been to the town you can skip the intro prompt
      else {
        draw(preLog + "What do you want to do?", normalTextSound);
        progressBtn.hidden = true;
        goToStoreBtn.hidden = false;
        goToInnBtn.hidden = false;
        huntBtn.hidden = false;
        // If the player is at least level 4 you can start the end quest
        if(player.level > 3) {
          searchForGalarondBtn.hidden = false;
        }
      }
      break;

    // Equipment Store
    case "Store":
      draw(
        "Store Owner: Welcome to the Equipment Store! What would you like to buy?",
        lowTextSound
      );
      weaponsBtn.hidden = false;
      armorsBtn.hidden = false;
      leaveStoreBtn.hidden = false;
      break;
    // Inn
    case "Inn":
      draw("Innkeeper: Welcome to the Inn! Would you like a room for the night? (10gp)", highTextSound);
      sleepBtn.hidden = false;
      leaveInnBtn.hidden = false;
      break;
    // Overworld (Encounters area)
    case "Overworld":
      buttons.hidden = true;
      progressBtn.hidden = true;
      continueHuntBtn.hidden = true;
      returnToTownBtn.hidden = true;
      startBattle();
      break;
    // Tower area (End Quest)
    case "Tower":
      // This entire if statment is the end quest logic. It is terrible, but it works
      // Certain steps have bosses certain steps have dialog'
      // If the player reaches the last step the player wins and the game ends
      if(towerCount === 0) {
        draw("Afert days of seraching you finally know the whearabouts of galarond. You now wait outside of the tower where galarond lives.", normalTextSound);
        mainImageEl.src = "Images/tower.jpg";
        towerCount++;
      } else if(towerCount === 1) {
        progressBtn.hidden = true;
        startBattle(0); // Fight the first boss
      } else if(towerCount === 2) {
        draw("The tower guardian is defeated, your search for galarond continues.", normalTextSound);
        towerCount++;
      } else if(towerCount === 3) {
        progressBtn.hidden = true;
        startBattle(1); // Fight the second boss
      } else if(towerCount === 4) {
        draw("The dark knight is defeated, your search for galarond continues.", normalTextSound);
        towerCount++;
      } else if(towerCount === 5) {
        progressBtn.hidden = true;
        startBattle(2); // Fight the third boss
      } else if(towerCount === 6) {
        draw("The dragon was defeated and now it is time to face the king.", normalTextSound);
        towerCount++;
      } else if(towerCount === 7) {
        progressBtn.hidden = true;
        startBattle(3); // Figh the last boss
      } else if(towerCount === 8) {
        draw("You have defeated the Evil King Galarond. Now the people of Mysidia can finally be at rest!", normalTextSound);
        towerCount++;
      } else if(towerCount === 9) {
        // Ends the game
        draw("Game Over, You Win!", normalTextSound);
        buttons.hidden = true;
        progressBtn.hidden = true;
        endBtn.hidden = false;
      }
      break;
  }
}

// Gets called when the player enters the store
function goToStore() {
  // Sets the state of the game to the store and changes the elements required
  currentArea = "Store";
  area.innerHTML = "Store";
  mainImageEl.src = "Images/shop.jpg";
  goToStoreBtn.hidden = true;
  goToInnBtn.hidden = true;
  searchForGalarondBtn.hidden = true;
  huntBtn.hidden = true;
  progress();
}

// Gets called when the player enters the inn
function goToInn() {
  // Sets the state of the game to the inn and changes the elements required
  currentArea = "Inn";
  area.innerHTML = "Inn";
  mainImageEl.src = "Images/inn.png";
  goToStoreBtn.hidden = true;
  goToInnBtn.hidden = true;
  searchForGalarondBtn.hidden = true;
  huntBtn.hidden = true;
  progress();
}

// Displays the weapon shop
function showWeapons() {
  if (!armorCatalog.hidden) {
    armorCatalog.hidden = true;
  }
  weaponCatalog.hidden = false;
  buyBtn.hidden = false;
}

// Displays the armor shop
function showArmors() {
  if (!weaponCatalog.hidden) {
    weaponCatalog.hidden = true;
  }
  armorCatalog.hidden = false;
  buyBtn.hidden = false;
}

// Fixed Multiple Text bug.
// Gets called when you buy something from the shop
function buy() {
  buttons.hidden = true;
  // If the player is in the weapon shop
  if (!weaponCatalog.hidden) {
    let gp = player.gp;
    let cost = weapons[weaponList.value][1];
    // If the player trys to buy something but already owns it
    if (player.weapon === weapons[weaponList.value][0]) {
      draw("Store Owner: It looks like you already have that...", lowTextSound);
    } 
    // If the player trys to buy somthing but doesn't have enough gold
    else if (gp < cost) {
      draw(
        "Store Owner: Doesn't look like you got the gold for that...",
        lowTextSound
      );
    } 
    // The player buys a weapon
    else {
      player.gp -= cost;
      player.weapon = weapons[weaponList.value][0];
      player.atkPower = weapons[weaponList.value][2];
      draw("Store Owner: Thank you for your purchase!", lowTextSound);
    }
  } 
  // If the player is in the armor shop
  else {
    let gp = player.gp;
    let cost = armors[armorList.value][1];

    // If the player trys to buy something but already owns it
    if (player.armor === armors[armorList.value][0]) {
      draw("Store Owner: It looks like you already have that...", lowTextSound);
    } 
    // If the player trys to buy somthing but doesn't have enough gold
    else if (gp < cost) {
      draw(
        "Store Owner: Doesn't look like you got the gold for that...",
        lowTextSound
      );
    } 
    // The player buys armor
    else {
      player.gp -= cost;
      player.armor = armors[armorList.value][0];
      player.armorRating = armors[armorList.value][2];
      draw("Store Owner: Thank you for your purchase!", lowTextSound);
    }
  }
}

// Gets called when the player leaves the store
function leaveStore() {
  // Hides the shops
  if (!weaponCatalog.hidden) {
    weaponCatalog.hidden = true;
  }
  if (!armorCatalog.hidden) {
    armorCatalog.hidden = true;
  }
  // Sets the state of the game to the town and changes the elements required
  currentArea = "Town";
  weaponsBtn.hidden = true;
  armorsBtn.hidden = true;
  leaveStoreBtn.hidden = true;
  buyBtn.hidden = true;
  preLog = "You left the store. ";
  mainImageEl.src = "Images/insideTheCity.jpg";
  progress();
}

// Gets called when you sleep at the inn
// Fully Restores Hp
function restAtInn() {
  buttons.hidden = true;
  if(player.gp < 10) {
    draw("Innkeeper: It doesn't look like you have enough gold for a room...", highTextSound);
  } else {
    draw("Innkeeper: Thank you for your purchase! Enjoy your room!", highTextSound);
    player.gp -= 10;
    player.hp = player.maxHp;
  }
}

// Gets called when you leave the inn
function leaveInn() {
  // Sets the state of the game to the town and changes the elements required
  currentArea = "Town";
  leaveInnBtn.hidden = true;
  sleepBtn.hidden = true;
  preLog = "You left the Inn. ";
  mainImageEl.src = "Images/insideTheCity.jpg";
  progress();
}

// Gets called when the player opens up the sidebar inventory
function openInventory() {
  hpEl.innerHTML = "Hit Points: " + player.hp;
  strEl.innerHTML = "Strength: " + player.str;
  lvlEl.innerHTML = "Level: " + player.level;
  xpEl.innerHTML = "Total XP: " + player.xp;
  gpEl.innerHTML = "Gold Pieces: " + player.gp;
  currentWeaponEl.innerHTML = "Weapon: " + player.weapon;
  currentArmorEl.innerHTML = "Armor: " + player.armor;
  document.getElementById("inventory").style.width = "max-content";
}

// Gets called when the player closes the sidebar inventory
function closeInventory() {
  document.getElementById("inventory").style.width = "0%";
}

// Gets called when the player goes on a monster hunt
function hunt() {
  // Sets the state of the game to the overworld and changes the elements required
  currentArea = "Overworld";
  area.innerHTML = "Overworld"
  huntBtn.hidden = true;
  searchForGalarondBtn.hidden = true;
  goToStoreBtn.hidden = true;
  goToInnBtn.hidden = true;
  buttons.hidden = true;
  draw("You left the town in search for monsters.", normalTextSound);
  mainImageEl.src = "Images/overworld.jpg";
  progressBtn.hidden = false;
}

// Gets called when the players starts the end quest 
function searchForGalarond() {
  // Sets the state of the game to the tower and changes the elements required
  currentArea = "Tower";
  area.innerHTML = "Galarond's Tower";
  huntBtn.hidden = true;
  searchForGalarondBtn.hidden = true;
  goToStoreBtn.hidden = true;
  goToInnBtn.hidden = true;
  buttons.hidden = true;
  progressBtn.hidden = false;
  mainImageEl.src = "Images/overworld.jpg";
  draw("You left the town in search for Galarond.", normalTextSound);
}

// Event Listeners for buttons

// Starts the game
document.getElementById("startButton").addEventListener("click", startGame);
// Button Event Listeners
progressBtn.addEventListener("click", progress);
clearBtn.addEventListener("click", clear);
goToStoreBtn.addEventListener("click", goToStore);
goToInnBtn.addEventListener("click", goToInn);
weaponsBtn.addEventListener("click", showWeapons);
armorsBtn.addEventListener("click", showArmors);
buyBtn.addEventListener("click", buy);
leaveStoreBtn.addEventListener("click", leaveStore);
leaveInnBtn.addEventListener("click", leaveInn);
sleepBtn.addEventListener("click", restAtInn);
huntBtn.addEventListener("click", hunt);
meleeAtkBtn.addEventListener("click", attack);
continueHuntBtn.addEventListener("click", progress);
returnToTownBtn.addEventListener("click", returnToTown);
fleeBtn.addEventListener("click", flee);
searchForGalarondBtn.addEventListener("click", searchForGalarond);
endBtn.addEventListener("click", endGame);

// Event Listeners for the shops
// Armor Shop Event Listener
armorList.addEventListener("change", () => {
    // Sets the elements to match the armor slected
  document.getElementById("armorPrice").innerHTML =
    "Price: " + armors[armorList.value][1] + "gp";
  document.getElementById("armorRating").innerHTML =
    "Armor Rating: " + armors[armorList.value][2];
});

// Weapon Shop Event Listener
weaponList.addEventListener("change", () => {
  // Sets the elements to match the weapon slected
  document.getElementById("weaponPrice").innerHTML =
    "Price: " + weapons[weaponList.value][1] + "gp";
  document.getElementById("weaponPower").innerHTML =
    "Weapon Power: " + weapons[weaponList.value][2];
});

// Log Tab Event Listener
logEl.addEventListener("click", () => {
  // Logs every single line of dialog that was drawn to the screen during the game
  for(let i = 0; i < log.length; i++) {
    console.log(log[i]);
  }
});

// Ends the game by realoading the page
function endGame() {
  location.reload();
}