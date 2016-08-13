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

    const feet = this.add.sprite(0, 0, "player:feet", "idle/survivor-idle_0.png");
    feet.animations.add("idle", Phaser.Animation.generateFrameNames("idle/survivor-idle_", 0, 19, ".png", 0), 20, true, false);
    feet.animations.add("walk", Phaser.Animation.generateFrameNames("walk/survivor-walk_", 0, 19, ".png", 0), 20, true, false);
    feet.animations.add("run", Phaser.Animation.generateFrameNames("run/survivor-run_", 0, 19, ".png", 0), 20, true, false);

    const knife = this.add.sprite(0, 0, "player:knife", "idle/survivor-idle_knife_0.png");
    knife.animations.add("idle", Phaser.Animation.generateFrameNames("idle/survivor-idle_knife_", 0, 19, ".png", 0), 20, true, false);
    knife.animations.add("walk", Phaser.Animation.generateFrameNames("move/survivor-move_knife_", 0, 19, ".png", 0), 20, true, false);
    knife.animations.add("run", Phaser.Animation.generateFrameNames("move/survivor-move_knife_", 0, 19, ".png", 0), 20, true, false);

    pRenderer.addSprite(
      feet,
      0.2,
      0
    );

    pRenderer.addSprite(
      knife,
      0.2
    );

    this.renderers.push(pRenderer);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // @NOTE: this will probably change or disappear as we move
    // to using phaser's physics stuff

    this.player.vx = this.player.vy = 0;

    if (this.cursors.down.isDown) {
      this.player.vy = 2;
    } else if (this.cursors.up.isDown) {
      this.player.vy = -2;
    }

    if (this.cursors.right.isDown) {
      this.player.vx = 2;
    } else if (this.cursors.left.isDown) {
      this.player.vx = -2;
    }

    this.player.move();

    this.renderers.forEach(renderer => renderer.consolidate());

    this.camera.focusOn(this.player);
  }

  render() {
  }
}

export default MainState;
