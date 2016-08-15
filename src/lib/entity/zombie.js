import Phaser from "phaser";
import Entity from "./base";
import ZombieArms from "../weapon/zombie-arms";
import {random, frandom} from "../util";

import IdleState from "./state/zombie/idle";
import RoamingState from "./state/zombie/roaming";
import TrackingState from "./state/zombie/tracking";
import AttackingState from "./state/zombie/attacking";

export default class Zombie extends Entity {
  constructor() {
    super();

    this.target = null;

    this.awarenessRadius = random(50, 200);
    this.speed = frandom(0.3, 0.8);
    this.visibleRange = random(200, 1500);

    this.arms = new ZombieArms();

    this.setState("idle");
  }

  // be generic; we don't have to attack a player, just any entity
  setTarget(target) {
    this.target = target;
  }

  setState(strState) {
    let state;

    switch (strState) {
    case "idle":
      state = new IdleState();
      break;

    case "roaming":
      state = new RoamingState();
      break;

    case "tracking":
      state = new TrackingState();
      break;

    case "attacking":
      state = new AttackingState();
      break;

    default:
      throw new Error (`No such zombie state ${strState}`);
    }

    if (this.state) {
      this.state.exit(this);
    }
    this.state = state;
    this.state.enter(this);

    this.emit("state:change", strState);
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
