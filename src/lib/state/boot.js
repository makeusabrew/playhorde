import Phaser from "phaser";

class BootState extends Phaser.State {
  preload() {
    // load the background. this probably won't stay like this as I
    // suspect we'll actually generate maps from tilesets instead
    //this.load.tilemap("map", "path/to/tilemap.json", null, Phaser.Tilemap.TILED_JSON);

    // the actual tiles
    //this.load.image("tiles", "path/to/tiles.png");
  }

  create() {
    this.state.start("menu");
  }
}

export default BootState;
