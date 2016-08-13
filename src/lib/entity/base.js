export default class Entity {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.a = 0;
    this.vx = 0;
    this.vy = 0;
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

  hasVelocity() {
    return this.vx !== 0 || this.vy !== 0;
  }

  move() {
    // @NOTE: this will probably change or disappear as we move
    // to using phaser's physics stuff
    this.x += this.vx;
    this.y += this.vy;
  }
}
