import "pixi";
import "p2";
import Phaser from "phaser";

import loadStates from "./lib/state";

const game = new Phaser.Game(800, 600, Phaser.AUTO, "main", null);

loadStates(game);

game.state.start("boot");
