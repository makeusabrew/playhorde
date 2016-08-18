import Entity from "./base";

export default class Player extends Entity {
  constructor() {
    super();
    this.r = 30;
    this.cWeapon = 0;
    this.weapons = [];
  }

  addWeapon(weapon, select = false) {
    this.weapons.push(weapon);
    if (select) {
      this.cWeapon = this.weapons.length - 1;
    }
  }

  getWeapon() {
    return this.weapons[this.cWeapon];
  }

  attack() {
    const weapon = this.weapons[this.cWeapon];

    if (weapon.isBusy()) {
      return;
    }

    this.emit("fire");
    return weapon.fire(this);
  }

  isAttacking() {
    return this.weapons[this.cWeapon].isBusy();
  }
}
