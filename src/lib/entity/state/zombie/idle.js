import State from "../base";
import RoamingState from "./roaming";
import TrackingState from "./tracking";
import HomingState from "./homing";
import {random} from "../../../util";

export default class IdleState extends State {
  execute() {
    const zombie = this.entity;

    if (zombie.canDetectTarget()) {
      return this.set(new TrackingState());
    }

    const now = Date.now();

    zombie.vx = 0;
    zombie.vy = 0;

    if (now - this.time >= random(5e3, 30e3)) {
      const next = random(0, 3);

      if (next === 0) {
        return this.set(new RoamingState());
      }

      if (next === 1) {
        return this.set(new IdleState());
      }

      return this.set(new HomingState());
    }
  }
}
