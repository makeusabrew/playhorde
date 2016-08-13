import BootState from "./boot";
import MenuState from "./menu";
import MainState from "./main";

const loadStates = game => {
  game.state.add("boot", BootState, false);
  game.state.add("menu", MenuState, false);
  game.state.add("main", MainState, false);
};

export default loadStates;
