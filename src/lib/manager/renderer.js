import EntityRenderer from "../renderer/entity";

let renderers = [];

export default {
  add: (entity, loader) => {
    const type = entity.getType();

    switch (type) {

    case "Bullet":
      const renderer = new EntityRenderer(
        entity,
        loader.add.sprite(0, 0, "bullet"),
        0.5
      );
      renderers.push(renderer);
      break;

    case "Player":
      const playerFeet = new EntityRenderer(
        entity,
        loader.add.sprite(0, 0, "player:feet", "idle_0.png"),
        0.2
      );

      playerFeet.addAnimation("idle", 0, 0, 20);
      playerFeet.addAnimation("walk", 0, 19, 20);

      renderers.push(playerFeet);

      const playerKnife = new EntityRenderer(
        entity,
        loader.add.sprite(0, 0, "player:knife", "idle_0.png"),
        0.2
      );

      playerKnife.addAnimation("idle", 0, 19, 20);
      playerKnife.addAnimation("walk", 0, 19, 20);

      // last two params are X and Y offsets
      // @FIXME not working well at all
      playerKnife.addAnimation("attack", 0, 14, 20, 0, 0);

      // @TODO: need some way of a) grouping sprites ourselves and b) setting which sprite of
      // a group is the currently active layer

      renderers.push(playerKnife);
      break;

    case "Zombie":
      const zombieRenderer = new EntityRenderer(
        entity,
        loader.add.sprite(0, 0, "zombie", "idle_0.png"),
        0.2
      );

      zombieRenderer.addAnimation("idle", 0, 16, 10);
      zombieRenderer.addAnimation("walk", 0, 16, 10);
      zombieRenderer.addAnimation("attack", 0, 8, 10);

      renderers.push(zombieRenderer);
      break;
    }
  },

  push: r => {
    renderers.push(r);
  },

  all: (callback => renderers.forEach(callback))
};
