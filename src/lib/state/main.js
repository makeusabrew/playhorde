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

    // now player stuff

    this.player.feet = this.add.sprite(10, 10, "player:feet", "idle/survivor-idle_0.png");
    this.player.feet.scale.setTo(0.2, 0.2);
    this.player.body = this.add.sprite(0, 0, "player:knife", "idle/survivor-idle_knife_0.png");
    this.player.body.scale.setTo(0.2, 0.2);

    this.camera.follow(this.player.body);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.down.isDown) {
      this.player.body.y += 4;
    }

    if (this.cursors.right.isDown) {
      this.player.body.x += 4;
    }
  }

  render() {
  }
}

export default MainState;
