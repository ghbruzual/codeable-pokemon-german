// Clase GAME!!!

class Game {
  constructor() {
    this.player = null;
  }

  async start() {
    await Game.countdown();

    const info = Game.welcome();
    if (!info) return;
    const [name, species, nickname] = info;
    this.player = new Player(name, species, nickname);
    this.menu();
  }

  static async countdown() {
    for (let i = 3; i > 0; i--) {
      console.clear();
      console.log(`Game will start in ${i} seconds`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.clear();
  }

  static welcome() {
    let playerInfo = [];
    alert(`Welcome to Pokemon Yelow
          
Hello there! Welcome to the world of Pokemon! my name is Oak! people call me Professor Oak      
    
This world is inhabited by creatures calles Pokemon! for some people, Pokemons are pets. Others use them for fights.
    
Myself... I study Pokemon as a profession.`);

    let trainerName = Game.nameInfo();
    if (trainerName === null) return;
    alert(`Very Good, so your name is ${trainerName}, nice to meet you.
  
Your very own POKEMON legend is about to unfold! A world of dreams and adventures with POKEMON awaits! Let´s go!
          
Here, ${trainerName} there are 3 POKEMON here!
          
When I was young, I was a serious POKEMON trainer. In my old age, I have only 3 left, but you can have one!`);
    playerInfo.push(trainerName);
    let selectedPokemon = Game.pickAPokemon();
    if (selectedPokemon === null) return;
    playerInfo.push(selectedPokemon);
    let pokemonName = prompt(`You can name your pokemon:`, selectedPokemon);
    if (pokemonName === null) {
      Game.goodbye();
      return null;
    }
    alert(`${trainerName}, raise your young ${pokemonName === "" ? "pokemon" : pokemonName} by making it fight!
          
When you feel ready you can challenge BROCK, the PEWTER´s GYM LEADER`);
    playerInfo.push(pokemonName);
    return playerInfo;
  }

  menu() {
    let menu = prompt(`what do you want to do next?
Train
Stats
Leader`);
    if (menu === null) {
      Game.goodbye();
      return null;
    } else if (menu === "Train") {
    } else if (menu === "Stats") {
      this.showStats();
      return this.menu();
    } else if (menu === "Leader") {
    } else {
      alert(`invalid Option!`);
      return this.menu();
    }
  }

  static train() {
    let opponent = new Bot()

    alert(`Do you want to fight?`)
    console.log(`${this.player.name} challenges ${opponent.name} for training`)
    console.log(`${opponent.name} has a ${opponent.pokeName} level ${opponent.level}`)
  }

  showStats() {
    console.table(this.player.pokemon.stats);
  }

  static goodbye() {
    console.log(`Thanks for playing Pokemon Yellow`);
    console.log(`This game was created with love by: German`);
  }
  static nameInfo() {
    let optionalName = "Ash";
    let trainerName;
    trainerName = prompt("What is yuor name trainer?", optionalName);
    if (trainerName === null) {
      Game.goodbye();
      return null;
    } else if (trainerName === "") {
      alert(`Before to continue, we need to know, who are you?`);
      return Game.nameInfo();
    } else {
      return trainerName;
    }
  }
  static pickAPokemon() {
    let optionalPokemon = "Bulbasaur";
    let selectedPokemon;
    selectedPokemon = prompt(
      `What Pokemon do you prefer to start yuor adventure:
  Bulbasaur
  Charmander
  Squirtle`,
      optionalPokemon,
    );
    if (selectedPokemon === null) {
      Game.goodbye();
      return null;
    } else if (selectedPokemon === "") {
      alert(`Before to continue, we need to know, what Pokemon do you prefer?`);
      return Game.pickAPokemon();
    } else {
      alert(`Excelent you pick a ${selectedPokemon}`);
      return selectedPokemon;
    }
  }
  static getRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * Pokemons.length);
    return Pokemons[randomIndex];
  }
  static getRandomLevel() {
    return Math.floor(Math.random() * 5) + 1;
  }
}

const myGame = new Game();

myGame.start();

