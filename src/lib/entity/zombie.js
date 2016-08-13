import Phaser from "phaser";
import Entity from "./base";
import {random, frandom} from "../util";

const Point = Phaser.Point;

/*
const stateMap = {
  "idle": {
    "min": 5,
    "max": 30,
    "next": ["roaming"],
  },
  "roaming": {
    "next": ["idle", "roaming"]
  },
  "roaming": {
    "next": ["idle", "roaming"]
  }
};
*/

export default class Zombie extends Entity {
  constructor() {
    super();

    this.target = null;

    this.setState("idle");

    this.awarenessRadius = random(50, 200);
    this.speed = frandom(0.3, 0.8);
    this.visibleRange = random(200, 1500);
  }

  // be generic; we don't have to attack a player, just any entity
  setTarget(target) {
    this.target = target;
  }

  // hmm, be nice to have a separate composed object for state stuff, somehow
  setState(state) {
    this.state = state;
    this.stateTime = Date.now();
  }

  tick(now) {
    this.checkForTarget();
    // think
    this[this.state](now);
    // move
    super.tick();
  }

  idle(now) {
    if (now - this.stateTime >= 5e3 + Math.random() * 20e3) {
      this.setState("roaming");
    }
  }

  checkForTarget() {
    if (["tracking", "attacking"].indexOf(this.state) !== -1) {
      return;
    }

    if (Point.distance(this.getPoint(), this.target.getPoint()) < this.awarenessRadius) {
      this.setState("tracking");
    }
  }

  roaming() {
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

      this.vx = Math.cos(radAngle) * this.speed;
      this.vy = Math.sin(radAngle) * this.speed;
      return;
    }

    const distance = Point.distance(this.getPoint(), this.destination, true);

    if (distance <= 1) {
      // close enough...
      this.destination = null;
      this.vx = 0;
      this.vy = 0;

      if (Math.floor(Math.random() * 2) === 0) {
        return this.setState("idle");
      }

      this.setState("roaming");
    }
  }

  tracking() {
    const radAngle = Point.angle(
      this.target.getPoint(),
      this.getPoint()
    );

    this.a = Phaser.Math.radToDeg(radAngle);

    this.vx = Math.cos(radAngle) * this.speed;
    this.vy = Math.sin(radAngle) * this.speed;

    const distance = Point.distance(this.getPoint(), this.target.getPoint());

    if (distance >= this.visibleRange) {
      // add some randomness here
      return this.setState("roaming");
    }

    if (distance <= 30) {
      this.vx = 0;
      this.vy = 0;
      return this.setState("attacking");
    }
  }

  attacking() {
    const distance = Point.distance(this.getPoint(), this.target.getPoint());

    if (distance > 30) {
      this.setState("tracking");
    }
  }

  isAttacking() {
    return this.state === "attacking";
  }
}
