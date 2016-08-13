export default class Weapon {
  constructor() {
    this.lastFired = 0;

    // an absolute time value when this weapon will be ready again
    this.readyAt = 0;
  }

  isBusy() {
    return Date.now() <= this.readyAt;
  }

  fire() {
    throw new Error("Not implemented");
  }
}
