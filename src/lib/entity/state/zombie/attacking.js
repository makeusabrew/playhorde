import Phaser from "phaser";
import State from "../base";
import TrackingState from "./tracking";

const Point = Phaser.Point;

export default class AttackingState extends State {
  execute() {
    const zombie = this.entity;
    const target = zombie.target;
    const distance = Point.distance(zombie.getPoint(), target.getPoint());

    zombie.vx = 0;
    zombie.vy = 0;

    if (!zombie.arms.isBusy()) {
      zombie.arms.fire();
    }

    if (distance > target.r) {
      this.set(new TrackingState());
    }
  }
}
