import RoamingState from "./roaming";

export default class HomingState extends RoamingState {
  enter(zombie) {
    this.destination = zombie.home;
    super.enter(zombie);
  }
}
