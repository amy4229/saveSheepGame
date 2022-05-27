'use strict'

const WIDTH_OF_ANIMAL = 100;
const HEIGHT_OF_ANIMAL = 70;

export const Animal = Object.freeze({
    sheep: {
        name: "sheep",
        class: "game__farm__sheep"
    },
    wolf: {
        name: "wolf",
        class: "game__farm__wolf"
    },
    deadWolf: {
        name: "dead wolf",
        class: "game__farm__wolf--die"
    }
});

export class FarmBuilder {
    numberOfSheep(numberOfSheep) {
        this.numberOfSheep = numberOfSheep;
        return this;
    }

    numberOfWolves(numberOfWolves) {
        this.numberOfWolves = numberOfWolves;
        return this;
    }

    build() {
        return new Farm(
            this.numberOfWolves,
            this.numberOfSheep
        );
    }
}

class Farm {
    constructor(numberOfWolves, numberOfSheep) {
        this.farm = document.querySelector(".game__farm");
        this.numberOfSheep = numberOfSheep;
        this.numberOfWolves = numberOfWolves;
        this.farm.addEventListener ('click', this.onClick);
    }

    init() {
        this._printSheep(this.numberOfSheep);
        this._printWolf(this.numberOfWolves);
    }

    _printSheep(numberOfSheep) {
        for (let i = 0; i < numberOfSheep; i++) {
            this._makeAnimal(Animal.sheep);
        }
    }

    _printWolf(numberOfWolves) {
        for (let i = 0; i < numberOfWolves; i++) {
            this._makeAnimal(Animal.wolf)
        }
    }

    _makeAnimal(animal) {
        const animal_comp = document.createElement("img");
        animal_comp.classList.add(animal.class);
        animal_comp.setAttribute("alt", animal.name);
        animal_comp.style.left = this._getRandomX();
        animal_comp.style.top = this._getRandomY();
        this.farm.appendChild(animal_comp);
    }

    _getRandomX() {
        const max_x = this.farm.clientWidth - WIDTH_OF_ANIMAL;
        return Math.floor(Math.random() * max_x) + "px";
    }

    _getRandomY() {
        const max_y = this.farm.clientHeight - HEIGHT_OF_ANIMAL;
        return Math.floor(Math.random() * max_y) + "px";
    }

    setFarmClickListener(onFarmClick) {
        this.onFarmClick= onFarmClick;
    }

    onClick = (event) => {
        console.log("onClick")
        const target = event.target;
        let animal = ''; 
        if (target.matches(`.${Animal.wolf.class}`)) {
            target.classList.add(Animal.deadWolf.class);
            target.classList.remove(Animal.wolf.class);
            target.setAttribute("alt", Animal.deadWolf.name);
            animal = `${Animal.wolf.name}`;
        }else if(target.matches(`.${Animal.sheep.class}`)){
            animal = `${Animal.sheep.name}`; 
        }
        console.log(animal)
        this.onFarmClick && this.onFarmClick(animal);
    }
   

    finish() {
        this.farm.innerHTML = "";
    }

}