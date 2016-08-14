import Weapon from "./base";

const RELOAD_TIME = 500;

export default class Handgun extends Weapon {
  constructor() {
    super();

    this.type = "projectile";
  }

  fire({x, y, a}) {
    const now = Date.now();

    this.lastFired = now;
    this.readyAt = now + RELOAD_TIME;

    this.emit("fire");

    x = y + a + x;
  }
}
