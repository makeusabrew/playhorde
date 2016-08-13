import Phaser from "phaser";

import Player from "../entity/player";

class MainState extends Phaser.State {
  preload() {
    // nothing to do, I don't think?
  }

  create() {
    // @TODO add the tilemap to the world etc
    this.player = new Player();
    this.map = this.add.tilemap("level1");

    // param1 - name of tileset in JSON, param2 our cache key
    this.map.addTilesetImage("medieval", "tiles");

    // has to match the name of a layer in the JSON
    this.layer = this.map.createLayer("background");
  }

  update() {
  }

  render() {
  }
}

export default MainState;
