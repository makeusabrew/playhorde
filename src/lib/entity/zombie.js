import Phaser from "phaser";
import Entity from "./base";
import ZombieArms from "../weapon/zombie-arms";
import {random, frandom, isAngleContained} from "../util";
import Debug from "debug";

import IdleState from "./state/zombie/idle";

const Point = Phaser.Point;

const debug = Debug("horde:entity:zombie");

export default class Zombie extends Entity {
  constructor() {
    super();

    this.target = null;

    // Anything in this small range we'll
    // know about even if it's quiet as a mouse or we're not facing it
    this.awarenessRadius = random(50, 100);

    this.speed = frandom(0.2, 0.9);

    this.hearing = random(100, 401);

    this.visibility = random(100, 501);
    this.fov = random(50, 120);

    // will determine how good we are at working stuff out / picking up clues
    this.intelligence = random(50, 101);

    // will determine how good we are at telling other zombies about stuff
    this.communication = random(5, 101);

    this.arms = new ZombieArms();

    this.state = new IdleState();
    this.state.enter(this);
  }

  // be generic; we don't have to attack a player, just any entity
  setTarget(target) {
    this.target = target;
  }

  tick() {
    if (this.health <= 0) {
      return;
    }

    // think
    this.state.execute();
    // move
    super.tick();
  }

  isAttacking() {
    return this.arms.isBusy();
  }

  canDetectTarget() {
    const distance = Point.distance(this.getPoint(), this.target.getPoint());

    if (distance <= this.awarenessRadius) {
      return true;
    }

    // these ifs are a bit ugly because they do trivial checks first (for speed)
    // and *then* do the more complex detection inside the trivial test blocks

    if (distance <= this.visibility) {
      // calculate current FOV
      const minA = (this.a - this.fov / 2) % 360;
      const maxA = (this.a + this.fov / 2) % 360;

      const targetA = Phaser.Math.radToDeg(
        Point.angle(this.target.getPoint(), this.getPoint())
      );

      if (isAngleContained(minA, targetA, maxA)) {
        debug("%d can see my target! Dist: %d, Angles: %d %d, %d", this._id, distance, minA, targetA, maxA);
        return true;
      }
    }


    if (distance <= this.hearing) {
      // @TODO: logic
      const isTargetMakingNoise = false;

      if (isTargetMakingNoise) {
        return true;
      }
    }

    return false;
  }
}
