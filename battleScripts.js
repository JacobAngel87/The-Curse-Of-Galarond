/*
  Author: Jacob Angel
  Date: 10/13/2020
  Project: Mid-Term, (Curse of Galarond)
  Instructor: Kirsten Markley
  File: battleScripts.js
  Overview: This file is responsible for handling all of the combat in the game.
*/

// Global Variables
// Enemy Variable
var currentEnemey;
// Logic Variables
var index;
var bossBattle = false;

// Enemy Class
// Keeps track of the stats of the current enemy
class Enemey {
    constructor() {
        this.name;
        this.hp;
        this.str;
        this.xpGiven;
        this.gpGiven;
    }
}
// Gets called when an encounter starts
function startBattle(boss) {
    let lvl = player.level;
    // Create a new enemy
    currentEnemey = new Enemey();
    // Checks to see if there is a boss
    if(boss != null) {
        // If there is, set the enemy equal to the current boss
        bossBattle = true;
        currentEnemey.name = bosses[boss][0];
        currentEnemey.hp = bosses[boss][1];
        currentEnemey.str = bosses[boss][2];
        currentEnemey.xpGiven = bosses[boss][3];
        currentEnemey.gpGiven = bosses[boss][4];
        mainImageEl.src = bosses[boss][5];
        let bossIntroPrompt = bosses[boss][6];
        meleeAtkBtn.hidden = false;
        draw(bossIntroPrompt, normalTextSound);
    } 
    // If it is not a boss battle
    else {
        // Normal Monster Battle
        bossBattle = false;
        // Create a new enemy based on the level of the player
        if(lvl < 2) {
            index = Math.floor(Math.random() * 3);
        } else{
            index = Math.floor(Math.random() * 3) + (player.level - 1) * 3;
        }
        // Show the battle buttons
        meleeAtkBtn.hidden = false;
        fleeBtn.hidden = false;
        // Create a new enemy
        currentEnemey.name = enemies[index][0];
        currentEnemey.hp = enemies[index][1];
        currentEnemey.str = enemies[index][2];
        currentEnemey.xpGiven = enemies[index][3];
        currentEnemey.gpGiven = enemies[index][4];
        mainImageEl.src = enemies[index][5];
        draw(`Out from nowhere a ${currentEnemey.name} Appears!`, normalTextSound);
    }
} 

// Attack Function
function attack() {
    buttons.hidden = true;
    // Calculate the damage delt to the enemy 
    let dmgDelt = Math.floor(Math.random() * player.atkPower) + player.str;
    // Calculate the damage taken from the enemy
    let dmgTaken = Math.floor(Math.random() * currentEnemey.str) + 1;
    // Calculate damage relived from armor
    let relief = dmgTaken * player.armorRating;
    dmgTaken -= relief;
    dmgTaken = dmgTaken.toFixed(0);
    // Subtract the damage delt to the enemy
    currentEnemey.hp -= dmgDelt;
    // If the enemy died from that attack
    if(currentEnemey.hp < 1) {
        let levelUpPrompt = "";
        // Add the gold and xp from the enemy
        player.xp += currentEnemey.xpGiven;
        player.gp += currentEnemey.gpGiven;
        // Hide the combat buttons
        meleeAtkBtn.hidden = true;
        fleeBtn.hidden = true;
        // If the encounter wasn't a boss battle
        if(!bossBattle) {
            continueHuntBtn.hidden = false;
            returnToTownBtn.hidden = false;
        } 
        // If it was
        else {
            progressBtn.hidden = false;
            towerCount++;
        }
        // Checks to see if the player leveled up
        if(checkLevelUp()) {
            levelUpPrompt = "You Leveled Up!";
        }
        draw(`You attacked the ${currentEnemey.name} dealing ${dmgDelt} point(s) of damage. The ${currentEnemey.name} is slain! You gained ${currentEnemey.xpGiven}xp and ${currentEnemey.gpGiven}gp. ${levelUpPrompt}`,normalTextSound);
    } 
    // If the enemy did not die from that attack
    else {
        // Subtract the damage taken
        player.hp -= dmgTaken;
        // If you died from that attack
        if(player.hp < 1) {
            draw(`You attacked the ${currentEnemey.name} dealing ${dmgDelt} point(s) of damage. The ${currentEnemey.name} fights back in retaliation dealing ${dmgTaken} point(s) of damage. You have died!`, lowTextSound)
            meleeAtkBtn.hidden = true;
            fleeBtn.hidden = true;
            clearBtn.hidden = true;
            endBtn.hidden = false;
        } 
        // If you didn't die
        else {
            draw(`You attacked the ${currentEnemey.name} dealing ${dmgDelt} point(s) of damage. The ${currentEnemey.name} fights back in retaliation dealing ${dmgTaken} point(s) of damage.`, normalTextSound);
        }
    }
}

// You attempt to flee from the encounter
function flee() {
    buttons.hidden = true;
    // Essientally a coin flip
    let run = Math.floor(Math.random() * 2);

    // If you fail the flee attempt
    if(run === 0) {
        // Take damage
        let dmgTaken = Math.floor(Math.random() * currentEnemey.str) + 1;
        let relief = dmgTaken * player.armorRating;
        dmgTaken -= relief;
        dmgTaken = dmgTaken.toFixed(0);
        player.hp -= dmgTaken;
        // If you died from the attack
        if(player.hp < 1) {
            draw(`You attempt to flee but fail. The ${currentEnemey.name} seizes the oppurtunity and strikes dealing ${dmgTaken} point(s) of damage! You Have Died!`, lowTextSound);
            meleeAtkBtn.hidden = true;
            fleeBtn.hidden = true;
            clearBtn.hidden = true;
            endBtn.hidden = false;
        } 
        // If you didn't die
        else {
            draw(`You attempt to flee but fail. The ${currentEnemey.name} seizes the oppurtunity and strikes dealing ${dmgTaken} point(s) of damage!`, normalTextSound);
        }
    } 
    // If you won the coin flip
    else {
        draw(`You flee from the ${currentEnemey.name}.`, normalTextSound);
        meleeAtkBtn.hidden = true;
        fleeBtn.hidden = true;
        returnToTownBtn.hidden = false;
    }
}

// Gets called when you return to the town after an encounter
function returnToTown() {
    preLog = "Weary from battle you return to Mysidia.";
    currentArea = "Town";
    continueHuntBtn.hidden = true;
    returnToTownBtn.hidden = true;
    area.innerHTML = "Mysidia";
    mainImageEl.src = "Images/insideTheCity.jpg";
    progress();
}

// Enemey Arrays
// First var is name, second is hp, 3rd is str, 4th is xp given, 5th is gp given, 6th is Image Source.
var enemies = [
    // 1st level enemies
    ["Wolf", 9, 5, 5, 6, "Images/wolf.png"],
    ["Goblin", 7, 6, 5, 10, "Images/goblin.jpeg"],
    ["Slime", 5, 3, 3, 5, "Images/slime.jpg"],

    // 2nd level enemies
    ["Mad Man", 13, 8, 8, 10, "Images/madMan.jpg"],
    ["Evil Wizard", 10, 12, 10, 10, "Images/evilWizard.jpg"],
    ["Troll", 12, 10, 10, 7, "Images/troll.jpeg"],

    // 3rd level enemies
    ["Tiger", 20, 12, 20, 15, "Images/tiger.jpg"],
    ["Spiked Devil", 21, 9, 15, 25, "Images/spikedDevil.jpg"],
    ["Snake Man", 23, 10, 19, 30, "Images/snakeMan.jpg"],

    // 4th level enemies
    ["Tiger Man", 30, 15, 28, 35, "Images/tigerMan.jpeg"],
    ["Nightmare", 32, 13, 25, 30, "Images/nightmare.jpeg"],
    ["Displacer Beast", 35, 15, 30, 25, "Images/displacer.jpg"],

    // 5th level enemies
    ["Mind Flayer", 40, 25, 40, 50, "Images/mindFlayer.jpg"],
    ["Frost Giant", 55, 20, 40, 60, "Images/frostGiant.jpg"],
    ["Black Slaad", 48, 20, 35, 45, "Images/slaad.jpg"]
];
// Last data element is the prompt given by each boss before the battle, the rest is the same
var bosses = [
    ["Tower Guardian", 50, 10, 50, 50, "Images/towerGuardian.jpeg", "A giant stone guardian blocks the path."],
    ["Dark Knight", 100, 15, 75, 100, "Images/darkKnight.jpg", "Loud steps come down the stairs. A knight in dark armor confronts you ready for battle."],
    ["Black Dragon", 225, 25, 150, 200, "Images/blackDragon.jpg", "Atop the tower a giant beast flys down, the kings dragon defends his master."],
    ["Cursed King", 350, 35, 1000, 1000, "Images/galarond.jpg", "The Cursed King Galarond stands before you. His body is lifeless and his eyes are dead."]
];