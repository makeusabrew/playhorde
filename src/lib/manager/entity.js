let entities = [];
let eId = 0;

export default {
  add: entity => {
    entity._id = ++eId;
    entities.push(entity);
  },

  all: (callback => entities.forEach(callback))
};
