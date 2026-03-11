class Pokemon {
  constructor(species, pokeName, level = 1) {
    this.species = species;
    this.pokeName = pokeName ? pokeName : species;
    this.level = level;

    let pokeData = WikiPk.find((p) => p.species === species);
    this.type = pokeData.type;
    this.baseExp = pokeData.baseExp;
    this.effortPoints = pokeData.effortPoints;
    this.growthRate = pokeData.growthRate;
    this.baseStats = pokeData.baseStats;
    this.moves = pokeData.moves;
    this.experiencePoints = 1 === level ? 0 : this.expForLevel(level);
    this.individualValues = {
      hp: randomBetween(0, 31),
      attack: randomBetween(0, 31),
      defense: randomBetween(0, 31),
      specialAttack: randomBetween(0, 31),
      specialDefense: randomBetween(0, 31),
      speed: randomBetween(0, 31),
    };
    this.effortValues = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };

    this.currentHp = this.stats.hp;
    this.currentMove = null;
  }
  get stats() {
    let calcStats = {};
    let level = this.level;
    for (let statsName in this.baseStats) {
      const baseStat = this.baseStats[statsName];
      const statIndividualValue = this.individualValues[statsName];
      const statEffort = Math.floor(this.effortValues[statsName] / 4);
      if (statsName === "hp") {
        calcStats[statsName] = Math.floor(
          ((2 * baseStat + statIndividualValue + statEffort) * level) / 100 +
            level +
            10,
        );
      } else {
        calcStats[statsName] = Math.floor(
          ((2 * baseStat + statIndividualValue + statEffort) * level) / 100 + 5,
        );
      }
    }
    return {
      species: this.species,
      level: this.level,
      type: this.type.join(", "),
      experiencePoints: this.experiencePoints,
      ...calcStats,
    };
  }
  expForLevel(level) {
    let newExperience = ExperienceCurves[this.growthRate];
    return Math.floor(newExperience(this.level));
  }
  prepareForBattle() {
    this.currentHp = this.stats.hp;
    this.currentMove = null;
  }
  receiveDamage(damage) {
    this.currentHp = Math.max(0, this.currentHp - damage);
  }
  setCurrentMove(move) {
    this.currentMove = Moves.find((m) => m.name === move);
  }
  isFainted() {
    return this.currentHp === 0;
  }
  attack(target) {
    if (!this.moveHits()) {
      console.log(`${this.pokeName}'s attack missed!`);
      return 0;
    }

    const critical = this.isCritical();
    const damage = critical
      ? Math.floor(this.calculateBaseDamage(target) * 1.5)
      : this.calculateBaseDamage(target);

    const effectiveness = this.calculateEffectiveness(target);
    const finalDamage = Math.floor(damage * effectiveness);

    target.receiveDamage(finalDamage);

    console.log(`${this.pokeName} used ${this.currentMove.name}!`);
    if (critical) console.log("It was a CRITICAL hit!");
    if (effectiveness > 1) console.log("It's super effective!");
    if (effectiveness < 1 && effectiveness > 0)
      console.log("It's not very effective...");
    if (effectiveness === 0)
      console.log(`It doesn't affect ${target.pokeName}...`);

    return finalDamage;
  }
  moveHits() {
    if (!this.currentMove.accuracy) return true;
    return randomBetween(1, 100) <= this.currentMove.accuracy;
  }
  isCritical() {
    return randomBetween(1, 16) === 1;
  }
  calculateBaseDamage(target) {
    const level = this.level;
    const movePower = this.currentMove.power;
    const moveType = this.currentMove.type;
    const isSpecial = SpecialMoveTypes.includes(moveType);
    let offensiveStat, targetDefensiveStat;

    if (isSpecial) {
      offensiveStat = this.stats.specialAttack;
      targetDefensiveStat = target.stats.specialDefense;
    } else {
      offensiveStat = this.stats.attack;
      targetDefensiveStat = target.stats.defense;
    }

    const finalDamage =
      Math.floor(
        Math.floor(
          (Math.floor((2 * level) / 5.0 + 2) * offensiveStat * movePower) /
            targetDefensiveStat,
        ) / 50,
      ) + 2;

    return finalDamage;
  }
  calculateEffectiveness(target) {
    let multiplier = 1;
    const moveType = this.currentMove.type;
    const targetTypes = target.type;

    const validation = TypeMultiplier[moveType];

    if (!validation) return multiplier;

    targetTypes.forEach((targetType) => {
      const value = validation[targetType];

      multiplier *= value !== undefined ? value : 1;
    });

    return multiplier;
  }
  processVictory(target) {
    const experienceWin = Math.floor((target.baseExp * target.level) / 7);
    this.experiencePoints += experienceWin;
    console.log(`${target.pokeName} FAINTED`);
    console.log(`${this.pokeName} WINS!`);
    console.log(`${this.pokeName} gained ${experienceWin} experience points`);

    const effortTypeIncreased = target.effortPoints.type;
    const effortAmountIncreased = target.effortPoints.amount;

    this.effortValues[effortTypeIncreased] += effortAmountIncreased;

    while (
      this.level < 100 &&
      this.experiencePoints >= this.expForLevel(this.level + 1)
    ) {
      this.level++;
    }
    console.log(`${this.pokeName} reached level ${this.level}!`);
  }
}
