import EventEmitter from "eventemitter3";

export default class Weapon extends EventEmitter {
  constructor() {
    super();

    this.lastFired = 0;

    // an absolute time value when this weapon will be ready again
    this.readyAt = 0;
  }

  isBusy() {
    return Date.now() <= this.readyAt;
  }

  fire() {
  }
}
