import Phaser from "phaser";

class MenuState extends Phaser.State {
  preload() {
    // load some assets
  }

  create() {
    const text = "Horde";
    const style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    this.add.text(this.game.world.centerX, 0, text, style);

    this.input.onDown.add(() => {
      this.state.start("game");
    });
  }
}

export default MenuState;
