import Phaser from "phaser";

import Player from "../entity/player";
import Zombie from "../entity/zombie";

import Knife from "../weapon/knife";
import Handgun from "../weapon/handgun";

import EntityManager from "../manager/entity";

// a global track of all entity renderers, which simply take care of the presentation
// of entities without cluttering up the entity classes with any rendering logic
import RenderManager from "../manager/renderer";

class MainState extends Phaser.State {
  create() {
    // set up the player
    this.player = new Player();
    this.player.x = 250;
    this.player.y = 50;
    this.player.health = 100;

    // and and equip a knife
    this.player.addWeapon(new Knife(), true);
    this.player.addWeapon(new Handgun(), true);

    EntityManager.add(this.player);

    // phaser map stuff
    this.map = this.add.tilemap("level1");
    // param1 - name of tileset in JSON, param2 our cache key
    this.map.addTilesetImage("medieval", "tiles");
    // has to match the name of a layer in the JSON
    this.layer = this.map.createLayer("background");

    this.world.setBounds(0, 0, 3200, 3200);

    const fx = this.add.audioSprite("zombies");
    fx.allowMultiple = true;

    /*
    this.physics.startSystem(Phaser.Physics.P2JS);

    this.physics.p2.enable(this.player);
    */

    this.cursors = this.input.keyboard.createCursorKeys();

    this.space = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    RenderManager.add(this.player, this);

    // temporarily set up some random zombies
    for (let i = 0; i < 10; i++) {
      const zombie = new Zombie();

      zombie.x = 100 + (i*50);
      zombie.y = 100 + (i*50);
      zombie.a = Math.floor(Math.random() * 360);
      zombie.health = 100 + Math.floor(Math.random() * 101);

      zombie.setTarget(this.player);

      zombie.on("state:change", next => {
        if (next === "attacking") {
          fx.play("zombie-2");
        }
      });

      EntityManager.add(zombie);
      RenderManager.add(zombie, this);
    }
  }

  update() {
    // @NOTE: this will probably change or disappear as we move
    // to using phaser's physics stuff. At the moment it's all
    // pretty awful, but it's just to get things started

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

    if (this.space.isDown) {
      // we might get an entity back from the attack method
      const result = this.player.attack();

      if (result) {
        EntityManager.add(result);
        RenderManager.add(result, this);
      }
    }

    const now = Date.now();

    EntityManager.all(entity => entity.tick(now));

    if (this.player.isAttacking()) {
      // @TODO weapons differ... a lot

      // assume knife for now. Although its attack phase lasts
      // for a second, it's not dangerous during all of that time.
      // Let's say it's from 100ms - 600ms that it actually damages
      // stuff
      const pWeapon = this.player.getWeapon();

      if (pWeapon.isInDamagePhase(now)) {

        // this is so rubbish... but it's a start
        /*
        this.entities
        .filter(e => e.constructor.name === "Zombie" && pWeapon.isHitting(this.player, e))
        // does an entity receive damage, or a weapon deal damage?
        .forEach(e => e.receiveDamage(pWeapon.currentDamage()));

        // note... until we start removing elements from the entity list
        // we're going to get a lot of build up in here
        const deadZombies = this.entities.filter(e => e.health <= 0);

        deadZombies.forEach(zombie => {
          const r = this.renderers.find(r => r.entity === zombie);
          if (r) {
            r.destroy();
          }
        });
        */
      }
    }

    RenderManager.all(renderer => renderer.reconcile());

    this.camera.focusOn(this.player);
  }
}

export default MainState;
