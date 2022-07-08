
class Boxer {

  constructor(

    firstName, nickname, lastName,
    hometown, weightClass,
    
    sta, agr, agi, str, def,
    // pow, sta,

    // chin, heart, maxHp, hp, id,

    // win, loss, rank, champion

  ){

    this.firstName = firstName; this.nickname = nickname; this.lastName = lastName;
    this.hometown = hometown; this.weightClass = weightClass,
    
    this.sta = sta; this.agr = agr; this.agi = agi; this.str = str; this.def = def;

    this.pow = () => ((this.agi*0.3)+(this.str*0.7))
    this.con = () => ((this.sta*0.7)+(this.heart*0.3))/100

    this.chin = () =>
    this.heart = () => 
    this.maxHp = () => 
    this.hp = this.maxHp;
    this.id;

    this.win = 0; this.loss = 0;
    this.rank = 31, this.champion = false;

  }

  //determines who attacks first
  engage = () => {

  }

  //determines the damage output
  attack = () =>

  //determines the ability to reduce damage input
  defend = () =>

  //determines the overall total of health
  health = () =>

  //increase attributes during fight week
  train = {

    roadWork: () => ,
    speedBag: () => ,
    jumpRope: () => ,
    pads: () => 

  }
  
  //increase hp between rounds
  roundRecovery = () =>

  //increase attributes between rounds, with 1 or 2 negative effects
  pepTalk = () =>

  //update wins/loss in endFight function
  updateRecord = () =>

  regresss = () =>
  
}

export default Boxer