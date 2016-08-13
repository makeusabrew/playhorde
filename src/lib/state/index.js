import BootState from "./boot";
import MenuState from "./menu";
import GameState from "./game";

const loadStates = game => {
  game.state.add("boot", BootState, false);
  game.state.add("menu", MenuState, false);
  game.state.add("game", GameState, false);
};

export default loadStates;
