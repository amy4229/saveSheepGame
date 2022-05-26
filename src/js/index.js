const GUN_SOUND = "/sounds/180961__kleeb__gunshots.wav";
const BGM = "/sounds/식물 소개.mp3";
const WIN_SOUND = "/sounds/425663__camo1018__clapping.mp3";
const LOSE_SOUND = "/sounds/253174__suntemple__retro-you-lose-sfx.wav";

const btn_comp = document.querySelector("button");
const sun_comp = document.querySelector(".sun-image");
const main_comp = document.querySelector("main");
const message_comp = document.querySelector(".message");
const timeLimit_comp  = document.querySelector(".time-limit");
const wolfRemain_comp  = document.querySelector(".remain-wolves");

const GAME_WIDTH = 800;
const SUN_WIDTH = 150;
const TIME_LIMIT_SEC =10;
const NUMBER_OF_SHEEP = 5;
const NUMBER_OF_WOLVES =5;
const WIDTH_OF_ANIMAL = 100;
const HEIGHT_OF_ANIMAL = 70;

const CLASS_END = "end"
const CLASS_SHEEP = "sheep"
const CLASS_WOLF = "wolf"
const CLASS_DIE = "die"

const MSG_GAME_OVER_SHEEP_KILL = "당신은 양을 죽여서 해고되었습니다."
const MSG_GAME_OVER_TIME_OUT = "시간이 초과되었습니다."
const MSG_GAME_OVER_USER_REQUEST = "요청에 따라 게임을 종료하였습니다."
const MSG_GAME_OVER_WIN = "늑대를 모두 없앴습니다. 축하드립니다."

let sunMove_ani = null;
let clock_intersval = null;
let timeout = null;
let killed_wolves = 0;

let bgm = new Audio(BGM);
let winSound = new Audio(WIN_SOUND);
let loseSound = new Audio(LOSE_SOUND);

btn_comp.addEventListener("click", onButtonClick);

main_comp.addEventListener("mousedown", ()=>{
    const shotSound = new Audio(GUN_SOUND);
    shotSound.play();
})

function onButtonClick(){
    const cmd = btn_comp.className;
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
    console.log("start Start" );
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
    timeout = setTimeout(()=>lose(MSG_GAME_OVER_TIME_OUT), 10000);
}



function printSheep(howMany){
    for(let i = 0; i < howMany; i++ ){
        const sheepKill =()=>lose(MSG_GAME_OVER_SHEEP_KILL);
        makeAnimal(CLASS_SHEEP,sheepKill);
    }
}

function printWolf(howMany){
    for(let i = 0; i < howMany; i++ ){
        makeAnimal(CLASS_WOLF, shotWolf)
    }
}

function makeAnimal (animalClass, callback) {
    const animal = document.createElement("div");
    animal.classList.add(animalClass);
    animal.style.left = getRandomX(); 
    animal.style.top = getRandomY();
    main_comp.appendChild(animal);
    animal.addEventListener("click", callback);
}

function getRandomX (){
    const max_x = main_comp.clientWidth-WIDTH_OF_ANIMAL;
    return Math.floor(Math.random()* max_x)+"px";
}

function getRandomY (){
    const max_y = main_comp.clientHeight-HEIGHT_OF_ANIMAL;
    return Math.floor(Math.random()* max_y)+"px";
}

function shotWolf(e){
    e.target.classList.add(CLASS_DIE);
    e.target.removeEventListener("click",shotWolf);
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
        duration: 10000,
        iterations: 1,
      });

}

function tictok(){
    let timeRemain = TIME_LIMIT_SEC-1;
    clock = setInterval(function(){
        timeLimit_comp.textContent =`남은 시간: ${timeRemain}초` ;
        timeRemain--;
    },1000)
}
function win (){
    //winSound = ;
    winSound.play();
    end(MSG_GAME_OVER_WIN);
}
function lose (msg) {
    //loseSound = new Audio(LOSE_SOUND);
    loseSound.play();
    end(msg);
} 

function end (msg){
    bgm.pause();
    btn_comp.classList.remove("end");
    console.log("endStart");
    main_comp.innerHTML = "";
    stopSun(sunMove_ani);
    clearInterval(clock);
    clearTimeout(timeout);
    message_comp.textContent = msg;
}

function stopSun (sunMove){
    console.log("stopSunStart");
    sunMove.finish();
}
