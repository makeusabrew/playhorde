import Phaser from "phaser";
import Entity from "./base";
import {random, frandom} from "../util";

const Point = Phaser.Point;

export default class Zombie extends Entity {
  constructor() {
    super();

    this.target = null;

    this.awarenessRadius = random(50, 200);
    this.speed = frandom(0.3, 0.8);
    this.visibleRange = random(200, 1500);
  }

  // be generic; we don't have to attack a player, just any entity
  setTarget(target) {
    this.target = target;
  }

  tick(now) {
    // always be on the lookout
    this.checkForTarget();
    // think
    this[this.state.get()](now);
    // move
    super.tick();
  }

  idle(now) {
    if (now - this.state.time() >= 5e3 + Math.random() * 20e3) {
      this.state.set("roaming");
    }
  }

  checkForTarget() {
    // don't bother if we're already going for it
    if (["tracking", "attacking"].indexOf(this.state.get()) !== -1) {
      return;
    }

    // is the target anywhere within our general awareness radius?
    if (Point.distance(this.getPoint(), this.target.getPoint()) < this.awarenessRadius) {
      this.state.set("tracking");
    }
  }

  roaming() {
    // if we don't have anywhere to head to, pick a random point
    // sort of near us
    if (!this.destination) {
      this.destination = new Point(
        this.x + (Math.floor(Math.random() * 301) - 150),
        this.y + (Math.floor(Math.random() * 301) - 150)
      );

      const radAngle = Point.angle(
        // order matters here otherwise we get the opposite (wrong) heading
        this.destination,
        this.getPoint()
      );

      this.a = Phaser.Math.radToDeg(radAngle);

      // set our velocity then bail, we're good to go
      this.vx = Math.cos(radAngle) * this.speed;
      this.vy = Math.sin(radAngle) * this.speed;
      return;
    }

    // already had a point we were heading towards - check we haven't reached it
    const distance = Point.distance(this.getPoint(), this.destination, true);

    if (distance <= 1) {
      // close enough...
      this.destination = null;
      this.vx = 0;
      this.vy = 0;

      if (Math.floor(Math.random() * 2) === 0) {
        return this.state.set("idle");
      }

      this.state.set("roaming");
    }
  }

  tracking() {
    // if we're tracking then we have to continuously update our
    // heading towards wherever our target is
    const radAngle = Point.angle(
      this.target.getPoint(),
      this.getPoint()
    );

    this.a = Phaser.Math.radToDeg(radAngle);

    this.vx = Math.cos(radAngle) * this.speed;
    this.vy = Math.sin(radAngle) * this.speed;

    const distance = Point.distance(this.getPoint(), this.target.getPoint());

    // we've lost sight of our target, roam instead
    if (distance >= this.visibleRange) {
      return this.state.set("roaming");
    }

    // this should probably account for the size of the target
    if (distance <= 30) {
      this.vx = 0;
      this.vy = 0;
      return this.state.set("attacking");
    }
  }

  attacking() {
    const distance = Point.distance(this.getPoint(), this.target.getPoint());

    // @TODO account for size of target
    if (distance > 30) {
      this.state.set("tracking");
    }
  }

  isAttacking() {
    return this.state.get() === "attacking";
  }
}
