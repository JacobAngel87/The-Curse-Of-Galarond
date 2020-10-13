/*
  Author: Jacob Angel
  Date: 10/13/2020
  Project: Mid-Term, (Curse of Galarond)
  Instructor: Kirsten Markley
  File: playerScripts.js
  Overview: This file keeps track of everything related to the player,
    stats, leveling up, and available weapons and armor.
*/

// Player Class
// Keeps track of all the players stats and items
class Player {
  constructor() {
    this.maxHp = 20;
    this.hp = this.maxHp;
    this.str = 4;
    this.gp = 50;
    this.xp = 0;
    this.level = 1;
    this.weapon = "None";
    this.armor = "None";
    this.atkPower = 0;
    this.armorRating = 0;
  }
}

// Gets called everytime a battle ends to see if the player has leveled up
function checkLevelUp() {
  // Level up to level 2
  if(player.level === 1 && player.xp >= 50) {
    player.maxHp += Math.floor(Math.random() * 10) + 5;
    player.str += 2;
    player.level = 2;
    return true;
  } 
  // Level up to level 3
  else if(player.level === 2 && player.xp >= 300) {
    player.maxHp += Math.floor(Math.random() * 10) + 8;
    player.str += 4;
    player.level = 3;
    return true;
  } 
  // Level up to level 4
  else if(player.level === 3 && player.xp >= 900) {
    player.maxHp += Math.floor(Math.random() * 10) + 19;
    player.str += 6;
    player.level = 4;
    return true;
  }
  // Level up to level 5
  else if(player.level === 4 && player.xp >= 2000) {
    player.maxHp += Math.floor(Math.random() * 10) + 27;
    player.str += 10; 
    player.level = 5;
    return true;
  }
  // Player did not level up
  else {
    return false;
  }
}

// Weapons Array, First item is Name, Second is Price, Third is Atk Power
var weapons = [
  ["Rapier", 10, 4],
  ["BroadSword", 75, 8],
  ["Flamberge", 150, 12],
  ["Mythril Longsword", 300, 20],
  ["Masamune", 700, 45]
];

// Armors Array, First item is Name, Second is Price, Third is Defence Rating 1 being the highest
var armors = [
  ["Leather Armor", 30, 0.1],
  ["Chain Mail", 100, 0.2],
  ["Half Plate", 225, 0.3],
  ["Full Plate", 400, 0.4],
  ["Mythril Plate", 600, 0.5]
];
