import Phaser from "phaser";

class BootState extends Phaser.State {
  preload() {
    // load the background. this probably won't stay like this as I
    // suspect we'll actually generate maps from tilesets instead
    this.load.tilemap("level1", "/assets/maps/level1.json", null, Phaser.Tilemap.TILED_JSON);

    // the actual tiles
    this.load.image("tiles", "/assets/img/medieval.png");

    this.load.atlasJSONHash("player:feet", "/assets/img/player/feet.png", "/assets/img/player/feet.json");
    this.load.atlasJSONHash("player:knife", "/assets/img/player/knife.png", "/assets/img/player/knife.json");
    this.load.atlasJSONHash("player:handgun", "/assets/img/player/handgun.png", "/assets/img/player/handgun.json");

    this.load.atlasJSONHash("zombie", "/assets/img/zombie/zombie.png", "/assets/img/zombie/zombie.json");

    this.load.audiosprite("zombies", "/assets/sound/zombies.mp3", "/assets/sound/zombies.json");
  }

  create() {
    this.state.start("menu");
  }
}

export default BootState;
