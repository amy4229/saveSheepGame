'use strict';
import * as sound from "./sound.js"
import {ScoreBoardBuilder,MSG} from "./scoreBoard.js"
import {
    FarmBuilder,
    Animal
} from "./farm.js"

const btn_comp = document.querySelector(".game__header__btn");
const sun_comp = document.querySelector(".game__header__sun__img");


const GAME_WIDTH = 800;
const SUN_WIDTH = 150;
const TIME_LIMIT_SEC = 60;
const NUMBER_OF_SHEEP = 5;
const NUMBER_OF_WOLVES = 5;

const CLASS_END = "game__header__btn--end";

const farm = new FarmBuilder()
    .numberOfWolves(NUMBER_OF_WOLVES)
    .numberOfSheep(NUMBER_OF_SHEEP)
    .build();


const scoreBoard = new ScoreBoardBuilder()
    .timeLimitSec(TIME_LIMIT_SEC)
    .numberOfWolves(NUMBER_OF_WOLVES)
    .build();

let sunMove_ani = null;
let clock_interval = null;
let timeout = null;
let killed_wolves = 0;

function start() {
    console.log("start");
    sound.stopWin();
    sound.playBgm();
    killed_wolves = 0;
    scoreBoard.onGameStartListener();
    moveSun();
    farm.init();
    timeout = setTimeout(() => lose(MSG.timeout), TIME_LIMIT_SEC * 1000);
}

function shotgun() {
    sound.playShot();
    onFarmClick();
    console.log(sound, onFarmClick);
}

btn_comp.addEventListener("click", onButtonClick);

farm.setFarmClickListener(onFarmClick);



function onFarmClick(animal) {
    sound.playShot();
    if (animal === `${Animal.wolf.name}`) {
        killed_wolves++;
        scoreBoard.onShotWolfListener(killed_wolves);
        if (killed_wolves == NUMBER_OF_WOLVES) {
            win();
        }
    } else if (animal === `${Animal.sheep.name}`) {
        lose(MSG.sheepkill);
    }
    console.log("onFarmClick")
}


function onButtonClick() {
    const cmd = btn_comp.classList;
    if (!cmd.contains(CLASS_END)) {
        btn_comp.classList.add(CLASS_END)
        start();
    } else {
        btn_comp.classList.remove(CLASS_END)
        lose(MSG.usrRequest);
    }
}













function moveSun() {
    sunMove_ani = sun_comp.animate([{
        "transform": "translateX(" + (GAME_WIDTH - SUN_WIDTH) + "px)"
    }], {
        duration: TIME_LIMIT_SEC * 1000,
        iterations: 1,
    });

}


function win() {
    sound.playWin();
    end(MSG.win);
}

function lose(msg) {
    sound.playLose();
    end(msg);
}

function end(msg) {
    sound.stopBgm();
    farm.finish();
    btn_comp.classList.remove(CLASS_END);
    console.log("endStart");
    stopSun(sunMove_ani);
    clearInterval(clock_interval);
    clearTimeout(timeout);
    scoreBoard.finished(msg);
}

function stopSun(sunMove) {
    console.log("stopSunStart");
    sunMove.finish();
}