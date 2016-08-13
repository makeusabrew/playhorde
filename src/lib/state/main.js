import Phaser from "phaser";

import Player from "../entity/player";
import EntityRenderer from "../renderer/entity";

class MainState extends Phaser.State {
  preload() {
    // nothing to do, I don't think?
  }

  create() {
    this.renderers = [];

    this.player = new Player();
    this.player.x = 50;
    this.player.y = 50;
    this.map = this.add.tilemap("level1");

    // param1 - name of tileset in JSON, param2 our cache key
    this.map.addTilesetImage("medieval", "tiles");

    // has to match the name of a layer in the JSON
    this.layer = this.map.createLayer("background");

    this.world.setBounds(0, 0, 3200, 3200);

    /*
    this.physics.startSystem(Phaser.Physics.P2JS);

    this.physics.p2.enable(this.player);
    */

    // now player stuff
    const pRenderer = new EntityRenderer(this.player);

    pRenderer.addSprite(
      this.add.sprite(0, 0, "player:feet", "idle/survivor-idle_0.png"),
      0.2,
      0
    );

    pRenderer.addSprite(
      this.add.sprite(0, 0, "player:knife", "idle/survivor-idle_knife_0.png"),
      0.2
    );

    this.renderers.push(pRenderer);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.down.isDown) {
      this.player.y += 4;
    } else if (this.cursors.up.isDown) {
      this.player.y -= 4;
    }

    if (this.cursors.right.isDown) {
      this.player.x += 4;
    } else if (this.cursors.left.isDown) {
      this.player.x -= 4;
    }

    this.renderers.forEach(renderer => renderer.consolidate());

    this.camera.focusOn(this.player);
  }

  render() {
  }
}

export default MainState;
