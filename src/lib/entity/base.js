import Phaser from "phaser";
import EventEmitter from "eventemitter3";

export default class Entity extends EventEmitter {
  constructor() {
    super();

    this.x = 0;
    this.y = 0;
    this.a = 0;
    this.vx = 0;
    this.vy = 0;
    this.r = 0;
    this.health = 0;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
      // @TODO angle shouldn't be returned, but need a good method name
      // for returning position and angle
      a: this.a
    };
  }

  getPoint() {
    return new Phaser.Point(this.x, this.y);
  }

  hasVelocity() {
    return this.vx !== 0 || this.vy !== 0;
  }

  tick() {
    // @NOTE: this will probably change or disappear as we move
    // to using phaser's physics stuff
    this.x += this.vx;
    this.y += this.vy;
    // brains go in here
  }

  attack() {
  }

  isAttacking() {
    return false;
  }

  receiveDamage(damage) {
    this.health -= damage;

    // @TODO emit death event if health <= 0 ?
  }

  getType() {
    return this.constructor.name;
  }
}
