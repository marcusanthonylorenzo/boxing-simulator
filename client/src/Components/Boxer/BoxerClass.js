import { v4 as uuidv4 } from 'uuid';
import randomizer from '../Helpers/Randomize.js'
class Boxer {

  constructor(

    firstName, nickname, lastName,
    hometown, weightClass,
    sta, agr, agi, str, def,

  ){

    this.firstName = firstName; this.nickname = nickname; this.lastName = lastName;
    this.hometown = hometown; this.weightClass = weightClass;
    
    this.sta = sta; this.agr = agr; this.agi = agi; this.str = str; this.def = def;

    this.pow = (this.str*0.7)+(this.agi*0.3)

    //eventually determine by survey at create page
    this.heart = 75
    this.chin = ((this.sta*0.4)+(this.str*0.3)+(this.heart*0.3))

    //eventually split into head and body, max is static, non-max decrements in battle
    this.maxCon = ((this.sta*0.8)+(this.heart*0.2))/100
    this.con = this.maxCon

    this.maxHp = (this.sta + this.chin + this.heart + this.str)
    this.hp = this.maxHp;

    this.win = 0;
    this.loss = 0;
    this.rank = 31;
    this.champion = false;
    this.id = uuidv4();

  }



  /***
  
  FIGHT WORKFLOW

  ***/

  //determines who attacks first
  engage = () => Math.round( ((this.agr*0.6)+(this.heart*0.2)+(this.sta*0.2))*this.con )

  //determines the damage output
  attack = () => {
    let min = this.pow*this.con
    let rand = randomizer(min, this.pow);
    this.energyLoss();
    return rand;
  }

  //determines the ability to reduce damage input
  defend = () => {
    let defense = ((this.def*0.8)+(this.chin*0.2))
    let minDef = defense*this.con
    this.energyLoss();
    return randomizer(minDef, defense)
  }

  energyLoss = () => this.con -= (this.con/100)

  roundRecovery = () => this.train.rest();


  //increase attributes between rounds, with 1 or 2 negative effects
  pepTalk = {
    getInThere: () => this.train.speedBag(),
    relax: () => this.train.rest(),
    youGottaGo: () => {
      this.agr *= 1.1;
      this.heart *= 1.1;
      this.agi *= 1.1;
      this.con -= this.con/10;
    }
  }

  //update wins/loss in endFight function
  updateRecord = (item) => {
    this.item += 1;
  }



/***

  GYM METHODS

 ***/

  //increase attributes during fight week
  train = {

    roadWork: () => {
      this.sta *= 1.05;
      this.maxCon += (this.con/100);
      this.energyLoss();
    },

    speedBag: () => {
      this.agr *= 1.05;
      this.agi *= 1.05;
      this.energyLoss();
    },

    jumpRope: () => {
      this.sta *= 1.05;
      this.agi *= 1.05;
      this.energyLoss();
    },

    pads: () => {
      this.str *= 1.05;
      this.def *= 1.05;
      this.energyLoss();
    },

    rest: () => {

      if (this.hp < this.maxHp) {
        this.hp *= 1.1;
      }
      if (this.con < this.maxCon) {
        this.con *= 1.1
      }

    //   if (this.hp < this.maxHp || this.con < this.maxCon) {
    //     console.log("lower hp")
    //     this.hp *= 1.1;
    //     this.con *= 1.1;
    //   } else {
    //     console.log("match hp")
    //     this.hp = this.maxHp; this.con = this.maxCon;
    //     console.log(this.hp, this.con)
    //   }
    }
  }

}

export default Boxer