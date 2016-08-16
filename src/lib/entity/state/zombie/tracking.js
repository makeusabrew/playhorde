import Phaser from "phaser";
import State from "../base";
import AttackingState from "./attacking";
import RoamingState from "./roaming";

const Point = Phaser.Point;

export default class TrackingState extends State {
  execute(zombie) {
    const target = zombie.target;

    // if we're tracking then we have to continuously update our
    // heading towards wherever our target is
    const radAngle = Point.angle(
      target.getPoint(),
      zombie.getPoint()
    );

    zombie.a = Phaser.Math.radToDeg(radAngle);

    zombie.vx = Math.cos(radAngle) * zombie.speed;
    zombie.vy = Math.sin(radAngle) * zombie.speed;

    const distance = Point.distance(zombie.getPoint(), target.getPoint());

    // we've lost sight of our target, roam instead
    if (distance >= zombie.visibleRange) {
      return this.set(new RoamingState());
    }

    if (distance <= target.r) {
      return this.set(new AttackingState());
    }
  }
}
