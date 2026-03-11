class Player {
  constructor(name) {
    this.name = name;
    this.pokemon = new Pokemon(species, pokeName, level);
  }
  selectMove() {
    const availableMoves = this.pokemon.moves.map((move) => move.name);
    const movesListString = availableMoves.join("\n");

    while (true) {
      let selection = prompt(
        `pick a move:\n${movesListString}(or cancel to run)`,
      );

      if (selection === null) {
        console.log(`${this.name} wants to run this time!.`);
        return true;
      }

      const selectedMove = selection.trim();

      if (availableMoves.includes(selectedMove)) {
        this.pokemon.setCurrentMove(selectedMove);
        console.log(`${this.name} select ${selectedMove}.`);
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
