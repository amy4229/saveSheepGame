'use strict';

const MSG_GAME_START = "게임을 시작합니다.";

export const GameStatus = Object.freeze({
    start : "게임을 시작합니다.",
    sheepkill : "당신은 양을 죽여서 해고되었습니다.",
    stop :"요청에 따라 게임을 종료하였습니다.",
    win : "늑대를 모두 없앴습니다. 축하드립니다.",
    timeout : "시간이 초과되었습니다."
});

export class ScoreBoardBuilder {
    timeLimitSec(timeLimitSec){
        this.timeLimitSec = timeLimitSec;
        return this;
    }
    numberOfWolves(numberOfWolves){
        this.numberOfWolves = numberOfWolves;
        return this;
    }
    build(){
        return new ScoreBoard(
            this.timeLimitSec,
            this.numberOfWolves
        )
    }
} 

class ScoreBoard {
    constructor(timeLimitSec, numberOfWolves){
        this.message = document.querySelector(".game__score_board__message");
        this.timeIndicator = document.querySelector(".game__score_board__timer");
        this.wolfRemain = document.querySelector(".game__score_board__remain_wolves");
        this.timer =undefined;
        this.timeLimitSec = timeLimitSec;
        this.numberOfWolves = numberOfWolves;
    }

    onGameStartListener(){
        this.printTimeIndicator(this.timeLimitSec);
        this.tictok(this.timeLimitSec);
        this.printMessage(MSG_GAME_START);
        this.printWolvesRemain(this.numberOfWolves);
    }

    tictok(){
        let timeRemain = this.timeLimitSec;
        this.timer = setInterval(()=>{
            timeRemain--;
            this.printTimeIndicator(timeRemain);
        },1000)
    }

    finished(msg){
        this.printMessage(msg);
        this.timer && clearInterval(this.timer);
    }

    onShotWolfListener(killed_wolves){
        const remain_wolves = this.numberOfWolves-killed_wolves;
        this.printWolvesRemain(remain_wolves);
    }

    printMessage(msg) {
        this.message.textContent = msg;
    }

    printTimeIndicator(remain_sec){
        this.timeIndicator.textContent = `남은 시간 : ${remain_sec}`;
    }

    printWolvesRemain(remain_wolves){
        this.wolfRemain.textContent = `남은 늑대: ${remain_wolves}마리`
    }
}