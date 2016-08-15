import EventEmitter from "eventemitter3";

// @NOTE: nothing to do with Phaser.State stuff. Probably
// needs renaming...

export default class EntityState extends EventEmitter {
  constructor(current) {
    super();
    this.prev = null;
    this.current = null;
    this.next = null;

    if (current) {
      this.set(current);
    }
  }

  set(state) {
    this.prev = this.current;
    this.current = state;
    this.stateTime = Date.now();
    this.emit("change", this.current, this.prev);
  }

  get() {
    return this.current;
  }

  time() {
    return this.stateTime;
  }
}
