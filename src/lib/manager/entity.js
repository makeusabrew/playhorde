import RenderManager from "./renderer";

let entities = [];
let eId = 0;

export default {
  add: (entity, loader) => {
    entity._id = ++eId;
    entities.push(entity);
    RenderManager.add(entity, loader);
  },

  remove: entity => {
    const target = entities.findIndex(e => e === entity);
    if (target === -1) {
      return;
    }
    entities.splice(target, 1);
    RenderManager.remove(entity);
  },

  getByType: (t => entities.filter(e => e.getType() === t)),

  tick: (now) => {
    entities.forEach(e => e.tick(now));
  },

  render: () => {
    RenderManager.reconcile();
  }
};
