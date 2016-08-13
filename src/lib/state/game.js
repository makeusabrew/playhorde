import Phaser from "phaser";

import EntityRenderer from "../renderer/entity";

import Player from "../entity/player";
import Zombie from "../entity/zombie";

import Knife from "../weapon/knife";

class MainState extends Phaser.State {
  preload() {
    // nothing to do, I don't think?
  }

  create() {
    this.renderers = [];

    this.player = new Player();
    this.player.x = 250;
    this.player.y = 50;
    this.player.addWeapon(new Knife(), true);

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

    const feet = this.add.sprite(0, 0, "player:feet", "idle/survivor-idle_0.png");

    // we can probably start to tuck this away inside entity renderers
    feet.animations.add("idle", Phaser.Animation.generateFrameNames("idle/survivor-idle_", 0, 19, ".png", 0), 20, true, false);
    feet.animations.add("walk", Phaser.Animation.generateFrameNames("walk/survivor-walk_", 0, 19, ".png", 0), 20, true, false);
    feet.animations.add("run", Phaser.Animation.generateFrameNames("run/survivor-run_", 0, 19, ".png", 0), 20, true, false);

    this.renderers.push(new EntityRenderer(this.player, feet, 0.2));

    const knife = this.add.sprite(0, 0, "player:knife", "idle/survivor-idle_knife_0.png");
    knife.animations.add("idle", Phaser.Animation.generateFrameNames("idle/survivor-idle_knife_", 0, 19, ".png", 0), 20, true, false);
    knife.animations.add("walk", Phaser.Animation.generateFrameNames("move/survivor-move_knife_", 0, 19, ".png", 0), 20, true, false);
    knife.animations.add("run", Phaser.Animation.generateFrameNames("move/survivor-move_knife_", 0, 19, ".png", 0), 20, true, false);
    knife.animations.add("attack", Phaser.Animation.generateFrameNames("meleeattack/survivor-meleeattack_knife_", 0, 19, ".png", 0), 20, true, false);

    this.renderers.push(new EntityRenderer(this.player, knife, 0.2));

    this.cursors = this.input.keyboard.createCursorKeys();

    this.space = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    this.zombies = [];

    for (var i = 0; i < 10; i++) {
      const zombie = new Zombie();

      zombie.x = 100 + (i*50);
      zombie.y = 100 + (i*50);
      zombie.a = Math.floor(Math.random() * 360);

      const zSprite = this.add.sprite(0, 0, "zombie", "skeleton-idle_0.png");
      zSprite.animations.add("idle", Phaser.Animation.generateFrameNames("skeleton-idle_", 0, 16, ".png", 0), 10, true, false);
      zSprite.animations.add("walk", Phaser.Animation.generateFrameNames("skeleton-move_", 0, 16, ".png", 0), 10, true, false);

      this.renderers.push(new EntityRenderer(zombie, zSprite, 0.2));

      this.zombies.push(zombie);
    }
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

    if (this.space.isDown) {
      this.player.attack();
    }

    // yuck...
    if (this.player.vx > 0 && this.player.vy === 0) {
      this.player.a = 0;
    } else if (this.player.vx > 0 && this.player.vy > 0) {
      this.player.a = 45;
    } else if (this.player.vy > 0 && this.player.vx === 0) {
      this.player.a = 90;
    } else if (this.player.vx < 0 && this.player.vy > 0) {
      this.player.a = 135;
    } else if (this.player.vx < 0 && this.player.vy === 0) {
      this.player.a = 180;
    } else if (this.player.vx < 0 && this.player.vy < 0) {
      this.player.a = 225;
    } else if (this.player.vy < 0 && this.player.vx === 0) {
      this.player.a = 270;
    } else if (this.player.vx > 0 && this.player.vy < 0) {
      this.player.a = 315;
    }

    const now = Date.now();

    this.player.tick();

    this.zombies.forEach(zombie => zombie.tick(now));

    this.renderers.forEach(renderer => renderer.reconcile());

    this.camera.focusOn(this.player);
  }

  render() {
  }
}

export default MainState;
