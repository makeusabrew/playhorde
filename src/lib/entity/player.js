import Entity from "./base";

export default class Player extends Entity {
  constructor() {
    super();
    this.cWeapon = 0;
    this.weapons = [];
  }

  addWeapon(weapon, select = false) {
    this.weapons.push(weapon);
    if (select) {
      this.cWeapon = this.weapons.length - 1;
    }
  }

  attack() {
    const weapon = this.weapons[this.cWeapon];
    if (weapon.isBusy()) {
      return;
    }
    weapon.fire();
  }
}
