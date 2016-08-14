import Phaser from "phaser";
import Weapon from "./base";

const RELOAD_TIME = 1e3;

export default class Knife extends Weapon {
  fire() {
    const now = Date.now();

    this.lastFired = now;
    this.readyAt = now + RELOAD_TIME;

    this.emit("fire");
  }

  isInDamagePhase(now) {
    return now >= this.lastFired + 300 && now <= this.lastFired + 700;
  }

  currentDamage() {
    return 100;
  }

  isHitting(owner, target) {
    return Phaser.Point.distance(owner.getPoint(), target.getPoint()) < 40;
  }
}
