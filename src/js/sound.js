'use strict';

const GUN_SOUND = "sounds/180961__kleeb__gunshots.wav";
const BGM = "sounds/식물 소개.mp3";
const WIN_SOUND = "sounds/425663__camo1018__clapping.mp3";
const LOSE_SOUND = "sounds/253174__suntemple__retro-you-lose-sfx.wav";

const bgm = new Audio(BGM);
const winSound = new Audio(WIN_SOUND);
const loseSound = new Audio(LOSE_SOUND);
const shotSound = new Audio(GUN_SOUND);

export function playBgm(){
    playSound(bgm);
}

export function playWin(){
    playSound(winSound);
} 

export function playLose(){
    playSound(loseSound);
}

export function playShot(){
    playSound(shotSound);
}

export function stopBgm() {
    bgm && bgm.pause();
}

export function stopWin(){
    winSound && winSound.pause();
}

function playSound(audio){
    if(audio){
        audio.currentTime = 0;
        audio.play();
    }
}