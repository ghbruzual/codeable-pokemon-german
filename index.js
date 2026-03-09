// Alert de Bienvenida!!!

let timing = 3;
function initialInfo() {
  let countdown = setInterval(() => {
    console.clear();
    console.log(`Game will start in ${timing} seconds`);
    timing--;
    if (timing < 0) {
      clearInterval(countdown);
      alert(`Welcome to Pokemon Yelow
        
Hello there! Welcome to the world of Pokemon! my name is Oak! people call me Professor Oak      
  
This world is inhabited by creatures calles Pokemon! for some people, Pokemons are pets. Others use them for fights.
  
Myself... I study Pokemon as a profession.`);

      let trainerName = nameInfo();
      if (trainerName === undefined) return;
      alert(`Very Good, so your name is ${trainerName}, nice to meet you.

Your very own POKEMON legend is about to unfold! A world of dreams and adventures with POKEMON awaits! Let´s go!

Here, ${trainerName} there are 3 POKEMON here!

When I was young, I was a serious POKEMON trainer. In my old age, I have only 3 left, but you can have one!`);
      let selectedPokemon = pickAPokemon();
      let pokemonName = prompt(`You can name your pokemon:`, selectedPokemon);
      alert(`${trainerName}, raise your young ${pokemonName} by making it fight!

When you feel ready you can challenge BROCK, the PEWTER´s GYM LEADER`);
    }
    return;
  }, 1000);
}

function nameInfo() {
  let optionalName = "Ash";
  let trainerName;
  trainerName = prompt("Cual es tu nombre entrenador", optionalName);
  if (trainerName === null) {
    console.log(`Thanks for playing Pokemon Yellow`);
    console.log(`This game was created with love by: German`);
    return;
  } else if (trainerName === "") {
    alert(`Before to continue, we need to know, who are you?`);
    nameInfo();
  } else {
    return trainerName;
  }
}
function pickAPokemon() {
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
    console.log(`Thanks for playing Pokemon Yellow`);
    console.log(`This game was created with love by: German`);
    return;
  } else if (selectedPokemon === "") {
    alert(`Before to continue, we need to know, what Pokemon do you prefer?`);
    pickAPokemon();
  } else {
    alert(`Excelent you pick a ${selectedPokemon}`)
    return selectedPokemon;
  }
}

initialInfo();
