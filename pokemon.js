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

    this.currentHp = 0;
    this.currentMove = null;
  }

  get stats() {
    let calculatedStats = {};
    for (let statName in this.baseStats) {
      const baseStats = this.baseStats[statName];
      const individualValues = this.individualValues[statName];
      const effortValues = this.effortValues[statName];
      const level = this.level;
      if (statName === "hp") {
        calculatedStats[statName] =
          Math.floor(
            ((2 * baseStats + individualValues + Math.floor(effortValues / 4)) *
              level) /
              100,
          ) +
          level +
          10;
      } else {
        calculatedStats[statName] =
          Math.floor(
            ((2 * baseStats + individualValues + Math.floor(effortValues / 4)) *
              level) /
              100,
          ) + 5;
      }
    }
    return calculatedStats;
  }
  expForLevel(level) {
    let levelUp = ExperienceCurves[this.growthRate];
    return Math.floor(levelUp(level));
  }
  prepareForBattle() {
    this.currentHp = this.stats.hp;
    this.currentMove = null;
  }
  receiveDamage(damage) {
    this.currentHp = Math.max(0, this.currentHp - damage);
  }
  setCurrentMove(move) {
    this.currentMove = Moves.find((Moves) => Moves.name === move);
  }
  isFainted() {
    return this.currentHp === 0;
  }
  attack(target) {
    if (!this.moveHits()) {
      return 0;
    }

    const critical = this.isCritical();
    const damageBase = this.calculateBaseDamage(target);
    const damageAfterCritical = critical
      ? Math.floor(damageBase * 1.5)
      : damageBase;

    const effectiveness = this.calculateEffectiveness(target);
    const finalDamage = Math.floor(damageAfterCritical * effectiveness);

    target.receiveDamage(finalDamage);

    console.log(`${this.pokeName} used ${this.currentMove.name}!`);
    if (critical) console.log("It was a CRITICAL hit!");
    if (effectiveness === 0 || effectiveness < 1 && effectiveness > 0) console.log(`It's not very effective...`);

    return finalDamage;
  }
  moveHits() {
    if (!this.currentMove.accuracy) return true;
    return randomBetween(1, 100) <= this.currentMove.accuracy;
  }
  isCritical() {
    return randomBetween(1, 100) <= 6.25;
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

    // Aplicar la fórmula con los redondeos (Math.floor) solicitados
    // Fórmula: floor(floor(floor(2 * level / 5 + 2) * offensiveStat * movePower / targetDefensiveStat) / 50) + 2

    const step1 = Math.floor((2 * level) / 5 + 2);
    const step2 = Math.floor(
      (step1 * offensiveStat * movePower) / targetDefensiveStat,
    );
    const finalBaseDamage = Math.floor(step2 / 50) + 2;

    return finalBaseDamage;
  }
  calculateEffectiveness(target) {
    let multiplier = 1;
    const moveType = this.currentMove.type;
    const targetTypes = target.type;

    const relations = TypeMultiplier[moveType];

    if (!relations) return multiplier;

    targetTypes.forEach((targetType) => {
      const value = relations[targetType];

      multiplier *= value !== undefined ? value : 1;
    });

    return multiplier;
  }
  processVictory(target) {
  const expGanada = Math.floor((target.baseExp * target.level) / 7);
  this.experiencePoints += expGanada;
  console.log(`${target.pokeName} FAINTED`);
  console.log(`${this.pokeName} WINS!`);
  console.log(`${this.pokeName} gained ${expGanada} experience points`);
  
  const statAIncrementar = target.effortPoints.type;
  const cantidad = target.effortPoints.amount;
  
  this.effortValues[statAIncrementar] += cantidad;

  while (this.level < 100 && this.experiencePoints >= this.expForLevel(this.level + 1)) {
    this.level++;
  }
  console.log(`${this.pokeName} reached level ${this.level}!`);
}
}
