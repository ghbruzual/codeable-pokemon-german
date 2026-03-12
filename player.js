class Player {
  constructor(name, species, pokeName, level) {
    this.name = name;
    this.pokemon = new Pokemon(species, pokeName, level);
  }
  selectMove() {
    const availableMoves = this.pokemon.moves;
    const movesListString = availableMoves.join("\n");

    while (true) {
      let selection = prompt(
        `pick a move:\n${movesListString}\n(or cancel to run)`, availableMoves[0],
      );

      if (selection === null) {
        console.log(`${this.name} run away!`);
        return true;
      }

      const selectedMove = selection.trim();

      if (availableMoves.includes(selectedMove)) {
        this.pokemon.setCurrentMove(selectedMove);
        return false;
      }

      alert(`"${selectedMove}"Invalid move, try again.`);
    }
  }
}

class Bot extends Player {
  selectMove() {
    let options = this.pokemon.moves.length - 1 
    let pickAMove = randomBetween(0, options);
    let moveSelected = this.pokemon.moves[pickAMove]
    this.pokemon.setCurrentMove(moveSelected);
  }
}
