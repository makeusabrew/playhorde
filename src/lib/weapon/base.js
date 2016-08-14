export default class Weapon {
  constructor() {
    this.lastFired = 0;

    // an absolute time value when this weapon will be ready again
    this.readyAt = 0;

    this.type = "melee";
  }

  isBusy() {
    return Date.now() <= this.readyAt;
  }

  fire() {
  }
}
