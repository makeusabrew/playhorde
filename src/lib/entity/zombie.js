import Phaser from "phaser";
import Entity from "./base";
import ZombieArms from "../weapon/zombie-arms";
import {random, frandom} from "../util";

import IdleState from "./state/zombie/idle";

export default class Zombie extends Entity {
  constructor() {
    super();

    this.target = null;

    this.awarenessRadius = random(50, 200);
    this.speed = frandom(0.3, 0.8);
    this.visibleRange = random(200, 1500);

    this.arms = new ZombieArms();

    this.state = new IdleState(this);
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
    this.state.execute(this);
    // move
    super.tick();
  }

  isAttacking() {
    return this.arms.isBusy();
  }

  isTargetNear() {
    return (Phaser.Point.distance(this.getPoint(), this.target.getPoint()) < this.awarenessRadius);
  }
}
