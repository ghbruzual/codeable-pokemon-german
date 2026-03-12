class Battle {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }
  start() {
    console.log(`The battle is about to start`);
    this.prepareBattle();

    while (true) {
      this.printBattleStatus();

      let firstPlayer = this.player1.selectMove();
      if (firstPlayer) break;
      let secondPlayer = this.player2.selectMove();
      if (secondPlayer) break;

      const firstAttack = this.getFirstPokemon();
      const secondAttack =
        firstAttack === this.player1.pokemon
          ? this.player2.pokemon
          : this.player1.pokemon;

      firstAttack.attack(secondAttack);
      if (secondAttack.isFainted()) {
        console.log(`${secondAttack.pokeName} FAINTED!`);
        console.log(`${firstAttack.pokeName} WINS!`);
        firstAttack.processVictory(secondAttack);
        break;
      }

      secondAttack.attack(firstAttack);
      if (firstAttack.isFainted()) {
        console.log(`${firstAttack.pokeName} FAINTED!`);
        console.log(`${secondAttack.pokeName} WINS!`);
        secondAttack.processVictory(firstAttack);
        break;
      }
    }
    console.log("--- BATTLE END ---");
  }
  prepareBattle() {
    this.player1.pokemon.prepareForBattle();
    this.player2.pokemon.prepareForBattle();

    console.log(`${this.player1.name} sent out ${this.player1.pokemon.pokeName}!
${this.player2.name} sent out ${this.player2.pokemon.pokeName}!`);
  }
  getFirstPokemon() {
    let firstAttack = this.firstByPriority();
    if (firstAttack) return firstAttack;

    firstAttack = this.firstBySpeed();
    if (firstAttack) return firstAttack;

    return randomBetween(0, 1) > 0
      ? this.player1.pokemon
      : this.player2.pokemon;
  }
  firstByPriority() {
    let player1 = this.player1.pokemon.currentMove.priority || 0;
    let player2 = this.player2.pokemon.currentMove.priority || 0;
    if (player1 > player2) return this.player1.pokemon;
    if (player2 > player1) return this.player2.pokemon;
    return null;
  }
  firstBySpeed() {
    let player1 = this.player1.pokemon.stats.speed;
    let player2 = this.player2.pokemon.stats.speed;
    if (player1 > player2) return this.player1.pokemon;
    if (player2 > player1) return this.player2.pokemon;
    return null;
  }
  printBattleStatus() {
    const status = [
      {
        Player: this.player1.name,
        Pokemon: this.player1.pokemon.pokeName,
        Level: this.player1.pokemon.level,
        HP: `${this.player1.pokemon.currentHp}`,
      },
      {
        Player: this.player2.name,
        Pokemon: this.player2.pokemon.pokeName,
        Level: this.player2.pokemon.level,
        HP: `${this.player2.pokemon.currentHp}`,
      },
    ];
    console.table(status);
  }
}
