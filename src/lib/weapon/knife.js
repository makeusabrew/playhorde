import Weapon from "./base";

const RELOAD_TIME = 1e3;

export default class Knife extends Weapon {
  fire() {
    const now = Date.now();

    this.lastFired = now;
    this.readyAt = now + RELOAD_TIME;

    this.emit("fire");
  }

  isDoingDamage(now) {
    return now >= this.lastFired + 100 || now <= this.lastFired + 600;
  }

  currentDamage() {
    return 100;
  }
}
