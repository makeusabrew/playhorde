import Weapon from "./base";

const RELOAD_TIME = 1e3;

export default class Knife extends Weapon {
  fire() {
    this.readyAt = Date.now() + RELOAD_TIME;
  }
}
