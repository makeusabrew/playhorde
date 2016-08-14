let entities = [];

export default {
  add: (entity => entities.push(entity)),
  all: (callback => entities.forEach(callback))
};
