import Phaser from "phaser";
import Entity from "./base";

const Point = Phaser.Point;

/*
const stateMap = {
  "idle": {
    "min": 5,
    "max": 30,
    "next": ["hunting"],
  },
  "roaming": {
    "next": ["idle", "roaming"]
  },
  "hunting": {
    "next": ["idle", "roaming"]
  }
};
*/

export default class Zombie extends Entity {
  constructor() {
    super();

    this.target = null;

    this.setState("idle");
  }

  // be generic; we don't have to attack a player, just any entity
  setTarget(target) {
    this.target = target;
  }

  setState(state) {
    this.state = state;
    this.stateTime = Date.now();
  }

  tick(now) {
    // think
    this[this.state](now);
    // move
    super.tick();
  }

  idle(now) {
    if (now - this.stateTime >= 5e3 + Math.random() * 20e3) {
      this.setState("hunting");
    }
  }

  hunting() {
    if (!this.destination) {
      this.destination = new Point(
        this.x + (Math.floor(Math.random() * 301) - 150),
        this.y + (Math.floor(Math.random() * 301) - 150)
      );

      const radAngle = Point.angle(
        // order matters here otherwise we get the opposite (wrong) heading
        this.destination,
        new Point(this.x, this.y)
      );

      this.a = Phaser.Math.radToDeg(radAngle);
      this.vx = Math.cos(radAngle) * 0.7;
      this.vy = Math.sin(radAngle) * 0.7;
      return;
    }

    const distance = Point.distance(new Point(this.x, this.y), this.destination, true);

    if (distance <= 1) {
      this.destination = null;
      this.vx = 0;
      this.vy = 0;
      if (Math.floor(Math.random() * 2) === 0) {
        this.setState("idle");
      } else {
        this.setState("hunting");
      }
    }
  }
}
