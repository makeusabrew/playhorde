import Phaser from "phaser";

const FADE_DELAY = 1000;

class MenuState extends Phaser.State {
  create() {
    const music = this.add.audio("music");
    music.play();

    const font = this.add.retroFont("font:main", 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
    font.setText("Horde", false, 0, 0, Phaser.RetroFont.ALIGN_CENTER);

    const image = this.add.image(this.game.world.centerX, 250, font);
    image.anchor.set(0.5);
    image.alpha = 0;

    this.add.tween(image).to({
      alpha: 1
    }, FADE_DELAY, Phaser.Easing.Linear.None, true, 2000, 0, false);

    setTimeout(() => {
      const font = this.add.retroFont("font:main", 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
      font.setText("Click to play", false, 0, 0, Phaser.RetroFont.ALIGN_CENTER);

      const image = this.add.image(this.game.world.centerX, 400, font);
      image.anchor.set(0.5);
      image.alpha = 0.8;

      this.input.onDown.add(() => {
        this.state.start("game");
      });
    }, FADE_DELAY);
  }
}

export default MenuState;
