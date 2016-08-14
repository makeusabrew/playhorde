import Phaser from "phaser";

export default class EntityRenderer {
  constructor(entity, sprite, scale = 1, offset = 1) {

    sprite.scale.setTo(scale, scale);

    // always set the anchor point as the middle of the sprite
    sprite.anchor.set(0.5);

    this.sprite = sprite;
    this.entity = entity;
    this.offset = offset;

    this.animCache = {};
  }

  reconcile() {
    if (this.entity.isAttacking() && this.hasAnimation("attack")) {
      this.setAnimation("attack");
    } else if (this.entity.hasVelocity()) {
      this.setAnimation("walk");
    } else {
      this.setAnimation("idle");
    }

    const {x, y, a} = this.entity.getPosition();

    this.sprite.x = x + this.offset;
    this.sprite.y = y + this.offset;
    this.sprite.angle = a;
  }

  addAnimation(name, start, stop, fps) {
    this.sprite.animations.add(name, Phaser.Animation.generateFrameNames(`${name}_`, start, stop, ".png", 0), fps, true, false);
    this.animCache[name] = true;
  }

  setAnimation(name) {
    this.sprite.animations.play(name);
  }

  hasAnimation(name) {
    if (this.animCache[name] === undefined) {
      this.animCache[name] = this.sprite.animations.getAnimation(name) !== null;
    }
    return this.animCache[name];
  }

  destroy() {
    this.sprite.destroy();
  }
}
