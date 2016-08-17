import Phaser from "phaser";
import State from "../base";
import TrackingState from "./tracking";
import IdleState from "./idle";

const Point = Phaser.Point;

export default class RoamingState extends State {
  enter(zombie) {
    super.enter(zombie);

    // allow for a destination to have been set externally
    if (!this.destination) {
      this.destination = new Point(
        zombie.x + (Math.floor(Math.random() * 301) - 150),
        zombie.y + (Math.floor(Math.random() * 301) - 150)
      );
    }

    const radAngle = Point.angle(
      // order matters here otherwise we get the opposite (wrong) heading
      this.destination,
      zombie.getPoint()
    );

    zombie.a = Phaser.Math.radToDeg(radAngle);

    // set our velocity then bail, we're good to go
    zombie.vx = Math.cos(radAngle) * zombie.speed;
    zombie.vy = Math.sin(radAngle) * zombie.speed;
  }

  execute() {
    const zombie = this.entity;

    if (zombie.canDetectTarget()) {
      return this.set(new TrackingState());
    }

    const distance = Point.distance(zombie.getPoint(), this.destination, true);

    if (distance <= 1) {
      // close enough...

      if (Math.floor(Math.random() * 2) === 0) {
        return this.set(new IdleState());
      }

      return this.set(new RoamingState());
    }
  }
}
