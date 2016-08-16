import State from "../base";
import RoamingState from "./roaming";
import TrackingState from "./tracking";

export default class IdleState extends State {
  execute() {
    const zombie = this.entity;

    if (zombie.isTargetNear()) {
      return this.set(new TrackingState());
    }

    const now = Date.now();

    zombie.vx = 0;
    zombie.vy = 0;

    if (now - this.time >= 5e3 + Math.random() * 20e3) {
      this.set(new RoamingState());
    }
  }
}
