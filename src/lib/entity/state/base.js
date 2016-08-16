export default class EntityState {
  constructor(entity) {
    this.time = null;
    if (entity) {
      this.enter(entity);
    }
  }

  enter(entity) {
    this.entity = entity;
    this.time = Date.now();
  }

  exit() {
  }

  run() {
  }

  name() {
    return this.constructor.name.match(/^(\w+)State$/)[1].toLowerCase();
  }

  set(state) {
    const entity = this.entity;
    let oldStateName = null;

    if (entity.state) {
      oldStateName = entity.state.name();
      entity.state.exit(entity);
    }

    entity.state = state;
    entity.state.enter(entity);

    entity.emit("state:change", entity.state.name(), oldStateName);
  }
}
