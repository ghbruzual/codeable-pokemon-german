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
    Game.menu(this);
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
    alert(`${trainerName}, raise your young ${pokemonName === "" ? selectedPokemon : pokemonName} by making it fight!
          
When you feel ready you can challenge BROCK, the PEWTER´s GYM LEADER`);
    playerInfo.push(pokemonName);
    return playerInfo;
  }

  static menu(instance) {
    let continuePlaying = true;

    while (continuePlaying) {
      let choice = prompt(`What do you want to do next, ${instance.player.name}?
- Train
- Stats
- Leader
(Click 'Cancel' to Exit)`, "Train");

      if (choice === null) {
        Game.goodbye();
        continuePlaying = false;
        break;
      }

      let action = choice.trim().toLowerCase();

      if (action === "train") {
        instance.train();
      } else if (action === "stats") {
        instance.showStats();
      } else if (action === "leader") {
        instance.challengeLeader();
      } else {
        alert("Invalid Option! Please write Train, Stats, or Leader.");
      }
    }
  }

  train() {
    const randomSpecies = Game.getRandomPokemon();
    const randomLevel = Game.getRandomLevel();
    const opponent = new Bot("Random Person", randomSpecies, randomSpecies, randomLevel);

    console.log(`${this.player.name} challenges ${opponent.name} for training`);
    console.log(
      `${opponent.name} has a ${opponent.pokemon.species} level ${opponent.pokemon.level}`,
    );

    const wantToFight = confirm(
      `Do you want to fight against ${opponent.name}?`,
    );
    if (wantToFight) {
      console.log(
        `${this.player.name} challenges ${opponent.name} to a training match!`,
      );

      const battle = new Battle(this.player, opponent);
      battle.start();
    } else {
      alert("You managed to avoid the fight.");
    }
  }

  showStats() {
    console.table(this.player.pokemon.stats);
  }

  challengeLeader() {
    const opponent = new Bot("Brock", "Onix", "Onix", 10);

    console.log(
      `${this.player.name} challenges Leader ${opponent.name} for a Badge!`,
    );
    console.log(
      `${opponent.name} has an ${opponent.pokemon.species} level ${opponent.pokemon.level}`,
    );

    const wantToFight = confirm(
      `Are you ready to face Leader ${opponent.name}?`,
    );

    if (wantToFight) {
      console.log(`${this.player.name} is entering the Pewter City Gym!`);
      const battle = new Battle(this.player, opponent);
      battle.start();
    } else {
      alert("You decided you need more training before facing Brock.");
    }
  }

  static goodbye() {
    console.log(`Thanks for playing Pokemon Yellow`);
    console.log(
      `This game was created by: NINTENDO and this copy with love by: ghbruzual`,
    );
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
    const randomIndex = Math.floor(Math.random() * WikiPk.length);
    return WikiPk[randomIndex].species;
  }
  static getRandomLevel() {
    return Math.floor(Math.random() * 5) + 1;
  }
}

const myGame = new Game();

myGame.start();
