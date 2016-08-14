import Phaser from "phaser";

class MenuState extends Phaser.State {
  preload() {
    // load some assets
  }

  create() {
    const font = this.add.retroFont("font:main", 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
    font.setText("Horde", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

    const image = this.add.image(this.game.world.centerX, 300, font);
    image.anchor.set(0.5);

    this.input.onDown.add(() => {
      this.state.start("game");
    });
  }
}

export default MenuState;
