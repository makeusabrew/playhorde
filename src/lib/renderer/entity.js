import Phaser from "phaser";

export default class EntityRenderer {
  constructor(entity, sprite, scale = 1) {

    sprite.scale.setTo(scale, scale);

    // always set the anchor point as the middle of the sprite
    sprite.anchor.set(0.5);

    this.sprite = sprite;
    this.entity = entity;

    this.animMeta = {};
    this.currentAnim = null;
  }

  reconcile() {
    if (this.entity.isAttacking() && this.getAnimation("attack")) {
      this.setAnimation("attack");
    } else if (this.entity.hasVelocity()) {
      this.setAnimation("walk");
    } else {
      this.setAnimation("idle");
    }

    const {offsetX, offsetY} = this.animMeta[this.currentAnim];

    const {x, y, a} = this.entity.getPosition();

    this.sprite.x = x + offsetX;
    this.sprite.y = y + offsetY;
    this.sprite.angle = a;
  }

  addAnimation(name, start, stop, fps, offsetX = 0, offsetY = 0) {
    this.sprite.animations.add(name, Phaser.Animation.generateFrameNames(`${name}_`, start, stop, ".png", 0), fps, true, false);
    this.animMeta[name] = {
      offsetX, offsetY
    };
  }

  setAnimation(name) {
    this.currentAnim = name;
    this.sprite.animations.play(name);
  }

  getAnimation(name) {
    return this.animMeta[name];
  }

  destroy() {
    this.sprite.destroy();
  }
}
