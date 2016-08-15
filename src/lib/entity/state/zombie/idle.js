import State from "../base";

export default class IdleState extends State {
  execute(zombie) {
    if (zombie.isTargetNear()) {
      return zombie.setState("tracking");
    }

    const now = Date.now();

    zombie.vx = 0;
    zombie.vy = 0;

    if (now - this.time >= 5e3 + Math.random() * 20e3) {
      zombie.setState("roaming");
    }
  }
}
