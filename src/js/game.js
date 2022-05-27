'use strict'
import {
    ScoreBoardBuilder,
    GameStatus
} from "./scoreBoard.js"
import {
    FarmBuilder,
    Animal
} from "./farm.js"
import * as sound from "./sound.js"


export default class GameBuilder {
    numberOfSheep(numberOfSheep){
        this.numberOfSheep = numberOfSheep;
        return this;
    } 

    numberOfWolves(numberOfWolves){
        this.numberOfWolves = numberOfWolves;
        return this;
    }

    timeLimitSec(timeLimitSec) {
        this.timeLimitSec = timeLimitSec;
        return this;
    }

    build(){
        new Game (this.numberOfSheep,this.numberOfWolves, this.timeLimitSec);
    }
}



class Game {
    CLASS_END = "game__header__btn--end";

    constructor(numberOfSheep, numberOfWolves,timeLimitSec) {
        this.numberOfSheep = numberOfSheep;
        this.numberOfWolves = numberOfWolves;
        this.timeLimitSec = timeLimitSec;
        this.playBtn = document.querySelector(".game__header__btn");
        this.sun = document.querySelector(".game__header__sun__img");
        this.game = document.querySelector(".game");
        this.gameWidth = this.game.getBoundingClientRect().width;
        this.sunWidth = this.sun.getBoundingClientRect().width;
        this.timeout = undefined;
        this.killed_wolves = 0;
        this.sunMove = undefined;
        this.farm = new FarmBuilder()
            .numberOfWolves(numberOfWolves)
            .numberOfSheep(numberOfSheep)
            .build();

        this.scoreBoard = new ScoreBoardBuilder()
            .timeLimitSec(timeLimitSec)
            .numberOfWolves(numberOfWolves)
            .build();

        this.playBtn.addEventListener("click", this.onPlayButtonClick);
        this.farm.setFarmClickListener(this.onFarmClick);
    }

    onPlayButtonClick = () => {
        const cmd = this.playBtn.classList;
        if (!cmd.contains(this.CLASS_END)) {
            cmd.add(this.CLASS_END)
            this.onStart && this.onStart();
        } else {
            cmd.remove(this.CLASS_END)
            this.lose(GameStatus.stop);
        }
    }

    onStart(){
         sound.stopWin();
         sound.playBgm();
         this.killed_wolves = 0;
         this.scoreBoard.onGameStartListener();
         this.farm.init();
         this.timeout = setTimeout(() => this.lose(GameStatus.timeout), this.timeLimitSec * 1000);
         this.sunrise();
    }

    onFarmClick = (animal) => {
        sound.playShot();
        if (animal === `${Animal.wolf.name}`) {
            this.killed_wolves++;
            this.scoreBoard.onShotWolf(this.killed_wolves);
            if (this.killed_wolves == this.numberOfWolves) {
                this.win();
            }
        } else if (animal === `${Animal.sheep.name}`) {
            this.lose(GameStatus.sheepkill);
        }
    }

    shotgun() {
        sound.playShot();
        this.onFarmClick();
    }

    sunrise() {
        this.sunMove = this.sun.animate({
            "transform": `translateX(${this.gameWidth - this.sunWidth}px)`
        }, {
            duration: this.timeLimitSec * 1000,
            iterations: 1,
        });
    
    }

    sunset() {
        this.sunMove && this.sunMove.finish();
    }

    win() {
        sound.playWin();
        this.onEnd && this.onEnd(GameStatus.win);
    }
    
    lose(reason) {
        sound.playLose();
        this.onEnd && this.onEnd(reason);
    }
    
    onEnd(reason) {
        sound.stopBgm();
        this.farm.finish();
        this.playBtn.classList.remove(this.CLASS_END);
        this.sunset();
        this.scoreBoard && this.scoreBoard.finished(reason);
        this.timeout && clearTimeout(this.timeout);
    }

}