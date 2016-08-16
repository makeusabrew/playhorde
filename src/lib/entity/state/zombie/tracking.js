import Phaser from "phaser";
import State from "../base";
import AttackingState from "./attacking";
import RoamingState from "./roaming";
import Debug from "debug";

const Point = Phaser.Point;

const debug = Debug("horde:entity:zombie:state:tracking");

export default class TrackingState extends State {
  execute() {
    const zombie = this.entity;
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
    if (distance >= zombie.visibility) {
      debug("%d lost sight of target", zombie._id);
      return this.set(new RoamingState());
    }

    if (distance <= target.r) {
      return this.set(new AttackingState());
    }
  }
}
