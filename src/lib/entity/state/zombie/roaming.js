import Phaser from "phaser";
import State from "../base";

const Point = Phaser.Point;

export default class RoamingState extends State {
  constructor() {
    super();

    this.destination = null;
  }

  execute(zombie) {
    if (zombie.isTargetNear()) {
      return zombie.setState("tracking");
    }

    // if we don't have anywhere to head to, pick a random point
    // sort of near us
    if (!this.destination) {
      this.destination = new Point(
        zombie.x + (Math.floor(Math.random() * 301) - 150),
        zombie.y + (Math.floor(Math.random() * 301) - 150)
      );

      const radAngle = Point.angle(
        // order matters here otherwise we get the opposite (wrong) heading
        this.destination,
        zombie.getPoint()
      );

      zombie.a = Phaser.Math.radToDeg(radAngle);

      // set our velocity then bail, we're good to go
      zombie.vx = Math.cos(radAngle) * zombie.speed;
      zombie.vy = Math.sin(radAngle) * zombie.speed;
      return;
    }

    // already had a point we were heading towards - check we haven't reached it
    const distance = Point.distance(zombie.getPoint(), this.destination, true);

    if (distance <= 1) {
      // close enough...

      if (Math.floor(Math.random() * 2) === 0) {
        return zombie.setState("idle");
      }

      return zombie.setState("roaming");
    }
  }
}
