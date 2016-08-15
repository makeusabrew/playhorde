export default class EntityState {
  constructor() {
    super();
    this.time = Date.now();
  }

  enter(entity) {
  }

  exit(entity) {
  }

  run(entity) {
    throw new Error("Not implemented");
  }
}
