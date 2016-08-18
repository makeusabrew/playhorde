import Phaser from "phaser";
import Weapon from "./base";
import Bullet from "../entity/bullet";

const RELOAD_TIME = 500;
const BULLET_VELOCITY = 8;

export default class Handgun extends Weapon {
  constructor() {
    super();

    this.type = "projectile";
  }

  fire(owner) {

    const now = Date.now();

    this.lastFired = now;
    this.readyAt = now + RELOAD_TIME;

    const {x, y, a} = owner.getPosition();

    const radAngle = Phaser.Math.degToRad(a);

    const bullet = new Bullet();

    bullet.owner = owner;
    bullet.x = x;
    bullet.y = y;
    bullet.a = a;
    bullet.vx = BULLET_VELOCITY * Math.cos(radAngle);
    bullet.vy = BULLET_VELOCITY * Math.sin(radAngle);
    bullet.damage = 30;

    return bullet;
  }

  getPhase() {
    if (!this.isBusy()) {
      return null;
    }

    return "shoot";
  }
}
