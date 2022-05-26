'use strict';
const GUN_SOUND = "/sounds/180961__kleeb__gunshots.wav";
const BGM = "/sounds/식물 소개.mp3";
const WIN_SOUND = "/sounds/425663__camo1018__clapping.mp3";
const LOSE_SOUND = "/sounds/253174__suntemple__retro-you-lose-sfx.wav";

const btn_comp = document.querySelector(".game__header__btn");
const sun_comp = document.querySelector(".game__header__sun__img");
const farm_comp = document.querySelector(".game__farm");
const message_comp = document.querySelector(".game__display__message");
const timeLimit_comp  = document.querySelector(".game__display__timer");
const wolfRemain_comp  = document.querySelector(".game__display__remain_wolves");

const GAME_WIDTH = 800;
const SUN_WIDTH = 150;
const TIME_LIMIT_SEC =60;
const NUMBER_OF_SHEEP = 5;
const NUMBER_OF_WOLVES =5;
const WIDTH_OF_ANIMAL = 100;
const HEIGHT_OF_ANIMAL = 70;

const CLASS_END = "game__header__btn--end";

const MSG_GAME_OVER_SHEEP_KILL = "당신은 양을 죽여서 해고되었습니다."
const MSG_GAME_OVER_TIME_OUT = "시간이 초과되었습니다."
const MSG_GAME_OVER_USER_REQUEST = "요청에 따라 게임을 종료하였습니다."
const MSG_GAME_OVER_WIN = "늑대를 모두 없앴습니다. 축하드립니다."

const Animal = Object.freeze({
    sheep : {
        name : "sheep"
        ,class :"game__farm__sheep"
    },
    wolf : {
        name : "wolf"
        ,class :"game__farm__wolf"
    },
    deadWolf : {
        name : "dead wolf"
        ,class : "game__farm__wolf--die"
    }
});

let sunMove_ani = null;
let clock_interval = null;
let timeout = null;
let killed_wolves = 0;

const bgm = new Audio(BGM);
const winSound = new Audio(WIN_SOUND);
const loseSound = new Audio(LOSE_SOUND);
const shotSound = new Audio(GUN_SOUND);

btn_comp.addEventListener("click", onButtonClick);

farm_comp.addEventListener("mousedown", (e)=>{
    shotSound.currentTime = 0;
    shotSound.play();
    const target = e.target;
    if(target.matches(`.${Animal.wolf.class}`)){
        shotWolf(target);
    }else if(target.matches(`.${Animal.sheep.class}`)){
        shotSheep();
    }
})

function onButtonClick(){
    const cmd = btn_comp.className;
    console.log(cmd);
    btn_comp.classList.toggle(CLASS_END);
    if(cmd !== CLASS_END){
        console.log("start click")
        start();
    }else {
        console.log("end click")
        lose(MSG_GAME_OVER_USER_REQUEST);
    }
}

function start (){
    console.log("start" );
    if(winSound)winSound.pause();
    if(loseSound)loseSound.pause();
    bgm.play();
    killed_wolves = 0;
    message_comp.textContent = "게임을 시작합니다.";
    timeLimit_comp.textContent =`남은 시간 : ${TIME_LIMIT_SEC}`;
    wolfRemain_comp.textContent = `남은 늑대: ${NUMBER_OF_WOLVES - killed_wolves}마리`;
    moveSun();
    tictok();
    printSheep(NUMBER_OF_SHEEP);
    printWolf(NUMBER_OF_WOLVES);
    timeout = setTimeout(()=>lose(MSG_GAME_OVER_TIME_OUT), TIME_LIMIT_SEC*1000);
}



function printSheep(howMany){
    for(let i = 0; i < howMany; i++ ){
        makeAnimal(Animal.sheep);
    }
}

function shotSheep() {
    lose(MSG_GAME_OVER_SHEEP_KILL);
}

function printWolf(howMany){
    for(let i = 0; i < howMany; i++ ){
        makeAnimal(Animal.wolf, shotWolf)
    }
}

function makeAnimal (animal) {
    const animal_comp = document.createElement("img");
    animal_comp.classList.add(animal.class);
    animal_comp.setAttribute("alt",animal.name);
    animal_comp.style.left = getRandomX(); 
    animal_comp.style.top = getRandomY();
    farm_comp.appendChild(animal_comp);
}

function getRandomX (){
    const max_x = farm_comp.clientWidth-WIDTH_OF_ANIMAL;
    return Math.floor(Math.random()* max_x)+"px";
}

function getRandomY (){
    const max_y = farm_comp.clientHeight-HEIGHT_OF_ANIMAL;
    return Math.floor(Math.random()* max_y)+"px";
}

function shotWolf(wolf){
    wolf.classList.add(Animal.deadWolf.class);
    wolf.classList.remove(Animal.wolf.class);
    wolf.setAttribute("alt", Animal.deadWolf.name);
    killed_wolves++;
    wolfRemain_comp.textContent = `남은 늑대: ${NUMBER_OF_WOLVES - killed_wolves}마리`;
    if(killed_wolves == NUMBER_OF_WOLVES){
        win();
    }
}


function moveSun(){
    sunMove_ani = sun_comp.animate([
        {"transform" : "translateX("+(GAME_WIDTH-SUN_WIDTH)+"px)"}
    ],{
        duration : TIME_LIMIT_SEC * 1000,
        iterations: 1,
      });

}

function tictok(){
    let timeRemain = TIME_LIMIT_SEC-1;
    clock_interval = setInterval(function(){
        timeLimit_comp.textContent =`남은 시간: ${timeRemain}초` ;
        timeRemain--;
    },1000)
}
function win (){
    winSound.play();
    end(MSG_GAME_OVER_WIN);
}
function lose (msg) {
    loseSound.play();
    end(msg);
} 

function end (msg){
    bgm.pause();
    btn_comp.classList.remove("end");
    console.log("endStart");
    farm_comp.innerHTML = "";
    stopSun(sunMove_ani);
    clearInterval(clock_interval);
    clearTimeout(timeout);
    message_comp.textContent = msg;
}

function stopSun (sunMove){
    console.log("stopSunStart");
    sunMove.finish();
}
