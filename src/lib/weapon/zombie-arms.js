import Weapon from "./base";

const RELOAD_TIME = 800;

export default class ZombieArms extends Weapon {
  fire() {
    this.readyAt = Date.now() + RELOAD_TIME;
  }
}
