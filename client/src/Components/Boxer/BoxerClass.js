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

    this.maxHp = Math.round( (this.sta + this.chin + this.heart + this.str)*12 )
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
    this.lowEnergyWarning();
    let min = this.pow*this.con
    let rand = randomizer(min, this.pow);
    this.energyLoss();
    return rand*this.con;
  }

  //determines the ability to reduce damage input
  defend = () => {
    let defense = ((this.def*0.8)+(this.chin*0.2))
    let minDef = defense*this.con
    this.energyLoss();
    let defRand = randomizer(minDef, defense)
    return defRand*this.con
  }

  energyLoss = () => this.con -= (this.con/100)
  roundRecovery = () => this.train.rest();


  //increase attributes between rounds, with 1 or 2 negative effects
  pepTalk = {
    getInThere: () => this.train.speedBag(),
    relax: () => {
      let recover = this.train.rest()
      return recover*this.con
    },
    youGottaGo: () => {
      this.agr *= 1.05;
      this.heart *= 1.05;
      this.agi *= 1.05;
      this.con *= this.con;
    }
  }
  
  lowEnergyWarning = () => {
    if (this.con <= this.maxCon*0.3) {
      console.log("energy low!")
    } else {
      console.log("good to go")
    }
  }

  record = {

  //update wins/loss in endFight function
    updateLoss: () => this.loss += 1,
    updateWin: () => this.win += 1 
    
  }



/***

  GYM METHODS

 ***/



  //increase attributes during fight week
  train = {

    roadWork: () => {
      this.sta *= 1.03;
      this.maxCon += (this.con/100);
      this.energyLoss();
    },

    speedBag: () => {
      this.agr *= 1.03;
      this.agi *= 1.03;
      this.energyLoss();
    },

    jumpRope: () => {
      this.sta *= 1.03;
      this.agi *= 1.03;
      this.energyLoss();
    },

    pads: () => {
      this.str *= 1.03;
      this.def *= 1.03;
      this.energyLoss();
    },

    rest: () => {

      if (this.hp < this.maxHp) {
        this.hp *= 1.05;
      }
      if (this.con < this.maxCon) {
        this.con *= 1.05;
      }
    }
  }

}

export default Boxer