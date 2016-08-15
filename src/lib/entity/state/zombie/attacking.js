import Phaser from "phaser";
import State from "../base";

const Point = Phaser.Point;

export default class AttackingState extends State {
  enter(zombie) {
    this.target = zombie.target;
  }

  execute(zombie) {
    const target = this.target;
    const distance = Point.distance(zombie.getPoint(), target.getPoint());

    zombie.vx = 0;
    zombie.vy = 0;

    if (!zombie.arms.isBusy()) {
      zombie.arms.fire();
    }

    if (distance > target.r) {
      zombie.setState("tracking");
    }
  }
}
