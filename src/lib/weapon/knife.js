import Phaser from "phaser";
import Weapon from "./base";

const RELOAD_TIME = 1e3;

export default class Knife extends Weapon {
  constructor() {
    super();

    this.type = "melee";
  }

  fire() {
    const now = Date.now();

    this.lastFired = now;
    this.readyAt = now + RELOAD_TIME;

    this.emit("fire");
  }

  isInDamagePhase(now) {
    return now >= this.lastFired + 200 && now <= this.lastFired + 600;
  }

  currentDamage() {
    return 100;
  }

  isHitting(owner, target) {
    return Phaser.Point.distance(owner.getPoint(), target.getPoint()) < 40;
  }
}
