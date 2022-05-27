'use strict';
import GameBuilder from "./game.js"

//const GAME_WIDTH = 800;
//const SUN_WIDTH = 150;
const TIME_LIMIT_SEC = 60;
const NUMBER_OF_SHEEP = 5;
const NUMBER_OF_WOLVES = 5;


const game = new GameBuilder().numberOfSheep(NUMBER_OF_SHEEP).numberOfWolves(NUMBER_OF_WOLVES).timeLimitSec(TIME_LIMIT_SEC).build();



