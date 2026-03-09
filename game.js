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
    if (trainerName === undefined) return;
    alert(`Very Good, so your name is ${trainerName}, nice to meet you.
  
Your very own POKEMON legend is about to unfold! A world of dreams and adventures with POKEMON awaits! Let´s go!
          
Here, ${trainerName} there are 3 POKEMON here!
          
When I was young, I was a serious POKEMON trainer. In my old age, I have only 3 left, but you can have one!`);
    playerInfo.push(trainerName);
    let selectedPokemon = Game.pickAPokemon();
    playerInfo.push(selectedPokemon);
    let pokemonName = prompt(`You can name your pokemon:`, selectedPokemon);
    alert(`${trainerName}, raise your young ${pokemonName} by making it fight!
          
When you feel ready you can challenge BROCK, the PEWTER´s GYM LEADER`);
    playerInfo.push(pokemonName);
    return playerInfo;
  }

  static nameInfo() {
    let optionalName = "Ash";
    let trainerName;
    trainerName = prompt("Cual es tu nombre entrenador", optionalName);
    if (trainerName === null) {
      Game.goodbye();
    } else if (trainerName === "") {
      alert(`Before to continue, we need to know, who are you?`);
      Game.nameInfo();
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
    } else if (selectedPokemon === "") {
      alert(`Before to continue, we need to know, what Pokemon do you prefer?`);
      Game.pickAPokemon();
    } else {
      alert(`Excelent you pick a ${selectedPokemon}`);
      return selectedPokemon;
    }
  }

  static goodbye() {
    console.log(`Thanks for playing Pokemon Yellow`);
    console.log(`This game was created with love by: German`);
    return;
  }
}
