export default class Entity {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.a = 0;
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
}
