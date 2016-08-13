export default class EntityRenderer {
  constructor(entity) {
    this.bodies = [];
    this.entity = entity;
  }

  addSprite(sprite, scale = 1.0, offset = 0.0) {
    sprite.scale.setTo(scale, scale);

    // always set the anchor point as the middle of the sprite
    sprite.anchor.set(0.5);

    this.bodies.push({
      sprite: sprite,
      offset: offset
    });
  }

  consolidate() {
    const {x, y, a} = this.entity.getPosition();

    this.bodies.forEach(body => {
      body.sprite.x = x + body.offset;
      body.sprite.y = y + body.offset;
      body.sprite.angle = a;
    });
  }
}
